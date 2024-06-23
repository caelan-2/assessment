/**
 * Proxy route is used to make requests on behalf of the browser to the TOM API.
 */

import * as url from "@/app/url/url";

// handle proxying POST requests.
export async function POST(request) {
  const targetUrl = url.convertProxyUrl(request.url);
  let req = new Request(targetUrl, request);
  let response;
  await fetch(req)
    .then((res) => res.json())
    .then((payload) => {
      response = payload;
    });
  return Response.json(response);
}

// handle proxying GET requests.
export async function GET(request) {
  const targetUrl = url.convertProxyUrl(request.url);
  let req = new Request(targetUrl, request);
  let response;
  await fetch(req)
    .then((res) => res.json())
    .then((payload) => {
      response = payload;
    });
  return Response.json(response);
}
