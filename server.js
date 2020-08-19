/**
 * Серверный модуль веб-сервера
 */
import { createServer } from 'http';
import { readFile, createReadStream } from 'fs';

const PORT = 80;

/**
 * Инициализация и запуск сервера приложения в контексте node.js
 */
createServer((request, response) => {
    const filePath = request.url.substr(1);
    readFile(filePath, (error, data) => {
        if ( error ) {
            response.statusCode = 404;
            response.end("File not found...");
        }
        else {
            createReadStream(filePath).pipe(response);
        }
    });
}).listen(PORT, () => {
    console.log(`Server started at ${PORT} port...`);
});
