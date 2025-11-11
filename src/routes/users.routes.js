import usersController from "../controller/users.controller.js";

export default function usersRoutes(fastify) {
  //BUSCAR USUARIO
  fastify.get("/get", async () => {
    return usersController.get();
  });

  //CRIAR USUARIO
  fastify.post("/post", async (req, reply) => {
    return usersController.post(req);
  });

  fastify.post("/login", async (req, reply) => {
    return usersController.login(req, reply);
  });

  fastify.put("/put/:id", async (req, reply) => {
    return usersController.put(req, reply);
  });
}
