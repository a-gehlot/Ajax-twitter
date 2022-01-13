const FollowToggle = require('./follow_toggle');
const UsersSearch = require('./users_search');
const TweetCompose = require('./tweet_compose')

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
})