import { observable, action } from "mobx";

class TextInputModel {
    @observable value;

    constructor(value) {
        this.value = value || "";
        this.onChange = action(this.onChange);
    }

    onChange = value => {
        this.value = value;
    }
}

export default TextInputModel;