import { getCollection, type CollectionEntry } from "astro:content";

/** All blog posts, newest first. */
export async function getSortedPosts(): Promise<CollectionEntry<"blog">[]> {
    const posts = await getCollection("blog");
    return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// Frontmatter dates are parsed as UTC midnight, so format them in UTC to
// avoid the date shifting by one day depending on the build machine.
const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
});

export function formatPostDate(date: Date): string {
    return dateFormatter.format(date);
}
