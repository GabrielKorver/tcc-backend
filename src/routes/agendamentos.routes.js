import agendamentosController from "../controller/agendamentos.controller.js";

export default function agendamentosRoutes(fastify) {
    //BUSCAR AGENDAMENTO
    fastify.get("/get", async () => {
        return agendamentosController.get();
    });

    //CRIAR AGENDAMENTO
    fastify.post("/post", async (req, reply) => {
        return agendamentosController.post(req, reply);
    });

    fastify.delete('/delete/:id', async (req, reply) => {
        return agendamentosController.delete(req, reply);
    });


    fastify.put("/put/:id", async (req, reply) => {
        return agendamentosController.put(req, reply);
    });
}
