import { responseTypeDAO } from "../response/responseTypeDAO.js";

export const buscarSubCategorias = async (conexion, req) => {

    try {
        const sql = `select * from sub_categoria sc where id_categoria in (${req.id_categoria});`;
        let results = await conexion.query(sql)

        return responseTypeDAO(results)

    } catch (error) {

        console.log(error);
        throw error
    }
}

export const agregarSubCategoria = async (conexion, nombre_sub_categoria, id_categoria) => {

    try {

        const sql = {
            text: 'INSERT INTO sub_categoria (nombre_sub_categoria,id_categoria) VALUES ($1,$2) returning id_sub_categoria,nombre_sub_categoria,id_categoria',
            values: [nombre_sub_categoria, id_categoria],
        }

        let results = await conexion.query(sql)

        return responseTypeDAO(results)

    } catch (error) {

        console.log(error);
        throw error
    }
}

export default { buscarSubCategorias, agregarSubCategoria }