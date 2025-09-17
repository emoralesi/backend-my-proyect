import { responseTypeDAO } from "../response/responseTypeDAO.js";

export const obtenerRoles = async (conexion) => {
    try {
        const sql = `SELECT * FROM roles`;
        const [rows] = await conexion.query(sql);

        const data = {
            command: sql,
            rowCount: rows.length,
            rows,
        };

        return responseTypeDAO(data);
    } catch (error) {
        return { status: "error", code: error.code };
    }
};

export const obtenerRolesConMenus = async (conexion) => {

    try {
        const sql = `
      SELECT 
        r.id_roles,
        r.nombre_rol,
        m.id_menu,
        m.nombre_menu,
        s.id_sub_menu,
        s.nombre_sub_menu,
        s.link_sub_menu
      FROM roles r
      LEFT JOIN rel_menu_sub_menu rmsm ON r.id_roles = rmsm.id_roles
      LEFT JOIN menu m ON rmsm.id_menu = m.id_menu
      LEFT JOIN sub_menu s ON rmsm.id_sub_menu = s.id_sub_menu
      ORDER BY r.id_roles, m.id_menu, s.id_sub_menu
    `;

        let results = await conexion.query(sql);

        return responseTypeDAO(results)

    } catch (error) {

        console.log(error);
        throw error
    }
}

export const crearRolDAO = async (conexion, nombreRol) => {
    try {

        const sql = {
            text: 'INSERT INTO roles (nombre_rol) VALUES ($1) returning id_roles',
            values: [nombreRol],
        }

        let results = await conexion.query(sql)

        return responseTypeDAO(results);
    } catch (error) {
        console.log(error);

        return { status: "error", code: error.code };
    }
};

export const insertarPermisosDAO = async (conexion, idRol, menus = []) => {
    try {
        if (menus.length === 0) {
            const data = {
                command: "No inserts",
                rowCount: 0,
                rows: [],
            };
            return responseTypeDAO(data);
        }

        const values = [];
        const placeholders = [];
        let index = 1;

        menus.forEach((menu) => {
            menu.submenus.forEach((sub) => {
                values.push(menu.id_menu, sub, idRol);
                placeholders.push(`($${index}, $${index + 1}, $${index + 2})`);
                index += 3;
            });
        });

        const sql = `
            INSERT INTO rel_menu_sub_menu (id_menu, id_sub_menu, id_roles)
            VALUES ${placeholders.join(", ")}
        `;

        const result = await conexion.query(sql, values);

        return responseTypeDAO(result);
    } catch (error) {
        console.log(error);
        return { status: "error", code: error.code };
    }
};


export const eliminarPermisosDAO = async (conexion, idRol) => {
    try {

        const sql = {
            text: 'DELETE FROM rel_menu_sub_menu WHERE id_roles = $1',
            values: [idRol],
        }

        let results = await conexion.query(sql)

        return responseTypeDAO(results);
    } catch (error) {
        console.log(error);
        return { status: "error", code: error.code };
    }
};


export default {
    obtenerRoles,
    obtenerRolesConMenus,
    crearRolDAO,
    insertarPermisosDAO,
    eliminarPermisosDAO
};
