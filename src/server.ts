import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import routes from './routes/MainRoutes';
import path from 'path';
import ejs from 'ejs';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../public'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(routes);

let messages: Object[] = [];

io.on('connection', socket => {
    socket.emit('previousMessage', messages);
    socket.on('sendMessage', msg => {
        messages.push(msg);
        socket.broadcast.emit('receivedMessage', msg);
    });
});

server.listen(process.env.PORT)