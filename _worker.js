export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404) {
      return response;
    }

    const requestUrl = new URL(request.url);
    const notFoundUrl = new URL('/404.html', requestUrl.origin);
    const notFoundResponse = await env.ASSETS.fetch(new Request(notFoundUrl, request));
    const headers = new Headers(notFoundResponse.headers);

    headers.set('Content-Type', 'text/html; charset=utf-8');
    headers.set('X-Robots-Tag', 'noindex, follow');
    headers.set('Cache-Control', 'public, max-age=0, must-revalidate');

    return new Response(notFoundResponse.body, {
      status: 404,
      statusText: 'Not Found',
      headers,
    });
  },
};
