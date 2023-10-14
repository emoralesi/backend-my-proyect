import { responseTypeDAO } from "../response/responseTypeDAO.js";
import bcrypt from 'bcrypt';

export const registrarUsuario = async (conexion, req) => {
    try {

        const hashedPassword = await bcrypt.hash(req.password, 10);

        const sql = {
            text: 'INSERT INTO usuario (nombre_usuario, password_usuario,id_roles,activo) VALUES ($1, $2, $3, true) RETURNING id_usuario,nombre_usuario, password_usuario,id_roles',
            values: [req.nombreUsuario, hashedPassword, req.role],
        }

        const results = await conexion.query(sql)

        return responseTypeDAO(results)

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const ConsultarUsuario = async (conexion, req) => {

    try {

        const sql = `select * from usuario u where u.nombre_usuario = '${req.nombreUsuario}' `;

        const results = await conexion.query(sql)

        return responseTypeDAO(results)

    } catch (error) {
        console.log("dao", error);
        throw error;
    }
}

export const ConsultarUsuarioActivo = async (conexion, req) => {

    try {

        const sql = `select * from usuario u where u.nombre_usuario = '${req.nombreUsuario}' and u.activo = true `;

        const results = await conexion.query(sql)

        return responseTypeDAO(results)

    } catch (error) {
        console.log("dao", error);
        throw error;
    }
}

export const obtenerUsuarios = async (conexion) => {
    try {
        const sql = `select * from usuario u inner join roles r on (u.id_roles = r.id_roles)`;

        const results = await conexion.query(sql)

        return responseTypeDAO(results)
    } catch (error) {
        console.log("dao", error);
        throw error;
    }
}

export const actualizarUsuarioEstado = async (conexion, req) => {

    try {

        const sql = {
            text: 'update usuario SET activo = $1 where id_usuario = $2 returning id_usuario,nombre_usuario ',
            values: [req.activo, req.id_usuario],
        }

        const results = await conexion.query(sql)

        return responseTypeDAO(results)

    } catch (error) {

        console.log(error);
        throw error
    }
}

export default { registrarUsuario, ConsultarUsuarioActivo, ConsultarUsuario, obtenerUsuarios }