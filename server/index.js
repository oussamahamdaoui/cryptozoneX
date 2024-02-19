//@ts-check

import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { join } from "path";
import fs from "fs";

const app = Fastify({ logger: false });

app.register(fastifyStatic, {
  root: join(process.cwd(), "dist"),
});

app.setNotFoundHandler((_, res) => {
  res.send(fs.createReadStream(join(process.cwd(), "dist", "index.html")));
});

app.listen({ port: 3000 });
