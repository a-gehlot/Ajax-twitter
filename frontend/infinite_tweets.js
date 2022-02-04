const APIUtil = require("./api_util");
const { tweetFormatting } = require("./helper_functions");

class InfiniteTweets {
    constructor(el) {
        this.$el = $(el);
        this.$el.find('.fetch-more').on('click', this.fetchTweets.bind(this));
    }

    fetchTweets(event) {
        event.preventDefault();
        APIUtil.feedRequest().then((data) => this.insertTweets(data));
    }

    insertTweets(data) {

        let ul = this.$el.find("#feed");

        data.forEach((tweet) => {
            let $formattedTweet = tweetFormatting(tweet);
            $(ul).append($formattedTweet);
        })
    }
}

module.exports = InfiniteTweets;