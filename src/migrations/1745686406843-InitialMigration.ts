import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1745686406843 implements MigrationInterface {
    name = 'InitialMigration1745686406843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."product_price_festivaltype_enum" AS ENUM('sj', 'f')`);
        await queryRunner.query(`CREATE TABLE "product_price" ("id" SERIAL NOT NULL, "festivalType" "public"."product_price_festivaltype_enum" NOT NULL, "year" integer NOT NULL, "price" numeric NOT NULL, "productId" integer, CONSTRAINT "PK_039c4320ccd5ede07440f499268" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."product_type_enum" AS ENUM('drink', 'food')`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" "public"."product_type_enum" NOT NULL, "boothId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."booth_member_festivaltype_enum" AS ENUM('sj', 'f')`);
        await queryRunner.query(`CREATE TABLE "booth_member" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "festivalType" "public"."booth_member_festivaltype_enum" NOT NULL, "year" integer NOT NULL, "userId" integer, "boothId" integer, CONSTRAINT "UQ_ab5779d555d7f2204c00e2adc2c" UNIQUE ("uuid"), CONSTRAINT "UQ_32ba6139edcf4eabbcd8a897c0f" UNIQUE ("userId", "boothId", "festivalType", "year"), CONSTRAINT "PK_9929b4def7200dec3ec08cfe8ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."booth_role_festivaltype_enum" AS ENUM('sj', 'f')`);
        await queryRunner.query(`CREATE TYPE "public"."booth_role_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "booth_role" ("id" SERIAL NOT NULL, "festivalType" "public"."booth_role_festivaltype_enum" NOT NULL, "year" integer NOT NULL, "role" "public"."booth_role_role_enum" NOT NULL, "userId" integer, "boothId" integer, CONSTRAINT "PK_be0a6a21c800fad0565dca39d21" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "common_expense_participant" ("id" SERIAL NOT NULL, "assignedAmount" numeric, "expenseId" integer, "userId" integer, CONSTRAINT "PK_32265133cb73d21a8372770d50d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."penalty_festivaltype_enum" AS ENUM('sj', 'f')`);
        await queryRunner.query(`CREATE TABLE "penalty" ("id" SERIAL NOT NULL, "festivalType" "public"."penalty_festivaltype_enum" NOT NULL, "year" integer NOT NULL, "amount" numeric NOT NULL, "reason" character varying NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "boothId" integer, CONSTRAINT "PK_d92f1735fa0b36cba9ff8556a16" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."consumption_festivaltype_enum" AS ENUM('sj', 'f')`);
        await queryRunner.query(`CREATE TABLE "consumption" ("id" SERIAL NOT NULL, "festivalType" "public"."consumption_festivaltype_enum" NOT NULL, "year" integer NOT NULL, "quantity" integer NOT NULL, "date" TIMESTAMP NOT NULL, "userId" integer, "productId" integer, "boothId" integer, CONSTRAINT "PK_90c8f17309014e5d0f244767367" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "booths" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "UQ_2da9f66c8cccc8b5fd369aef548" UNIQUE ("uuid"), CONSTRAINT "PK_13c9749e8a08d40cc3257ef7360" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."common_expense_festivaltype_enum" AS ENUM('sj', 'f')`);
        await queryRunner.query(`CREATE TABLE "common_expense" ("id" SERIAL NOT NULL, "festivalType" "public"."common_expense_festivaltype_enum" NOT NULL, "year" integer NOT NULL, "description" character varying NOT NULL, "totalAmount" numeric NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "boothId" integer, CONSTRAINT "PK_ca04636a2212952b0b077602982" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_price" ADD CONSTRAINT "FK_a164b9a56be4eb93c942ae5e986" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_df84bd630fcc424dc26595f8784" FOREIGN KEY ("boothId") REFERENCES "booths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booth_member" ADD CONSTRAINT "FK_9674b6d620c47ecebaa7d936d31" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booth_member" ADD CONSTRAINT "FK_4eb2bde0c9c27fa063b4efd7415" FOREIGN KEY ("boothId") REFERENCES "booths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booth_role" ADD CONSTRAINT "FK_16d621c2d821f9724b3734aea5c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booth_role" ADD CONSTRAINT "FK_f3a0df99dcb3ea019946494fd32" FOREIGN KEY ("boothId") REFERENCES "booths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "common_expense_participant" ADD CONSTRAINT "FK_08b1bdd639d93be043d30900eb3" FOREIGN KEY ("expenseId") REFERENCES "common_expense"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "common_expense_participant" ADD CONSTRAINT "FK_8c56d636331d3172d6646e8bdd1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "penalty" ADD CONSTRAINT "FK_01be8af94044eed4d9667a6a386" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "penalty" ADD CONSTRAINT "FK_d285380d66492280071f90789b1" FOREIGN KEY ("boothId") REFERENCES "booths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumption" ADD CONSTRAINT "FK_ef2ab192a014d74678b3d390523" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumption" ADD CONSTRAINT "FK_461bbf4235654cac96842e8f5f7" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumption" ADD CONSTRAINT "FK_a0bf3d2bc54618483848af2d32f" FOREIGN KEY ("boothId") REFERENCES "booths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "common_expense" ADD CONSTRAINT "FK_410027d1fd5063749dbe4d50f0a" FOREIGN KEY ("boothId") REFERENCES "booths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "common_expense" DROP CONSTRAINT "FK_410027d1fd5063749dbe4d50f0a"`);
        await queryRunner.query(`ALTER TABLE "consumption" DROP CONSTRAINT "FK_a0bf3d2bc54618483848af2d32f"`);
        await queryRunner.query(`ALTER TABLE "consumption" DROP CONSTRAINT "FK_461bbf4235654cac96842e8f5f7"`);
        await queryRunner.query(`ALTER TABLE "consumption" DROP CONSTRAINT "FK_ef2ab192a014d74678b3d390523"`);
        await queryRunner.query(`ALTER TABLE "penalty" DROP CONSTRAINT "FK_d285380d66492280071f90789b1"`);
        await queryRunner.query(`ALTER TABLE "penalty" DROP CONSTRAINT "FK_01be8af94044eed4d9667a6a386"`);
        await queryRunner.query(`ALTER TABLE "common_expense_participant" DROP CONSTRAINT "FK_8c56d636331d3172d6646e8bdd1"`);
        await queryRunner.query(`ALTER TABLE "common_expense_participant" DROP CONSTRAINT "FK_08b1bdd639d93be043d30900eb3"`);
        await queryRunner.query(`ALTER TABLE "booth_role" DROP CONSTRAINT "FK_f3a0df99dcb3ea019946494fd32"`);
        await queryRunner.query(`ALTER TABLE "booth_role" DROP CONSTRAINT "FK_16d621c2d821f9724b3734aea5c"`);
        await queryRunner.query(`ALTER TABLE "booth_member" DROP CONSTRAINT "FK_4eb2bde0c9c27fa063b4efd7415"`);
        await queryRunner.query(`ALTER TABLE "booth_member" DROP CONSTRAINT "FK_9674b6d620c47ecebaa7d936d31"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_df84bd630fcc424dc26595f8784"`);
        await queryRunner.query(`ALTER TABLE "product_price" DROP CONSTRAINT "FK_a164b9a56be4eb93c942ae5e986"`);
        await queryRunner.query(`DROP TABLE "common_expense"`);
        await queryRunner.query(`DROP TYPE "public"."common_expense_festivaltype_enum"`);
        await queryRunner.query(`DROP TABLE "booths"`);
        await queryRunner.query(`DROP TABLE "consumption"`);
        await queryRunner.query(`DROP TYPE "public"."consumption_festivaltype_enum"`);
        await queryRunner.query(`DROP TABLE "penalty"`);
        await queryRunner.query(`DROP TYPE "public"."penalty_festivaltype_enum"`);
        await queryRunner.query(`DROP TABLE "common_expense_participant"`);
        await queryRunner.query(`DROP TABLE "booth_role"`);
        await queryRunner.query(`DROP TYPE "public"."booth_role_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."booth_role_festivaltype_enum"`);
        await queryRunner.query(`DROP TABLE "booth_member"`);
        await queryRunner.query(`DROP TYPE "public"."booth_member_festivaltype_enum"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TYPE "public"."product_type_enum"`);
        await queryRunner.query(`DROP TABLE "product_price"`);
        await queryRunner.query(`DROP TYPE "public"."product_price_festivaltype_enum"`);
    }

}
