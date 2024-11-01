import { useQuery } from "@apollo/client"
import { filesize } from "filesize"
import Konva from "konva"
import { Dispatch, useEffect, useState } from "react"
import { Modal, Ratio, Spinner } from "react-bootstrap"
import { IMAGE_INFO_QUERY, ImageInfo } from './graphql'

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
        container: 'invisible-canvas',
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
            height: f.height,
            width: f.width,
            y: f.y,
            x: f.x,
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

    // Not sure if this cleanup is necessary.
    let safeSetImage = (newImage: ImageBitmap) => {
        if (image != null) image.close()
        setImage(newImage);
    }

    useEffect(() => {
        getImage(data, safeSetImage)
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

function ImageDetailModal({ show, setShow, imageId }: { show: boolean, setShow: Dispatch<boolean>, imageId: number }) {
    let { loading, error, data } = useQuery(IMAGE_INFO_QUERY, { variables: { id: imageId } })

    if (loading) {
        return null;
    }

    if (error) {
        return <div hidden={!show}>{`Error: ${error}`}</div>
    }

    let imageInfo: ImageInfo = data.image;
    return (<Modal show={show}
        onHide={() => { setShow(false) }}
        animation={false}
        size="xl">
        <Modal.Header closeButton>
            <Modal.Title className="h6 text-truncate">
                {`${imageInfo.path}`}
            </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-0">
            <div className="d-flex w-100 px-2 border-bottom justify-content-center">
                <AnnotatedImage data={imageInfo}></AnnotatedImage>
            </div>

            <div className="p-4 text-secondary">
                <div>{`ID: ${imageInfo.id}`}</div>
                <div>{`Filetype: ${imageInfo.filetype}`}</div>
                <div>{`Size: ${filesize(imageInfo.size)}`}</div>
                <div>{`Number of Faces: ${imageInfo.faces.length}`}</div>
            </div>
        </Modal.Body>

        <Modal.Footer hidden></Modal.Footer>
    </Modal>);
}

export default ImageDetailModal;