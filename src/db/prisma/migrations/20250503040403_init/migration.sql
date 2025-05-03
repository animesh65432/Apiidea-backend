-- CreateTable
CREATE TABLE "Users" (
    "Id" SERIAL NOT NULL,
    "Email" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Email_key" ON "Users"("Email");
