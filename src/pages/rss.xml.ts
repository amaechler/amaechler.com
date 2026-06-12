import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { site } from "../data/siteMetadata";
import { getSortedPosts } from "../lib/posts";

export const GET: APIRoute = async () => {
    const posts = await getSortedPosts();

    return rss({
        title: site.title,
        description: site.description,
        site: site.siteUrl,
        items: posts.map(post => ({
            title: post.data.title,
            description: post.data.description ?? "",
            pubDate: post.data.date,
            link: `/blog/${post.id}/`
        }))
    });
};
