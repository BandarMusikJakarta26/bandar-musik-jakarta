import { z } from "zod";

export const brand = z.object({
    name: z.string().min(1, "Judulnya belom ditulis!"),
    file: z.any()
            .refine(file=>file[0].size >= 0, { message: "Gambar belum masuk!" })
            .refine(file=>file[0].type.split('/')[0] === "image", { message: "File bukan gambar!" })
            .refine(file=>file[0].size <= 3000000, { message: "Maksimal besar gambar 3MB!" })
})

export type BrandType = z.infer<typeof brand>

export type BrandModel = {
    id: string,
    name: string,
    image: string,
    createdAt: string,
    updatedAt: string
}