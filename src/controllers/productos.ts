import { Context, helpers } from "../../deps.ts";
import type { producto } from "../types/producto.ts";
import { MongoClient } from "../../deps.ts";

const URI = "mongodb://127.0.0.1:27017";

const client = new MongoClient();

try {
    await client.connect(URI);
    console.log("Base de datos conectada");
} catch (error) {
    console.log(error);
}

const db = client.database("ecommerce");
const productos = db.collection<producto>("productos");

export const getproductos = async ({ response }: { response: any }) => {
    try {
        const allproductos = await productos.find({}, { projection: { _id: 0 } }).toArray();
        if (allproductos) {
            response.status = 200;
            response.body = {
                success: true,
                data: allproductos
            };
        } else {
            response.status = 500;
            response.body = {
                success: false,
                msg: 'Internal server Error'
            }
        }
    } catch (error) {
        response.status = 500;
        response.body = {
            success: false,
            msg: error.message
        }
    }
}

export const getproducto = async ({ params, response }: { params: { id: string }, response: any }) => {
    try {
        const producto = await productos.findOne({ productoID: params.id }, { projection: { _id: 0 } });
        if (producto) {
            response.status = 200;
            response.body = {
                success: true,
                data: producto
            };
        } else {
            response.status = 404;
            response.body = {
                success: false,
                msg: 'producto not found'
            }
        }
    } catch (error) {
        response.status = 500;
        response.body = {
            success: false,
            msg: error.message
        }
    }
}

export const addproducto = async (
        { request, response }: { request: any, response: any }
    ) => {
    try {
        if(!request.hasBody) {
            response.status = 400;
            response.body = {
                success: false,
                msg: "No data"
            }; 
        } else {
            const body = await request.body();
            const producto = await body.value;
            producto.productoID = globalThis.crypto.randomUUID();
            await productos.insertOne(producto);
            response.status = 201;
            response.body = {
                success: true,
                msg: producto
            }; 
        }
    } catch (error) {
        response.status = 500;
        response.body = {
            success: false,
            msg: error.message
        }
    }
}

export const updateproducto = async (
        { params, request, response }: { params: { id: string }, 
        request: any, response: any }
    ) => {
    try {
        const body = await request.body();
        const inputproducto = await body.value;
        await productos.updateOne(
            { productoID: params.id },
            { $set: {producto: inputproducto.producto, author: inputproducto.author} }
        );
        response.status = 200;
        response.body = {
            success: true
        }
    } catch (error) {
        response.status = 500;
        response.body = {
            success: false,
            msg: error.message
        }
    }
}

export const deleteproducto = async (
    { params, response }: { params: { id: string }, 
    response: any }
) => {
try {
    await productos.deleteOne(
        { productoID: params.id }
    );
    response.status = 200;
    response.body = {
        success: true
    }
} catch (error) {
    response.status = 500;
    response.body = {
        success: false,
        msg: error.message
    }
}
}
