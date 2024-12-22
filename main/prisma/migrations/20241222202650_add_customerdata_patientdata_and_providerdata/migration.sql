/*
  Warnings:

  - Added the required column `ownerId` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CustomerData" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "preferences" TEXT,
    "billingInfo" TEXT,
    "timezone" TEXT,
    "language" TEXT,
    "marketing" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CustomerData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderData" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "businessName" TEXT,
    "licenseNumber" TEXT,
    "specialties" TEXT[],
    "businessHours" TEXT,
    "serviceLocations" TEXT[],
    "certifications" TEXT[],
    "insuranceAccepted" TEXT[],
    "staffSize" INTEGER,
    "emergencyService" BOOLEAN NOT NULL DEFAULT false,
    "rating" DOUBLE PRECISION,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ProviderData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientData" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "species" TEXT,
    "breed" TEXT,
    "birthDate" TIMESTAMP(3),
    "weight" DOUBLE PRECISION,
    "sex" TEXT,
    "microchipId" TEXT,
    "allergies" TEXT,
    "medications" TEXT[],
    "medicalNotes" TEXT,
    "dietaryNeeds" TEXT,
    "lastVisit" TIMESTAMP(3),
    "nextCheckup" TIMESTAMP(3),
    "ownerNotes" TEXT,
    "isNeutered" BOOLEAN,
    "insurance" TEXT,
    "emergencyContact" TEXT,
    "patientId" TEXT NOT NULL,

    CONSTRAINT "PatientData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerData_userId_key" ON "CustomerData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProviderData_userId_key" ON "ProviderData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PatientData_microchipId_key" ON "PatientData"("microchipId");

-- AddForeignKey
ALTER TABLE "CustomerData" ADD CONSTRAINT "CustomerData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderData" ADD CONSTRAINT "ProviderData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientData" ADD CONSTRAINT "PatientData_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
