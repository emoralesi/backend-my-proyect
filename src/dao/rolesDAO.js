import { responseTypeDAO } from "../response/responseTypeDAO.js";

export const obtenerRoles = async (conexion) => {

    try {
        const sql = `SELECT * FROM ROLES`;

        let results = await conexion.query(sql);

        return responseTypeDAO(results)

    } catch (error) {

        console.log(error);
        throw error
    }

}

export default { obtenerRoles }