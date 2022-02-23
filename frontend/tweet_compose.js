const APIUtil = require("./api_util");
const { tweetFormatting } = require("./helper_functions")

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
        let feed = this.$el.data('tweets-ul');
        $(feed).trigger('insert-tweet', tweet)
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