/*
  Warnings:

  - You are about to drop the column `targetUserId` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "targetUserId",
ALTER COLUMN "isRead" SET DEFAULT false;
