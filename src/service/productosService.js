import { actualizarEstado, actualizarProducto, agregarProducto, buscarProductos } from '../dao/productosDAO.js';
import { conectar, desconectar, getClient } from '../db/ConnexionBD.js';
import { responseTypeService, responseTypeServiceError } from '../response/responseTypeService.js';

export const agregarProductoService = async (req) => {

    const conexion = await getClient(); // Se obtiene una nueva instancia del cliente
    
    try {

        await conectar(conexion)

        const resultado = await agregarProducto(conexion,req);

        return responseTypeService(resultado)

    } catch (error) {
        
        return responseTypeServiceError(error)

    } finally {

        await desconectar(conexion);
    }
}

export const obtenerProductoService = async () =>{

    const conexion = await getClient(); // Se obtiene una nueva instancia del cliente

    try {

        await conectar(conexion)

        const resultado = await buscarProductos(conexion);

        return responseTypeService(resultado)

    } catch (error) {
        
        return responseTypeServiceError(error)

    } finally {

        await desconectar(conexion);
    }
}

export const actualizarEstadoService = async (req) =>{

    const conexion = await getClient(); // Se obtiene una nueva instancia del cliente

    try {

        await conectar(conexion);

        const resultado = await actualizarEstado(conexion,req);

        return responseTypeService(resultado)

    } catch (error) {
        
        return responseTypeServiceError(error)

    } finally {

        await desconectar(conexion);
    }
}

export const actualizarProductoService = async (req) =>{

    const conexion = await getClient(); // Se obtiene una nueva instancia del cliente;

    try {

        await conectar(conexion)

        const resultado = await actualizarProducto(conexion,req)

        return responseTypeService(resultado)

    } catch (error) {
        
        return responseTypeServiceError(error)

    } finally {

        await desconectar(conexion);
    }
}

export default {agregarProductoService,obtenerProductoService,actualizarEstadoService,actualizarProductoService}