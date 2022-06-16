-- CreateTable
CREATE TABLE "city" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "state_id" UUID NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
