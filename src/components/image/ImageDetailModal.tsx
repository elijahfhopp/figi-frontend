import Konva from "konva"
import { useEffect, useState } from "react"
import { Modal, Ratio, Spinner } from "react-bootstrap"

function AnnotatedImage({ imageInfo, imageBitmap, faces }: {
    imageInfo: {
        height: number,
        width: number
    },
    imageBitmap: ImageBitmap,
    faces:
    {
        x: number,
        y: number,
        top: number,
        left: number
    }[]
}) {
    let color = '#7FFF00';
    let stage = new Konva.Stage({
        container: 'canvas-container',
        width: imageInfo.width,
        height: imageInfo.height
    });
    let layer = new Konva.Layer();
    stage.add(layer);
    let image = new Konva.Image({ image: imageBitmap });
    layer.add(image)

    let strokeWidth = Math.max(2, ((imageInfo.width) / 250))
    faces.map((f) => {
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
    return <Ratio aspectRatio="16x9">
        <img
            src={annotatedImage}
            style={{ objectFit: "scale-down" }} />
    </Ratio>
}

function imageContent(imageId: number, setContent: any) {
    fetch(`/image/${imageId}`,).then(res => {
        return res.blob()
    }).then(
        (blob) => {
            createImageBitmap(blob).then(res => {
                setContent(AnnotatedImage(
                    {
                        imageInfo: { height: 1000, width: 1000 },
                        imageBitmap: res,
                        faces: [{
                            x: 600,
                            y: 600,
                            left: 200,
                            top: 300
                        }]
                    }
                ))
            })
        }).catch(err => {
            setContent(<span className="text-danger">{`${err}`}</span>)
        })
}

function ImageDetailModal({ defaultId }: { defaultId: number }) {
    let [content, setContent] = useState<JSX.Element | null>(null);
    let [imageId, setImageId] = useState(defaultId)
    useEffect(() => {
        imageContent(imageId, setContent)
    }, [imageId]);


    // return (<div className="modal show">
    //     <Modal.Dialog>
    //         
    //     </Modal.Dialog>
    // </div>);
    return (<div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
    >
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>
                    patthhhhhh!
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {content == null && <Spinner></Spinner>}
                {content != null && content}
            </Modal.Body>

            <Modal.Footer>FOOOOTBALLLLLLL!</Modal.Footer>
        </Modal.Dialog>
    </div>);
}

export default ImageDetailModal;