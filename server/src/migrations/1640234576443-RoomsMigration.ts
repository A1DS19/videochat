import { MigrationInterface, QueryRunner } from 'typeorm';

export class RoomsMigration1640234576443 implements MigrationInterface {
  name = 'RoomsMigration1640234576443';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rooms" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(50) NOT NULL, "creator_id" integer NOT NULL, "participant_id" integer NOT NULL, "created_at" varchar NOT NULL DEFAULT (1640234578564))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "rooms"`);
  }
}
