import * as url from "@/app/url/url";

export async function POST(request) {
  const targetUrl = url.convertProxyUrl(request.url);
  console.log("POST targetUrl", targetUrl);
  let req = new Request(targetUrl, request);
  let response;
  await fetch(req)
    .then((res) => res.json())
    .then((payload) => {
      response = payload;
    });
  return Response.json(response);
}

export async function GET(request) {
  const targetUrl = url.convertProxyUrl(request.url);
  console.log("GET targetUrl", targetUrl);
  let req = new Request(targetUrl, request);
  let response;
  await fetch(req)
    .then((res) => res.json())
    .then((payload) => {
      response = payload;
    });
  return Response.json(response);
}
