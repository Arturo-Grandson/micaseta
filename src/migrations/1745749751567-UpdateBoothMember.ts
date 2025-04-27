import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBoothMember1745749751567 implements MigrationInterface {
    name = 'UpdateBoothMember1745749751567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booth_member" DROP CONSTRAINT "UQ_32ba6139edcf4eabbcd8a897c0f"`);
        await queryRunner.query(`ALTER TABLE "booth_member" DROP COLUMN "festivalType"`);
        await queryRunner.query(`DROP TYPE "public"."booth_member_festivaltype_enum"`);
        await queryRunner.query(`ALTER TABLE "booth_member" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "booth_member" ADD CONSTRAINT "UQ_f5fc6f2555e41263f31d77d402b" UNIQUE ("userId", "boothId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booth_member" DROP CONSTRAINT "UQ_f5fc6f2555e41263f31d77d402b"`);
        await queryRunner.query(`ALTER TABLE "booth_member" ADD "year" integer NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."booth_member_festivaltype_enum" AS ENUM('sj', 'f')`);
        await queryRunner.query(`ALTER TABLE "booth_member" ADD "festivalType" "public"."booth_member_festivaltype_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booth_member" ADD CONSTRAINT "UQ_32ba6139edcf4eabbcd8a897c0f" UNIQUE ("boothId", "festivalType", "userId", "year")`);
    }

}
