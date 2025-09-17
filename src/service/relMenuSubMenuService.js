import {buscarsubMenuByIdRole} from "../dao/relMenuSubMenuDAO.js";
import { conectar, desconectar, getClient } from "../db/ConnexionBD.js";
import { responseTypeService, responseTypeServiceError } from "../response/responseTypeService.js";

export const buscatSubMenyByIdRoleService = async (req) => {

    const conexion = await getClient();

    try {

        await conectar(conexion);

        const resultado = await buscarsubMenuByIdRole(conexion,req.id_roles);

        return responseTypeService(resultado)

    } catch (error) {

        return responseTypeServiceError(error)

    } finally {

        await desconectar(conexion);
    }
}