import { buscarSubSubCategorias } from "../dao/subSubCategoriaDAO.js";
import { conectar, desconectar, getClient} from '../db/ConnexionBD.js'
import { responseTypeService, responseTypeServiceError } from '../response/responseTypeService.js';

export const buscarSubSubCategoriasService = async (req) => {

    const conexion = await getClient(); // Se obtiene una nueva instancia del cliente
    
    try {

        await conectar(conexion)

        const resultado = await buscarSubSubCategorias(conexion,req.body);
        
        return responseTypeService(resultado)

    } catch (error) {

        return responseTypeServiceError(error)

    } finally {

        await desconectar(conexion);
    }
}

export default { buscarSubSubCategoriasService }