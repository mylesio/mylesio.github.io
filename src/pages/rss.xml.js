import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const allNotes = await getCollection('notes');

  const enNotes = allNotes.filter(({ data }) =>
    !data.draft && !data.archived && data.lang !== 'zh'
  );
  const zhNotes = allNotes.filter(({ data }) => data.lang === 'zh');

  return rss({
    title: 'Myles Liu — Notes',
    description: 'Fragments of thought.',
    site: context.site,
    items: enNotes
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map(note => {
        // 找对应 ZH note：优先 zhSlug，否则 slug + '-zh'
        const zhSlug = note.data.zhSlug ?? `${note.slug}-zh`;
        const zhNote = zhNotes.find(z => z.slug === zhSlug);
        const description = zhNote?.data.description ?? note.data.description ?? '';

        return {
          title: note.data.title,
          description,
          pubDate: note.data.date,
          link: `/notes/${note.slug}/`,
        };
      }),
    customData: `<language>en</language>`,
  });
}
