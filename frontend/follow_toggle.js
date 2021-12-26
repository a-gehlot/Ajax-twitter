const APIUtil = require("./api_util");

class FollowToggle {
    constructor($el) {
        this.$el = $el;
        this.userID = $el.data('user-id');
        this.followState = $el.data('follow-state')
        this.render();
        this.$el.click(this.handleClick.bind(this))
    }

    render() {
        let expr = this.followState;
        switch (expr) {
            case 'unfollowed':
                this.$el.text("Follow");
                this.$el.prop("disabled", false);
                break;
            case 'followed':
                this.$el.text("Unfollow");
                this.$el.prop("disabled", false);
                break;
            case 'following':
                this.$el.text("Following...");
                this.$el.prop("disabled", true);
                break;
            case 'unfollowing':
                this.$el.text("Unfollowing...");
                this.$el.prop("disabled", true);
                break;
        }
    }

    handleClick(event) {
        // const followToggle = this;
        event.preventDefault();
        if (this.followState === "unfollowed") {
            this.followState = "following"
            this.render()
            APIUtil.followUser(this.userID).then(() => {
                this.followState = "followed";
                this.render();
            })
        } else {
            this.followState = "unfollowing"
            this.render()
            APIUtil.unfollowUser(this.userID).then(() => {
                this.followState = "unfollowed";
                this.render();
            })
        }
    }
}

module.exports = FollowToggle;