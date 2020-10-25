import React, {Component} from 'react';
import s from './App.module.css';
import Start from "../Start/Start";
import Stats from "../Stats/Stats";
import DisplayData from "../DisplayData/DisplayData";
import {RunningStatsCalculator} from "../../utils/calcStats";
import SocketAPI from "../../utils/socketAPI";
import Loader from "../Loader/Loader";

class App extends Component {

    state = {
        isCalculating: false,
        isDataReadyToCalc: false,
        isDataReadyToShow: false,
        isSocketInit: false,
        isSocketOpen: false,
        displayData: {
            mean: 0,
            populationStdev: 0,
            time: 0
        }
    };

    onStartSocket = () => {
        this.socket = new SocketAPI({
            url: 'wss://trade.trademux.net:8800/?password=1234',
            open: this.onOpenSocket,
            message: this.onMessageSocket,
        });
        this.setState(() => ({isSocketInit: !this.state.isSocketInit}));
        this.runningCalc = new RunningStatsCalculator();
    }

    onOpenSocket = () => {
        this.setState(() => ({isSocketOpen: !this.state.isSocketOpen}));
    }

    onMessageSocket = (event) => {
        let data = JSON.parse(event.data);
        let value = data.value;
        if (Number.isInteger(value)) {
            this.runningCalc.update(value);
        } else {
            console.error(value);
        }
        if (this.state.isDataReadyToCalc === false) {
            this.setState(() => ({isDataReadyToCalc: !this.state.isDataReadyToCalc}));
        }
    }

    closeSocket = () => {
        this.socket.close();
        this.setState(() => ({
            isSocketOpen: !this.state.isSocketOpen,
            isSocketInit: !this.state.isSocketInit,
            isDataReadyToCalc: !this.state.isDataReadyToCalc
        }));
    }

    getCalcData = () => {
        this.setState({isCalculating: !this.state.isCalculating});
        let mean = Math.round(this.runningCalc.mean);
        let populationStdev = Math.round(this.runningCalc.populationStdev);
        let time = +this.runningCalc.time.toFixed(5);
        this.setState(() => {
            return {
                isCalculating: false,
                isDataReadyToShow: true,
                displayData: {
                    ...this.state.displayData,
                    mean,
                    populationStdev,
                    time,
                }
            }
        })
    }

    render() {
        return (
            <div className={s.app}>
                <div className={s.container}>
                    <div className={s.controls}>
                        <Start
                            onStartSocket={this.onStartSocket}
                            closeSocket={this.closeSocket}
                            isDataReadyToCalc={this.state.isDataReadyToCalc}
                        />
                        <Stats
                            getCalcData={this.getCalcData}
                            isDataReadyToCalc={this.state.isDataReadyToCalc}
                            isDataReadyToShow={this.state.isDataReadyToShow}
                        />
                    </div>
                    {
                        (!this.state.isDataReadyToCalc && this.state.isSocketInit) &&
                        <Loader text="З'єднання з сервером..."/>
                    }
                    {this.state.isCalculating
                        ? <Loader text='Проводимо розрахунки...'/>
                        : this.state.isDataReadyToShow && <DisplayData
                        displayData={this.state.displayData}
                    />
                    }
                </div>
            </div>
        )
    }
}

export default App;
