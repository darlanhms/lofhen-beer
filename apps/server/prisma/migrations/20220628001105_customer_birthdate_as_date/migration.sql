/*
  Warnings:

  - The `birthdate` column on the `customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "customer" DROP COLUMN "birthdate",
ADD COLUMN     "birthdate" DATE;
