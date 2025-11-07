import perguntasRepository from "../repository/perguntas.repository.js"

const perguntasController = {
    async get() {
        return perguntasRepository.get()
    },

    async post(req, res) {
        const { titulo, descricao, tecnologias, data_criacao, user_id } = req.body

        await perguntasRepository.post(titulo, descricao, tecnologias, data_criacao, user_id)

        return 'Pergunta cadastrada com sucesso!'
    }

}

export default perguntasController