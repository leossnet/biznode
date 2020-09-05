/**
 * Серверный модуль веб-сервера
 */
const http = require ('http');
const fs = require('fs');

const PORT = 80;

/**
 * Класс http-сервера
 */
class Server {
    #server;

    /**
     * Конструктор http-сервера
     */
    constructor() {
        this.#server = http.createServer((request, response) => {
            const filePath = request.url.substr(1);
            this.#readFile(filePath, response);
        });

        this.#server.listen(PORT, () => {
            console.log(`Server started at ${PORT} port...`);
        });
    }

    /**
     * Чтение содержимого файла с возвратом прочитанного значения
     * @param {String} filePath - полное имя файла
     * @param {String} response - выходной поток
     */
    #readFile(filePath, response) {
        const headParams = {'Content-Type': 'text/plain;charset=utf-8'};
        fs.readFile(filePath, (error, data) => {
            if (error) {
                response.writeHead(400, headParams);
                response.end("Файл не найден...");
            }
            else {
                response.writeHead(200, headParams);
                fs.createReadStream(filePath).pipe(response);
            }
        });
    }
}

// создание и запуск http-сервера
new Server();
