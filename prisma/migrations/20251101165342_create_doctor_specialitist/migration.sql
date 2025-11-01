/*
  Warnings:

  - You are about to drop the `Patience` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Patience" DROP CONSTRAINT "Patience_email_fkey";

-- DropTable
DROP TABLE "public"."Patience";

-- CreateTable
CREATE TABLE "patiencs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "contactNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patiencs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialitists" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "specialitists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctorSpecialists" (
    "specialistId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "doctorSpecialists_pkey" PRIMARY KEY ("specialistId","doctorId")
);

-- CreateIndex
CREATE UNIQUE INDEX "patiencs_email_key" ON "patiencs"("email");

-- AddForeignKey
ALTER TABLE "patiencs" ADD CONSTRAINT "patiencs_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctorSpecialists" ADD CONSTRAINT "doctorSpecialists_specialistId_fkey" FOREIGN KEY ("specialistId") REFERENCES "specialitists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctorSpecialists" ADD CONSTRAINT "doctorSpecialists_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
