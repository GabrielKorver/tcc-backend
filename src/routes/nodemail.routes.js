import nodeMailController from "../controller/nodemail.controller.js";

export default function nodeMailRoutes(fastify) {
  fastify.get("/recuperar", async () => {
    return nodeMailController.get();
  });

  fastify.post("/recuperar", async (req, reply) => {
    return nodeMailController.recuperar(req, reply);
  });
}
