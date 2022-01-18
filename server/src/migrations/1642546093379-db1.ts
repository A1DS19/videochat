import { MigrationInterface, QueryRunner } from 'typeorm';

export class db11642546093379 implements MigrationInterface {
  name = 'db11642546093379';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "userName" character varying NOT NULL, "password" character varying NOT NULL, "hashedRt" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "room" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "creatorId" integer NOT NULL, "url_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "room_chat" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "roomId" integer NOT NULL, "message" character varying NOT NULL, CONSTRAINT "PK_5a51a40d9090e02813bd92fbb4c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "room" ADD CONSTRAINT "FK_86e40e0afb08286884be0e6f38b" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_chat" ADD CONSTRAINT "FK_1f3bd8d0faf405295d020d262ea" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_chat" ADD CONSTRAINT "FK_708354fab243b433749c64127a0" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "room_chat" DROP CONSTRAINT "FK_708354fab243b433749c64127a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_chat" DROP CONSTRAINT "FK_1f3bd8d0faf405295d020d262ea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "room" DROP CONSTRAINT "FK_86e40e0afb08286884be0e6f38b"`,
    );
    await queryRunner.query(`DROP TABLE "room_chat"`);
    await queryRunner.query(`DROP TABLE "room"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
