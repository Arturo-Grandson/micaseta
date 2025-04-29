import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeProductPriceToOneToOne1745917058274 implements MigrationInterface {
    name = 'ChangeProductPriceToOneToOne1745917058274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_price" DROP CONSTRAINT "FK_a164b9a56be4eb93c942ae5e986"`);
        await queryRunner.query(`ALTER TABLE "product_price" ADD CONSTRAINT "UQ_a164b9a56be4eb93c942ae5e986" UNIQUE ("productId")`);
        await queryRunner.query(`ALTER TABLE "product_price" ADD CONSTRAINT "FK_a164b9a56be4eb93c942ae5e986" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_price" DROP CONSTRAINT "FK_a164b9a56be4eb93c942ae5e986"`);
        await queryRunner.query(`ALTER TABLE "product_price" DROP CONSTRAINT "UQ_a164b9a56be4eb93c942ae5e986"`);
        await queryRunner.query(`ALTER TABLE "product_price" ADD CONSTRAINT "FK_a164b9a56be4eb93c942ae5e986" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
