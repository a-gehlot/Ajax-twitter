class FollowToggle {
    constructor($el) {
        this.$el = $el;
        this.userID = $el.data('user-id');
        this.followState = $el.data('follow-state')
        this.render();
        this.$el.click(this.handleClick.bind(this))
    }

    render() {
        if (this.followState === "unfollowed") {
            this.$el.text("Follow")
        } else {
            this.$el.text("Unfollow")
        }
    }

    handleClick(event) {
        event.preventDefault();
        $.ajax({
            type: (this.followState === "unfollowed") ? "POST" : "DELETE",
            url: "/users/" + this.userID + "/follow",
            dataType: "json",
            success: (response) => {
                this.toggleFollowState();
                this.render();
            }
        });
    }

    toggleFollowState() {
        if (this.followState === "unfollowed") {
            this.$el.data('follow-state', 'followed');
            this.followState = "followed"
        } else {
            this.$el.data('follow-satte', 'unfollowed')
            this.followState = 'unfollowed'
        };
    }
}

module.exports = FollowToggle;