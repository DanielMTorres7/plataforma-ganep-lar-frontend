const { createServer } = require('http');
const { parse } = require('url');
const { readFileSync } = require('fs');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const options = {
//  key: readFileSync('cert/privkey.pem'), // Caminho para sua chave privada
//  cert: readFileSync('cert/fullchain.pem'), // Caminho para seu certificado
};

app.prepare().then(() => {
  createServer(options, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(7000, (err) => {
    if (err) throw err;
    console.log('> Servidor HTTP rodando em http://localhost:7000');
  });
});
