import assuntosController from "../controller/assuntos.controller.js";

export default async function assuntosRoutes(fastify) {
  // BUSCA O ASSUNTO
  fastify.get("/get", async (req, reply) => {
    return assuntosController.get(req, reply);
  });

  // CRIA O ASSUNTO
  fastify.post("/post", async (req, reply) => {
    return assuntosController.post(req, reply);
  });
}
