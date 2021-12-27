const APIUtil = require("./api_util");

class UsersSearch {
    constructor($el) {
        this.$el = $el;
        this.$input = $el.find("input")
        this.$ul = $el.find("ul")
        this.$input.on("input", this.handleInput.bind(this));
    }

    handleInput() {
        APIUtil.searchUsers(this.$input.val()).then((users) => {
            this.renderData(users);
        })
    }

    renderData(data) {
        let userTable = this.$el.find('ul.users');
        userTable.empty();
        data.forEach((user) => {
            let userAnchor = (`<li><a href=${user.id}>${user.username}</a></li>`)
            userTable.append(userAnchor)
        })
    }
}

module.exports = UsersSearch;