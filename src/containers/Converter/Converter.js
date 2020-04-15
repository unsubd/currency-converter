import React, {Component} from 'react';
import Row from "../../components/Row/Row";
import styles from './Converter.css';
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from 'axios';

class Converter extends Component {
    state = {
        loading: false,
        currencies: []
    }

    componentDidMount() {
        this.setState({loading: true});
        axios.get('/')
            .then(response => {
                this.setState({loading: false, currencies: Object.keys(response.data.rates)});
            });
    }

    render() {
        let content = (
            <div>
                <Row currencies={this.state.currencies} default={this.state.currencies[0]}/>
                =
                <Row currencies={this.state.currencies} default={this.state.currencies[1]}/>
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