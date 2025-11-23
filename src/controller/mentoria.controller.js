import mentoriaRepository from "../repository/mentoria.repository.js";

const mentoriaController = {
  async get(request, reply) {
    try {
      const assuntos = await mentoriaRepository.get();
      return reply.status(200).send(assuntos);
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: "Erro ao buscar os assuntos." });
    }
  },

  async post(request, reply) {
    try {
      const { nome } = request.body;

      if (!nome) {
        return reply
          .status(400)
          .send({ error: "O campo 'nome' é obrigatório." });
      }

      const mentoriaExistentes = await mentoriaRepository.get();
      const nomeJaExiste = mentoriaExistentes.some(
        (mentoria) => mentoria.nome.toLowerCase() === nome.toLowerCase()
      );

      if (nomeJaExiste) {
        return reply
          .status(409)
          .send({ error: `O assunto '${nome}' já existe.` });
      }

      const novaMentoria = await mentoriaRepository.post(nome);

      return reply.status(201).send({
        message: "Mentoria criada com sucesso!",
        data: novaMentoria[0],
      });
    } catch (error) {
      request.log.error(error);
      return reply
        .status(500)
        .send({ error: "Erro interno ao criar o assunto." });
    }
  },
};

export default mentoriaController;
