/*
  Warnings:

  - You are about to drop the column `customerdId` on the `address` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_customerdId_fkey";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "customerdId",
ADD COLUMN     "customerId" UUID;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
