export async function onRequest(context) {
  const response = await context.next();

  if (response.status !== 404) {
    return response;
  }

  const requestUrl = new URL(context.request.url);
  const notFoundRequest = new Request(new URL('/404.html', requestUrl.origin), context.request);
  const notFoundResponse = await context.env.ASSETS.fetch(notFoundRequest);
  const headers = new Headers(notFoundResponse.headers);

  headers.set('X-Robots-Tag', 'noindex, follow');
  headers.set('Cache-Control', 'public, max-age=0, must-revalidate');

  return new Response(notFoundResponse.body, {
    status: 404,
    statusText: 'Not Found',
    headers,
  });
}
