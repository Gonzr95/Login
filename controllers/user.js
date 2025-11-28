import User from "../models/user.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";

export async function register(req, res) {
    try{
        const {
            firstName,
            lastName,
            mail,
            pass,
        } = req.body;

        const hashedPass = await hashPassword(pass);
        const result = await User.create({
            firstName: firstName,
            lastName: lastName,
            mail: mail,
            pass: hashedPass
        });

        return res.status(201).json(result);
    }
    catch(error){
        if(error instanceof TypeError)
        {
            return res.status(400).json({message: "Missing some parametrs"});
        }
        else
        {
            console.log(error);
            return res.status(500).json({ message: "Internal error"});
        }

    }
};