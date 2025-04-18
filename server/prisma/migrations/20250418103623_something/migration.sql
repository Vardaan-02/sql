/*
  Warnings:

  - You are about to drop the column `Contact_Details` on the `Supplier` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "Contact_Details",
ADD COLUMN     "ContactEmail" TEXT,
ADD COLUMN     "ContactFax" TEXT,
ADD COLUMN     "ContactMobile" TEXT,
ADD COLUMN     "ContactName" TEXT,
ADD COLUMN     "ContactPhone" TEXT,
ADD COLUMN     "ContactTitle" TEXT,
ADD COLUMN     "Currency" TEXT NOT NULL DEFAULT 'usd',
ADD COLUMN     "LeadTime" TEXT,
ADD COLUMN     "Notes" TEXT,
ADD COLUMN     "PaymentTerms" TEXT,
ADD COLUMN     "Status" TEXT,
ADD COLUMN     "TaxId" TEXT,
ADD COLUMN     "Website" TEXT;
