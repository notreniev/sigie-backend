import { config as Config } from './src/common/config';
import * as jestCli from 'jest-cli'
import { Server } from './src/common/server';
import { alunoRouter } from './src/routes/aluno.router';


let server: Server
let config;

const beforeAllTests = () => {
    config = Config(process.env.NODE_ENV || 'test')
    server = new Server()
    return server.bootstrap([alunoRouter])
}


const afterAllTests = () => {
    process.exit()
}

beforeAllTests()
    .then(() => jestCli.run())
    .then(() => afterAllTests())
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
