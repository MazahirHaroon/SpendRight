import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        // fetch data from db here (for now we just intialize with fixed data)
        const bankbalance = 7000;
        let daysleft = this.daysLeft();
        let perday = daysleft > 0 ? Math.floor(7000 / daysleft) : 0;
        this.state = {
            constbankbalance: bankbalance,
            bankbalance: 10000,
            perday: perday,
            today: 0
        }
    }
    handleCalculation = (e) => {
        if (e.target.value > 0) {
            let today = e.target.value; 
            let balance = this.state.bankbalance - today;
            let daysleft = this.daysLeft();
            let perday = daysleft > 0 ? Math.floor(balance / daysleft) : 0;
            this.setState ({
                perday,
                today
            })
        }
    }

    daysLeft = () => {
        return this.daysInMonth() - (this.datetoday().getDate());
    }

    daysInMonth = () => {
        var d = this.datetoday();
        return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    }

    datetoday = () => {
        return new Date();
    }

    handleUpdate = () => {
        const bankbalance = this.state.bankbalance - this.setState.today;
        this.setState ({
            bankbalance
        })
        axios.post('http://localhost:3231/updateBalance', { userid: 1, bankbalance: bankbalance }, )
        .then(response => console.log(response.data));
    }

    render() {
        if (this.daysLeft() > 0) {
            return (
                <div>
                    <nav className="nav-wrapper">
                        <div className="container">
                            <a className="brand-logo">
                                SpendRight
                            </a>
                        </div>
                    </nav>
                    <div className="row center container">
                        <br></br>
                        <div className="card col s5">
                            <div className="card-content">
                                <form className="col s12" onSubmit={this.handleUpdate}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <h1><input id="spendtoday" type="number" className="validate" onChange={this.handleCalculation} /></h1>
                                            <label htmlFor="spendtoday">If today I spend :</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="input-field col s2">
                                        <input type="submit" className="waves-effect waves-light btn" value="Decide" />
                                    </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="card col s5 offset-s1">
                            <div className="card-content">
                                <h1>{this.state.perday}</h1>
                            </div>
                            <div className="card-tabs">
                                <p>.. is how much you can spend per day from now</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <nav className="nav-wrapper">
                        <div className="container">
                            <a className="brand-logo">
                                SpendRight
                            </a>
                        </div>
                    </nav>
                    <div className="row center container">
                        <br></br>
                        <h1>End of the month, You have {this.state.bankbalance} to spend </h1>
                    </div>
                </div>
            )
        }
    }
}

export default App;
