import express from 'express'
import { buscarCategoriasService } from '../service/categoriaService.js'

const app = express()
const router = express.Router()
app.use('/service', router)

router.get('/obtenerCategoria',async (req,res)=>{

    const resultado = await buscarCategoriasService();
    if (resultado != null) {
        res.status(200).json({
            ok: 200,
            message: "Resultados encontrados",
            cantidad: resultado.length,
            resultado : resultado
        })
    }else{
        res.status(200).json({
            ok: 204,
            message: "No se encontraron resultados",
            resultado : resultado
        })
    }
    
})

export default app