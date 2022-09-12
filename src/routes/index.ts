import { Router } from "../../deps.ts";
import {
    getcolores,
    getcolor,
    addcolor
} from "../controllers/colores.ts";

export const router = new Router()
    .get("/api/colores", getcolores)
    .get("/api/colores/:id", getcolor)
    .post("/api/colores", addcolor)