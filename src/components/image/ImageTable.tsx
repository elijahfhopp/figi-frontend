import { useEffect, useState } from "react";
import { Col, Row, Spinner, Table } from "react-bootstrap";
import ImageDetailModal from "./ImageDetailModal";
import ImageCard from "./ImageCard";
import { BasicImageInfo, IMAGE_FROM_IDS } from "./graphql";
import { useQuery } from "@apollo/client";

function ImageTable({ imageIds }: { imageIds: number[] }) {
    let [showModal, setShowModal] = useState(false);
    let [selectedImageId, setSelectedImageId] = useState<number | null>(null);
    let { loading, error, data } = useQuery(IMAGE_FROM_IDS, { variables: { ids: imageIds } })

    if (loading) {
        return <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: 200, height: 200 }}>
            <Spinner animation="border"></Spinner>
        </div>;
    }
    if (error) return <span className="text-danger">{`${error}`}</span>

    let imageSelect = (id: number) => {
        setSelectedImageId(id);
        setShowModal(true);
    }

    let images: BasicImageInfo[] = data.images;
    return <>
        {selectedImageId && <ImageDetailModal show={showModal} setShow={setShowModal} imageId={selectedImageId}></ImageDetailModal>}
        <Row xs="4" className="w-100">
            {images.map((image) => {
                let imageHref = new URL(`/image/${image.id.toString()}`, import.meta.env.VITE_API_HOST).href;
                let props = {
                    setSelectedImage: imageSelect,
                    imageSrc: imageHref,
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