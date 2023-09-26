import { responseTypeDAO } from "../response/responseTypeDAO.js";

export const buscarMenu = async (conexion,req) => {

    try {
        const sql = `select m.id_menu, m.nombre_menu , sm.id_sub_menu  , sm.nombre_sub_menu ,sm.link_sub_menu, rmsm.id_roles  from usuario u 
                    inner join roles r on (u.id_roles = r.id_roles)
                    inner join rel_menu_sub_menu rmsm on ( rmsm.id_roles = r.id_roles)
                    inner join sub_menu sm on (sm.id_sub_menu = rmsm.id_sub_menu)
                    inner join menu m on (m.id_menu = rmsm.id_menu)
                    where u.id_usuario = ${req.idUsuario}`;

        let results = await conexion.query(sql);

        return responseTypeDAO(results)

    } catch (error) {

        console.log(error);
        throw error
    }
}

export default { buscarMenu }