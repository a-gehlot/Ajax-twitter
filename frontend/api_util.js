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
    }
}

module.exports = APIUtil;