import { uploadVedio } from "../../../vedioUploadClouninary/vedioUpload"

const createAdvertisement=async(req:any)=>{
  const vedio_url= await uploadVedio(req.file.path) ;

  console.log(vedio_url) ;
}

export const  advertisementServices={
    createAdvertisement
}