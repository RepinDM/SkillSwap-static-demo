import http from "node:http";

const API_HOST = "skillswap.ovnet.ru";

function buildQuery(query) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (key === "path" || value === undefined) {
      continue;
    }

    for (const item of Array.isArray(value) ? value : [value]) {
      params.append(key, item);
    }
  }

  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

export default function handler(request, response) {
  const segments = request.query.path;
  const path = Array.isArray(segments) ? segments.join("/") : segments ?? "";
  const headers = { ...request.headers, host: API_HOST };

  // The legacy API is HTTP-only, so the browser calls this same-origin function instead.
  const upstreamRequest = http.request(
    {
      hostname: API_HOST,
      port: 80,
      path: `/api/${path}${buildQuery(request.query)}`,
      method: request.method,
      headers,
    },
    (upstreamResponse) => {
      response.status(upstreamResponse.statusCode ?? 502);

      for (const [name, value] of Object.entries(upstreamResponse.headers)) {
        if (value !== undefined && name !== "connection" && name !== "transfer-encoding") {
          response.setHeader(name, value);
        }
      }

      upstreamResponse.pipe(response);
    },
  );

  upstreamRequest.on("error", () => {
    response.status(502).json({ message: "The SkillSwap API is temporarily unavailable." });
  });

  request.pipe(upstreamRequest);
}
