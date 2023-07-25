import { responseTypeDAO } from "../response/responseTypeDAO.js";

export const buscarTipoFiltroCategoria = async (conexion) => {

    try {
        const sql = `SELECT * FROM tipo_filtro_categoria`;

        let results = await conexion.query(sql);

        console.log("mi result DAO",results);

        return responseTypeDAO(results)

    } catch (error) {

        console.log(error);
        throw error
    }
}
export default {buscarTipoFiltroCategoria}