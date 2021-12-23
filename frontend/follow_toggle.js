class FollowToggle {
    constructor($el) {
        this.$el = $el;
        this.userID = $el.data('user-id');
        this.followState = $el.data('follow-state')
        this.render();
    }

    render() {
        if (this.followState === "unfollowed") {
            this.$el.text("Follow")
        } else {
            this.$el.text("Unfollow")
        }
    }
}

module.exports = FollowToggle;