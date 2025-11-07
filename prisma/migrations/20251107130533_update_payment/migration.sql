-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "status" SET DEFAULT 'UNPAID',
ALTER COLUMN "paymentGatewayData" DROP NOT NULL;
