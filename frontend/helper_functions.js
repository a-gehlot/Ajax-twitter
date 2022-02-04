tweetFormatting = (tweet) => {
    let $formattedTweet = $('<li></li>')
    $formattedTweet.append(`${tweet.content}
        -- <a href="/users/${tweet.user.id}">${tweet.user.username}</a>
        -- ${tweet.created_at}`)
    if (tweet.mentions.length > 0) {
        $formattedTweet.append('<ul></ul>');
        tweet.mentions.forEach((mentioned_user) => {
            $formattedTweet.find('ul').append(`<li><a href='/users/${mentioned_user.user_id}'>${mentioned_user.user.username}</a>`)
        })
    }
    return $formattedTweet;
}

module.exports = {
    tweetFormatting: tweetFormatting
}