import { responseTypeDAO } from "../response/responseTypeDAO.js";

export const buscarsubMenuByIdRole = async (conexion, id_roles) => {

    try {

        const sql = `SELECT rmsm.id_sub_menu 
             FROM rel_menu_sub_menu rmsm 
             WHERE rmsm.id_roles = $1;`;

        const results = await conexion.query(sql, [id_roles]);


        return responseTypeDAO(results)
    } catch (error) {

        console.log(error);
        throw error
    }
}

export default { buscarsubMenuByIdRole }