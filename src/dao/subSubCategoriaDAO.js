import { responseTypeDAO, responseTypeDAOError } from "../response/responseTypeDAO.js";

export const buscarSubSubCategorias = async (conexion, req) => {

    try {
        const sql = `select * from sub_sub_categoria ssc where ssc.id_sub_categoria in (${req.id_sub_categoria});`;
        let results = await conexion.query(sql);

        return responseTypeDAO(results)
    } catch (error) {

        console.log(error);
        throw error
    }
}

export const agregarSubSubCategoria = async (conexion, nombre_sub_sub_categoria, id_sub_categoria) => {

    try {

        const sql = {
            text: 'INSERT INTO sub_sub_categoria (nombre_sub_sub_categoria,id_sub_categoria) VALUES ($1,$2) returning id_sub_sub_categoria,nombre_sub_sub_categoria,id_sub_categoria',
            values: [nombre_sub_sub_categoria, id_sub_categoria],
        }

        let results = await conexion.query(sql)

        return responseTypeDAO(results)

    } catch (error) {

        console.log(error);
        throw error
    }
}

export default { buscarSubSubCategorias, agregarSubSubCategoria }