import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import { responseTypeRoute } from '../response/responseTypeRoute.js';
import { agregarCategoriaService, buscarCategoriasService, buscarTodoCategoriasService } from '../service/categoriaService.js';
import { AregarCategoriaAndFiltroService, buscarFiltroCategoriaBySubSubCategoriaService, buscarFiltroCategoriaService } from '../service/filtroCategoriaService.js';
import { obtenerMenuService } from '../service/menuService.js';
import { actualizarEstadoService, actualizarProductoService, agregarProductoService, agregarStockService, obtenerProductoService } from '../service/productosService.js';
import { buscarSubCategoriasService } from '../service/subCategoriaService.js';
import { buscarSubSubCategoriasService } from '../service/subSubCategoriaService.js';
import { buscarTipoFiltroCategoriaService } from '../service/tipoFiltroCategoriaService.js';
import { loginUsuarioService, registrarUsuarioService } from '../service/usuarioService.js';

const app = express()
const router = express.Router()
app.use('/service', router)

// USUARIO

const secretKey = 'tu_clave_secreta_jwt'; // Cambia esta clave secreta por una única y segura


router.post('/registerUser', async (req, res) => {

    try {

        const result = await registrarUsuarioService(req.body, res);
        console.log(result);
        if (result.status == 'error') {
            res.status(400).json(result);
        } else {
            res.status(201).json(result);
        }

    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }

})

router.post('/loginUser', async (req, res) => {

    console.log("mi req route",req.body);
    try {
        const user = await loginUsuarioService(req.body, res);

        if (user.Resultado.length === 0) {
            console.log("usuario no encontrado");
            return res.status(401).json({ status: 'error', error: 'Credenciales inválidas' });
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.Resultado[0].password_usuario);
        if (!isPasswordValid) {
            console.log("contraseña invalida");
            return res.status(401).json({ status: 'error', error: 'Credenciales inválidas' });
        }
        // Generar un token JWT
        const token = jwt.sign({ userId: user.Resultado[0].id_usuario }, secretKey, { expiresIn: '1h' });

        res.status(200).json({status:'ok',"id_usuario": user.Resultado[0].id_usuario,"nombreUsuario":user.Resultado[0].nombre_usuario,"idRole":user.Resultado[0].id_roles, "token": token });

    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }

})

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

    console.log("mi resultado", resultado);
    responseTypeRoute(resultado, res)

})

export default app