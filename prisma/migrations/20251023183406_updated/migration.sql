-- AlterTable
ALTER TABLE "admins" ALTER COLUMN "isDelete" SET DEFAULT false;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "needPasswordChange" SET DEFAULT true,
ALTER COLUMN "status" SET DEFAULT 'ACTIVES';
