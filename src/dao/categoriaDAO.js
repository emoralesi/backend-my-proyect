import { checkConnection } from "../db/checkconnectino.js";

export const buscarCategorias = async (correlativoVenta) =>{
    let results = null

    try {
        const sql = `SELECT * FROM CATEGORIA`;
        results = await checkConnection(sql);

        return results
    } catch (error) {
        console.log(error);
    }
}

export default {buscarCategorias}