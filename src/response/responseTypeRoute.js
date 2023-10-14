export const responseTypeRoute = async (resultado, res) => {

    if (resultado.status == 'ok') {
        if (resultado.command == 'SELECT') {
            if (resultado.Cantidad > 0) {
                res.status(200).json({
                    ok: 200,
                    message: "Resultados encontrados",
                    cantidad: resultado.Cantidad,
                    resultado: resultado.Resultado
                })
            } else if ((resultado.Cantidad == 0)) {
                res.status(200).json({
                    ok: 204,
                    message: "No se encontraron resultados",
                    resultado: resultado.Resultado
                })
            }
        } else if (resultado.command == 'INSERT' || resultado.command == 'UPDATE') {
            if (resultado.Cantidad > 0) {
                res.status(200).json({
                    ok: 200,
                    message: "Registro Insertado/Actualizado Correctamente",
                    cantidad: resultado.Cantidad,
                    resultado: resultado.Resultado
                })
            }
        } else {
            res.status(404).json({
                ok: 404,
                message: "Accion desconocida"
            })
        }

    } else if (resultado.status == 'error') {
        res.status(500).json({
            ok: 500,
            message: "Error interno",
            error: resultado.error
        })
    }

    return res;
}