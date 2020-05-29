import { observable, action } from "mobx";

import TextInput from "./components/TextInputModel";

class Store {
    @observable cities;
    @observable inputCity;
    @observable autocompleteArray;

    constructor() {
        this.cities = this.getCitiesFromSession() || [];
        this.inputCity = new TextInput();
        this.autocompleteArray = [];
        this.removeCity = action(this.removeCity);
        this.addCity = action(this.addCity);
        this.getCitiesFromFias = action(this.getCitiesFromFias);
    }

    @action
    clear = () => {
        this.autocompleteArray = [];
    }

    getCitiesFromFias = async query => {
        if (query.length < 3) {
            this.clear();
            return;
        }

        const request = await fetch(`https://kladr-api.ru/api.php?query=${query}&contentType=city&typeCode=1&limit=5`);
        const response = request.json();

        response
            .then(resp => {
                resp.result.shift();
                this.autocompleteArray = resp.result;
            })
            .catch(err => console.error(err))
    }



    getCitiesFromSession = () => {
        const cities = sessionStorage.getItem("cities");
        
        if (!cities) {
            return;
        }

        return cities.split(",");
    }



    removeCity = index => {
        this.cities = this.cities.filter((city, cityIndex) => cityIndex !== index);
        
        sessionStorage.setItem("cities", this.cities);
    }



    addCity = name => {
        if (!name) {
            return;
        }

        this.cities.push(name);
        this.inputCity.onChange("");
        this.clear();

        sessionStorage.setItem("cities", this.cities);
    }
}

export default Store;