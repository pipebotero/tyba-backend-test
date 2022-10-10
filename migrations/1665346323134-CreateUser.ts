import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1665346323134 implements MigrationInterface {
    name = 'CreateUser1665346323134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nickName" character varying(20) NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying(320) NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "isValidEmail" boolean NOT NULL DEFAULT false, "isValidPhone" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
