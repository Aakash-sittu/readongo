import { NextResponse } from 'next/server';

export async function proxyToBackend(request: Request, path: string, options?: RequestInit) {
  try {
    const backendUrl = process.env.BACKEND_URL || 'https://readongo-backend-1020797407515.europe-west1.run.app';
    
    // Extract query parameters from the incoming request URL
    const { search } = new URL(request.url);
    const url = `${backendUrl}${path}${search}`;
    
    const res = await fetch(url, {
      ...options,
      cache: 'no-store',
    });

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    } else {
      const text = await res.text();
      return new Response(text, {
        status: res.status,
        headers: {
          'Content-Type': contentType || 'text/plain',
        },
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', message: error.message || 'Failed to proxy request to backend' },
      { status: 500 }
    );
  }
}
