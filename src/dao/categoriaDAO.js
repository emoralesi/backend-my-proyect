import { responseTypeDAO } from "../response/responseTypeDAO.js";

export const buscarCategorias = async (conexion) => {

    try {
        const sql = `SELECT * FROM CATEGORIA`;

        let results = await conexion.query(sql);

        return responseTypeDAO(results)

    } catch (error) {

        console.log(error);
        throw error
    }
}

export const agregarCategoria = async (conexion, nombre) => {

    try {

        const sql = {
            text: 'INSERT INTO categoria (nombre) VALUES ($1) returning id_categoria,nombre',
            values: [nombre],
        }

        let results = await conexion.query(sql)

        console.log("mi resultado de categoria",results);
        return responseTypeDAO(results)

    } catch (error) {

        console.log(error);
        throw error
    }
}

export default { buscarCategorias, agregarCategoria }