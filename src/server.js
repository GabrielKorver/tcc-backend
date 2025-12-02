// INSTALA O FASTIFY E IMPORTA ELE MESMO
// INSTALA O CORS E IMPORTA ELE MESMO
// npm install fastify
import Fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";

// IMPORTANDO AS ROTAS
import usersRoutes from "./routes/users.routes.js";
import perguntasRoutes from "./routes/perguntas.routes.js";
import respostasRoutes from "./routes/respostas.routes.js";
import nodeMailRoutes from "./routes/nodemail.routes.js";
import assuntosRoutes from "./routes/assuntos.routes.js";
import mentoriaRoutes from "./routes/mentoria.routes.js";
import agendamentosRoutes from "./routes/agendamentos.routes.js";
import dataRoutes from "./routes/data.routes.js";
import horaRoutes from "./routes/hora.routes.js";

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

fastify.register(respostasRoutes, {
  prefix: "/respostas",
});

fastify.register(assuntosRoutes, {
  prefix: "/assuntos",
});

fastify.register(mentoriaRoutes, {
  prefix: "/mentoria",
});

fastify.register(agendamentosRoutes, {
  prefix: "/agendamentos",
});

fastify.register(dataRoutes, {
  prefix: "/data",
});

fastify.register(horaRoutes, {
  prefix: "/hora",
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
