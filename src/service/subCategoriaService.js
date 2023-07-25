import { buscarSubCategorias } from "../dao/subCategoriaDAO.js";
import { conectar, desconectar, getClient } from '../db/ConnexionBD.js';
import { responseTypeService, responseTypeServiceError } from '../response/responseTypeService.js';

export const buscarSubCategoriasService = async (req) => {

    const conexion = await getClient(); // Se obtiene una nueva instancia del cliente

    try {

        await conectar(conexion)

        const resultado = await buscarSubCategorias(conexion, req.body);

        return responseTypeService(resultado)

    } catch (error) {

        return responseTypeServiceError(error)

    } finally {

        await desconectar(conexion);
    }
}

export default { buscarSubCategoriasService }