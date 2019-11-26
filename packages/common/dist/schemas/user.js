"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
exports.signupInputSchema = yup.object().shape({
    userName: yup.string().min(3).max(30).required(),
    email: yup.string().email().required(),
    password: yup.string().min(3).max(150).required(),
});
//# sourceMappingURL=user.js.map