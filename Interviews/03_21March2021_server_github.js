const express = require('express');
const uuid = require('uuid');

const server = express();
server.use(
    express.urlencoded({
        extended: true
    })
);
server.use(express.json());

const memory = {};

const writeToMemory = ({ repository, oid, data }) => {
    if (!memory[repository]) {
        memory[repository] = {};
    }
    memory[repository][oid] = data;
}

const readFromMemory = ({ repository, objectId }) => {
    let data;
    if (!memory[repository]) {
        data = null;
    } else if (!memory[repository][objectId]) {
        data = null;
    } else {
        data = memory[repository][objectId];
    }
    return data;
}

const deleteFromMemory = ({ repository, objectId }) => {
    if (memory[repository] && memory[repository][objectId]) {
        delete memory[repository][objectId];
        return true;
    } else {
        return false;
    }
}

server.put('/data/:repository', async (request, response) => {
    const repository = request.params.repository;
    const data = request.body

    if (!Object.keys(data).length) { // should not be able to put an empty object
        response.statusCode = 404;
        response.send();
    } else {
        const oid = uuid.v4();
        writeToMemory({ repository, oid, data });

        response.statusCode = 201;
        response.statusMessage = 'Created';
        response.setHeader('Content-Type', /json/);
        response.send(JSON.stringify({ oid }));
    }
})

server.get('/data/:repository/:objectId', async (request, response) => {
    const repository = request.params.repository;
    const objectId = request.params.objectId;

    const data = readFromMemory({ repository, objectId });

    if (!!data) {
        response.statusCode = 200;
        response.statusMessage = 'OK';
        response.setHeader('Content-Type', /json/);
        response.send(JSON.stringify(data));
    } else {
        response.statusCode = 404;
        response.send();
    }
})

server.delete('/data/:repository/:objectId', async (request, response) => {
    const repository = request.params.repository;
    const objectId = request.params.objectId;

    const success = deleteFromMemory({ repository, objectId });

    if (success) {
        response.statusCode = 200;
        response.statusMessage = 'OK';
        response.send();
    } else {
        response.statusCode = 404;
        response.send();
    }
})

// server.listen(3000, () => {
//     console.log('Node server created at port 3000');
// });

// The tests exercise the server by requiring it as a module,
// rather than running it in a separate process and listening on a port
module.exports = server
