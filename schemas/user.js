import { z } from 'zod';

export const registerUserSchema = z.object({
    firstName: z.string({
        required_error: "El nombre es obligatorio",
        invalid_type_error: "El nombre debe ser un texto"
    }).min(2, { message: "El nombre debe tener al menos 2 caracteres" }),

    lastName: z.string({
        required_error: "El apellido es obligatorio"
    }).min(2, { message: "El apellido debe tener al menos 2 caracteres" }),

    mail: z.string({
        required_error: "El email es obligatorio",
    })
    .email("Formato de email inválido") // 👈 Mensaje de error directamente como argumento de .email()
    .nonempty("El email es obligatorio"), // 👈 Opcional: para asegurar que no sea un string vacío

    pass: z.string({
        required_error: "La contraseña es obligatoria"
    }).min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
});