import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { site } from "../data/siteMetadata";

export const GET: APIRoute = async context => {
    const posts = (await getCollection("blog")).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

    return rss({
        title: site.title,
        description: `${site.author.name} - ${site.author.summary}`,
        site: context.site ?? site.siteUrl,
        items: posts.map(post => ({
            title: post.data.title,
            description: post.data.description ?? "",
            pubDate: post.data.date,
            link: `/blog/${post.id}/`
        }))
    });
};
