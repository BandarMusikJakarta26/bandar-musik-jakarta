/*
  Warnings:

  - You are about to drop the column `brandId` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[brandName]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brandName` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_brandId_fkey";

-- DropIndex
DROP INDEX "products_brandId_key";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "brandId",
ADD COLUMN     "brandName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_brandName_key" ON "products"("brandName");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_brandName_fkey" FOREIGN KEY ("brandName") REFERENCES "brands"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
