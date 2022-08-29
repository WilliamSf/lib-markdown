const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

function extraiLinks(texto, nomeArquivo) {
    const regex = /\[([^\]]*)]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayResultados = [];
    let temp;
    while((temp = regex.exec(texto)) !== null) {
        arrayResultados.push(
            {
                [temp[1]]: temp[2],
                arquivo: nomeArquivo
            }
        )
    }
    return arrayResultados.length === 0 ? 'não há links' : arrayResultados;
}

function trataErro(erro) {
    throw new Error(chalk.red(erro));
}

async function pegarArquivo(caminho) {
    const caminhoAbsoluto = path.join(__dirname, '.', caminho);
    const encoding = 'utf-8';
    try {
        const arquivos = await fs.promises.readdir(caminhoAbsoluto, { encoding });
        return await Promise.all(arquivos.map(async (arquivo) => {
            const localArquivo = `${caminhoAbsoluto}/${arquivo}`;
            const texto = await fs.promises.readFile(localArquivo, encoding);
            return extraiLinks(texto, arquivo);
        }));
    } catch (erro) {
        return trataErro(erro);
    }
}

module.exports = pegarArquivo;