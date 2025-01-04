/*
  Warnings:

  - You are about to drop the column `name` on the `terbaru` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[topik]` on the table `terbaru` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deskripsi` to the `terbaru` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topik` to the `terbaru` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "terbaru_name_key";

-- AlterTable
ALTER TABLE "terbaru" DROP COLUMN "name",
ADD COLUMN     "deskripsi" TEXT NOT NULL,
ADD COLUMN     "topik" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "terbaru_topik_key" ON "terbaru"("topik");
