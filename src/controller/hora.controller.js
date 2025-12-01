import horaRepository from "../repository/hora.repository.js";

const horaController = {
    async get() {
        return horaRepository.get();
    },

    async post(req, reply) {
        try {
            const { agenda_hora } = req.body;

            if (!agenda_hora) {
                return reply.status(400).send({
                    error: "Campo obrigatório"
                });
            }

            await horaRepository.post(
                agenda_hora
            );

            return reply.status(201).send({
                message: "Hora cadastrada com sucesso!"
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
            const { agenda_hora } = req.body;
            await horaRepository.put(id, agenda_hora);
            return reply.status(200).send({ message: "Hora atualizada com sucesso!" });
        } catch (error) {
            console.error("Erro ao atualizar Data:", error);
            return reply.status(500).send({ message: "Erro interno ao atualizar." });
        }
    },

    async delete(req, reply) {
        try {
            const { id } = req.params;
            const resultado = await horaRepository.delete(id);
            return reply.status(200).send(resultado);
        } catch (error) {
            console.error("Erro ao deletar:", error);
            return reply.status(500).send({ message: "Erro interno ao deletar." });
        }
    }


};

export default horaController;
