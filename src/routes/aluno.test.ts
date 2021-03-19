import 'jest';
import * as request from 'supertest';

let address: string = (<any>global).address;

test('get alunos', () => {
    return request(address).get('/alunos')
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Array)
        }).catch(fail);
});

test('post /aluno', () => {
    const aluno = {
        "aluno": {
            "nome": "João da Silva",
            "cpf": 6890909202020,
            "celular": "051991120621",
            "email": "joao.silva@gmail.com"
        }
    }
    return request(address)
        .post('/aluno')
        .send(aluno)
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.nome).toBe('João da Silva')
            expect(response.body.cpf).toBe('6890909202020')
            expect(response.body.celular).toBe('051991120621')
            expect(response.body.email).toBe('joao.silva@gmail.com')
        }).catch(fail)
})