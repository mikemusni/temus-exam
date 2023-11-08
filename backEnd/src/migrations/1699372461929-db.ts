import { MigrationInterface, QueryRunner } from "typeorm";

export class Db1699372461929 implements MigrationInterface {
    name = 'Db1699372461929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shorty" ("shortyId" uuid NOT NULL DEFAULT uuid_generate_v4(), "original_url" character varying NOT NULL, "shortened_url" character varying NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '"2023-11-07T15:54:23.405Z"', CONSTRAINT "UQ_shortened_url" UNIQUE ("shortened_url"), CONSTRAINT "PK_f14a48447d23b9af73fd37ba802" PRIMARY KEY ("shortyId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shorty"`);
    }

}
