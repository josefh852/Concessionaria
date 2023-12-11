import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/camionete', (request, reply) => {
// Acessando dados do corpo da requisição
    const {modelo, marca, cor} = request.body
// Exibindo dados
//    console.log(body)
   
    // return 'cadastrar'
    database.create({
        modelo: modelo,
        marca: marca,
        cor: cor,
    })

    return reply.status(201).send
})

server.get('/camionete', (request) => {
    const search = request.query.search
    console.log(search)
    const camionetes = database.list(search)
    console.log(camionetes)
    return camionetes
})

server.put('/camionetes/:id', (request, reply) => {
    const camioneteId = request.params.id
    const {modelo, marca, cor} = request.body
    const camionete = database.update(camioneteId, {
        modelo: modelo,
        marca: marca,
        cor: cor,
    })
    return reply.status(204).send()
})

server.delete('/camionetes/:id', (request, reply) => {
    const camioneteId = request.params.id

    database.delete(camioneteId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})
