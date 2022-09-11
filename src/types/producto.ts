export interface producto {
    _id: { $oid: string },
    productoID: string,
    nombre: string,
    precio: number,
    foto: string
}