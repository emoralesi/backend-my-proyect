import {
    obtenerRoles,
    obtenerRolesConMenus,
    crearRolDAO,
    insertarPermisosDAO,
    eliminarPermisosDAO
} from "../dao/rolesDAO.js";

import { conectar, desconectar, getClient } from "../db/ConnexionBD.js";
import {
    responseTypeService,
    responseTypeServiceError,
} from "../response/responseTypeService.js";

export const obtenerRolesService = async () => {
    const conexion = await getClient();

    try {
        await conectar(conexion);

        const resultado = await obtenerRoles(conexion);
        return responseTypeService(resultado);
    } catch (error) {
        return responseTypeServiceError(error);
    } finally {
        await desconectar(conexion);
    }
};

export const obtenerRolesConMenusService = async () => {
    const conexion = await getClient();

    try {
        await conectar(conexion);

        const resultado = await obtenerRolesConMenus(conexion);
        return responseTypeService(resultado);
    } catch (error) {
        console.log(error);

        return responseTypeServiceError(error);
    } finally {
        await desconectar(conexion);
    }
};

export const crearRolService = async (req) => {
    const conexion = await getClient();

    try {
        await conectar(conexion);
        await conexion.query("BEGIN");

        const resultadoRol = await crearRolDAO(conexion, req.nombreRol);
        console.log(console.log("mi resultadoRol", resultadoRol));


        const idRol = resultadoRol.rows[0].id_roles;

        const resultadoPermisos = await insertarPermisosDAO(conexion, idRol, req.menus || []);

        await conexion.query("COMMIT");
        return responseTypeService(resultadoRol);
    } catch (error) {
        await conexion.query("ROLLBACK");
        return responseTypeServiceError(error);
    } finally {
        await desconectar(conexion);
    }
};

export const actualizarRolService = async (req) => {
    const conexion = await getClient();

    try {
        await conectar(conexion);
        await conexion.query("BEGIN");

        const resultadoDelete = await eliminarPermisosDAO(conexion, req.idRol);
        if (resultadoDelete.status === "error") throw resultadoDelete;

        const resultadoPermisos = await insertarPermisosDAO(conexion, req.idRol, req.menus || []);
        if (resultadoPermisos.status === "error") throw resultadoPermisos;

        await conexion.query("COMMIT");
        return responseTypeService(resultadoPermisos);
    } catch (error) {
        console.log(error);

        await conexion.query("ROLLBACK");
        return responseTypeServiceError(error);
    } finally {
        await desconectar(conexion);
    }
};


export default {
    obtenerRolesService,
    obtenerRolesConMenusService,
    crearRolService,
    actualizarRolService
};