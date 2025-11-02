import userModel,{type IUser} from "../models/userModel.ts";
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';


interface RegisterParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
} 
export const register = async ({firstName, lastName, email, password,}: RegisterParams) =>{
    const findUser = await userModel.findOne({ email });

    if (findUser) {
        return {data: 'User already exists', statusCode: 400 };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newuser = new userModel({ firstName, lastName, email, password: hashedPassword });
    await newuser.save();

    return {data: generateJWT({firstName, lastName, email}), statusCode: 200 }; 
}

interface LoginParams {
    email: string;
    password: string;
}

export const login = async ({email, password}: LoginParams) => {
    const finduser = await userModel.findOne({ email })

    if (!finduser) {
        return { data: 'incorrect email or password', statusCode: 400 };
    }

    const passwordMatch = await bcrypt.compare(password, finduser.password);
    if (passwordMatch) {
        return { data: generateJWT ({email, firstName: finduser.firstName, lastName: finduser.lastName }), statusCode: 200 };
    }

    return { data: 'incorrect email or password', statusCode: 400 };
}

const generateJWT = (data: any) => {
    return JWT.sign(data, 'rWGXh1oRyUQtRnyDJKTi7qeHJ6CL5ycl') 
}