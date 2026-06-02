import { defineCollection, z } from "astro:content";

const archiveCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        folder: z.string().min(1),
        description: z.string().optional(),
        eventDate: z.string().optional(),
    }),
});

export const collections = {
    archive: archiveCollection,
};
