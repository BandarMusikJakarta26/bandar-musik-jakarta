import z from 'zod'

export const registerSchema = z.object({
    username: z.string().min(3, 'Username Minimal Berisi 3 Karakter!'),
    password: z.string().min(5, 'Password Minimum Berisi 5 Karakter!')
})

export type registerSchemaType = z.infer<typeof registerSchema>
