import express from 'express'
import { responseTypeRoute } from '../response/responseTypeRoute.js'
import { agregarCategoriaService, buscarCategoriasService, buscarTodoCategoriasService } from '../service/categoriaService.js'
import { AregarCategoriaAndFiltroService, buscarFiltroCategoriaBySubSubCategoriaService, buscarFiltroCategoriaService } from '../service/filtroCategoriaService.js'
import { obtenerMenuService } from '../service/menuService.js'
import { actualizarEstadoService, actualizarProductoService, agregarProductoService, agregarStockService, obtenerProductoService } from '../service/productosService.js'
import { buscarSubCategoriasService } from '../service/subCategoriaService.js'
import { buscarSubSubCategoriasService } from '../service/subSubCategoriaService.js'
import { buscarTipoFiltroCategoriaService } from '../service/tipoFiltroCategoriaService.js'

const app = express()
const router = express.Router()
app.use('/service', router)

// CATEGORIA
router.get('/obtenerCategoria', async (req, res) => {

    const resultado = await buscarCategoriasService();

    console.log("Este es mi resultado route", resultado);

    responseTypeRoute(resultado, res)

})

router.get('/obtenerTodoCategorias', async (req, res) => {

    const resultado = await buscarTodoCategoriasService();

    console.log("Este es mi resultado route", resultado);

    responseTypeRoute(resultado, res)

})

// CATEGORIA
router.get('/obtenerTipoFiltroCategoria', async (req, res) => {

    const resultado = await buscarTipoFiltroCategoriaService();

    console.log("Este es mi resultado route", resultado);

    responseTypeRoute(resultado, res)

})

router.post('/agregarCategoria', async (req, res) => {

    const resultado = await agregarCategoriaService(req.body);

    console.log(resultado);

    responseTypeRoute(resultado, res)
})

// SUB CATEGORIA

router.post('/obtenerSubCategoria', async (req, res) => {

    const resultado = await buscarSubCategoriasService(req);

    responseTypeRoute(resultado, res)

})

// SUB SUB CATEGORIA

router.post('/obtenerSubSubCategoria', async (req, res) => {

    const resultado = await buscarSubSubCategoriasService(req);

    responseTypeRoute(resultado, res)

})

// FILTRO CATEGORIA

router.get('/obtenerFiltroCategoria', async (req, res) => {

    const resultado = await buscarFiltroCategoriaService();

    responseTypeRoute(resultado, res)

})

router.post('/obtenerFiltroCategoriaBySubSubCategoria', async (req, res) => {

    const resultado = await buscarFiltroCategoriaBySubSubCategoriaService(req);

    responseTypeRoute(resultado, res)

})

router.post('/AgregarCategoriaYFiltro', async (req, res) => {

    const resultado = await AregarCategoriaAndFiltroService(req.body);

    responseTypeRoute(resultado, res)
})

// PRODUCTO

router.post('/agregarProducto', async (req, res) => {
    console.log("Este es mi req", req.body);

    const resultado = await agregarProductoService(req.body);

    responseTypeRoute(resultado, res)
})

router.post('/agregarStock', async (req, res) => {
    console.log("Este es mi req", req.body);

    const resultado = await agregarStockService(req.body);

    responseTypeRoute(resultado, res)
})

router.get('/obtenerProducto', async (req, res) => {

    const resultado = await obtenerProductoService();

    responseTypeRoute(resultado, res)

})

router.post('/actualizarEstado', async (req, res) => {
    const resultado = await actualizarEstadoService(req.body);

    responseTypeRoute(resultado, res)
})

router.post('/actualizarProducto', async (req, res) => {
    const resultado = await actualizarProductoService(req.body);

    responseTypeRoute(resultado, res)
})

// MENU

router.get('/obtenerMenuItems', async (req, res) => {

    const resultado = await obtenerMenuService();

    console.log("mi resultado",resultado);
    responseTypeRoute(resultado, res)

})

export default app