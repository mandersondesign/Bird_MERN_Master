/* eslint-disable */

const PasswordValidator = require('password-validator');
const passwordSchema = new PasswordValidator();

export default passwordSchema
	.is().min(6)           // Minimum length 8
	.is().max(100)         // Maximum length 100
	// .has().uppercase()     // Must have uppercase letters
	// .has().lowercase()     // Must have lowercase letters
	// .has().digits()        // Must have digits
	// .has().symbols()       // Must have symbols
	.has().not().spaces(); // Should not have spaces
