/* --------     -----------  ----------         ---------*/
/* --------     -----------  ----------         ---------*/
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("node:https");

const app = express();

app.use(express.static(__dirname + "/public/")); // read the public folder the css and images are, *** added the line for vercel
//app.use(express.static("public")); 

app.use(bodyParser.urlencoded({
    extended: true
}));

/* --------     -----------  ----------         ---------*/
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html')
})
/* --------    Web pages     ---------------*/

/* --------   Post Route    ---------------*/

app.post('/', (req, res) => {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;


    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    const jsonData = JSON.stringify(data); // turn data to string in json format
    const url = "https://us21.api.mailchimp.com/3.0/lists/b49332d0d4"; // added ID AND X part
    const options = {
        method: "POST", // post data to expernal resorce
        auth: "ochwada:4624d75cc4ff906cc7a23ff45918d926-us21"
        
    }

    // make request (with https module)
    const requestX = https.request(url, options, (response) => {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + '/success.html')
        } else {
            res.sendFile(__dirname + '/failure.html');
        }

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    })

    requestX.write(jsonData);
    requestX.end();
    //console.log(firstName, lastName, email)
});

app.post('/failure', (req, res) => {
    res.redirect("/")
})
// http://localhost:3000/

/* app.listen(3000, function () {
    console.log("Server running on Port 3000")
}); */

app.listen(process.env.PORT, function () {
    console.log("Server running on Port 3000")
});

// app not working
// API Key
// 4624d75cc4ff906cc7a23ff45918d926 - us21

// Audience ID- b49332d0d4