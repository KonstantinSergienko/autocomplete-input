import React from "react";
import { observer, inject } from "mobx-react";

import TextInput from "./components/TextInput";

import "./reset.css";
import "./index.scss";
import "./App.scss";
@inject("store")
@observer
class App extends React.Component {
  renderCities = () => {
    const { cities, removeCity } = this.props.store;

    return cities.map((city, index) => {
      return (
        <li className="list-item">
          <p>{city}</p>
          <div className="line"></div>
          <button
            onClick={() => removeCity(index)}
            className="delete-cross"
          ></button>
        </li>
      );
    });
  };

  render() {
    const {
      cities,
      inputCity,
      autocompleteArray,
      addCity,
      getCitiesFromFias,
    } = this.props.store;

    return (
      <div className="app">
        <h2>Motion-logic</h2>
        <div className="search-block">
          <TextInput
            {...inputCity}
            requestCities={getCitiesFromFias}
            autocomplete={autocompleteArray}
            addCity={addCity}
            placeholder={"Введите название города"}
          />

          <button
            onClick={() => addCity(inputCity.value)}
            className="add-button"
          >
            Добавить
          </button>
        </div>

        <ul className="cities-list">
          {cities.length !== 0 ? (
            this.renderCities()
          ) : (
            <li className="list-item">Список пуст...</li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
