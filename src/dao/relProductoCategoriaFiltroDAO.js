import { responseTypeDAO } from "../response/responseTypeDAO.js"

export const AgregarRelProductoCategoriaFiltro = async (conexion, id_producto, id_rel_sub_categoria_filtro, nombre_producto_categoria_filtro) => {

    try {

        const sql = {
            text: 'INSERT INTO rel_producto_categoria_filtro (id_producto,id_rel_sub_categoria_filtro,nombre_producto_categoria_filtro) VALUES ($1,$2,$3) returning id_rel_producto_categoria_filtro,id_producto,id_rel_sub_categoria_filtro,nombre_producto_categoria_filtro',
            values: [id_producto, id_rel_sub_categoria_filtro, nombre_producto_categoria_filtro],
        }

        let results = await conexion.query(sql)

        return responseTypeDAO(results)

    } catch (error) {

        console.log(error);
        throw error
    }
}

export default { AgregarRelProductoCategoriaFiltro }