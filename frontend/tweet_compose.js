const APIUtil = require("./api_util");

class TweetCompose {
    constructor (el) {
        this.$el = $(el);
        this.$el.submit(this.submit.bind(this))
    }

    submit(event) {
        event.preventDefault();
        let data = this.$el.serializeJSON()
        this.clearInput();
        this.$el.find(":input").prop("disabled", true);
        APIUtil.createTweet(data);
    }

    clearInput() {
        this.$el.find('[name^=tweet]').val('');
    }
}

module.exports = TweetCompose;