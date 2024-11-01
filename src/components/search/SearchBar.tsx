import { useLazyQuery } from "@apollo/client";
import { Dispatch, useEffect, useState } from "react";
import { IMAGE_SEARCH } from "../image/graphql";
import FaceSelector from "./FaceSelector";
import { Row } from "react-bootstrap";

// Based on https://docs.opencv.org/4.x/d0/dd4/tutorial_dnn_face.html
const COSINE_SIMILARITY_THRESHOLD = 0.363
// @ts-ignore
const L2_SIMILARITY_THRESHOLD = 1.128

function SearchBar({ searchResultIds, setSearchResultIds }: { searchResultIds: number[], setSearchResultIds: Dispatch<number[]> }) {
    let [embedding, setEmbedding] = useState([] as number[])
    let [doSearch, { error, data }] = useLazyQuery(IMAGE_SEARCH, {
        variables: {
            embedding: embedding,
            threshold: COSINE_SIMILARITY_THRESHOLD,
            limit: 30
        }
    })

    useEffect(
        () => {
            if (embedding.length == 0) return
            doSearch()
        },
        [embedding]
    )

    useEffect(() => {
        if (!data) return
        let faces = data.searchFaces;
        let ids: number[] = []
        faces.forEach((face: { sourceImage: { id: number } }) => {
            let id = face.sourceImage.id;
            if (!ids.includes(id)) ids.push(id)
        });
        setSearchResultIds(ids)
    }, [data])

    return <>
        <FaceSelector
            embedding={embedding}
            setEmbedding={setEmbedding}>
        </FaceSelector>
        {searchResultIds.length > 0 &&
            <Row className="pt-2 border-top">
                <h6>{`Found ${searchResultIds.length} images containing that face.`}</h6>
            </Row>}
        {error && <span className="text-danger">{`${error}`}</span>}
    </>
}

export default SearchBar;