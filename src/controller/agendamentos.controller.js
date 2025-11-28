import agendamentosRepository from "../repository/agendamentos.repository.js";

const agendamentosController = {
    async get() {
        return agendamentosRepository.get();
    },

    async post(req, reply) {
        try {
            const { nome, telefone, data_agendamento, mentoria_id } = req.body;

            const data_criacao = new Date().toISOString().slice(0, 19).replace("T", " ");

            // Campos obrigatórios
            if (!nome || !telefone || !data_agendamento) {
                return reply.status(400).send({
                    message: "Campos obrigatórios faltando. (nome, telefone e data_agendamento)"
                });
            }

            // Validação telefone brasileiro
            const telefoneRegex = /^\(?\d{2}\)?\s?\d{5}-?\d{4}$/;

            if (!telefoneRegex.test(telefone)) {
                return reply.status(400).send({
                    message: "Telefone inválido. Use formato 11999999999 ou (11) 99999-9999"
                });
            }

            // Data de agendamento
            const agora = new Date();
            const dataAgendamentoDate = new Date(data_agendamento);

            if (isNaN(dataAgendamentoDate.getTime())) {
                return reply.status(400).send({
                    message: "Data de agendamento inválida"
                });
            }

            if (dataAgendamentoDate <= agora) {
                return reply.status(400).send({
                    message: "A data do agendamento deve ser futura"
                });
            }

            // Criar agendamento
            await agendamentosRepository.post(
                nome,
                telefone,
                data_agendamento,
                data_criacao,
                mentoria_id
            );

            return reply.status(201).send({
                message: "Agendamento cadastrado com sucesso!"
            });

        } catch (error) {
            console.error("❌ Erro no controller:", error);

            return reply.status(500).send({
                message: "Erro interno no servidor. Tente novamente mais tarde."
            });
        }
    },


    async delete(req, reply) {
        const { id } = req.params
        await agendamentosRepository.delete(id)
        return agendamentosRepository.delete()
    }


};

export default agendamentosController;