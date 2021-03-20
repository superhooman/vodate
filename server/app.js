const express = require('express');
// eslint-disable-next-line import/no-unresolved
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';

class App {
  constructor(props) {
    this.app = next({ dev });
    this.handle = this.app.getRequestHandler();
    this.server = express();
    this.port = props.port;
    if (props.useProxy) {
      this.server.set('trust proxy', 1);
    }
    this.middlewares(props.middleWares);
    this.assets(props.static || []);
    this.routes(props.controllers);
  }

  middlewares(middleWares) {
    middleWares.forEach((mw) => {
      this.server.use(mw);
    });
  }

  routes(controllers) {
    controllers.forEach((c) => {
      this.server.use(c.path, c.router);
    });
    this.server.all('*', (req, res) => this.handle(req, res));
  }

  assets(statics) {
    statics.forEach((s) => {
      this.server.use(s.path, express.static(s.folder));
    });
  }

  listen() {
    this.app.prepare().then(() => {
      this.server.listen(this.port, () => {
        // eslint-disable-next-line no-console
        console.log(`> App listening on the ${this.port}`);
      });
    });
  }
}

module.exports = App;