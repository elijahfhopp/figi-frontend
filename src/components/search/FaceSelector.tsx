import { Dispatch, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import './FaceSelector.css';
import FacePreview from "./FacePreview";
import { Col, Row, Spinner } from "react-bootstrap";

type FacePreviewProps = {
    imageDataURL: string
    embedding: number[]
};

type Face = {
    score: number
    x: number
    y: number
    width: number
    height: number
    embedding: number[]
}

async function fetchFaces(imageFile: File, setError: Dispatch<Error>): Promise<Face[]> {
    let data = new FormData()
    data.append("image", imageFile)
    let response = await fetch("/extract_faces/",
        {
            method: "post",
            body: data
        })
    if (response.status != 200) {
        setError(Error(`Face extraction failed: ${response.status} ${await response.text()}`))
        return []
    }
    let faces: Face[] = await response.json()
    return faces;
}


async function generateFacePreviews(imageFile: File | null,
    setFacePreviews: Dispatch<FacePreviewProps[]>,
    setError: Dispatch<Error>,
    setLoading: Dispatch<boolean>
) {
    if (imageFile == null) return [];
    let faces = await fetchFaces(imageFile, setError)
    let facePreviews: FacePreviewProps[] = [];
    let canvasRef: HTMLCanvasElement = document.getElementById('invisible-canvas') as HTMLCanvasElement
    const orignalSize = { height: canvasRef.height, width: canvasRef.width }
    let context = canvasRef.getContext('2d');

    for (const face of faces) {
        let bitmap = await createImageBitmap(imageFile, face.x, face.y, face.width, face.height)
        canvasRef.height = bitmap.height
        canvasRef.width = bitmap.width
        context?.drawImage(bitmap, 0, 0)
        facePreviews.push({
            imageDataURL: canvasRef.toDataURL(),
            embedding: face.embedding
        })
        canvasRef.height = orignalSize.height
        canvasRef.width = orignalSize.width
        context?.clearRect(0, 0, canvasRef.width, canvasRef.height)
        bitmap.close()
    }

    setFacePreviews(facePreviews)
    setLoading(false)
}


function FaceSelector({ embedding, setEmbedding }: { embedding: number[], setEmbedding: Dispatch<number[]> }) {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [facePreviews, setFacePreviews] = useState<FacePreviewProps[]>([]);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        setError(undefined)
        generateFacePreviews(file, setFacePreviews, setError, setLoading);
    }, [file])

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setFile(acceptedFiles[0]);
            setLoading(true)
        }
    });

    let previewImages = facePreviews.map((face, index) => {
        return <Col key={index} xs={2}><FacePreview
            src={face.imageDataURL}
            embedding={face.embedding}
            selectedEmbedding={embedding}
            setEmbedding={setEmbedding}>
        </FacePreview></Col>
    });

    // console.log(loading)
    if (loading) { 
        previewImages = [<Spinner key={0}></Spinner>] }

    return (
        <>
            <h6>Selected file: {file && `${file?.name}`}</h6>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drop images here or click to select files</p>
                <em>(.jpeg, *.png)</em>
            </div>
            {error && <span className="text-danger">{`${error}`}</span>}
            <Row className="d-flex mt-4 justify-content-center">{previewImages}</Row>
        </>
    );
}

export default FaceSelector