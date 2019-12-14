import express = require('express')
import { EventEmitter } from "events";

export abstract class Router extends EventEmitter {
    abstract applyRoutes(application: express.Application):void
}