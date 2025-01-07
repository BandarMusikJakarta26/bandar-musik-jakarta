/*
  Warnings:

  - Added the required column `deskripsi` to the `produk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produk" ADD COLUMN     "deskripsi" TEXT NOT NULL;
