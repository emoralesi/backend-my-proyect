import { responseTypeDAO } from "../response/responseTypeDAO.js";

export const buscarProductos = async (conexion) => {

    try {
        const sql = `select p.id_producto, c.nombre as nombreCategoria, sc.nombre_sub_categoria  as nombreSubCategoria , ssc.nombre_sub_sub_categoria as nombreSubSubCategoria , p.nombre, p.precio , p.sku , p.isactive  
                        from producto p
                        inner join rel_producto_categoria_filtro rp on (p.id_producto  = rp.id_producto )
                        inner join rel_sub_categoria_filtro  rs on (rs.id_rel_sub_categoria_filtro = rp.id_rel_sub_categoria_filtro)
                        inner join sub_sub_categoria  ssc on (ssc.id_sub_sub_categoria = rs.id_sub_sub_categoria)
                        inner join sub_categoria sc  on (sc.id_sub_categoria = ssc.id_sub_categoria)
                        inner join categoria c on (c.id_categoria = sc.id_categoria)
                    group by p.id_producto, c.nombre, sc.nombre_sub_categoria , ssc.nombre_sub_sub_categoria, p.nombre, p.precio , p.sku , p.isactive
                    order by id_producto asc`;
        const results = await conexion.query(sql);

        console.log("Este es mi result del dao", results);
        return responseTypeDAO(results)
    } catch (error) {

        console.log(error);
        throw error
    }
}

export const agregarProducto = async (conexion, req) => {

    try {

        const sql = {
            text: 'INSERT INTO producto (nombre,precio,sku,isactive) VALUES ($1,$2,$3,$4,$5)',
            values: [req.nombre, req.precio, req.sku, true],
        }

        const results = await conexion.query(sql)

        return responseTypeDAO(results)
    } catch (error) {

        console.log(error);
        throw error
    }
}

export const actualizarEstado = async (conexion, req) => {

    try {

        const sql = {
            text: 'update producto SET isactive = $1 where id_producto = $2 returning id_producto,sku ',
            values: [req.isactive, req.id_producto],
        }

        const results = await conexion.query(sql)

        return responseTypeDAO(results)

    } catch (error) {

        console.log(error);
        throw error
    }
}

export const actualizarProducto = async (conexion, req) => {

    try {

        const sql = {
            text: 'update producto set nombre = $1,precio = $2 ,sku = $3 where id_producto = $4',
            values: [req.nombre, req.precio, req.sku, req.id_producto],
        }

        const results = await conexion.query(sql)

        return responseTypeDAO(results)
    } catch (error) {

        console.log(error);
        throw error
    }
}

export default { buscarProductos, agregarProducto, actualizarEstado, actualizarProducto }