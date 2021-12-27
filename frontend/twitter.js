const FollowToggle = require('./follow_toggle');
const UsersSearch = require('./users_search');

$(document).ready(function() {
    $("button.follow-toggle").each(function(idx, element) {
        new FollowToggle($(element));
    })
    $("nav.users-search").each(function(idx, element) {
        new UsersSearch($(element));
    })
})