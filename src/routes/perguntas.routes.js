import perguntasController from "../controller/perguntas.controller.js"

export default function perguntasRoutes(fastify) {

    //BUSCAR PERGUNTAS
    fastify.get('/get', async () => {
        return perguntasController.get()
    })

    //CRIAR PERGUNTAS
    fastify.post('/post', async (req, res) => {
        return perguntasController.post(req)
    })

}