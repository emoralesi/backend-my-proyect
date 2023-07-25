import { agregarCategoria } from "../dao/categoriaDAO.js";
import { buscarFiltroCategoria, AgrgarFiltroCategoria } from "../dao/filtroCategoriaDAO.js";
import { AgregarRelSubCategoriaFiltro } from "../dao/relSubCategoriaFiltroDAO.js";
import { agregarSubCategoria } from "../dao/subCategoriaDAO.js";
import { agregarSubSubCategoria } from "../dao/subSubCategoriaDAO.js";
import { conectar, desconectar, getClient } from '../db/ConnexionBD.js';
import { responseTypeService, responseTypeServiceError } from "../response/responseTypeService.js";

export const buscarFiltroCategoriaService = async () => {

    const conexion = await getClient(); // Se obtiene una nueva instancia del cliente

    try {

        await conectar(conexion);

        const resultado = await buscarFiltroCategoria(conexion);

        return responseTypeService(resultado)

    } catch (error) {

        return responseTypeServiceError(error)

    } finally {

        await desconectar(conexion);
    }
}

export const AregarCategoriaAndFiltroService = async (body) => {

    const conexion = await getClient(); // Se obtiene una nueva instancia del cliente

    var idCategoria;
    var idSubCategoria;
    var idSubSubCategoria;

    var idFiltroCategoria;

    try {

        await conectar(conexion);

        await conexion.query('BEGIN'); // Inicia la transacción

        if (body.isNewC) {
            const result = await agregarCategoria(conexion, body.nombreCategoria);
            idCategoria = result.rows[0].id_categoria

            const result2 = await agregarSubCategoria(conexion, body.nombreSubCategoria, idCategoria)
            idSubCategoria = result2.rows[0].id_sub_categoria;

            const result3 = await agregarSubSubCategoria(conexion, body.nombreSubSubCategoria, idSubCategoria)
            idSubSubCategoria = result3.rows[0].id_sub_sub_categoria
        }

        if ((body.isNewSC) && !(body.isNewC)) {
            console.log("DEBERIA ENTRAR ACA");
            const result = await agregarSubCategoria(conexion, body.nombreSubCategoria, body.categoria)
            idSubCategoria = result.rows[0].id_sub_categoria

            const result2 = await agregarSubSubCategoria(conexion, body.nombreSubSubCategoria, idSubCategoria)
            idSubSubCategoria = result2.rows[0].id_sub_sub_categoria
        }

        if (!body.isNewSC) {
            console.log("NO DEBERIA ENTRAR ACA");
            const result = await agregarSubSubCategoria(conexion, body.nombreSubSubCategoria, body.subCategoria)
            idSubSubCategoria = result.rows[0].id_sub_sub_categoria
        }

        for (const data of body.FiltroNuevo) {

            const result = await AgrgarFiltroCategoria(conexion, data)
            idFiltroCategoria = result.rows[0].id_filtro_categoria

            await AgregarRelSubCategoriaFiltro(conexion, idFiltroCategoria, idSubSubCategoria)
        }

        for (const iterator of body.FiltroExistente) {

            await AgregarRelSubCategoriaFiltro(conexion, iterator.id_filtro_categoria, idSubSubCategoria)
        }

        await conexion.query('COMMIT'); // Confirma la transacción

        console.log('Inserciones realizadas correctamente')

        let resultado = {
            "status": "ok",
            "command": "INSERT",
            "rowCount": 1,
            "rows": []
        }

        return responseTypeService(resultado)

    } catch (error) {

        await conexion.query('ROLLBACK'); // Cancela la transacción

        console.log(error);
        return responseTypeServiceError(error)

    } finally {

        await desconectar(conexion);
    }
}

export default { buscarFiltroCategoriaService, AregarCategoriaAndFiltroService }