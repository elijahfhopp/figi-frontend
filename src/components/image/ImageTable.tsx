import { useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import ImageDetailModal from "./ImageDetailModal";
import ImageCard from "./ImageCard";
import { BasicImageInfo, IMAGE_FROM_IDS } from "./graphql";
import { useQuery } from "@apollo/client";

function ImageTable({ imageIds }: { imageIds: number[] }) {
    let [showModal, setShowModal] = useState(false);
    let [selectedImageId, setSelectedImageId] = useState<number | null>(null);
    let { loading, error, data } = useQuery(IMAGE_FROM_IDS, { variables: { ids: imageIds } })

    if (loading) return null;
    if (error) return <span className="text-danger">{`${error}`}</span>

    let imageSelect = (id: number) => {
        setSelectedImageId(id);
        setShowModal(true);
    }

    let images: BasicImageInfo[] = data.images;
    return <>
        {selectedImageId && <ImageDetailModal show={showModal} setShow={setShowModal} imageId={selectedImageId}></ImageDetailModal>}
        <Row xs="auto">
            {images.map((image) => {
                let props = {
                    setSelectedImage: imageSelect,
                    imageSrc: `image/${image.id}`,
                    image: image
                }
                return (<Col key={image.id} xs={4} md={3} className="mb-4">
                    <ImageCard {...props}></ImageCard>
                </Col>)
            })}
        </Row>
    </>
}

export default ImageTable;