import { proxyToBackend } from '@/lib/api-proxy';

export async function GET(request: Request) {
  return proxyToBackend(request, '/api/news/db');
}