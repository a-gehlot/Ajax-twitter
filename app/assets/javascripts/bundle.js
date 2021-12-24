/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/***/ ((module) => {

class FollowToggle {
    constructor($el) {
        this.$el = $el;
        this.userID = $el.data('user-id');
        this.followState = $el.data('follow-state')
        this.render();
        this.$el.click(this.handleClick.bind(this))
    }

    render() {
        if (this.followState === "unfollowed") {
            this.$el.text("Follow")
        } else {
            this.$el.text("Unfollow")
        }
    }

    handleClick(event) {
        event.preventDefault();
        $.ajax({
            type: (this.followState === "unfollowed") ? "POST" : "DELETE",
            url: "/users/" + this.userID + "/follow",
            dataType: "json",
            success: (response) => {
                this.toggleFollowState();
                this.render();
            }
        });
    }

    toggleFollowState() {
        if (this.followState === "unfollowed") {
            this.$el.data('follow-state', 'followed');
            this.followState = "followed"
        } else {
            this.$el.data('follow-satte', 'unfollowed')
            this.followState = 'unfollowed'
        };
    }
}

module.exports = FollowToggle;

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

$(document).ready(function() {
    $("button.follow-toggle").each(function(idx, element) {
        new FollowToggle($(element));
    })
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map