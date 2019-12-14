import { Server } from "./src/common/server";
import { cepRouter } from "./src/routes/cep.router";

const server = new Server()
const routers = [cepRouter]

server.bootstrap(routers)
  .then(() => console.log(`Server is running on ${server.config.host + ':' + server.config.port}`))
  .catch(error => {
    console.log('Error on trying t o load express server')
    console.error(error)
    process.exit(1)
  })
