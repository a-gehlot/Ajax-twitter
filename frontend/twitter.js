const FollowToggle = require('./follow_toggle');

$(document).ready(function() {
    $("button.follow-toggle").each(function(idx, element) {
        new FollowToggle($(element));
    })
})