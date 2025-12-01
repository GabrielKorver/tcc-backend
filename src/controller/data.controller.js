import dataRepository from "../repository/data.repository.js";

const dataController = {
    async get() {
        return dataRepository.get();
    },

    async post(req, reply) {
        try {
            const { agenda_data } = req.body;

            if (!agenda_data) {
                return reply.status(400).send({
                    error: "Campo obrigatório"
                });
            }

            await dataRepository.post(
                agenda_data
            );

            return reply.status(201).send({
                message: "Data cadastrada com sucesso!"
            });

        } catch (error) {
            console.error("❌ Erro no controller:", error);

            return reply.status(500).send({
                error: "Erro interno no servidor. Tente novamente mais tarde."
            });
        }
    },

    async put(req, reply) {
        try {
            const { id } = req.params;
            const { agenda_data } = req.body;
            await dataRepository.put(id, agenda_data);
            return reply.status(200).send({ message: "Data atualizada com sucesso!" });
        } catch (error) {
            console.error("Erro ao atualizar Data:", error);
            return reply.status(500).send({ message: "Erro interno ao atualizar." });
        }
    },

    async delete(req, reply) {
        try {
            const { id } = req.params;
            const resultado = await dataRepository.delete(id);
            return reply.status(200).send(resultado);
        } catch (error) {
            console.error("Erro ao deletar:", error);
            return reply.status(500).send({ message: "Erro interno ao deletar." });
        }
    }

};

export default dataController;
