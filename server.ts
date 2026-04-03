import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;

async function createServer() {
  const app = express();

  let vite: Awaited<ReturnType<typeof createViteServer>> | null = null;

  if (isProduction) {
    // Serve built client assets
    app.use(
      express.static(path.resolve(__dirname, "dist/client"), { index: false })
    );
  } else {
    // Dev mode: create Vite dev server in middleware mode
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  }

  app.use("*", async (req, res) => {
    const url = req.originalUrl;

    try {
      let template: string;
      let render: () => string;

      if (isProduction) {
        template = fs.readFileSync(
          path.resolve(__dirname, "dist/client/index.html"),
          "utf-8"
        );
        const mod = await import("./dist/server/entry-server.js");
        render = mod.render;
      } else {
        template = fs.readFileSync(
          path.resolve(__dirname, "index.html"),
          "utf-8"
        );
        template = await vite!.transformIndexHtml(url, template);
        const mod = await vite!.ssrLoadModule("/src/entry-server.tsx");
        render = mod.render;
      }

      const appHtml = render();
      const html = template.replace("<!--ssr-outlet-->", appHtml);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      if (!isProduction && vite) {
        vite.ssrFixStacktrace(e as Error);
      }
      console.error(e);
      res.status(500).end((e as Error).message);
    }
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

createServer();
