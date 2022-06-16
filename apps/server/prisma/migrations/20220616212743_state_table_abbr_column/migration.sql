/*
  Warnings:

  - Added the required column `abbr` to the `state` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "state" ADD COLUMN     "abbr" VARCHAR(10) NOT NULL;
