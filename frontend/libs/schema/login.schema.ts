import z from 'zod'

export const loginSchema = z.object({
    username: z.string().min(3, 'Username Minimal Berisi 3 Karakter!'),
    password: z.string().min(5, 'Password Minimum Berisi 5 Karakter!')
})

export type loginSchemaType = z.infer<typeof loginSchema>
