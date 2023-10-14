import { actualizarEstado, actualizarProducto, agregarProducto, agregarStock, buscarProductos } from '../dao/productosDAO.js';
import { AgregarRelProductoCategoriaFiltro } from '../dao/relProductoCategoriaFiltroDAO.js';
import { conectar, desconectar, getClient } from '../db/ConnexionBD.js';
import { responseTypeService, responseTypeServiceError } from '../response/responseTypeService.js';

export const agregarProductoService = async (req) => {

    const conexion = await getClient(); // Se obtiene una nueva instancia del cliente

    try {

        let id_producto;
        await conectar(conexion)
        await conexion.query('BEGIN'); // Inicia la transacción

        const resultado = await agregarProducto(conexion, req);

        id_producto = resultado.rows[0].id_producto

        for (const iterator of req.listaFiltros) {
            
            await AgregarRelProductoCategoriaFiltro(conexion,id_producto,iterator.id_rel_sub_categoria_filtro,iterator.value)
        }

        await conexion.query('COMMIT'); // Confirma la transacción
        return responseTypeService(resultado)

    } catch (error) {
        console.log(error);
        await conexion.query('ROLLBACK'); // Cancela la transacción
        return responseTypeServiceError(error)

    } finally {

        await desconectar(conexion);
    }
}

export const obtenerProductoService = async () => {

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

export const actualizarEstadoService = async (req) => {

    const conexion = await getClient(); // Se obtiene una nueva instancia del cliente

    try {

        await conectar(conexion);

        const resultado = await actualizarEstado(conexion, req);

        return responseTypeService(resultado)

    } catch (error) {

        return responseTypeServiceError(error)

    } finally {

        await desconectar(conexion);
    }
}

export const actualizarProductoService = async (req) => {

    const conexion = await getClient(); // Se obtiene una nueva instancia del cliente;

    try {

        await conectar(conexion)

        const resultado = await actualizarProducto(conexion, req)

        return responseTypeService(resultado)

    } catch (error) {

        return responseTypeServiceError(error)

    } finally {

        await desconectar(conexion);
    }
}

export const agregarStockService = async (req) => {

    const conexion = await getClient(); // Se obtiene una nueva instancia del cliente;

    try {

        await conectar(conexion)

        const resultado = await agregarStock(conexion, req)

        return responseTypeService(resultado)

    } catch (error) {

        return responseTypeServiceError(error)

    } finally {

        await desconectar(conexion);
    }
}

export default { agregarProductoService, obtenerProductoService, actualizarEstadoService, actualizarProductoService }