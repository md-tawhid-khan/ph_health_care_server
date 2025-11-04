import { bloodGroup, gender, maritalStatus } from "@prisma/client"

type TPatientHealthData={
  dateOfBirth:string,
  gender:gender,
  bloodGroup:bloodGroup,
  hasAllergies?:boolean,
  hasDiabetes?:boolean,
  height:string,
  weight:string,
  smokingStatus?:boolean,
  dieteryPreference?:string,
  pregnencyStatus?:boolean,
  mentalHealthHistory?:string,
  immunizationStatus?:string,
  hasPastSurgeries?:boolean,
  recentAnxiety?:boolean,
  recentDepression?:boolean,
  maritalStatus?:maritalStatus
}

type TMedicalReport = {
  reportName : string,
  reportLink : string
}

export type TUpdatePatientData={
    name?:string,
    contactNumber?:string,
    address?:string,
    patientHealthData?:TPatientHealthData,
    medicalReport?:TMedicalReport
}