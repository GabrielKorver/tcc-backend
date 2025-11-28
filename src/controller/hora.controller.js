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

    async delete(req, reply) {
        const { id } = req.params
        await horaRepository.delete(id)
        return horaRepository.delete()
    }
};

export default horaController;
