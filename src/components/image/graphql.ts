import { gql } from "@apollo/client/core"

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
            top
            left
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

export type ImageInfo = BasicImageInfo & {
    faces: {
        x: number
        y: number
        top: number
        left: number
        embedding: number[]
    }[]
}
