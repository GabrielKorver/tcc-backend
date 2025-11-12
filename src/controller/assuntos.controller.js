import assuntosRepository from "../repository/assuntos.repository.js";

const assuntosController = {
  async get(request, reply) {
    try {
      const assuntos = await assuntosRepository.get();
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

      const assuntosExistentes = await assuntosRepository.get();
      const nomeJaExiste = assuntosExistentes.some(
        (assunto) => assunto.nome.toLowerCase() === nome.toLowerCase()
      );

      if (nomeJaExiste) {
        return reply
          .status(409)
          .send({ error: `O assunto '${nome}' já existe.` });
      }

      const novoAssunto = await assuntosRepository.post(nome);

      return reply.status(201).send({
        message: "Assunto criado com sucesso!",
        data: novoAssunto[0],
      });
    } catch (error) {
      request.log.error(error);
      return reply
        .status(500)
        .send({ error: "Erro interno ao criar o assunto." });
    }
  },
};

export default assuntosController;
