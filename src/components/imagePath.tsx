import urlJoin from "url-join";

const host = import.meta.env.VITE_API_HOST;
let basePath = "/api";
if(host){
    basePath = host;
}


export function imagePath(id: number) {
    return urlJoin(basePath, "/image/", id.toString())
}
