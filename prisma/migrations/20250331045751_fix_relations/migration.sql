/*
  Warnings:

  - You are about to drop the column `upload_date` on the `study_materials` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code,semesterId]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `departmentId` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Made the column `code` on table `Subject` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "departmentId" INTEGER NOT NULL,
ALTER COLUMN "code" SET NOT NULL;

-- AlterTable
ALTER TABLE "study_materials" DROP COLUMN "upload_date";

-- CreateIndex
CREATE UNIQUE INDEX "Subject_code_semesterId_key" ON "Subject"("code", "semesterId");

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
