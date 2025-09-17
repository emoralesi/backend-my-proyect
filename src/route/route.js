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
import { actualizarPasswordUsuarioService, actualizarUsuarioEstadoService, actualizarUsuarioService, loginUsuarioService, obtenerUsuariosService, registrarUsuarioService } from '../service/usuarioService.js';
import { authenticateToken } from './middleware.js';
import { actualizarRolService, crearRolService, obtenerRolesConMenusService, obtenerRolesService } from '../service/rolesService.js';
import { buscarsubMenuByIdRole } from '../dao/relMenuSubMenuDAO.js';
import { buscatSubMenyByIdRoleService } from '../service/relMenuSubMenuService.js';

const app = express()
const router = express.Router()
app.use('/service', router)


const secretKey = 'tu_clave_secreta_jwt';


router.post('/registerUser', async (req, res) => {

    try {

        const result = await registrarUsuarioService(req.body, res);
        if (result.status == 'error') {
            res.status(201).json(result);
        } else {
            res.status(200).json(result);
        }

    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }

})

router.post('/loginUser', async (req, res) => {

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

        const accesSubMenu = await buscatSubMenyByIdRoleService({ id_roles: user.Resultado[0].id_roles })
        let ids = accesSubMenu.Resultado.map(item => item.id_sub_menu);


        // Generar un token JWT
        const token = jwt.sign({ userId: user.Resultado[0].id_usuario }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ status: 'ok', "id_usuario": user.Resultado[0].id_usuario, "nombreUsuario": user.Resultado[0].nombre_usuario, "idRole": user.Resultado[0].id_roles, "accesSubMenu": ids, "token": token });

    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }

})

router.get('/obtenerUsuarios', authenticateToken, async (req, res) => {

    const resultado = await obtenerUsuariosService();

    responseTypeRoute(resultado, res)

})

router.post('/actualizarUsuarioEstado', authenticateToken, async (req, res) => {
    const resultado = await actualizarUsuarioEstadoService(req.body);

    responseTypeRoute(resultado, res)
})

router.post('/actualizarUsuario', authenticateToken, async (req, res) => {
    const resultado = await actualizarUsuarioService(req.body);

    responseTypeRoute(resultado, res)
})

router.post('/actualizarPasswordUsuario', authenticateToken, async (req, res) => {
    const resultado = await actualizarPasswordUsuarioService(req.body);

    responseTypeRoute(resultado, res)
})

// CATEGORIA
router.get('/obtenerCategoria', authenticateToken, async (req, res) => {

    const resultado = await buscarCategoriasService();

    responseTypeRoute(resultado, res)

})

router.get('/obtenerTodoCategorias', authenticateToken, async (req, res) => {

    const resultado = await buscarTodoCategoriasService();

    responseTypeRoute(resultado, res)

})

// CATEGORIA
router.get('/obtenerTipoFiltroCategoria', authenticateToken, async (req, res) => {

    const resultado = await buscarTipoFiltroCategoriaService();

    responseTypeRoute(resultado, res)

})

router.post('/agregarCategoria', authenticateToken, async (req, res) => {

    const resultado = await agregarCategoriaService(req.body);

    responseTypeRoute(resultado, res)
})

// SUB CATEGORIA

router.post('/obtenerSubCategoria', authenticateToken, async (req, res) => {

    const resultado = await buscarSubCategoriasService(req);

    responseTypeRoute(resultado, res)

})

// SUB SUB CATEGORIA

router.post('/obtenerSubSubCategoria', authenticateToken, async (req, res) => {

    const resultado = await buscarSubSubCategoriasService(req);

    responseTypeRoute(resultado, res)

})

// FILTRO CATEGORIA

router.get('/obtenerFiltroCategoria', authenticateToken, async (req, res) => {

    const resultado = await buscarFiltroCategoriaService();

    responseTypeRoute(resultado, res)

})

router.post('/obtenerFiltroCategoriaBySubSubCategoria', authenticateToken, async (req, res) => {

    const resultado = await buscarFiltroCategoriaBySubSubCategoriaService(req);

    responseTypeRoute(resultado, res)

})

router.post('/AgregarCategoriaYFiltro', authenticateToken, async (req, res) => {

    const resultado = await AregarCategoriaAndFiltroService(req.body);

    responseTypeRoute(resultado, res)
})

// PRODUCTO

router.post('/agregarProducto', authenticateToken, async (req, res) => {

    const resultado = await agregarProductoService(req.body);

    responseTypeRoute(resultado, res)
})

router.post('/agregarStock', authenticateToken, async (req, res) => {

    const resultado = await agregarStockService(req.body);

    responseTypeRoute(resultado, res)
})

router.get('/obtenerProducto', authenticateToken, async (req, res) => {

    const resultado = await obtenerProductoService();

    responseTypeRoute(resultado, res)

})

router.post('/actualizarEstado', async (req, res) => {
    const resultado = await actualizarEstadoService(req.body);

    responseTypeRoute(resultado, res)
})

router.post('/actualizarProducto', authenticateToken, async (req, res) => {
    const resultado = await actualizarProductoService(req.body);

    responseTypeRoute(resultado, res)
})

// MENU

router.post('/obtenerMenuItems', authenticateToken, async (req, res) => {

    const resultado = await obtenerMenuService(req.body);

    responseTypeRoute(resultado, res)

})

// ROLES

router.get("/obtenerRoles", authenticateToken, async (req, res) => {
    const resultado = await obtenerRolesService();
    responseTypeRoute(resultado, res);
});

router.get("/obtenerRolesConMenus", authenticateToken, async (req, res) => {
    const resultado = await obtenerRolesConMenusService();
    responseTypeRoute(resultado, res);
});

router.post("/crearRol", authenticateToken, async (req, res) => {
    // req.body debe contener: { nombreRol: string, menus: [{id_menu, submenus: [id_sub_menu]}] }
    const resultado = await crearRolService(req.body);
    responseTypeRoute(resultado, res);
});

router.put("/actualizarRol", authenticateToken, async (req, res) => {
    // req.body debe contener: { idRol, nombreRol, menus: [{id_menu, submenus: [id_sub_menu]}] }
    const resultado = await actualizarRolService(req.body);
    responseTypeRoute(resultado, res);
});



export default app