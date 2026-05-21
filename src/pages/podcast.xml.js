import { getCollection } from 'astro:content';

// 音频文件托管在 GitHub Releases tag: podcast
const AUDIO_BASE = 'https://github.com/mylesio/mylesio.github.io/releases/download/podcast';

// 已生成音频的 ZH notes 列表（slug → 文件大小 bytes）
const AUDIO_FILES = {
  'deepseek-v4-context-engineering-zh': 2728320,
};

export async function GET(context) {
  const notes = await getCollection('notes', ({ data, slug }) =>
    !data.draft &&
    !data.archived &&
    data.lang === 'zh' &&
    AUDIO_FILES[slug] !== undefined
  );

  const sorted = notes.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const siteUrl = context.site?.toString().replace(/\/$/, '') ?? 'https://mylesio.github.io';

  const items = sorted.map(note => {
    const audioFile = `${note.slug}.mp3`;
    const audioUrl = `${AUDIO_BASE}/${audioFile}`;
    const fileSize = AUDIO_FILES[note.slug];
    const pubDate = note.data.date.toUTCString();

    return `
    <item>
      <title>${escapeXml(note.data.title)}</title>
      <description>${escapeXml(note.data.description ?? '')}</description>
      <link>${siteUrl}/notes/${note.data.enSlug ?? note.slug.replace(/-zh$/, '')}/</link>
      <guid isPermaLink="true">${siteUrl}/notes/${note.data.enSlug ?? note.slug.replace(/-zh$/, '')}/</guid>
      <pubDate>${pubDate}</pubDate>
      <enclosure url="${audioUrl}" length="${fileSize}" type="audio/mpeg"/>
      <itunes:duration>0</itunes:duration>
      <itunes:summary>${escapeXml(note.data.description ?? '')}</itunes:summary>
    </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Myles Liu — 播客笔记</title>
    <description>思维的碎片，用声音呈现。</description>
    <link>${siteUrl}</link>
    <language>zh-CN</language>
    <itunes:author>Myles Liu</itunes:author>
    <itunes:category text="Technology"/>
    <itunes:explicit>false</itunes:explicit>
    <itunes:image href="${siteUrl}/favicon.svg"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
