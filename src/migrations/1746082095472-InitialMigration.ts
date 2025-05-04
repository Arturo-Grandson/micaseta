import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1746082095472 implements MigrationInterface {
    name = 'InitialMigration1746082095472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Verificar y renombrar columnas solo si existen
        const tablesToCheck = [
            { table: 'booth_role', oldColumn: 'festivalType', newColumn: 'festiveType' },
            { table: 'common_expense', oldColumn: 'festivalType', newColumn: 'festiveType' },
            { table: 'consumption', oldColumn: 'festivalType', newColumn: 'festiveType' },
            { table: 'penalty', oldColumn: 'festivalType', newColumn: 'festiveType' }
        ];

        for (const { table, oldColumn, newColumn } of tablesToCheck) {
            const columnExists = await queryRunner.query(`
                SELECT 1 
                FROM information_schema.columns 
                WHERE table_name = '${table}' 
                AND column_name = '${oldColumn}'
            `);
            
            if (columnExists.length > 0) {
                await queryRunner.query(`ALTER TABLE "${table}" RENAME COLUMN "${oldColumn}" TO "${newColumn}"`);
                await queryRunner.query(`ALTER TYPE "public"."${table}_${oldColumn.toLowerCase()}_enum" RENAME TO "${table}_${newColumn.toLowerCase()}_enum"`);
            }
        }

        await queryRunner.query(`CREATE TYPE "public"."optional_expense_festivetype_enum" AS ENUM('sj', 'f')`);
        await queryRunner.query(`CREATE TABLE "optional_expense" ("id" SERIAL NOT NULL, "festiveType" "public"."optional_expense_festivetype_enum" NOT NULL, "year" integer NOT NULL, "description" character varying NOT NULL, "totalAmount" numeric, "date" TIMESTAMP NOT NULL DEFAULT now(), "boothId" integer, CONSTRAINT "PK_9015e91ef82df9122eb785ba96e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "optional_expense_participant" ("id" SERIAL NOT NULL, "guestCount" integer NOT NULL DEFAULT '1', "hasGuests" boolean NOT NULL DEFAULT false, "isCostCalculated" boolean NOT NULL DEFAULT false, "assignedAmount" numeric, "totalAmount" numeric, "expenseId" integer, "userId" integer, "boothId" integer, CONSTRAINT "PK_a75478c5c8f328845cd77b3b0c6" PRIMARY KEY ("id"))`);
        
        // Verificar si las columnas existen antes de eliminarlas
        const productPriceColumns = await queryRunner.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'product_price'
        `);
        
        if (productPriceColumns.some(col => col.column_name === 'festivalType')) {
            await queryRunner.query(`ALTER TABLE "product_price" DROP COLUMN "festivalType"`);
            await queryRunner.query(`DROP TYPE "public"."product_price_festivaltype_enum"`);
        }
        
        if (productPriceColumns.some(col => col.column_name === 'year')) {
            await queryRunner.query(`ALTER TABLE "product_price" DROP COLUMN "year"`);
        }

        await queryRunner.query(`ALTER TABLE "common_expense_participant" ADD "boothId" integer`);
        
        // Eliminar duplicados antes de crear la restricción única
        await queryRunner.query(`
            DELETE FROM product_price a USING product_price b
            WHERE a.id > b.id
            AND a."productId" = b."productId"
        `);
        
        await queryRunner.query(`ALTER TABLE "product_price" DROP CONSTRAINT "FK_a164b9a56be4eb93c942ae5e986"`);
        await queryRunner.query(`ALTER TABLE "product_price" ADD CONSTRAINT "UQ_a164b9a56be4eb93c942ae5e986" UNIQUE ("productId")`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "UQ_2cba0587a97460782d09e8404d0" UNIQUE ("name", "boothId")`);
        await queryRunner.query(`ALTER TABLE "product_price" ADD CONSTRAINT "FK_a164b9a56be4eb93c942ae5e986" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "common_expense_participant" ADD CONSTRAINT "FK_db93852b3a13144c07b418a532d" FOREIGN KEY ("boothId") REFERENCES "booths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "optional_expense" ADD CONSTRAINT "FK_114a568c49599d0783581239e39" FOREIGN KEY ("boothId") REFERENCES "booths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "optional_expense_participant" ADD CONSTRAINT "FK_e3f3671aca961c9776f939602e5" FOREIGN KEY ("expenseId") REFERENCES "optional_expense"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "optional_expense_participant" ADD CONSTRAINT "FK_863ded4d6aa779e6357b81bae0b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "optional_expense_participant" ADD CONSTRAINT "FK_6c36323a3c221b1cb22ebfb9997" FOREIGN KEY ("boothId") REFERENCES "booths"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "optional_expense_participant" DROP CONSTRAINT "FK_6c36323a3c221b1cb22ebfb9997"`);
        await queryRunner.query(`ALTER TABLE "optional_expense_participant" DROP CONSTRAINT "FK_863ded4d6aa779e6357b81bae0b"`);
        await queryRunner.query(`ALTER TABLE "optional_expense_participant" DROP CONSTRAINT "FK_e3f3671aca961c9776f939602e5"`);
        await queryRunner.query(`ALTER TABLE "optional_expense" DROP CONSTRAINT "FK_114a568c49599d0783581239e39"`);
        await queryRunner.query(`ALTER TABLE "common_expense_participant" DROP CONSTRAINT "FK_db93852b3a13144c07b418a532d"`);
        await queryRunner.query(`ALTER TABLE "product_price" DROP CONSTRAINT "FK_a164b9a56be4eb93c942ae5e986"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "UQ_2cba0587a97460782d09e8404d0"`);
        await queryRunner.query(`ALTER TABLE "product_price" DROP CONSTRAINT "UQ_a164b9a56be4eb93c942ae5e986"`);
        await queryRunner.query(`ALTER TABLE "product_price" ADD CONSTRAINT "FK_a164b9a56be4eb93c942ae5e986" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "common_expense_participant" DROP COLUMN "boothId"`);
        await queryRunner.query(`ALTER TABLE "product_price" ADD "year" integer NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."product_price_festivaltype_enum" AS ENUM('sj', 'f')`);
        await queryRunner.query(`ALTER TABLE "product_price" ADD "festivalType" "public"."product_price_festivaltype_enum" NOT NULL`);
        await queryRunner.query(`DROP TABLE "optional_expense_participant"`);
        await queryRunner.query(`DROP TABLE "optional_expense"`);
        await queryRunner.query(`DROP TYPE "public"."optional_expense_festivetype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."penalty_festivetype_enum" RENAME TO "penalty_festivaltype_enum"`);
        await queryRunner.query(`ALTER TABLE "penalty" RENAME COLUMN "festiveType" TO "festivalType"`);
        await queryRunner.query(`ALTER TYPE "public"."consumption_festivetype_enum" RENAME TO "consumption_festivaltype_enum"`);
        await queryRunner.query(`ALTER TABLE "consumption" RENAME COLUMN "festiveType" TO "festivalType"`);
        await queryRunner.query(`ALTER TYPE "public"."common_expense_festivetype_enum" RENAME TO "common_expense_festivaltype_enum"`);
        await queryRunner.query(`ALTER TABLE "common_expense" RENAME COLUMN "festiveType" TO "festivalType"`);
        await queryRunner.query(`ALTER TYPE "public"."booth_role_festivetype_enum" RENAME TO "booth_role_festivaltype_enum"`);
        await queryRunner.query(`ALTER TABLE "booth_role" RENAME COLUMN "festiveType" TO "festivalType"`);
    }
}
