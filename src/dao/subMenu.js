import { responseTypeDAO } from "../response/responseTypeDAO.js";

export const buscarSubMenu = async (conexion, id_menu) => {

    // try {
    //     const sql = `select  * from sub_menu sm 
    //     inner join rel_menu_sub_menu rmsm on (sm.id_sub_menu = rmsm.id_sub_menu) 
    //     inner join menu m on (m.id_menu = rmsm.id_menu)
    //     where m.id_menu in (${id_menu}) `;

    //     let results = await conexion.query(sql);

    //     return responseTypeDAO(results)

    // } catch (error) {

    //     console.log(error);
    //     throw error
    // }
}

export default {buscarSubMenu}