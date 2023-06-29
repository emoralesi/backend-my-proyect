import { checkConnection } from "../db/checkconnectino.js";

export const buscarProductos = async (correlativoVenta) =>{
    let results = null

    try {
        const sql = `SELECT * FROM PRODUCTO`;
        results = await checkConnection(sql);

        return results
    } catch (error) {
        console.log(error);
    }
}

export default {buscarProductos}