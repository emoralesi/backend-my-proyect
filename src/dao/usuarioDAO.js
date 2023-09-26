import { responseTypeDAO } from "../response/responseTypeDAO.js";
import bcrypt from 'bcrypt';

export const registrarUsuario = async (conexion, req) => {
    try {

        console.log(req);

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

    console.log("mi req DAO", req);
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

    console.log("mi req DAO", req);
    try {

        const sql = `select * from usuario u where u.nombre_usuario = '${req.nombreUsuario}' and u.activo = true `;

        const results = await conexion.query(sql)

        return responseTypeDAO(results)

    } catch (error) {
        console.log("dao", error);
        throw error;
    }
}

export default { registrarUsuario, ConsultarUsuarioActivo, ConsultarUsuario }