
export default function(phone: string) {
	return phone.replace(/[^+\d]+/g, '').replace('+','');
}
