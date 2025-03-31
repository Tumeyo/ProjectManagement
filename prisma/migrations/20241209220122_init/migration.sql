-- CreateTable
CREATE TABLE `Baiguullaga` (
    `Baiguullaga_ID` VARCHAR(5) NOT NULL,
    `Baiguullaga_ner` VARCHAR(45) NULL,
    `Uil_ajillagaanii_chiglel` VARCHAR(255) NULL,
    `Utas` INTEGER NULL,
    `Hayg` VARCHAR(255) NULL,
    `Ajilchdiin_too` INTEGER NULL,

    PRIMARY KEY (`Baiguullaga_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `Admin_ID` VARCHAR(5) NOT NULL,
    `Admin_ner` VARCHAR(45) NULL,
    `login_name` VARCHAR(25) NULL,
    `login_password` VARCHAR(65) NULL,

    PRIMARY KEY (`Admin_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hereglegch_angilal` (
    `Hereglegch_angilal_ID` VARCHAR(5) NOT NULL,
    `Hereglegch_angilal_ner` VARCHAR(45) NULL,

    PRIMARY KEY (`Hereglegch_angilal_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hereglegch` (
    `Hereglegch_ID` VARCHAR(5) NOT NULL,
    `Hereglegch_ner` VARCHAR(45) NULL,
    `Hereglegch_email` VARCHAR(45) NULL,
    `Hereglegch_utas_no` VARCHAR(25) NULL,
    `Hereglegch_hayag` VARCHAR(255) NULL,
    `Ashiglaj_duusah_hugatsaa` DATETIME(3) NULL,
    `Ashiglah_erhtei_eseh` BOOLEAN NOT NULL DEFAULT true,
    `Hereglegch_login_name` VARCHAR(25) NULL,
    `Hereglegch_login_password` VARCHAR(65) NULL,
    `Hereglegch_angilal_ID` VARCHAR(5) NULL,
    `Baiguullaga_ID` VARCHAR(5) NULL,

    PRIMARY KEY (`Hereglegch_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tusliin_angilal_lavlah` (
    `Tusliin_angilal_lavlah_ID` VARCHAR(6) NOT NULL,
    `Tusliin_angilal_ner` VARCHAR(45) NULL,
    `Hereglegch_ID` VARCHAR(5) NULL,

    PRIMARY KEY (`Tusliin_angilal_lavlah_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tusliin_tuluv_lavlah` (
    `Tusliin_tuluv_lavlah_id` VARCHAR(6) NOT NULL,
    `Tusliin_tuluv_lavlah_ner` VARCHAR(45) NULL,

    PRIMARY KEY (`Tusliin_tuluv_lavlah_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tusliin_tuluv` (
    `Tusliin_tuluv_ID` VARCHAR(5) NOT NULL,
    `Tailbar` VARCHAR(255) NULL,
    `Ognoo` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Tusliin_tuluv_lavlah_id` VARCHAR(6) NULL,

    PRIMARY KEY (`Tusliin_tuluv_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tusul` (
    `Tusul_ID` VARCHAR(5) NOT NULL,
    `Tusul_ner` VARCHAR(45) NULL,
    `Ehleh_hugatsaa` DATETIME(3) NULL,
    `Duusah_hugatsaa` DATETIME(3) NULL,
    `Nemelt_file` VARCHAR(255) NULL,
    `Tailbar` VARCHAR(255) NULL,
    `Tusliin_angilal_lavlah_ID` VARCHAR(6) NULL,
    `Tusliin_tuluv_ID` VARCHAR(5) NULL,

    PRIMARY KEY (`Tusul_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Daalgavar_angilal_lavlah` (
    `Daalgavar_angilal_lavlah_ID` VARCHAR(6) NOT NULL,
    `Daalgavar_angilal_ner` VARCHAR(45) NULL,
    `Tusul_ID` VARCHAR(5) NULL,

    PRIMARY KEY (`Daalgavar_angilal_lavlah_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tusliin_daalgavar` (
    `Tusliin_daalgavar_ID` VARCHAR(5) NOT NULL,
    `Tusliin_daalgavar_ner` VARCHAR(45) NULL,
    `Tusliin_daalgavar_daraalal` INTEGER NULL,
    `Ehleh_hugatsaa` DATETIME(3) NULL,
    `Duusah_hugatsaa` DATETIME(3) NULL,
    `Tailbar` VARCHAR(255) NULL,
    `Havsralt_file` VARCHAR(255) NULL,
    `Tusul_ID` VARCHAR(5) NULL,
    `Daalgavar_angilal_lavlah_ID` VARCHAR(6) NULL,

    PRIMARY KEY (`Tusliin_daalgavar_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Daalgavar_tuluv_lavlah` (
    `Daalgavar_tuluv_lavlah_id` VARCHAR(6) NOT NULL,
    `Daalgavar_tuluv_lavlah_ner` VARCHAR(45) NULL,

    PRIMARY KEY (`Daalgavar_tuluv_lavlah_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Daalgavar_tuluv` (
    `Daalgavar_tuluv_ID` VARCHAR(5) NOT NULL,
    `Tailbar` VARCHAR(255) NULL,
    `Ognoo` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Daalgavar_tuluv_lavlah_id` VARCHAR(6) NULL,
    `Tusliin_daalgavar_ID` VARCHAR(5) NULL,

    PRIMARY KEY (`Daalgavar_tuluv_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tusliin_bagiin_gishuun` (
    `Tusliin_bagiin_gishuun_ID` VARCHAR(6) NOT NULL,
    `Tusliin_bagiin_gishuun_ner` VARCHAR(45) NULL,
    `Tusliin_udirdagch_eseh` BOOLEAN NOT NULL DEFAULT false,
    `Hereglegch_ID` VARCHAR(5) NULL,
    `Tusul_ID` VARCHAR(5) NULL,

    PRIMARY KEY (`Tusliin_bagiin_gishuun_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tusliin_gishuunii_daalgavar` (
    `Tusliin_gishuunii_daalgavar_ID` VARCHAR(6) NOT NULL,
    `Tusliin_daalgavar_ID` VARCHAR(5) NULL,
    `Tusliin_bagiin_gishuun_ID` VARCHAR(6) NULL,

    PRIMARY KEY (`Tusliin_gishuunii_daalgavar_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gishuunii_daalgavar_tsag` (
    `Gishuunii_daalgavar_tsag_ID` VARCHAR(6) NOT NULL,
    `Tsag` DOUBLE NULL,
    `Minute` DOUBLE NULL,
    `Tusliin_gishuunii_daalgavar_ID` VARCHAR(6) NULL,

    PRIMARY KEY (`Gishuunii_daalgavar_tsag_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Daalgavriin_unelgee` (
    `Daalgavriin_unelgee_ID` VARCHAR(6) NOT NULL,
    `Daalgavriin_unelgee` DOUBLE NULL,
    `Tusliin_gishuunii_daalgavar_ID` VARCHAR(6) NULL,

    PRIMARY KEY (`Daalgavriin_unelgee_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Setgegdel` (
    `Setgegdel_ID` VARCHAR(6) NOT NULL,
    `Setgegdel` VARCHAR(255) NULL,
    `Tusliin_bagiin_gishuun_ID` VARCHAR(6) NULL,
    `Tusliin_daalgavar_ID` VARCHAR(5) NULL,
    `parent_id` VARCHAR(6) NULL,

    PRIMARY KEY (`Setgegdel_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tulbur_bagts_lavlah` (
    `Tulbur_bagts_id` VARCHAR(6) NOT NULL,
    `Tulbur_bagts_ner` VARCHAR(25) NOT NULL,
    `Tulbur_bagts_hugatsaa` INTEGER NOT NULL,
    `Tulbur_bagts_une` DOUBLE NOT NULL,

    PRIMARY KEY (`Tulbur_bagts_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Zahialga_tuluv_lavhlah` (
    `Zahialga_tuluv_lavlah_ID` VARCHAR(6) NOT NULL,
    `Zahialga_tuluv_ner` VARCHAR(25) NOT NULL,

    PRIMARY KEY (`Zahialga_tuluv_lavlah_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Zahialga` (
    `Zahialga_id` VARCHAR(6) NOT NULL,
    `Zahialga_ognoo` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Hereglegchiin_too` INTEGER NOT NULL,
    `Zahialga_tuluv_lavlah_ID` VARCHAR(6) NOT NULL,
    `Hereglegch_ID` VARCHAR(5) NOT NULL,
    `Tulbur_bagts_id` VARCHAR(6) NOT NULL,
    `Baiguullaga_ID` VARCHAR(5) NOT NULL,
    `Zahialgiin_dun` DOUBLE NOT NULL,

    PRIMARY KEY (`Zahialga_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tulbur_tuluv_lavlah` (
    `Tulbur_tuluv_lavlah_ID` VARCHAR(6) NOT NULL,
    `Tulbur_tuluv_ner` VARCHAR(25) NOT NULL,

    PRIMARY KEY (`Tulbur_tuluv_lavlah_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tulbur_turul_lavlah` (
    `Tulbur_turul_lavlah_ID` VARCHAR(6) NOT NULL,
    `Tulbur_turul_ner` VARCHAR(25) NOT NULL,

    PRIMARY KEY (`Tulbur_turul_lavlah_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tulbur` (
    `Tulbur_ID` VARCHAR(5) NOT NULL,
    `Tulbur_ognoo` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Tulbur_dun` DOUBLE NOT NULL,
    `Noat_dun` DOUBLE NOT NULL,
    `Niit_dun` DOUBLE NOT NULL,
    `Tulbur_tuluv_lavlah_ID` VARCHAR(6) NOT NULL,
    `Tulbur_turul_lavlah_ID` VARCHAR(6) NOT NULL,
    `Zahialga_id` VARCHAR(6) NOT NULL,

    PRIMARY KEY (`Tulbur_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Hereglegch` ADD CONSTRAINT `Hereglegch_Hereglegch_angilal_ID_fkey` FOREIGN KEY (`Hereglegch_angilal_ID`) REFERENCES `Hereglegch_angilal`(`Hereglegch_angilal_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hereglegch` ADD CONSTRAINT `Hereglegch_Baiguullaga_ID_fkey` FOREIGN KEY (`Baiguullaga_ID`) REFERENCES `Baiguullaga`(`Baiguullaga_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tusliin_angilal_lavlah` ADD CONSTRAINT `Tusliin_angilal_lavlah_Hereglegch_ID_fkey` FOREIGN KEY (`Hereglegch_ID`) REFERENCES `Hereglegch`(`Hereglegch_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tusliin_tuluv` ADD CONSTRAINT `Tusliin_tuluv_Tusliin_tuluv_lavlah_id_fkey` FOREIGN KEY (`Tusliin_tuluv_lavlah_id`) REFERENCES `Tusliin_tuluv_lavlah`(`Tusliin_tuluv_lavlah_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tusul` ADD CONSTRAINT `Tusul_Tusliin_angilal_lavlah_ID_fkey` FOREIGN KEY (`Tusliin_angilal_lavlah_ID`) REFERENCES `Tusliin_angilal_lavlah`(`Tusliin_angilal_lavlah_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tusul` ADD CONSTRAINT `Tusul_Tusliin_tuluv_ID_fkey` FOREIGN KEY (`Tusliin_tuluv_ID`) REFERENCES `Tusliin_tuluv`(`Tusliin_tuluv_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Daalgavar_angilal_lavlah` ADD CONSTRAINT `Daalgavar_angilal_lavlah_Tusul_ID_fkey` FOREIGN KEY (`Tusul_ID`) REFERENCES `Tusul`(`Tusul_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tusliin_daalgavar` ADD CONSTRAINT `Tusliin_daalgavar_Tusul_ID_fkey` FOREIGN KEY (`Tusul_ID`) REFERENCES `Tusul`(`Tusul_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tusliin_daalgavar` ADD CONSTRAINT `Tusliin_daalgavar_Daalgavar_angilal_lavlah_ID_fkey` FOREIGN KEY (`Daalgavar_angilal_lavlah_ID`) REFERENCES `Daalgavar_angilal_lavlah`(`Daalgavar_angilal_lavlah_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Daalgavar_tuluv` ADD CONSTRAINT `Daalgavar_tuluv_Daalgavar_tuluv_lavlah_id_fkey` FOREIGN KEY (`Daalgavar_tuluv_lavlah_id`) REFERENCES `Daalgavar_tuluv_lavlah`(`Daalgavar_tuluv_lavlah_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Daalgavar_tuluv` ADD CONSTRAINT `Daalgavar_tuluv_Tusliin_daalgavar_ID_fkey` FOREIGN KEY (`Tusliin_daalgavar_ID`) REFERENCES `Tusliin_daalgavar`(`Tusliin_daalgavar_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tusliin_bagiin_gishuun` ADD CONSTRAINT `Tusliin_bagiin_gishuun_Hereglegch_ID_fkey` FOREIGN KEY (`Hereglegch_ID`) REFERENCES `Hereglegch`(`Hereglegch_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tusliin_bagiin_gishuun` ADD CONSTRAINT `Tusliin_bagiin_gishuun_Tusul_ID_fkey` FOREIGN KEY (`Tusul_ID`) REFERENCES `Tusul`(`Tusul_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tusliin_gishuunii_daalgavar` ADD CONSTRAINT `Tusliin_gishuunii_daalgavar_Tusliin_daalgavar_ID_fkey` FOREIGN KEY (`Tusliin_daalgavar_ID`) REFERENCES `Tusliin_daalgavar`(`Tusliin_daalgavar_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tusliin_gishuunii_daalgavar` ADD CONSTRAINT `Tusliin_gishuunii_daalgavar_Tusliin_bagiin_gishuun_ID_fkey` FOREIGN KEY (`Tusliin_bagiin_gishuun_ID`) REFERENCES `Tusliin_bagiin_gishuun`(`Tusliin_bagiin_gishuun_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Gishuunii_daalgavar_tsag` ADD CONSTRAINT `Gishuunii_daalgavar_tsag_Tusliin_gishuunii_daalgavar_ID_fkey` FOREIGN KEY (`Tusliin_gishuunii_daalgavar_ID`) REFERENCES `Tusliin_gishuunii_daalgavar`(`Tusliin_gishuunii_daalgavar_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Daalgavriin_unelgee` ADD CONSTRAINT `Daalgavriin_unelgee_Tusliin_gishuunii_daalgavar_ID_fkey` FOREIGN KEY (`Tusliin_gishuunii_daalgavar_ID`) REFERENCES `Tusliin_gishuunii_daalgavar`(`Tusliin_gishuunii_daalgavar_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Setgegdel` ADD CONSTRAINT `Setgegdel_Tusliin_bagiin_gishuun_ID_fkey` FOREIGN KEY (`Tusliin_bagiin_gishuun_ID`) REFERENCES `Tusliin_bagiin_gishuun`(`Tusliin_bagiin_gishuun_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Setgegdel` ADD CONSTRAINT `Setgegdel_Tusliin_daalgavar_ID_fkey` FOREIGN KEY (`Tusliin_daalgavar_ID`) REFERENCES `Tusliin_daalgavar`(`Tusliin_daalgavar_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Setgegdel` ADD CONSTRAINT `Setgegdel_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `Setgegdel`(`Setgegdel_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Zahialga` ADD CONSTRAINT `Zahialga_Zahialga_tuluv_lavlah_ID_fkey` FOREIGN KEY (`Zahialga_tuluv_lavlah_ID`) REFERENCES `Zahialga_tuluv_lavhlah`(`Zahialga_tuluv_lavlah_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Zahialga` ADD CONSTRAINT `Zahialga_Hereglegch_ID_fkey` FOREIGN KEY (`Hereglegch_ID`) REFERENCES `Hereglegch`(`Hereglegch_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Zahialga` ADD CONSTRAINT `Zahialga_Tulbur_bagts_id_fkey` FOREIGN KEY (`Tulbur_bagts_id`) REFERENCES `Tulbur_bagts_lavlah`(`Tulbur_bagts_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Zahialga` ADD CONSTRAINT `Zahialga_Baiguullaga_ID_fkey` FOREIGN KEY (`Baiguullaga_ID`) REFERENCES `Baiguullaga`(`Baiguullaga_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tulbur` ADD CONSTRAINT `Tulbur_Tulbur_tuluv_lavlah_ID_fkey` FOREIGN KEY (`Tulbur_tuluv_lavlah_ID`) REFERENCES `Tulbur_tuluv_lavlah`(`Tulbur_tuluv_lavlah_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tulbur` ADD CONSTRAINT `Tulbur_Tulbur_turul_lavlah_ID_fkey` FOREIGN KEY (`Tulbur_turul_lavlah_ID`) REFERENCES `Tulbur_turul_lavlah`(`Tulbur_turul_lavlah_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tulbur` ADD CONSTRAINT `Tulbur_Zahialga_id_fkey` FOREIGN KEY (`Zahialga_id`) REFERENCES `Zahialga`(`Zahialga_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
