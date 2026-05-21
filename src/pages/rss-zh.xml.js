import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const notes = await getCollection('notes', ({ data }) =>
    !data.draft && !data.archived && data.lang === 'zh'
  );

  return rss({
    title: 'Myles Liu — 笔记',
    description: '思维的碎片。',
    site: context.site,
    items: notes
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map(note => {
        // ZH notes 没有独立页面，链到对应的 EN 页面
        // enSlug 字段优先，否则去掉 -zh 后缀
        const enSlug = note.data.enSlug ?? note.slug.replace(/-zh$/, '');
        return {
          title: note.data.title,
          description: note.data.description ?? '',
          pubDate: note.data.date,
          link: `/notes/${enSlug}/`,
        };
      }),
    customData: `<language>zh-CN</language>`,
  });
}
