const FollowToggle = require('./follow_toggle');
const UsersSearch = require('./users_search');
const TweetCompose = require('./tweet_compose');
const InfiniteTweets = require('./infinite_tweets')

$(document).ready(function() {
    $("button.follow-toggle").each(function(idx, element) {
        new FollowToggle(element);
    })
    $("nav.users-search").each(function(idx, element) {
        new UsersSearch(element);
    })
    $("form.tweet-compose").each(function(idx, element) {
        new TweetCompose(element);
    })
    $("div.infinite-tweets").each(function(idx, element) {
        new InfiniteTweets(element);
    })
})