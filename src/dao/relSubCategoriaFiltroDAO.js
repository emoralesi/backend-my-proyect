import { responseTypeDAO } from "../response/responseTypeDAO.js"

export const AgregarRelSubCategoriaFiltro = async (conexion,id_filtro_categoria,id_sub_sub_categoria) => {

    try {
        
        const sql = {
            text: 'INSERT INTO rel_sub_categoria_filtro (id_filtro_categoria,id_sub_sub_categoria) VALUES ($1,$2) returning id_rel_sub_categoria_filtro,id_filtro_categoria ,id_sub_sub_categoria',
            values: [id_filtro_categoria,id_sub_sub_categoria],
        }

        let results = await conexion.query(sql)

        return responseTypeDAO(results)

    } catch (error) {

        console.log(error);
        throw error
    }
}

export default { AgregarRelSubCategoriaFiltro }