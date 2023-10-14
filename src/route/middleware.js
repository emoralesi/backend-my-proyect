import jwt from 'jsonwebtoken';

const secretKey = 'tu_clave_secreta_jwt';

export function authenticateToken(req, res, next) {

    const token = req.header("tu_clave_secreta_jwt");

    if (!token) {
        return res.status(401).json({ error: 'Token de autenticación no proporcionado' });
    }

    jwt.verify(token, secretKey, (err, user) => {

        if (err) {
            return res.status(403).json({ status: "Forbidden" ,error: 'Token no valido' });
        }

        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
        const tokenExpiration = user.exp; // Tiempo de expiración del token

        console.log("token actual", token);

        if (tokenExpiration - currentTime < 300 ) {
            console.log("TENGO NUEVO TOKEN");
            // Si el tiempo de vida del token es menor de 5 minutos, extenderlo
            const newTokenExpiration = currentTime + 600; // Extender el tiempo en 10 minutos
            const newToken = jwt.sign({ ...user, exp: newTokenExpiration }, secretKey);

            console.log("nuevoToken", newToken);
            res.header("tu_clave_secreta_jwt_extend", newToken); // Actualiza el token en el encabezado de respuesta
            res.header("tu_clave_secreta_jwt", newToken);
        }
        req.user = user;
        console.log("req Headers",res.header);
        console.log("req user after",req.user);
        next();
    });
}