import {MigrationInterface, QueryRunner} from "typeorm";

export class Order1612171880663 implements MigrationInterface {
    name = 'Order1612171880663'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "subscription"."order" ("order_id" SERIAL NOT NULL, "user_id" integer NOT NULL, "program_id" integer NOT NULL, "amount" integer NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7af1a17b1f357016f5dd669767e" PRIMARY KEY ("order_id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."order" ADD CONSTRAINT "FK_fc5e61c80eb6af5a96121802602" FOREIGN KEY ("user_id") REFERENCES "user"."user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."order" ADD CONSTRAINT "FK_0c9a32d3d37e6578f483bdb6c7f" FOREIGN KEY ("program_id") REFERENCES "plan"."program"("program_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "subscription"."order" DROP CONSTRAINT "FK_0c9a32d3d37e6578f483bdb6c7f"`, undefined);
        await queryRunner.query(`ALTER TABLE "subscription"."order" DROP CONSTRAINT "FK_fc5e61c80eb6af5a96121802602"`, undefined);
        await queryRunner.query(`DROP TABLE "subscription"."order"`, undefined);
    }

}
