import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstUsers1582192256408 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const hash1234 = '$2b$10$YyEsG.jpOH4oeWkCgUn.KeZhQUW88E8ixe0JRHi1m3AXv1tjn1ItO';

        await queryRunner.query(`
            INSERT INTO "user"."user"(name, last_name, email, password, user_type_id, is_email_confirmed) VALUES
            ('CIDT', 'Admin', 'bird@consideritdone.tech', '${hash1234}', 1, true),
            ('Ann', 'Admin', 'ann+admin@bird.coach', '${hash1234}', 1, true),
            ('Ann', 'Coach', 'ann+coach@bird.coach', '${hash1234}', 2, true),
            ('Katie', 'O''Connor', 'katie@bird.coach', '${hash1234}', 2, true);
        `);
        
        const annCoach = await queryRunner.query(`SELECT * FROM "user"."user" WHERE email='ann+coach@bird.coach'`);
        const katieCoach = await queryRunner.query(`SELECT * FROM "user"."user" WHERE email='katie@bird.coach'`);

        const about = (name) =>`${name} is passionate about helping other runners achieve their goals. From beginners to seasoned veterans looking for a new PR, ${name} will help prepare you mentally and physically for your race and have fun doing it.`;
        const specialties = ["Balancing workouts with life", "Coming back from an injury or hiatus", "Marathon, Half Marathon, Ultra Training"];
        const images = ['https://127223.selcdn.ru/Storage/coach.png']; // TODO: update images

        await queryRunner.query(`
            INSERT INTO "user"."coach_info"(user_id, about, specialties, images) VALUES
            (${annCoach[0].user_id}, '${about(annCoach[0].name)}', '{${specialties}}', '{${images}}'),
            (${katieCoach[0].user_id}, '${about(katieCoach[0].name)}', '{${specialties}}', '{${images}}');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {

    }

}
