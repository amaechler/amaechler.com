import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

function toLocalDate(value: unknown): Date {
    if (value instanceof Date) {
        return new Date(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate());
    }

    if (typeof value === "string") {
        const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (match) {
            const [, year, month, day] = match;
            return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
        }
    }

    return new Date(value as string | number | Date);
}

const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.preprocess(toLocalDate, z.date())
    })
});

export const collections = { blog };
