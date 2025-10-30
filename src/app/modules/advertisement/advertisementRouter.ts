import { Router } from "express";
import { advertisementController } from "./advertisementController";
import upload from "../../../helper/fileUploaders";
import { uploadVedio } from "../../../vedioUploadClouninary/vedioUpload";


const router=Router() ;

router.post('/create-advertisement',upload.single('file'), advertisementController.createAdvertisement)

export const advertisementRouter=router ;