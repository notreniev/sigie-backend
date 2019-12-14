import { Server } from "./src/common/server";
import { cepRouter } from "./src/routes/cep.router";
import { postgresDB } from "./src/common/db";
import { AlunoModel } from "./src/common/db/strategies/postgres/schemas/aluno.schema";
import { CursoModel } from "./src/common/db/strategies/postgres/schemas/curso.schema";
import { InstituicaoModel } from "./src/common/db/strategies/postgres/schemas/instituicao.schema";
import { CepModel } from "./src/common/db/strategies/postgres/schemas/cep.schema";

const server = new Server()
const routers = [cepRouter]

postgresDB.sync()
  .then(() => {

    AlunoModel.sync()
    CursoModel.sync()
    InstituicaoModel.sync()
    CepModel.sync()

    server.bootstrap(routers)
      .then(() => console.log(`Servidor rodando em ${server.config.host + ':' + server.config.port}`))
      .catch(error => {
        console.log('-------------- Erro tentando subir o servidor!!')
        console.error(error)
        process.exit(1)
      })

  }).catch(err => console.log('-------------- Erro na sincronização do modelo!!', err))

