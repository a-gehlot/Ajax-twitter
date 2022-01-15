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
        APIUtil.createTweet(data).then((tweet) => this.handleSuccess(tweet));
    }

    clearInput() {
        this.$el.find('[name^=tweet]').val('');
    }

    handleSuccess(tweet) {
        this.clearInput();
        console.log(tweet);
        this.$el.find(":input").prop("disabled", false);
        let ul = this.$el.data("tweets-ul");
        $(ul).prepend(`<li>${JSON.stringify(tweet)}</li>`)
    }
}

module.exports = TweetCompose;