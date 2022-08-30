const pegaArquivo = require('../index');

const arrayResult = [
    [
        {
            FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList',
            arquivo: 'texto1.md'
        }
    ],
    [
        {
            arquivo: 'texto2.md',
            label: 'não há links'
        }
    ]
]

describe('pegaArquivo::', () => {
    it('deve ser uma função', () => {
        expect(typeof pegaArquivo).toBe('function');
    })
    it('deve retornar array com resultados', async () => {
        const resultado = await pegaArquivo('test/arquivos/')
        expect(resultado).toEqual(arrayResult)
    })
    it('deve retornar um array contendo a label: não há links', async () => {
        const resultado = await pegaArquivo('test/arquivos/')
        expect(resultado).toContainEqual([{arquivo: "texto2.md", label: "não há links"}]);
    })
    it('deve lançar um erro na falta de arquivo', () => {
        async function capturaErro() {
            await pegaArquivo('test/sem arquivos/')
            expect(capturaErro).toThrowError(/não há arquivo no caminho/)
        }
    })
    it('deve resolver a função com sucesso', async () => {
        await expect(pegaArquivo('test/arquivos/')).resolves.toEqual(arrayResult)
    })
})