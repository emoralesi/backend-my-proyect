import { ConsultarUsuario, ConsultarUsuarioActivo, actualizarUsuarioEstado, obtenerUsuarios, registrarUsuario } from "../dao/usuarioDAO.js";
import { conectar, desconectar, getClient } from "../db/ConnexionBD.js";
import { responseTypeService, responseTypeServiceError } from "../response/responseTypeService.js";

export const registrarUsuarioService = async (req, res) => {
    const conexion = await getClient();
    try {
        await conectar(conexion);

        const userExists = await ConsultarUsuario(conexion, req);

        if (userExists.rows.length > 0) {

            let result = {
                "status": 'error',
                "code": 'El usuario ya existe'
            }
            return responseTypeService(result);
        }
        const resultado = await registrarUsuario(conexion, req);
        return responseTypeService(resultado);
    } catch (error) {
        return responseTypeServiceError(error);
    } finally {
        await desconectar(conexion);
    }
}

export const loginUsuarioService = async (req, res) => {
    const conexion = await getClient();
    try {
        await conectar(conexion);
        const user = await ConsultarUsuarioActivo(conexion, req);

        return responseTypeService(user);
    } catch (error) {
        console.log(error);
        return responseTypeServiceError(error);
    } finally {
        await desconectar(conexion);
    }
}

export const obtenerUsuariosService = async (req, res) => {
    const conexion = await getClient();

    try {
        await conectar(conexion);
        const usuarios = await obtenerUsuarios(conexion)
        return responseTypeService(usuarios);
    } catch (error) {
        console.log(error);
        return responseTypeServiceError(error);
    } finally {
        await desconectar(conexion)
    }
}

export const actualizarUsuarioEstadoService = async (req) => {

    const conexion = await getClient(); // Se obtiene una nueva instancia del cliente

    try {

        await conectar(conexion);

        const resultado = await actualizarUsuarioEstado(conexion, req);

        return responseTypeService(resultado)

    } catch (error) {

        return responseTypeServiceError(error)

    } finally {

        await desconectar(conexion);
    }
}
export default { registrarUsuarioService, loginUsuarioService, obtenerUsuariosService, actualizarUsuarioEstadoService }