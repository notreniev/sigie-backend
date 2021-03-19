import { Server } from "./src/common/server";
import { cepRouter } from "./src/routes/cep.router";
import { postgresDB } from "./src/common/db";
import { AlunoModel } from "./src/common/db/strategies/postgres/schemas/aluno.schema";
import { CursoModel } from "./src/common/db/strategies/postgres/schemas/curso.schema";
import { InstituicaoModel } from "./src/common/db/strategies/postgres/schemas/instituicao.schema";
import { CepModel } from "./src/common/db/strategies/postgres/schemas/cep.schema";
import { alunoRouter } from "./src/routes/aluno.router";
import { cursoRouter } from "./src/routes/curso.router";
import { instituicaoRouter } from "./src/routes/instituicao.router";

const server = new Server()
const routers = [alunoRouter, cursoRouter, instituicaoRouter, cepRouter]

postgresDB.sync()
  .then(() => {

    AlunoModel.sync()
    CursoModel.sync()
    InstituicaoModel.sync()
    CepModel.sync()

    server.bootstrap(routers)
      .then(() => {
        console.log(`|||||||||||||| Servidor rodando em ${server.config.host + ':' + server.config.port}`)
      })
      .catch(error => {
        console.log('xxxxxxxxxxxxxx Erro tentando subir o servidor!!')
        console.error(error)
        process.exit(1)
      })

  }).catch(err => console.log('xxxxxxxxxxxxxx Erro na sincronização do modelo!!', err))

