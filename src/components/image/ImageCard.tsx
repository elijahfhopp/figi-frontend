import { Card, CardBody, CardFooter, Ratio } from "react-bootstrap"
import './ImageCard.css'
import { MouseEventHandler } from "react"

function infoSpan(text: string) {
    return (<>
        <span className="text-secondary">{`${text}`}</span>
    </>)
}

function ImageCard(props: { onClick: MouseEventHandler, imageSrc: string, imgPath: string, filetype: string, size: number }) {
    return (
        <>
            <Card
                onClick={props.onClick}
                style={ {cursor: "pointer"}}
            >
                <CardBody>
                    <Ratio aspectRatio="1x1">
                        <img
                            src={`${props.imageSrc}`}
                            className="card-img" />
                    </Ratio>
                </CardBody>
                <CardFooter>
                    <h6 className="card-title text-truncate">{`${props.imgPath}`}</h6>
                    {infoSpan(`Filetype: ${props.filetype}`)}
                    <br />
                    {infoSpan(`Size: ${props.size}kb`)}
                </CardFooter>
            </Card>
        </>
    )
}

export default ImageCard