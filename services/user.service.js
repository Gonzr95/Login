import { User } from '../models/user.js'; 
import { hashPassword, comparePassword} from '../utils/bcrypt.js'; 
import { generateToken } from '../utils/jwt.js';
import { BlacklistedToken } from '../models/blacklistedToken.js';

export async function register(userData) {
    const { firstName, lastName, mail, pass } = userData;

    // 1. Lógica de negocio: Hashear password
    const hashedPass = await hashPassword(pass);

    // 2. Persistencia: Crear usuario
    // El error de Sequelize se lanzará aquí y subirá al controller
    const newUser = await User.create({
        firstName,
        lastName,
        mail,
        pass: hashedPass
    });

    // 3. Retornar solo lo necesario (buena práctica: no devolver el pass)
    // Sequelize suele devolver el objeto completo en .dataValues o similar
    const userResponse = newUser.toJSON();
    delete userResponse.pass; 
    
    return userResponse;
}

export async function loginUser({ mail, pass }) {
    // 1. Buscar usuario por email
    const user = await User.findOne({ where: { mail } });

    if (!user) {
        // Por seguridad, es mejor decir "Credenciales inválidas" que "Usuario no existe"
        // pero para aprender, aquí sabremos que falló el usuario.
        throw new Error("USER_NOT_FOUND"); 
    }

    // 2. Comparar contraseñas
    // Asumiendo que usas bcrypt directo o tu utilidad
    //const isPasswordValid = await bcrypt.compare(pass, user.pass);
    const isPasswordValid = await comparePassword(pass, user.pass)
    if (!isPasswordValid) {
        throw new Error("WRONG_PASSWORD");
    }

    // 3. Generar Token
    // Guardamos en el token datos útiles (id, email, rol) pero NUNCA la password
    const token = generateToken({ id: user.id, mail: user.mail });

    // 4. Retornar info del usuario (sin pass) y el token
    const userData = user.toJSON();
    delete userData.pass;

    return { token, user: userData };
}

export async function logoutUser(token) {
    // Simplemente guardamos el token en la lista negra
    await BlacklistedToken.create({ token });
}