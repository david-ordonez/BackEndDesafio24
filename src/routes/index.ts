import { Router } from "../../deps";
import {
    getproductos,
    getproducto,
    addproducto,
    updateproducto,
    deleteproducto
} from "../controllers/productos";

export const router = new Router()
    .get("/api/productos", getproductos)
    .get("/api/productos/:id", getproducto)
    .post("/api/productos", addproducto)
    .put("/api/productos/:id", updateproducto)
    .delete("/api/productos/:id", deleteproducto)