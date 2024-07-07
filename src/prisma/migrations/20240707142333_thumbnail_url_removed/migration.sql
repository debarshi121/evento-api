/*
  Warnings:

  - You are about to drop the column `thumbnailUrl` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "thumbnailUrl",
ALTER COLUMN "plan" DROP NOT NULL;
