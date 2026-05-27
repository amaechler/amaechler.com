import { getCollection } from 'astro:content';
import { getRssString } from '@astrojs/rss';

export async function GET(context: any) {
  const posts = await getCollection('blog')
    .then(p => p.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()));

  const rss = await getRssString({
    title: 'extralife',
    description: 'Andreas Maechler - who lives and works in Calgary.',
    site: context.site ?? 'https://amaechler.com/',
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description ?? '',
      pubDate: post.data.date,
      link: `/${post.id.replace(/^blog\//, '')}/`,
    })),
  });

  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
