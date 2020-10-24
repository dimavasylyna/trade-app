import React, {Component} from 'react';
import s from './App.module.css';
import Start from "../Start/Start";
import Stats from "../Stats/Stats";
import DisplayData from "../DisplayData/DisplayData";
import {calcMean, calcSD, time} from "../../utils/calcStats";
import SocketAPI from "../../utils/socketAPI";

class App extends Component {

    state = {
        isDataReadyToCalc: false,
        isSocketInit: false,
        isSocketOpen: false,
        displayData: {
            mean: 0,
            sd: 0,
            totalCalcTime: 0
        }
    };

    onStartSocket = () => {
        this.socket = new SocketAPI({
            url: 'wss://trade.trademux.net:8800/?password=1234',
            open: this.onOpenSocket,
            message: this.onMessageSocket,
        });
        this.setState(()=>({isSocketInit: !this.state.isSocketInit}));
    }
    onOpenSocket = () => {
        this.setState(()=>({isSocketOpen: !this.state.isSocketOpen}));
    }
    onMessageSocket = (event) => {
        let data = JSON.parse(event.data);
        let value = data.value;
        if (Number.isInteger(value)) {
            this.socket.serverData.push(value);
        } else {
            // пропущені котировки
            alert(value);
        }
        if (this.state.isDataReadyToCalc === false) {
            this.setState(()=>({isDataReadyToCalc: true}));
        }
        // console.log('Message from server', this.socket.serverData);
    }
    closeSocket = () => {
        this.socket.close();
        this.setState(()=>({
            isSocketOpen: !this.state.isSocketOpen,
            isSocketInit: !this.state.isSocketInit,
        }));
    }
    calcData = () => {
        if (!this.socket.serverData.length) {
            return;
        }
        let mean = calcMean(this.socket.serverData);
        let sd = calcSD(this.socket.serverData, mean);
        this.setState(()=>{
            return {
                displayData: {
                    ...this.state.displayData,
                    mean,
                    sd,
                    totalCalcTime: time.totalCalcTime,
                }
            }
        })
    }

  render() {
      console.log('render App component');
        return (
            <div className={s.app}>
                <div className={s.container}>
                    <Start
                        onStartSocket={this.onStartSocket}
                        closeSocket={this.closeSocket}
                        isSocketOpen={this.state.isSocketOpen}
                    />
                    <Stats
                        calcData={this.calcData}
                        isDataReadyToCalc={this.state.isDataReadyToCalc}
                    />
                    <DisplayData
                        displayData={this.state.displayData}
                    />
                </div>
            </div>
        )
    }
}

export default App;
