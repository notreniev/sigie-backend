const express = require('express')
const app = express()
const bodyParser = require('body-parser');
import { Router } from '../interfaces/router.interface';
import { config } from './config';
var cors = require('cors')

const corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

export class Server {

  config = config(process.env.NODE_ENV || 'test')

  constructor() { }

  private load(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        app.use(bodyParser.json())
        app.use(cors(corsOptions))
        app.listen(this.config.port, () => resolve(app))
      } catch (error) {
        reject(error)
      }
    })
  }

  private initializeRoutes(routers: Router[]): void {
    for (let router of routers) {
      router.applyRoutes(app)
    }
  }

  bootstrap = async (routers: Router[]) => {
    await this.load().then(() => this.initializeRoutes(routers))
  }
}
