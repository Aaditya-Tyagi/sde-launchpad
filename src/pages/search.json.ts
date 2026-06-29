import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { TRACKS } from '../data/curriculum';

const trackName = (id: string) => TRACKS.find((t) => t.id === id)?.name || id;

export const GET: APIRoute = async () => {
  const lessons = (await getCollection('lessons')).filter((l) => !l.data.draft);
  const index = lessons.map((l) => ({
    title: l.data.title,
    track: trackName(l.data.track),
    url: `/lessons/${l.id}`,
    tags: l.data.tags,
    summary: l.data.summary,
  }));
  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
