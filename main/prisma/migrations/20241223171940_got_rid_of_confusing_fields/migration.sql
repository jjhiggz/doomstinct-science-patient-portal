/*
  Warnings:

  - You are about to drop the column `rating` on the `ProviderData` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stripePriceId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProviderData" DROP COLUMN "rating";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "patientId",
DROP COLUMN "stripeCustomerId",
DROP COLUMN "stripePriceId";
