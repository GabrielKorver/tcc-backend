import horaController from "../controller/hora.controller.js";

export default function horaRoutes(fastify) {

    fastify.get("/get", async () => {
        return horaController.get();
    });

    fastify.post("/post", async (req, reply) => {
        return horaController.post(req, reply);
    });

    fastify.delete('/delete/:id', async (req, reply) => {
        return horaController.delete(req)
    })

    //   fastify.put("/put/:id", async (req, reply) => {
    //     return usersController.put(req, reply);
    //   });
}
