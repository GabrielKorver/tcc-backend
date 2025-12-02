import respostasController from "../controller/respostas.controller.js";

export default function respostasRoutes(fastify) {

    fastify.get("/get", async () => {
        return respostasController.get();
    });

    fastify.post("/post", async (req, reply) => {
        return respostasController.post(req, reply);
    });

    // fastify.delete('/delete/:id', async (req, reply) => {
    //     return dataController.delete(req, reply);
    // })

    // fastify.put("/put/:id", async (req, reply) => {
    //     return dataController.put(req, reply);
    // });
}
