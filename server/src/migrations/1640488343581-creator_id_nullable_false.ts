import { MigrationInterface, QueryRunner } from 'typeorm';

export class creatorIdNullableFalse1640488343581 implements MigrationInterface {
  name = 'creatorIdNullableFalse1640488343581';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "hashedRt" varchar, "created_at" varchar NOT NULL DEFAULT (1640488345422), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user"("id", "email", "password", "hashedRt", "created_at") SELECT "id", "email", "password", "hashedRt", "created_at" FROM "user"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_room" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(50) NOT NULL, "creatorId" integer NOT NULL, "created_at" varchar NOT NULL DEFAULT (1640488345423), CONSTRAINT "UQ_535c742a3606d2e3122f441b26c" UNIQUE ("name"), CONSTRAINT "FK_86e40e0afb08286884be0e6f38b" FOREIGN KEY ("creatorId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_room"("id", "name", "creatorId", "created_at") SELECT "id", "name", "creatorId", "created_at" FROM "room"`,
    );
    await queryRunner.query(`DROP TABLE "room"`);
    await queryRunner.query(`ALTER TABLE "temporary_room" RENAME TO "room"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "room" RENAME TO "temporary_room"`);
    await queryRunner.query(
      `CREATE TABLE "room" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(50) NOT NULL, "creatorId" integer NOT NULL, "created_at" varchar NOT NULL DEFAULT (1640487716254), CONSTRAINT "UQ_535c742a3606d2e3122f441b26c" UNIQUE ("name"), CONSTRAINT "FK_86e40e0afb08286884be0e6f38b" FOREIGN KEY ("creatorId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "room"("id", "name", "creatorId", "created_at") SELECT "id", "name", "creatorId", "created_at" FROM "temporary_room"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_room"`);
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "hashedRt" varchar, "created_at" varchar NOT NULL DEFAULT (1640487716255), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "email", "password", "hashedRt", "created_at") SELECT "id", "email", "password", "hashedRt", "created_at" FROM "temporary_user"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`);
  }
}
