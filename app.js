const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({exteded: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us20.api.mailchimp.com/3.0/lists/38d5502717",
        method: "POST",
        headers: {
            "Authorization": "esther1 4a02592857c1f304c72bdfbf2b142beb-us20"
        },
        body: jsonData
    };

    request(options, function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            console.log(response.statusCode);
        }
    });

});

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
});

// API ID
// 4a02592857c1f304c72bdfbf2b142beb-us20

// LIST ID
// 38d5502717