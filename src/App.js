import React from "react";

import TextInput from "./components/TextInput";

import "./reset.css";
import "./index.scss";
import "./App.scss";

class App extends React.Component {
    render() {
        return(
            <div className="app">
                <div className="column column_left">
                    <TextInput />
                </div>
                <div className="column column_right">
                    А здесь будет список городов
                </div>
            </div>
        );
    }
}

export default App;