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

export const AgrgarFiltroCategoria = async (conexion, data) => {

    try {

        const sql = {
            text: 'INSERT INTO filtro_categoria (nombre_filtro_categoria,id_tipo_filtro_categoria) VALUES ($1,$2) returning id_filtro_categoria,nombre_filtro_categoria ,id_tipo_filtro_categoria',
            values: [data.nombre_filtro_categoria, data.id_tipo_filtro_categoria],
        }

        const results = await conexion.query(sql)

        return responseTypeDAO(results)

    } catch (error) {
        throw error;
    }
}

export const buscarFiltroCategoriaBySubSubCategoria = async (conexion, id_sub_sub_categoria) => {

    console.log(id_sub_sub_categoria);
    try {

        const sql = `select * from filtro_categoria fc 
        inner join tipo_filtro_categoria tfc on (tfc.id_tipo_filtro_categoria = fc.id_tipo_filtro_categoria)
        inner join rel_sub_categoria_filtro rscf on (rscf.id_filtro_categoria = fc.id_filtro_categoria)
        inner join sub_sub_categoria ssc on (ssc.id_sub_sub_categoria = rscf.id_sub_sub_categoria)
        where rscf.id_sub_sub_categoria in (${id_sub_sub_categoria})`;

        const results = await conexion.query(sql);

        return responseTypeDAO(results)
    } catch (error) {

        console.log(error);
        throw error
    }
}

export default { buscarFiltroCategoria, AgrgarFiltroCategoria, buscarFiltroCategoriaBySubSubCategoria }