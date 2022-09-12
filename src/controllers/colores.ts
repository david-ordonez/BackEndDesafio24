import { Context, helpers } from "../../deps.ts";
import { color } from '../types/color.ts';

const colores : color[] = [];

export const getcolores = async ({ response }: { response: any }) => {
    try {
        return colores;
    } catch (error) {
        response.status = 500;
        response.body = {
            success: false,
            msg: error.message
        }
    }
}

export const getcolor = async ({ params, response }: { params: { id: string }, response: any }) => {
    try {
        const color = colores.find(x => x.colorId == params.id);
        return color;
    } catch (error) {
        response.status = 500;
        response.body = {
            success: false,
            msg: error.message
        }
    }
}

export const addcolor = async ({ request, response }: { request: any, response: any }
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
            const color : color = await body.value;
            color.colorId = globalThis.crypto.randomUUID();
            colores.push(color);
            response.status = 201;
            response.body = {
                success: true,
                msg: color
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

