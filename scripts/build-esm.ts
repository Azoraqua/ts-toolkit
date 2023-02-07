(function () {
  const esbuild = require("esbuild");
  const fs = require("fs");
  const path = require("path");

  const src = path.join(process.cwd(), "src");
  const dist = path.join(process.cwd(), "dist");

  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
  }

  esbuild
    .build({
      entryPoints: [path.join(src, "index.ts")],
      outdir: path.join(dist, "esm"),
      bundle: true,
      sourcemap: true,
      minify: true,
      
      format: "esm",
      target: ["esnext"],
    })
    .catch((err: Error) => {
      console.error(err);
    });
})();
