const APIUtil = require("./api_util");

class TweetCompose {
    constructor (el) {
        this.$el = $(el);
        this.$el.submit(this.submit.bind(this))
        this.$textArea = this.$el.find("textarea")
        this.$textArea.on("input", this.updateChars.bind(this));
        this.$newMentionButton = this.$el.find(".add_mention")
        this.$newMentionButton.on("click", this.newUserSelect.bind(this))
    }

    submit(event) {
        event.preventDefault();
        let data = this.$el.serializeJSON()
        console.log(data);
        this.clearInput();
        this.$el.find(":input").prop("disabled", true);
        APIUtil.createTweet(data).then((tweet) => this.handleSuccess(tweet));
    }

    newUserSelect(event) {
        event.preventDefault();
        APIUtil.addUserMentions().then((data) => this.addMention(data))
    }

    addMention (data) {
        let mentionDrop = $('<select name="tweet[mentioned_user_ids][]"></select>')
        data.forEach(element => {
            console.log(element.id);
            mentionDrop.append(`<option value=${element.id}>${element.username}</option>`)
        });
        this.$el.append(mentionDrop)

    }

    clearInput() {
        this.$el.find('[name^=tweet]').val('');
    }

    handleSuccess(tweet) {
        this.clearInput();
        console.log(tweet);
        this.$el.find(":input").prop("disabled", false);
        let ul = this.$el.data("tweets-ul");
        $(ul).prepend(`<li>${JSON.stringify(tweet)}</li>`)
    }

    updateChars() {
        let remainChar = (140 - this.$textArea.val().length);
        $(".chars-left").text(`${remainChar} characters remaining`);
    }
}

module.exports = TweetCompose;