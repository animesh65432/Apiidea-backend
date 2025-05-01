-- CreateTable
CREATE TABLE `Projects` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `starterCode` VARCHAR(191) NOT NULL,
    `diagram` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `propmt` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Projects` ADD CONSTRAINT `Projects_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
