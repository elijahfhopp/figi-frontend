import { gql } from "@apollo/client/core"


export const IMAGE_SEARCH = gql`
query faceSearch($embedding: String!, $threshold: Float!, $limit: Int!){
    searchFaces(search: {embedding: $embedding, threshold: $threshold, limit: $limit}){
        sourceImage {
            id
        }
    }
}
`


export const IMAGE_INFO_QUERY = gql`
query imageInfo($id: Int!){
    image(id: $id){
        id
        path
        filetype
        size
        faces {
            x
            y
            width
            height
        }
    }
}
`

export const IMAGE_FROM_IDS = gql`
query imageInfo($ids: [Int!]!){
    images(ids: $ids){
        id
        path
        filetype
        size
    }
}
`

export type BasicImageInfo = {
    id: number
    path: string
    filetype: string
    size: number
}

export type FaceInfo = {
    x: number
    y: number
    width: number
    height: number
    embedding: number[]
};

export type ImageInfo = BasicImageInfo & {
    faces: FaceInfo[]
}
