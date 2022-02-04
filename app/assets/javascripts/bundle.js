/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/***/ ((module) => {

const APIUtil = {
    followUser: (id) => {
        return ($.ajax({
            type: "POST",
            url: `/users/${id}/follow`,
            dataType: "json",
        }));
    },

    unfollowUser: (id) => {
        return ($.ajax({
            type: "DELETE",
            url: `/users/${id}/follow`,
            dataType: "json",
        }));
    },

    searchUsers: (query) => {
        return ($.ajax({
            type: "GET",
            url: "/users/search",
            dataType: "json",
            data: { query },
        }));
    },

    createTweet: (data) => {
        return ($.ajax({
            type: "POST",
            url: "/tweets",
            dataType: "json",
            data: data
        }));
    },

    addUserMentions: (data) => {
        return ($.ajax({
            type: "GET",
            url: "/users",
            dataType: "json",
            data: { data }
        }))
    },

    feedRequest: (data) => {
        return ($.ajax({
            type: "GET",
            url: "/feed",
            dataType: "json",
            data: data
        }))
    }
}

module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

class FollowToggle {
    constructor(el, options) {
        this.$el = $(el);
        this.userID = this.$el.data('user-id') || options.userId;
        this.followState = this.$el.data('follow-state') || options.followState;
        this.render();
        this.$el.click(this.handleClick.bind(this))
    }

    render() {
        let expr = this.followState;
        switch (expr) {
            case 'unfollowed':
                this.$el.text("Follow");
                this.$el.prop("disabled", false);
                break;
            case 'followed':
                this.$el.text("Unfollow");
                this.$el.prop("disabled", false);
                break;
            case 'following':
                this.$el.text("Following...");
                this.$el.prop("disabled", true);
                break;
            case 'unfollowing':
                this.$el.text("Unfollowing...");
                this.$el.prop("disabled", true);
                break;
        }
    }

    handleClick(event) {
        // const followToggle = this;
        event.preventDefault();
        if (this.followState === "unfollowed") {
            this.followState = "following"
            this.render()
            APIUtil.followUser(this.userID).then(() => {
                this.followState = "followed";
                this.render();
            })
        } else {
            this.followState = "unfollowing"
            this.render()
            APIUtil.unfollowUser(this.userID).then(() => {
                this.followState = "unfollowed";
                this.render();
            })
        }
    }
}

module.exports = FollowToggle;

/***/ }),

/***/ "./frontend/helper_functions.js":
/*!**************************************!*\
  !*** ./frontend/helper_functions.js ***!
  \**************************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./frontend/infinite_tweets.js":
/*!*************************************!*\
  !*** ./frontend/infinite_tweets.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");
const { tweetFormatting } = __webpack_require__(/*! ./helper_functions */ "./frontend/helper_functions.js");

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

/***/ }),

/***/ "./frontend/tweet_compose.js":
/*!***********************************!*\
  !*** ./frontend/tweet_compose.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");
const { tweetFormatting } = __webpack_require__(/*! ./helper_functions */ "./frontend/helper_functions.js")

class TweetCompose {
    constructor (el) {
        this.$el = $(el);
        this.$el.find('input').on('click', this.submit.bind(this))
        this.$textArea = this.$el.find("textarea")
        this.$textArea.on("input", this.updateChars.bind(this));
        this.$removeUser = this.$el.find(".new-mentions")
        this.$removeUser.on("click", this.removeMentionedUser.bind(this))
        this.$newMentionButton = this.$el.find(".add_mention")
        this.$newMentionButton.on("click", this.newUserSelect.bind(this))
    }

    submit(event) {
        event.preventDefault();
        let data = this.$el.serializeJSON()
        this.clearInput();
        this.$el.find(":input").prop("disabled", true);
        APIUtil.createTweet(data).then((tweet) => this.handleSuccess(tweet));
    }

    newUserSelect(event) {
        event.preventDefault();
        APIUtil.addUserMentions().then((data) => this.addMention(data))
    }

    addMention (data) {
        let outerDiv = $('<div class="mentions"</div>')
        let mentionDrop = $('<select name="tweet[mentioned_user_ids][]"></select>')
        let removeMention = $('<button class="remove_mention">Remove Mention</button>')
        data.forEach(element => {
            mentionDrop.append(`<option value=${element.id}>${element.username}</option>`)
        });
        outerDiv.append(mentionDrop);
        outerDiv.append(removeMention);
        this.$el.find('.new-mentions').append(outerDiv);

    }

    clearInput() {
        this.$el.find('[name^=tweet]').val('');
        this.$el.find('.mentions').remove();
    }

    handleSuccess(tweet) {
        this.clearInput();
        this.$el.find(":input").prop("disabled", false);
        let ul = this.$el.data("tweets-ul");
        // let $formattedTweet = $('<li></li>')
        // $formattedTweet.append(`${tweet.content}
        // -- <a href="/users/${tweet.user.id}">${tweet.user.username}</a>
        // -- ${tweet.created_at}`)
        // if (tweet.mentions.length > 0) {
        //     $formattedTweet.append('<ul></ul>');
        //     tweet.mentions.forEach((mentioned_user) => {
        //         $formattedTweet.find('ul').append(`<li><a href='/users/${mentioned_user.user_id}'>${mentioned_user.user.username}</a>`)
        //     })
        // }
        let $formattedTweet = tweetFormatting(tweet)
        $(ul).prepend($formattedTweet);
    }

    updateChars() {
        let remainChar = (140 - this.$textArea.val().length);
        $(".chars-left").text(`${remainChar} characters remaining`);
    }

    removeMentionedUser(event) {
        event.preventDefault();
        if ($(event.target).hasClass("remove_mention")) {
            $(event.target).closest('div').remove()
        }
    }
}

module.exports = TweetCompose;

/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");
const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");

class UsersSearch {
    constructor(el) {
        this.$el = $(el);
        this.$input = this.$el.find("input")
        this.$ul = this.$el.find("ul")
        this.$input.on("input", this.handleInput.bind(this));
    }

    handleInput() {
        APIUtil.searchUsers(this.$input.val()).then((users) => {
            this.renderData(users);
        })
    }

    renderData(data) {
        let userTable = this.$el.find('ul.users');
        userTable.empty();
        data.forEach((user) => {
            let userAnchor = $(`<li><a href=${user.id}>${user.username}</a></li>`)
            let button = $('<button></button>')
            new FollowToggle(button, {
                userId: user.id,
                followState: user.followed ? 'followed' : 'unfollowed',
            });
            userTable.append(userAnchor);
            userTable.append(button);
        })
    }
}

module.exports = UsersSearch;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./users_search */ "./frontend/users_search.js");
const TweetCompose = __webpack_require__(/*! ./tweet_compose */ "./frontend/tweet_compose.js");
const InfiniteTweets = __webpack_require__(/*! ./infinite_tweets */ "./frontend/infinite_tweets.js")

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
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map