import { Router } from "express";
import { register } from "../controllers/user.js";
import { validateSchema } from '../middlewares/validator.js'; // El middleware
import { registerUserSchema } from '../schemas/user.js'; // El esquema

const router = Router();

router.post("/users", validateSchema(registerUserSchema), register);


export {router};