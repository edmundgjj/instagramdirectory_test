$(document).ready(function () {
  //GET list of username from RestDB

  //Collect all usernames into an array
  let usernames = [];
  $(function () {
    $.ajax({
      async: true,
      crossDomain: true,
      url: "https://instagram-2698.restdb.io/rest/userdata",
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-apikey": "5f50da4dc5e01c1e033b8be4",
        "cache-control": "no-cache",
      },
      type: "GET",
      success: function (data) {
        // Get all usernames from RestDB and add it to username array
        for (x of data) {
          if (usernames.includes(x["username"]) == false) {
            usernames.push(x["username"]);
          }
        }

        //username array contains all usernames in restDB
        //get other information from Instagram API based on username

        for (x of usernames) {
          console.log(x);
          $.ajax({
            url: `https://www.instagram.com/${x}/?__a=1`,
            method: "GET",
          }).done(function (data) {
            let username = data.graphql.user.username;
            let biography = data.graphql.user.biography;
            let profilePicture = data.graphql.user.profile_pic_url_hd;
            let business_email = data.graphql.user.business_email;
            let external_url = data.graphql.user.external_url;
            let follower_num = data.graphql.user.edge_followed_by.count;

            $.ajax({
              async: true,
              crossDomain: true,
              url: "https://instagram-2698.restdb.io/rest/userdata",
              method: "PUT",
              headers: {
                "content-type": "application/json",
                "x-apikey": "5f50da4dc5e01c1e033b8be4",
                "cache-control": "no-cache",
              },
              type: "PUT",
              success: function (data) {
                for (x of data) {
                  console.log(x);
                  console.log(x["username"]);
                  if ((x["username"] = username)) {
                    x["profile_picture"] = profilePicture;
                    x["bio"] = biography;
                    x["business_email"] = business_email;
                    x["follower_num"] = follower_num;
                    x["external_url"] = external_url;
                  }
                }
              },
            });
          });
        }
      },
    });
  });
});
