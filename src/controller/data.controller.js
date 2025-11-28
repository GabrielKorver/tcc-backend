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

    async delete(req, reply) {
        const { id } = req.params
        await dataRepository.delete(id)
        return dataRepository.delete()
    }
};

export default dataController;
