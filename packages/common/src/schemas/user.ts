import * as yup from 'yup';

export const signupInputSchema = yup.object().shape({
    userName: yup.string().min(3).max(30).required(),
    email: yup.string().email().required(),
    password: yup.string().min(3).max(150).required(),
});