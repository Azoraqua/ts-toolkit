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
      outdir: path.join(dist, "cjs"),
      bundle: true,
      sourcemap: true,
      minify: true,
      format: "cjs",
      platform: "node",
      target: ["node16"],
    })
    .catch((err: Error) => {
      console.error(err);
    });
})();
