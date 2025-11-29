import { Router } from "express";
import { register, login, logout} from "../controllers/user.js";
import { validateSchema } from '../middlewares/validator.js'; // El middleware
import { registerUserSchema, loginUserSchema } from '../schemas/user.js'; // El esquema
import { authenticate } from "../middlewares/auth.js";

const router = Router();

router.post("/users", validateSchema(registerUserSchema), register);

router.post('/login', validateSchema(loginUserSchema), login);

router.post('/logout', authenticate, logout);

// Ruta PROTEGIDA: Perfil
// Intentar entrar aquí sin token dará error 401
router.get('/me', authenticate, (req, res) => {
    // req.user viene del middleware authenticate
    res.json({ 
        message: "¡Estás en una ruta protegida!", 
        user: req.user 
    });
});

export {router};