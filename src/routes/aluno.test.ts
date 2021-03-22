import 'jest';
import * as request from 'supertest';

let address: string = (<any>global).address;

const aluno = {
    "aluno": {
        "nome": "João da Silva",
        "cpf": "68909092020",
        "celular": "05199112062",
        "email": "joao.silva@gmail.com"
    }
}

test('if it gets /alunos', () => {
    return request(address).get('/alunos')
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Array)
        }).catch(fail);
});

test('if it patches /aluno/:id', () => {
    return request(address)
        .post('/aluno')
        .send({
            aluno: {
                nome: 'usuario2',
                cpf: '689.256.380-53',
                celular: '051991120621',
                email: 'usuario2@email.com'
            }
        })
        .then(response => request(address)
            .patch(`/aluno/${response.body.id}`)
            .send({
                aluno: {
                    id: response.body.id,
                    nome: 'usuario4 - patch',
                    cpf: '689.256.380-00',
                    celular: '051991120633',
                    email: 'usuario4@email.com'
                }
            }))
        .then(response => request(address)
            .get(`/aluno/${response.body.id}`))
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.id).toBeDefined()
            expect(response.body.nome).toBe('usuario4 - patch')
            expect(response.body.email).toBe('usuario4@email.com')
        })
        .catch(fail)
})