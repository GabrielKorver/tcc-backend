import mentoriaController from "../controller/mentoria.controller.js";

export default async function mentoriaRoutes(fastify) {
  // BUSCA A MENTORIA
  fastify.get("/get", async (req, reply) => {
    return mentoriaController.get(req, reply);
  });

  // CRIA A MENTORIA
  fastify.post("/post", async (req, reply) => {
    return mentoriaController.post(req, reply);
  });
}
