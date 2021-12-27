const APIUtil = require("./api_util");

class UsersSearch {
    constructor($el) {
        this.$el = $el;
        this.input = $el.find("input")
        this.ul = $el.find("ul")
        this.input.on("input", this.handleInput.bind(this));
    }

    handleInput() {
        if (this.input.val() === '') {
            this.renderData(['']);
            return;
        }
        APIUtil.searchUsers(this.input.val()).then((value) => {
            console.log(value);
        })
    }

    renderData(data) {
        this.ul.empty();
        this.ul.append(data);
    }
}

module.exports = UsersSearch;