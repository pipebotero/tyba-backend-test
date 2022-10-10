import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBlacklist1665358788110 implements MigrationInterface {
  name = 'CreateBlacklist1665358788110';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "blacklist"
      (
        "id" SERIAL NOT NULL,
        "token" character varying NOT NULL,
        CONSTRAINT "PK_04dc42a96bf0914cda31b579702" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "blacklist"`);
  }
}
