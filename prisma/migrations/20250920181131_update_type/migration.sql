/*
  Warnings:

  - The primary key for the `StravaAccessToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StravaRefreshToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `athleteId` on the `StravaAccessToken` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `athleteId` on the `StravaRefreshToken` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."StravaAccessToken" DROP CONSTRAINT "StravaAccessToken_pkey",
DROP COLUMN "athleteId",
ADD COLUMN     "athleteId" INTEGER NOT NULL,
ADD CONSTRAINT "StravaAccessToken_pkey" PRIMARY KEY ("athleteId");

-- AlterTable
ALTER TABLE "public"."StravaRefreshToken" DROP CONSTRAINT "StravaRefreshToken_pkey",
DROP COLUMN "athleteId",
ADD COLUMN     "athleteId" INTEGER NOT NULL,
ADD CONSTRAINT "StravaRefreshToken_pkey" PRIMARY KEY ("athleteId");

-- CreateIndex
CREATE UNIQUE INDEX "StravaAccessToken_athleteId_key" ON "public"."StravaAccessToken"("athleteId");

-- CreateIndex
CREATE UNIQUE INDEX "StravaRefreshToken_athleteId_key" ON "public"."StravaRefreshToken"("athleteId");
