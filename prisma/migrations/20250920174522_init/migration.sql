-- CreateTable
CREATE TABLE "public"."StravaAccessToken" (
    "athleteId" TEXT NOT NULL,
    "tokenCode" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "expiresAt" BIGINT NOT NULL,

    CONSTRAINT "StravaAccessToken_pkey" PRIMARY KEY ("athleteId")
);

-- CreateTable
CREATE TABLE "public"."StravaRefreshToken" (
    "athleteId" TEXT NOT NULL,
    "tokenCode" TEXT NOT NULL,
    "scope" TEXT NOT NULL,

    CONSTRAINT "StravaRefreshToken_pkey" PRIMARY KEY ("athleteId")
);

-- CreateIndex
CREATE UNIQUE INDEX "StravaAccessToken_athleteId_key" ON "public"."StravaAccessToken"("athleteId");

-- CreateIndex
CREATE UNIQUE INDEX "StravaRefreshToken_athleteId_key" ON "public"."StravaRefreshToken"("athleteId");
