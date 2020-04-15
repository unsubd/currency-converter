import React, {Component} from 'react';
import './App.css';
import Converter from "./containers/Converter/Converter";

class App extends Component {
    render() {
        return (
            <div className='App'>
                <Converter/>
            </div>
        );
    }
}

export default App;
