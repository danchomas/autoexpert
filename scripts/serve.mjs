// Local preview of the static export. Deployment only needs the contents of out/.
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";

const root = resolve(import.meta.dirname, "../out");
const port = Number(process.env.PORT || 3100);
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json",
  ".txt": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp",
  ".woff2": "font/woff2", ".ico": "image/x-icon",
};

createServer(async (request, response) => {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  response.setHeader("X-Frame-Options", "DENY");
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" }); response.end(); return;
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    let file = resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(root + sep)) {
      response.writeHead(403); response.end(); return;
    }
    let status = 200;
    try {
      if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
      await stat(file);
    } catch { file = resolve(root, "404.html"); status = 404; }
    const info = await stat(file);
    response.writeHead(status, { "Content-Type": types[extname(file)] || "application/octet-stream", "Content-Length": info.size });
    if (request.method === "HEAD") response.end();
    else createReadStream(file).on("error", () => response.destroy()).pipe(response);
  } catch { response.writeHead(400); response.end(); }
}).listen(port, "0.0.0.0", () => console.log(`Static site: http://localhost:${port}`));
