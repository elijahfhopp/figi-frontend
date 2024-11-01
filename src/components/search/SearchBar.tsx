import { useLazyQuery } from "@apollo/client";
import { Dispatch, useEffect, useState } from "react";
import { IMAGE_SEARCH } from "../image/graphql";
import FaceSelector from "./FaceSelector";

// Based on https://docs.opencv.org/4.x/d0/dd4/tutorial_dnn_face.html
const COSINE_SIMILARITY_THRESHOLD = 0.363
const L2_SIMILARITY_THRESHOLD = 1.128

function SearchBar({ searchResultIds, setSearchResultIds }: { searchResultIds: number[], setSearchResultIds: Dispatch<number[]> }) {
    // setSearchResultIds([])
    let [embedding, setEmbedding] = useState([] as number[])
    let [doSearch, { loading, error, data }] = useLazyQuery(IMAGE_SEARCH, {
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
        faces.forEach((face: { id: number }) => {
            let id = face.sourceImage.id;
            if (!ids.includes(id)) ids.push(id)
        });
        setSearchResultIds(ids)
    }, [data])

    return <div className='p-3'>
        <FaceSelector
            embedding={embedding}
            setEmbedding={setEmbedding}>
        </FaceSelector>
        {error && <span className="text-danger">{`${error}`}</span>}
    </div>
}

export default SearchBar;