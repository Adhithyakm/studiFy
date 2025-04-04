/*
  Warnings:

  - You are about to drop the column `departmentId` on the `LiveSession` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `LiveSession` table. All the data in the column will be lost.
  - You are about to drop the column `hostName` on the `LiveSession` table. All the data in the column will be lost.
  - You are about to drop the column `roomName` on the `LiveSession` table. All the data in the column will be lost.
  - You are about to drop the column `semesterId` on the `LiveSession` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `LiveSession` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `LiveSession` table. All the data in the column will be lost.
  - The `participants` column on the `LiveSession` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[roomCode]` on the table `LiveSession` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `LiveSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `LiveSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomCode` to the `LiveSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `LiveSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `LiveSession` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LiveSession" DROP CONSTRAINT "LiveSession_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "LiveSession" DROP CONSTRAINT "LiveSession_semesterId_fkey";

-- DropForeignKey
ALTER TABLE "LiveSession" DROP CONSTRAINT "LiveSession_subjectId_fkey";

-- DropIndex
DROP INDEX "LiveSession_departmentId_idx";

-- DropIndex
DROP INDEX "LiveSession_hostId_idx";

-- DropIndex
DROP INDEX "LiveSession_roomName_idx";

-- DropIndex
DROP INDEX "LiveSession_roomName_key";

-- DropIndex
DROP INDEX "LiveSession_semesterId_idx";

-- DropIndex
DROP INDEX "LiveSession_subjectId_idx";

-- AlterTable
ALTER TABLE "LiveSession" DROP COLUMN "departmentId",
DROP COLUMN "endTime",
DROP COLUMN "hostName",
DROP COLUMN "roomName",
DROP COLUMN "semesterId",
DROP COLUMN "startTime",
DROP COLUMN "subjectId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "roomCode" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "participants",
ADD COLUMN     "participants" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "LiveSession_roomCode_key" ON "LiveSession"("roomCode");
