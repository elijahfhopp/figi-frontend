import { Dispatch } from "react";
import { Ratio } from "react-bootstrap";

function FacePreview({ src, embedding, selectedEmbedding, setEmbedding }: { src: string, embedding: number[], selectedEmbedding: number[], setEmbedding: Dispatch<number[]> }) {
    let onClick = () => {
        setEmbedding(embedding)
    }

    let backgroundColor = "transparent";
    if (JSON.stringify(embedding) == JSON.stringify(selectedEmbedding)) {
        backgroundColor = "var(--bs-blue)"
    }

    return <>
        <div
            className="face-preview border rounded p-2"
            onClick={onClick}
            style={{
                backgroundColor: backgroundColor
            }}>
            <Ratio aspectRatio="1x1">
                <img
                    style={{ objectFit: "contain" }}
                    src={src}>
                </img>
            </Ratio>
        </div>
    </>
}

export default FacePreview;