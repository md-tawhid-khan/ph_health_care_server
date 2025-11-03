-- CreateEnum
CREATE TYPE "bloodGroup" AS ENUM ('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE');

-- CreateEnum
CREATE TYPE "maritalStatus" AS ENUM ('MARRIED', 'UNMARRIED');

-- CreateTable
CREATE TABLE "patients_health_data" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "gender" "gender" NOT NULL,
    "bloodGroup" "bloodGroup" NOT NULL,
    "hasAllergies" BOOLEAN NOT NULL,
    "hasDiabetes" BOOLEAN NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "smokingStatus" BOOLEAN NOT NULL,
    "dieteryPreference" BOOLEAN NOT NULL,
    "pregnencyStatus" BOOLEAN NOT NULL,
    "mentalHealthHistory" TEXT NOT NULL,
    "immunizationStatus" BOOLEAN NOT NULL,
    "hasPastSurgeries" BOOLEAN NOT NULL,
    "recentAnxiety" BOOLEAN NOT NULL,
    "recentDepression" BOOLEAN NOT NULL,
    "maritalStatus" "maritalStatus" NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patients_health_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicalReports" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "reportName" TEXT NOT NULL,
    "reportLink" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medicalReports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patients_health_data_patientId_key" ON "patients_health_data"("patientId");

-- AddForeignKey
ALTER TABLE "patients_health_data" ADD CONSTRAINT "patients_health_data_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patiencs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicalReports" ADD CONSTRAINT "medicalReports_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patiencs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
