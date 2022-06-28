/*
  Warnings:

  - You are about to drop the column `cityId` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `address` table. All the data in the column will be lost.
  - Added the required column `city_id` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_cityId_fkey";

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_customerId_fkey";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "cityId",
DROP COLUMN "customerId",
ADD COLUMN     "city_id" UUID NOT NULL,
ADD COLUMN     "customer_id" UUID;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
