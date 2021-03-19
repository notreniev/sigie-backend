import 'jest';
import * as request from 'supertest';

let address: string = (<any>global).address;

test('get alunos', () => {
    return request(address).get('/alunos').then(response => {
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    }).catch(fail);
});