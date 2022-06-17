-- CreateTable
CREATE TABLE "customer" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "birthdate" VARCHAR(50),
    "phone" VARCHAR(50),
    "observation" VARCHAR(500),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" UUID NOT NULL,
    "alias" VARCHAR(255) NOT NULL,
    "cityId" UUID NOT NULL,
    "customerdId" UUID,
    "link" TEXT,
    "neighborhood" VARCHAR(255),
    "street" VARCHAR(255),
    "number" VARCHAR(50),
    "complement" VARCHAR(511),
    "reference" VARCHAR(511),

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_customerdId_fkey" FOREIGN KEY ("customerdId") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
