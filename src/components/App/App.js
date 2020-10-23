import React, {Component} from 'react';
import s from './App.module.css';
import Start from "../Start/Start";
import Stats from "../Stats/Start";
import {getMean, getSD} from "../../utils/calcStats";

class App extends Component {
    state = {
        isSocketOpen: false,
        serverData: []
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    onStartSocket = () => {
        if (this.state.isSocketOpen) {
            alert('socket is already open');
            return;
        }
        this.socket = new WebSocket('wss://trade.trademux.net:8800/?password=1234');
        this.socket.addEventListener('open',  this.onOpenSocket);
        this.socket.addEventListener('message', this.onMessageSocket);
    }
    onOpenSocket = () => {
        this.setState(()=>({isSocketOpen: !this.state.isSocketOpen}));
    }
    onMessageSocket = (event) => {
        let data = JSON.parse(event.data);
        let value = data.value;
        if (Number.isInteger(value)) {
            this.setState(()=>({serverData: [...this.state.serverData, value]}))
        } else {
            alert(value);
        }
        console.log('Message from server', data);
    }
    closeSocket = () => {
        let code = 1000;
        let reason = 'work is done';
        this.socket.close(code, reason);
        this.setState(()=>({isSocketOpen: !this.state.isSocketOpen}));
        let mean = getMean(this.state.serverData);
        console.log(mean, 'mean');
        console.log(getSD(this.state.serverData, mean));
    }
  render() {
      console.log('render App component');
        return (
            <div className={s.app}>
                <div className={s.container}>
                    <Start
                        onStartSocket={this.onStartSocket}
                    />
                    <Stats
                        closeSocket={this.closeSocket}
                    />
                </div>
            </div>
        )
    }
}

export default App;
