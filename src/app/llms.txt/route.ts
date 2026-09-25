import { llmsTxt } from '@/lib/seo/llms';

export const dynamic = 'force-static';

export async function GET() {
  return new Response(await llmsTxt(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
