import { buscarMenu } from "../dao/menuDAO.js";
import { conectar, desconectar, getClient } from "../db/ConnexionBD.js";
import { responseTypeService, responseTypeServiceError } from "../response/responseTypeService.js";

export const obtenerMenuService = async () => {

    const conexion = await getClient(); // Se obtiene una nueva instancia del cliente

    try {

        await conectar(conexion)

        const resultado = await buscarMenu(conexion);

        const transformedData = [];

        resultado.rows.forEach(item => {
            const existingMenu = transformedData.find(menu => menu.id_menu === item.id_menu);

            if (existingMenu) {
                existingMenu.subMenu.push({
                    id_sub_menu: item.id_sub_menu,
                    nombre_sub_menu: item.nombre_sub_menu,
                    link_sub_menu: item.link_sub_menu
                });
            } else {
                transformedData.push({
                    id_menu: item.id_menu,
                    nombre_menu: item.nombre_menu,
                    subMenu: [
                        {
                            id_sub_menu: item.id_sub_menu,
                            nombre_sub_menu: item.nombre_sub_menu,
                            link_sub_menu: item.link_sub_menu
                        }
                    ]
                });
            }
        });

        resultado.rows = transformedData;

        return responseTypeService(resultado)

    } catch (error) {

        console.log(error);
        return responseTypeServiceError(error)

    } finally {

        await desconectar(conexion);
    }
}

export default { obtenerMenuService }