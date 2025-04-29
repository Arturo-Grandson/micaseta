import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1745936395398 implements MigrationInterface {
    name = 'InitialMigration1745936395398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booth_member" DROP CONSTRAINT "UQ_32ba6139edcf4eabbcd8a897c0f"`);
        await queryRunner.query(`CREATE TABLE "optional_expense_participant" ("id" SERIAL NOT NULL, "guestCount" integer NOT NULL DEFAULT '0', "hasGuests" boolean NOT NULL DEFAULT false, "isCostCalculated" boolean NOT NULL DEFAULT false, "assignedAmount" numeric, "totalAmount" numeric, "expenseId" integer, "userId" integer, "boothId" integer, CONSTRAINT "PK_a75478c5c8f328845cd77b3b0c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."optional_expense_festivetype_enum" AS ENUM('sj', 'f')`);
        await queryRunner.query(`CREATE TABLE "optional_expense" ("id" SERIAL NOT NULL, "festiveType" "public"."optional_expense_festivetype_enum" NOT NULL, "year" integer NOT NULL, "description" character varying NOT NULL, "totalAmount" numeric, "date" TIMESTAMP NOT NULL DEFAULT now(), "boothId" integer, CONSTRAINT "PK_9015e91ef82df9122eb785ba96e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "booth_member" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "booth_member" DROP COLUMN "festivalType"`);
        await queryRunner.query(`DROP TYPE "public"."booth_member_festivaltype_enum"`);
        await queryRunner.query(`ALTER TABLE "common_expense_participant" ADD "boothId" integer`);
        await queryRunner.query(`ALTER TABLE "product_price" DROP CONSTRAINT "FK_a164b9a56be4eb93c942ae5e986"`);
        await queryRunner.query(`ALTER TABLE "product_price" ADD CONSTRAINT "UQ_a164b9a56be4eb93c942ae5e986" UNIQUE ("productId")`);
        await queryRunner.query(`ALTER TABLE "booth_member" ADD CONSTRAINT "UQ_f5fc6f2555e41263f31d77d402b" UNIQUE ("userId", "boothId")`);
        await queryRunner.query(`ALTER TABLE "product_price" ADD CONSTRAINT "FK_a164b9a56be4eb93c942ae5e986" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "common_expense_participant" ADD CONSTRAINT "FK_db93852b3a13144c07b418a532d" FOREIGN KEY ("boothId") REFERENCES "booths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "optional_expense_participant" ADD CONSTRAINT "FK_e3f3671aca961c9776f939602e5" FOREIGN KEY ("expenseId") REFERENCES "optional_expense"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "optional_expense_participant" ADD CONSTRAINT "FK_863ded4d6aa779e6357b81bae0b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "optional_expense_participant" ADD CONSTRAINT "FK_6c36323a3c221b1cb22ebfb9997" FOREIGN KEY ("boothId") REFERENCES "booths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "optional_expense" ADD CONSTRAINT "FK_114a568c49599d0783581239e39" FOREIGN KEY ("boothId") REFERENCES "booths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "optional_expense" DROP CONSTRAINT "FK_114a568c49599d0783581239e39"`);
        await queryRunner.query(`ALTER TABLE "optional_expense_participant" DROP CONSTRAINT "FK_6c36323a3c221b1cb22ebfb9997"`);
        await queryRunner.query(`ALTER TABLE "optional_expense_participant" DROP CONSTRAINT "FK_863ded4d6aa779e6357b81bae0b"`);
        await queryRunner.query(`ALTER TABLE "optional_expense_participant" DROP CONSTRAINT "FK_e3f3671aca961c9776f939602e5"`);
        await queryRunner.query(`ALTER TABLE "common_expense_participant" DROP CONSTRAINT "FK_db93852b3a13144c07b418a532d"`);
        await queryRunner.query(`ALTER TABLE "product_price" DROP CONSTRAINT "FK_a164b9a56be4eb93c942ae5e986"`);
        await queryRunner.query(`ALTER TABLE "booth_member" DROP CONSTRAINT "UQ_f5fc6f2555e41263f31d77d402b"`);
        await queryRunner.query(`ALTER TABLE "product_price" DROP CONSTRAINT "UQ_a164b9a56be4eb93c942ae5e986"`);
        await queryRunner.query(`ALTER TABLE "product_price" ADD CONSTRAINT "FK_a164b9a56be4eb93c942ae5e986" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "common_expense_participant" DROP COLUMN "boothId"`);
        await queryRunner.query(`CREATE TYPE "public"."booth_member_festivaltype_enum" AS ENUM('sj', 'f')`);
        await queryRunner.query(`ALTER TABLE "booth_member" ADD "festivalType" "public"."booth_member_festivaltype_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booth_member" ADD "year" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "optional_expense"`);
        await queryRunner.query(`DROP TYPE "public"."optional_expense_festivetype_enum"`);
        await queryRunner.query(`DROP TABLE "optional_expense_participant"`);
        await queryRunner.query(`ALTER TABLE "booth_member" ADD CONSTRAINT "UQ_32ba6139edcf4eabbcd8a897c0f" UNIQUE ("boothId", "festivalType", "userId", "year")`);
    }

}
