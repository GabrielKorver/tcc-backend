// INSTALA O FASTIFY E IMPORTA ELE MESMO
// INSTALA O CORS E IMPORTA ELE MESMO
// npm install fastify
import Fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";

// IMPORTANDO AS ROTAS
import usersRoutes from "./routes/users.routes.js";
import perguntasRoutes from "./routes/perguntas.routes.js";
import nodeMailRoutes from "./routes/nodemail.routes.js";

//HABILITA O FASTIFY
const fastify = Fastify({
  logger: true,
});

// HABILITA O DOTENV
dotenv.config();

// HABILITA O CORS
fastify.register(cors, {
  origin: "*", // ou coloque a URL do seu front-end
  methods: ["GET", "POST", "PUT", "DELETE"],
});

fastify.register(usersRoutes, {
  prefix: "/users",
});

fastify.register(perguntasRoutes, {
  prefix: "/perguntas",
});

fastify.register(nodeMailRoutes, {
  prefix: "/mail",
});

// ROTA DE EXEMPLO DO FASTIFY
fastify.get("/", async function handler(request, reply) {
  return { Servidor: "Rodando na porta 3000" };
});

// INICIALIZAÇÃO DO SERVERVIDOR
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
