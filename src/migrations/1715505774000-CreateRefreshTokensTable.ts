import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRefreshTokensTable1715505774000
  implements MigrationInterface
{
  name = 'CreateRefreshTokensTable1715505774000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "refresh_tokens" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "token" text NOT NULL,
                "expiresAt" TIMESTAMP NOT NULL,
                "isRevoked" boolean NOT NULL DEFAULT false,
                "userId" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_refresh_tokens_token" UNIQUE ("token"),
                CONSTRAINT "PK_refresh_tokens" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            ALTER TABLE "refresh_tokens" 
            ADD CONSTRAINT "FK_refresh_tokens_user"
            FOREIGN KEY ("userId") 
            REFERENCES "users"("id") 
            ON DELETE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_refresh_tokens_user"`,
    );
    await queryRunner.query(`DROP TABLE "refresh_tokens"`);
  }
}
