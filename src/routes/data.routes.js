import dataController from "../controller/data.controller.js";

export default function dataRoutes(fastify) {

    fastify.get("/get", async () => {
        return dataController.get();
    });

    fastify.post("/post", async (req, reply) => {
        return dataController.post(req, reply);
    });

    fastify.delete('/delete/:id', async (req, reply) => {
        return dataController.delete(req, reply);
    })

    fastify.put("/put/:id", async (req, reply) => {
        return dataController.put(req, reply);
    });
}
