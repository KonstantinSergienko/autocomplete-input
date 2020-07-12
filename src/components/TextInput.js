import React from "react";
import { observer } from "mobx-react";

import searchPic from "../images/search.png";

import "./textInput.scss";

@observer
class TextInput extends React.Component {
  handlerChange = (event) => {
    const { onChange, requestCities } = this.props;
    const { value } = event.target;

    event.preventDefault();

    onChange(value);
    requestCities(value);
  };

  render() {
    const { value, placeholder, autocomplete, addCity } = this.props;

    return (
      <div className="text-input-wrapper">
        <input
          type="text"
          className="text-input"
          value={value}
          placeholder={placeholder}
          onChange={(event) => this.handlerChange(event)}
        />

        <img src={searchPic} className="search-picture" alt="search" />

        <datalist
          className="autocomplete"
          style={
            autocomplete.length !== 0
              ? { display: "block" }
              : { display: "none" }
          }
        >
          {autocomplete.map((item, index) => {
            return (
              <option
                key={index}
                className="option"
                onClick={() => addCity(item)}
              >
                {item}
              </option>
            );
          })}
        </datalist>
      </div>
    );
  }
}

export default TextInput;
