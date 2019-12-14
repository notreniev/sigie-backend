const express = require('express')
const app = express()

import { Router } from '../interfaces/router.interface';
import { config } from './config';

export class Server {

  config = config(process.env.NODE_ENV || 'development')

  constructor() { }

  private load(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
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
