const chalk = require('chalk');
const pegaArquivo = require('./index');
const validaURLs = require('./http-validacao');

const caminho = process.argv;

async function processaTexto(caminhoDeArquivo) {
    const resultados = await pegaArquivo(caminhoDeArquivo[2]);
    const uniaoResultados = [].concat(...resultados);
    if (caminho[3] === 'validar') {
        console.log(chalk.yellow('links validados'), await validaURLs(uniaoResultados));
    } else {
        console.log(chalk.yellow('lista de links'), uniaoResultados);
    }
}

processaTexto(caminho);