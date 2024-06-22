export const TOM_API_V3_URL = "https://api.up2tom.com/v3";

export function remoteApiEndpoint(endpoint) {
  return `${TOM_API_V3_URL}/${endpoint.replace(/^\//gi, "")}`;
}

export function localApiEndpoint(endpoint) {
  return `/api/${endpoint.replace(/^\//gi, "")}`;
}

export function proxyEndpoint(endpoint) {
  return `/proxy/${endpoint.replace(/^\//gi, "")}`;
}

export function convertProxyUrl(url) {
  return remoteApiEndpoint(url.replace("http://localhost:3000/proxy", ""));
}
