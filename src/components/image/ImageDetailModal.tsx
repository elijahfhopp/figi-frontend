import { gql, useQuery } from "@apollo/client"
import Konva from "konva"
import { useEffect, useState } from "react"
import { Modal, Ratio, Spinner } from "react-bootstrap"

async function getImage(imageInfo: ImageInfo, setImage: any) {
    fetch(`/image/${imageInfo.id}`,).then(res => {
        return res.blob()
    }).then(
        (blob) => {
            createImageBitmap(blob).then(bitmap => {
                setImage(bitmap)
            })
        }).catch(err => {
            console.error(err)
        })
}

function annotateImage(info: ImageInfo, image: ImageBitmap | null) {
    if (image == null) {
        return "";
    }
    let color = '#7FFF00';
    let stage = new Konva.Stage({
        container: 'canvas-container',
        width: image.width,
        height: image.height
    });
    let layer = new Konva.Layer();
    stage.add(layer);
    let drawableImage = new Konva.Image({ image: image });
    layer.add(drawableImage)

    let imageSize = (image.width + image.height) / 2
    let strokeWidth = Math.max(2, (imageSize / 250))
    info.faces.map((f) => {
        layer.add(new Konva.Rect({
            height: f.y,
            width: f.x,
            y: f.top,
            x: f.left,
            fill: 'transparent',
            stroke: color,
            strokeWidth: strokeWidth
        }));
    });
    let annotatedImage = stage.toDataURL();
    stage.destroyChildren();
    stage.destroy();
    return annotatedImage;
}

function AnnotatedImage({ data }: { data: ImageInfo }
) {
    let [image, setImage] = useState<ImageBitmap | null>(null);
    // let [info, setInfo] = useState(data)
    useEffect(() => {
        getImage(data, setImage)
    }, [data])

    if (image == null) {
        return <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: 200, height: 200 }}>
            <Spinner animation="border"></Spinner>
        </div>
    }

    return <Ratio aspectRatio="16x9" className="m-2">
        <img
            src={annotateImage(data, image)}
            style={{ objectFit: "scale-down" }} />
    </Ratio>
}

let imageInfoQuery = gql`
query imageInfo($id: Int!){
    image(id: $id){
        id
        path
        filetype
        size
        faces {
            x
            y
            top
            left
        }
    }
}
`
type ImageInfo = {
    id: number
    path: string
    filetype: string
    size: string
    faces: {
        x: number
        y: number
        top: number
        left: number
        embedding: number[]
    }[]
}

function ImageDetailModal({ imageId }: { imageId: number }) {
    let { loading, error, data } = useQuery(imageInfoQuery, { variables: { id: imageId } })

    if (loading) {
        return null;
    }

    if (error) {
        return `Error: ${error}`
    }

    let image: ImageInfo = data.image;
    return (<div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
    >
        <Modal.Dialog style={{maxWidth:"75vw"}}>
            <Modal.Header closeButton>
                <Modal.Title className="h6 text-truncate">
                    {`${image.path}`}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="p-0">
                <div className="d-flex w-100 px-2 border-bottom justify-content-center">
                    <AnnotatedImage data={data.image}></AnnotatedImage>
                </div>

                <div className="p-4 text-secondary">
                    <div>{`ID: ${image.id}`}</div>
                    <div>{`Filetype: ${image.filetype}`}</div>
                    <div>{`Size: ${image.size}kb`}</div>
                    <div>{`Number of Faces: ${image.faces.length}`}</div>
                </div>
            </Modal.Body>
            <Modal.Footer hidden></Modal.Footer>
        </Modal.Dialog>
    </div>);
}

export default ImageDetailModal;