/*
  Warnings:

  - You are about to drop the column `propmt` on the `Projects` table. All the data in the column will be lost.
  - Added the required column `api` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Projects` DROP COLUMN `propmt`,
    ADD COLUMN `api` VARCHAR(191) NOT NULL;
