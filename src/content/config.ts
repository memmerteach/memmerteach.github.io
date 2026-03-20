import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    publishAt: z.coerce.date().optional(),
    summary: z.string(),
    description: z.string().optional(),
    socialImage: z.string().optional(),
    socialImageAlt: z.string().optional(),
    published: z.boolean().optional(),
  }),
});

export const collections = { posts };
