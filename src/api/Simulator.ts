import { NextFunction, Request, Response, Router } from "express";
import { environment } from "../environments/environments";
import * as vhs_docker from '/home/victor/workspace/personal_projects/simulator_server/vhs_docker/';

/**
 * Constructor
 *
 * @class Simulator
 */
export class Simulator {


  docker_image = environment.docker_image;
  docker_volum = environment.docker_volum;
  users_path = environment.users_path;

    /**import * as vhs_docker from '/home/victor/workspace/personal_projects/simulator_server/vhs_docker/';

     * Constructor
     *
     * @class Simulator
     * @constructor
     */
    constructor() {
    }

    public static create(router: Router){

      //log
      console.log("[Simulator:create] Creating create simulation route.");

      // add create simulation route
      router.post("/", (req: Request, res: Response, next: NextFunction) => {
        new Simulator().newSim(req, res, next);
      });
    }


    public async newSim(req: Request, res: Response, next: NextFunction){
      if(req.is('application/json')){
      
        if(!req.body) {
          res.status(400).send("body content is missing");
          return;
        }
    
        let login = req.body.login;
        if(!login){
          res.status(402).send("login is missing missing");
          return;
        }
    
        let user_folder = req.body.folder_name;
        if(!user_folder){
          res.status(402).send("folder_name is missing missing");
          return;
        }
    
        // TODO: verify if this folder exists
    
        const path = this.users_path + user_folder;
    
        try{
          const data = await vhs_docker.start(path, this.docker_volum, this.docker_image, login+'_'+user_folder);
          console.log(data);
          res.send({data: data.stdout});
          return;
        } catch (err){
          console.log(err);
          res.status(500).send("Server error");
          return;
        };
    
      }
      res.status(402).send("Content type need to be application/json");
    }
  }