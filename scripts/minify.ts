import fs from "fs";
import path, { basename } from "path";
import { minify } from "terser";

const PATHS = [path.join("dist", "cjs"), path.join("dist", "esm")];

PATHS.forEach((p) => {
  fs.readdirSync(p).forEach(async (f) => {
    if (f.includes(".d.ts") || f.includes(".map")) {
      return;
    }

    const t = p.includes("esm") ? "esm" : "cjs";
    const ff = path.join(__dirname, "..", p, f);
    const oc = fs.readFileSync(ff).toString("utf8");

    try {
      const r = await minify(oc, {
        compress: true,
        sourceMap: true,
        ecma: t === "esm" ? 5 : undefined,
      });

      fs.writeFileSync(ff, r.code!!);

      if (r.map) {
        fs.writeFileSync(`${ff}.map`, r.map.toString());
      }
    } catch (err) {
      console.warn(`${ff} is already minified.`);
      return;
    }
  });
});
