import {EntityRepository, Repository} from 'typeorm';
import Program from '../../models/plan/program';

@EntityRepository(Program)
export default class ProgramRepository extends Repository<Program> {

	public async findByAlias(alias): Promise<Program> {
		if (!alias) {
			return null;
		}

		const sql = `SELECT program_id
					FROM "plan"."program"
					WHERE lower(alias) = $1`;

		const data = await this.query(sql, [alias.toLowerCase().trim()]);

		if (!data.length) {
			return null;
		}

		return this.findOne(data[0].program_id, {
			relations: ['planTemplate'],
		});
	}

	public async findByPlanTemplateId(planTemplateId): Promise<Program> {
		if (!planTemplateId) {
			return null;
		}

		const sql = `SELECT program_id
					FROM "plan"."program"
					WHERE plan_template_id = $1`;

		const data = await this.query(sql, [planTemplateId]);

		if (!data.length) {
			return null;
		}

		return this.findOne(data[0].program_id, {
			relations: ['planTemplate'],
		});
	}

	public async findByAddon(addon): Promise<Program> {
		if (!addon) {
			return null;
		}

		const sql = `SELECT program_id
					FROM "plan"."program"
					WHERE addon = $1`;

		const data = await this.query(sql, [addon]);

		if (!data.length) {
			return null;
		}

		return this.findOne(data[0].program_id, {
		});
	}

}
