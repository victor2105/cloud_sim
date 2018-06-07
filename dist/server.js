"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const errorHandler = require("errorhandler");
const methodOverride = require("method-override");
const Simulator_1 = require("./api/Simulator");
const cors = require("cors");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.config();
        this.api();
    }
    api() {
        let router;
        router = express.Router();
        Simulator_1.Simulator.create(router);
        this.app.use(router);
    }
    config() {
        this.app.use(cors());
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(cookieParser("SECRET_GOES_HERE"));
        this.app.use(methodOverride());
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        this.app.use(errorHandler());
    }
}
exports.Server = Server;
