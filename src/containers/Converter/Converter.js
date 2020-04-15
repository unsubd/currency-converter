import React, {Component} from 'react';
import Row from "../../components/Row/Row";
import styles from './Converter.css';
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from 'axios';

class Converter extends Component {
    state = {
        loading: false,
        currencies: [],
        fromAmount: '',
        toAmount: '',
        fromCurrency: '',
        toCurrency: ''
    }

    componentDidMount() {
        this.setState({loading: true});
        axios.get('/')
            .then(response => {
                const currencies = Object.keys(response.data.rates);
                const fromCurrency = currencies[0];
                const toCurrency = currencies[1];
                this.setState({
                    loading: false,
                    currencies: currencies,
                    fromCurrency: fromCurrency,
                    toCurrency: toCurrency
                });
                return {
                    fromCurrency: fromCurrency,
                    toCurrency: toCurrency
                };
            }).then(res => {
            axios.get('', {
                params: {
                    symbols: res.fromCurrency + ',' + res.toCurrency,
                    base: res.fromCurrency
                }
            }).then(response => {
                this.setState({
                    fromAmount: response.data.rates[this.state.fromCurrency],
                    toAmount: response.data.rates[this.state.toCurrency],
                    rate: response.data.rates[this.state.toCurrency]
                });
            })
        })
    }

    fromAmountChangeHandler = (event) => {
        const fromAmount = event.target.value;
        this.setState({toAmount: this.state.rate * fromAmount, fromAmount: fromAmount})
    }

    toAmountChangeHandler = (event) => {
        const toAmount = event.target.value;
        this.setState({toAmount: toAmount, fromAmount: toAmount / this.state.rate})
    }

    fromCurrencyChangeHandler = (event) => {
        const options = event.target.options;
        const selectedIndex = options.selectedIndex;
        const selectedCurrency = options[selectedIndex].value;

        axios.get('', {
            params: {
                symbols: selectedCurrency + ',' + this.state.toCurrency,
                base: selectedCurrency
            }
        }).then(response => {
            this.setState({
                fromCurrency: selectedCurrency,
                fromAmount: response.data.rates[selectedCurrency],
                toAmount: response.data.rates[this.state.toCurrency],
                rate: response.data.rates[this.state.toCurrency]
            });
        });

    }

    toCurrencyChangeHandler = (event) => {
        const options = event.target.options;
        const selectedIndex = options.selectedIndex;
        const selectedCurrency = options[selectedIndex].value;

        axios.get('', {
            params: {
                symbols: selectedCurrency + ',' + this.state.fromCurrency,
                base: this.state.fromCurrency
            }
        }).then(response => {
            this.setState({
                toCurrency: selectedCurrency,
                fromAmount: response.data.rates[this.state.fromCurrency],
                toAmount: response.data.rates[selectedCurrency],
                rate: response.data.rates[selectedCurrency]
            });
        });

    }

    render() {
        let content = (
            <div>
                <Row currencies={this.state.currencies}
                     default={this.state.fromCurrency}
                     amount={this.state.fromAmount}
                     amountChange={this.fromAmountChangeHandler}
                     change={this.fromCurrencyChangeHandler}
                />
                =
                <Row currencies={this.state.currencies}
                     default={this.state.toCurrency}
                     amount={this.state.toAmount}
                     amountChange={this.toAmountChangeHandler}
                     change={this.toCurrencyChangeHandler}
                />
            </div>
        )
        if (this.state.loading) {
            content = <Spinner/>;
        }
        return (
            <div className={styles.Converter}>
                <h1>Converter</h1>
                {content}
            </div>
        );
    }
}

export default Converter;