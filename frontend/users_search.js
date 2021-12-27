const APIUtil = require("./api_util");
const FollowToggle = require("./follow_toggle");

class UsersSearch {
    constructor(el) {
        this.$el = $(el);
        this.$input = this.$el.find("input")
        this.$ul = this.$el.find("ul")
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
            let userAnchor = $(`<li><a href=${user.id}>${user.username}</a></li>`)
            let button = $('<button></button>')
            new FollowToggle(button, {
                userId: user.id,
                followState: user.followed ? 'followed' : 'unfollowed',
            });
            userTable.append(userAnchor);
            userTable.append(button);
        })
    }
}

module.exports = UsersSearch;