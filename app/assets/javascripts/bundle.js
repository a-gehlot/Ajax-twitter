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
    constructor($el) {
        this.$el = $el;
        this.userID = $el.data('user-id');
        this.followState = $el.data('follow-state')
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

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

class UsersSearch {
    constructor($el) {
        this.$el = $el;
        this.input = $el.find("input")
        this.ul = $el.find("ul")
        this.input.on("input", this.handleInput.bind(this));
    }

    handleInput() {
        if (this.input.val() === '') {
            this.renderData(['']);
            return;
        }
        APIUtil.searchUsers(this.input.val()).then((value) => {
            console.log(value);
        })
    }

    renderData(data) {
        this.ul.empty();
        this.ul.append(data);
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

$(document).ready(function() {
    $("button.follow-toggle").each(function(idx, element) {
        new FollowToggle($(element));
    })
    $("nav.users-search").each(function(idx, element) {
        new UsersSearch($(element));
    })
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map