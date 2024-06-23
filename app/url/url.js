/**
 * This file provides string formatting functions for URLs
 */

export const TOM_API_V3_URL = "https://api.up2tom.com/v3";

// remoteApiEndpoint prepends 'endpoint' with the URL for the TOM API.
export function remoteApiEndpoint(endpoint) {
  return `${TOM_API_V3_URL}/${endpoint.replace(/^\//, "")}`;
}

// localApiEndpoint prepends 'endpoint' with '/api/'.
// this is used to access this apps api routes.
export function localApiEndpoint(endpoint) {
  return `/api/${endpoint.replace(/^\//, "")}`;
}

// proxyEndpoint prepends 'endpoint' with '/proxy/'.
// this is used to access the proxy route which will forward the request to the TOM API.
export function proxyEndpoint(endpoint) {
  return `/proxy/${endpoint.replace(/^\//, "")}`;
}

// convertProxyUrl converts a URL from the proxy to the TOM API.
// it replaces the 'localhost/proxy' base url with the URL for the TOM API.
export function convertProxyUrl(url) {
  return remoteApiEndpoint(url.replace("http://localhost:3000/proxy", ""));
}
