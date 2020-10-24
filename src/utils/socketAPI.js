export default class SocketAPI {
    constructor(settings) {
        this.socket = new WebSocket(settings.url);
        this.socket.addEventListener('open',  settings.open);
        this.socket.addEventListener('message', settings.message);
        this.serverData = [];
    }
    close = () => {
        let code = 1000;
        let reason = 'work is done';
        this.socket.close(code, reason);
    }
}