import { useState } from "react";
import ImageCard from "./ImageCard";


function ImageTable() {
    let [selectedImageId, setSelectedImageId] = useState<number | null>(null);
    
    return <>
    <ImageCard {...{setSelectedImage: setSelectedImageId, image:{id:1, path:"hi!!", src:"/image/1"}, filetype:"Jpeg", size:100}}></ImageCard>
    <span>{`Selected image is: ${selectedImageId}`}</span>
    </>
}

export default ImageTable;