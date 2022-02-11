const APIUtil = require("./api_util");
const { tweetFormatting } = require("./helper_functions");

class InfiniteTweets {
    constructor(el) {

        this.$el = $(el);
        this.$el.find('.fetch-more').on('click', this.fetchTweets.bind(this));
        this.fetchTweets();
        this.maxCreatedAt = null;
    }

    fetchTweets(event) {
        if (event) {
            event.preventDefault();
        }
        let data = { }
        if (this.maxCreatedAt !== null) {
            data.max_created_at = this.maxCreatedAt;
        }
        APIUtil.feedRequest(data).then((data) => this.insertTweets(data));
    }

    insertTweets(data) {

        data.forEach((tweet) => {
            let $formattedTweet = tweetFormatting(tweet);
            $formattedTweet.insertBefore('.fetch-more')
        })

        if (data.length < 20) {
            this.noMoreTweets();
        }
        let lastTweet = data.slice(-1)[0]
        this.maxCreatedAt = $(lastTweet).attr('created_at');
    }

    noMoreTweets() {
        this.$el.find('.fetch-more').remove();
        this.$el.find('#feed').append('No more tweets!')
    }
}

module.exports = InfiniteTweets;