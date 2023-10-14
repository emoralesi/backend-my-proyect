import { obtenerRoles } from "../dao/rolesDAO.js";
import { conectar, desconectar, getClient } from "../db/ConnexionBD.js";
import { responseTypeService, responseTypeServiceError } from "../response/responseTypeService.js";

export const buscarRolesService = async () => {

    const conexion = await getClient(); // Se obtiene una nueva instancia del cliente

    try {

        await conectar(conexion);

        const resultado = await obtenerRoles(conexion);

        return responseTypeService(resultado)

    } catch (error) {

        return responseTypeServiceError(error)

    } finally {

        await desconectar(conexion);
    }

}

export default { buscarRolesService }