import { randomUUID } from "crypto"

export class DatabaseMemory{
#camionetes = new Map()

list(search){
    return Array.from(this.#camionetes.entries()).map((camionetesArray) =>{
    // acessando primeira posição
        const id = camionetesArray[0]
        const data = camionetesArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(camionete => {
        if (search){
            return camionete.titulo.includes(search)
        }
        return true
    })
}
create(camionete){
    const camioneteId = randomUUID()
    this.#camionetes.set(camioneteId, camionete)
}
update(id, camionete){
    this.#camionetes.set(id, camionete)
}
delete(id, camionete){
    this.#camionetes.delete(id, camionete)
}
}
