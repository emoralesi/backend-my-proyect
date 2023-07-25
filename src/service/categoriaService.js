import { agregarCategoria, buscarCategorias } from "../dao/categoriaDAO.js";
import { conectar, desconectar, getClient } from '../db/ConnexionBD.js';
import { responseTypeService, responseTypeServiceError } from "../response/responseTypeService.js";

export const buscarCategoriasService = async () => {

    const conexion = await getClient(); // Se obtiene una nueva instancia del cliente

    try {

        await conectar(conexion);

        const resultado = await buscarCategorias(conexion);

        return responseTypeService(resultado)

    } catch (error) {

        return responseTypeServiceError(error)

    } finally {

        await desconectar(conexion);
    }

}

export const agregarCategoriaService = async (req) => {

    const conexion = await getClient(); // Se obtiene una nueva instancia del cliente

    try {
        await conectar(conexion);

        const resultado = await agregarCategoria(conexion, req);

        return responseTypeService(resultado)

    } catch (error) {
        
        return responseTypeServiceError(error)

    } finally {

        await desconectar(conexion);
    }

}

export default { buscarCategoriasService, agregarCategoriaService }