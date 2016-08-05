var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var wellknown = require("nodemailer-wellknown");
var EventProxy = require('eventproxy');
var fs = require("fs");

exports.send_mail = function (html) {

    var ep = EventProxy.create("transporter", "mailOptions","content", function (transporter, mailOptions, content) {
        var date = new Date();
        mailOptions.subject = "牛客网招聘板块" + date.toLocaleString();
        mailOptions.html = html;


        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });

    });

    fs.readFile("./auth.json", "utf-8", function (error, data) {
        if (error) {
            console.log(error);
        } else {
            ep.emit("transporter", add_auth(JSON.parse(data)));
        }
    });

    fs.readFile("./send_list.json", "utf-8", function (error, data) {
        if (error) {
            console.log(error);
        } else {
            ep.emit("mailOptions", JSON.parse(data));
        }
    });


    var cheerio = require("cheerio");
    $ = cheerio.load('<div id = "container"></div>');
    fs.readFile("output.json", "utf8", function (error, data) {
        if (error) throw error;

        data = JSON.parse(data);
        for (var i = 0, len = data.length; i < len; i++) {
            var item = data[i];
            var selector = "con" + i;
            var con = $("#container").append('<div id ="' + selector + '"></div>');
            $("#" + selector).append("<h1>" + item.title + "</h1>");
            $("#" + selector).append("<span>" + item.time + "</span>");
            $("#" + selector).append("<div>" + item.content + "</div>")
            $("#" + selector).append("<a href='" + item.link + "'>请戳链接</a>")
        }

        var res = $('#container').html();

        ep.emit("content", res);

    });


}

function add_auth(auth) {
    var config = wellknown("QQ");
    config.auth = auth;
    var transporter = nodemailer.createTransport(smtpTransport(config));
    return transporter;
}



