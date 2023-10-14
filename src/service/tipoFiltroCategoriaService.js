import { buscarTipoFiltroCategoria } from "../dao/tipoFiltroCategoriaDAO.js";
import { conectar, desconectar, getClient } from "../db/ConnexionBD.js";
import { responseTypeService, responseTypeServiceError } from "../response/responseTypeService.js";

export const buscarTipoFiltroCategoriaService = async () => {

    const conexion = await getClient(); // Se obtiene una nueva instancia del cliente

    try {

        await conectar(conexion);

        const resultado = await buscarTipoFiltroCategoria(conexion);

        return responseTypeService(resultado)

    } catch (error) {

        return responseTypeServiceError(error)

    } finally {

        await desconectar(conexion);
    }

}
export default {buscarTipoFiltroCategoriaService}