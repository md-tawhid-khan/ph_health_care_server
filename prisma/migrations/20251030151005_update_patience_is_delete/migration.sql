/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Patience` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Patience" ALTER COLUMN "isDelete" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Patience_email_key" ON "Patience"("email");

-- AddForeignKey
ALTER TABLE "Patience" ADD CONSTRAINT "Patience_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
