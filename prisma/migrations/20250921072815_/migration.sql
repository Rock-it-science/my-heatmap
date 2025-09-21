-- CreateTable
CREATE TABLE "public"."StravaActivity" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "athleteId" INTEGER NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "totalElevationGain" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "sportType" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "mapPolyline" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL,

    CONSTRAINT "StravaActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StravaActivity_id_key" ON "public"."StravaActivity"("id");
