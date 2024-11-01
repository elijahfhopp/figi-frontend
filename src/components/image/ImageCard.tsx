import { Dispatch } from "react"
import { Card, CardBody, CardFooter, Ratio } from "react-bootstrap"
import './ImageCard.css'

function ImageCard({ setSelectedImage, image, filetype, size }:
    {
        setSelectedImage: Dispatch<number>,
        image:
        {
            id: number,
            src: string,
            path: string
        }
        filetype: string,
        size: number
    }) {
    return (
        <>
            <Card
                onClick={() => {
                    setSelectedImage(image.id)
                }}
            style={{ cursor: "pointer" }}
            >
            <CardBody>
                <Ratio aspectRatio="1x1">
                    <img
                        src={`${image.src}`}
                        className="card-img" />
                </Ratio>
            </CardBody>
            <CardFooter>
                <h6 className="card-title text-truncate">{`${image.path}`}</h6>
                <span className="text-secondary">{`Filetype: ${filetype}`}</span>
                <br />
                <span className="text-secondary">{`Size: ${size}kb`}</span>
            </CardFooter>
        </Card >
        </>
    )
}

export default ImageCard