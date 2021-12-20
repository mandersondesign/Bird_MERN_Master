import Program from '../models/plan/program';

export default class ProgramTransformer {
	public static transform(program: Program) {
		const price = Number(program.price);
		// 2.9% + 30 cents
		const fee = (price + 0.3) / (1 - 0.029) - price; // eslint-disable-line
		return {
			program_id: program.programId, // eslint-disable-line
			name: program.name,
			description: program.description,
			price: price.toFixed(2),
			fee: fee.toFixed(2),
			fee_description: '2.9% + 30¢', // eslint-disable-line
			total: (price + fee).toFixed(2),
		};
	}
}
