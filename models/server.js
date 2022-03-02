const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor () {
    this.app = express();
    this.port = process.env.PORT; 
    this.usersPath='/api/users';
    this.authPath='/api/auth';
    //Conectar a la base de datos
    this.conectarDB();
    //Middlewares
    this.middlewares();
    //Rutas 
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use( cors() );

    //Lectura y Parseo del body
    this.app.use( express.json() );
    
    // Directorio puclico
    this.app.use( express.static('public') );
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth'));
    this.app.use(this.usersPath, require('../routes/user'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
  })
  }
}

module.exports = Server;