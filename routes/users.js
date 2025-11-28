import { Router } from "express";
import { 
  registrarUsuario, 
  validarLogin, 
  irADashboard, 
  irALogin 
} from "../controllers/administrador.js";

const router = Router();

router.post("/register", registrarUsuario);
router.post("/", validarLogin);
router.get("/dashboard", irADashboard);
router.get("/", irALogin);

export default router;