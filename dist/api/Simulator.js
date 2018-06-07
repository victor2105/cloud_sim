"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const environments_1 = require("../environments/environments");
const vhs_docker = require("/home/victor/workspace/personal_projects/simulator_server/vhs_docker/");
class Simulator {
    constructor() {
        this.docker_image = environments_1.environment.docker_image;
        this.docker_volum = environments_1.environment.docker_volum;
        this.users_path = environments_1.environment.users_path;
    }
    static create(router) {
        console.log("[Simulator:create] Creating create simulation route.");
        router.post("/", (req, res, next) => {
            new Simulator().newSim(req, res, next);
        });
    }
    newSim(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.is('application/json')) {
                if (!req.body) {
                    res.status(400).send("body content is missing");
                    return;
                }
                let login = req.body.login;
                if (!login) {
                    res.status(402).send("login is missing missing");
                    return;
                }
                let user_folder = req.body.folder_name;
                if (!user_folder) {
                    res.status(402).send("folder_name is missing missing");
                    return;
                }
                const path = this.users_path + user_folder;
                try {
                    const data = yield vhs_docker.start(path, this.docker_volum, this.docker_image, login + '_' + user_folder);
                    console.log(data);
                    res.send({ data: data.stdout });
                    return;
                }
                catch (err) {
                    console.log(err);
                    res.status(500).send("Server error");
                    return;
                }
                ;
            }
            res.status(402).send("Content type need to be application/json");
        });
    }
}
exports.Simulator = Simulator;
