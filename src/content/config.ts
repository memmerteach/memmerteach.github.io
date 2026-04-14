import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    publishAt: z.coerce.date().optional(),
    summary: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
      credit: z.string().optional(),
      creditUrl: z.string().optional(),
    }).optional(),
    published: z.boolean().optional(),
  }),
});

export const collections = { posts };
