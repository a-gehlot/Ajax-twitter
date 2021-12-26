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
    }
}

module.exports = APIUtil;