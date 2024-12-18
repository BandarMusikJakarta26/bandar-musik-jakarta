/*
  Warnings:

  - You are about to drop the `brands` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "brands";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "products";

-- CreateTable
CREATE TABLE "brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kategori" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kategori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produk" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "harga" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "tokopedia" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "brand_id_key" ON "brand"("id");

-- CreateIndex
CREATE UNIQUE INDEX "brand_name_key" ON "brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "kategori_name_key" ON "kategori"("name");

-- CreateIndex
CREATE UNIQUE INDEX "produk_id_key" ON "produk"("id");

-- CreateIndex
CREATE UNIQUE INDEX "produk_name_key" ON "produk"("name");

-- CreateIndex
CREATE UNIQUE INDEX "produk_categoryName_key" ON "produk"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "produk_brandName_key" ON "produk"("brandName");

-- CreateIndex
CREATE UNIQUE INDEX "produk_tokopedia_key" ON "produk"("tokopedia");
