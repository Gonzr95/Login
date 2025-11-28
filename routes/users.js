import { Router } from "express";
import { 
  register
} from "../controllers/user.js";

const router = Router();

router.post("/users", register);


export {router};