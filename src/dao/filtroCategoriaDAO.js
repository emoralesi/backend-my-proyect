import { responseTypeDAO, responseTypeDAOError } from "../response/responseTypeDAO.js";

export const buscarFiltroCategoria = async (conexion) => {

    try {
        
        const sql = `select * from filtro_categoria fc 
        inner join tipo_filtro_categoria tfc on (tfc.id_tipo_filtro_categoria = fc.id_tipo_filtro_categoria)`;
        
        const results = await conexion.query(sql);

        return responseTypeDAO(results)
    } catch (error) {

        console.log(error);
        throw error
    }
}

export const AgrgarFiltroCategoria = async (conexion,data) => {

    try {
        
        const sql = {
            text: 'INSERT INTO filtro_categoria (nombre_filtro_categoria,id_tipo_filtro_categoria) VALUES ($1,$2) returning id_filtro_categoria,nombre_filtro_categoria ,id_tipo_filtro_categoria',
            values: [data.nombre_filtro_categoria,data.id_tipo_filtro_categoria],
        }

        const results = await conexion.query(sql)

        return responseTypeDAO(results)

    } catch (error) {
        throw error;
    }
}

export default { buscarFiltroCategoria, AgrgarFiltroCategoria }