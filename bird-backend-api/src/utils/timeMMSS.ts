
const H = 3600;
const M = 60;

export default function (seconds: number) {
	const h = Math.floor(seconds / H);
	const m = Math.floor((seconds % H) / M);
	const s = Math.round(seconds % M);

	if (h) {
		return `${h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
	}

	return `${m}:${s < 10 ? '0' + s : s}`;
}
