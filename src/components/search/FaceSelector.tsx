import { Dispatch } from "react";
import { useDropzone } from "react-dropzone";

function FaceSelector({ setEmbedding }: { setEmbedding: Dispatch<number[]> }) {
    const {
        acceptedFiles,
        getRootProps,
        getInputProps
    } = useDropzone({})
    return <>
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            <em>(Only *.jpeg and *.png images will be accepted)</em>
        </div>
    </>
}