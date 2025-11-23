import agendamentosRepository from "../repository/agendamentos.repository.js";

const agendamentosController = {
    async get() {
        return agendamentosRepository.get();
    },

    async post(req, reply) {
        try {
            const { nome, telefone, data_agendamento, mentoria_id } = req.body;

            const data_criacao = new Date().toISOString().slice(0, 19).replace("T", " ");

            //  Campos obrigatórios
            if (!nome || !telefone || !data_agendamento) {
                return reply.status(400).send({
                    error: "Campos obrigatórios faltando. (nome, telefone e data_agendamento)"
                });
            }

            //  Validação do telefone (Brasil)
            // Aceita: (11)99999-9999, 11999999999, 11 99999-9999
            const telefoneRegex = /^\(?\d{2}\)?\s?\d{5}-?\d{4}$/;

            if (!telefoneRegex.test(telefone)) {
                return reply.status(400).send({
                    error: "Telefone inválido. Use formato brasileiro: 11999999999 ou (11) 99999-9999"
                });
            }

            // Validar se a data é futura
            const agora = new Date();
            const dataAgendamentoDate = new Date(data_agendamento);

            if (isNaN(dataAgendamentoDate.getTime())) {
                return reply.status(400).send({
                    error: "Data de agendamento inválida"
                });
            }

            if (dataAgendamentoDate <= agora) {
                return reply.status(400).send({
                    error: "A data do agendamento deve ser futura"
                });
            }

            // Intervalo mínimo de 2 horas entre agendamentos
            const agendamentosExistentes = await agendamentosRepository.get();

            const duasHoras = 2 * 60 * 60 * 1000; // ms

            const conflito = agendamentosExistentes.some(a => {
                const dataBanco = new Date(a.data_agendamento);
                return Math.abs(dataBanco - dataAgendamentoDate) < duasHoras;
            });

            if (conflito) {
                return reply.status(400).send({
                    error: "Já existe um agendamento próximo a este horário. Deve haver um intervalo mínimo de 2 horas."
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
                error: "Erro interno no servidor. Tente novamente mais tarde."
            });
        }
    }


};

export default agendamentosController;
