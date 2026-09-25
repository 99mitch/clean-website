import { llmsFullTxt } from '@/lib/seo/llms';

export const dynamic = 'force-static';

export async function GET() {
  return new Response(await llmsFullTxt(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
