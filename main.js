/**
 * Created by ysysz on 2016/8/4.
 */
var superagent = require("superagent");
var cheerio = require("cheerio");
var fs = require('fs');
var isMail = true;

exports.get_data = function (Mail_flag) {
    isMail = Mail_flag;
    var n_nrl = "http://www.nowcoder.com/discuss?order=3&type=7";

    var page_num = 1;

    var links = [];

    for (var i = 0; i < page_num; i++) {
        var temp_url = n_nrl + "&page=" + page_num;
        superagent.get(temp_url)
            .end(function (err, pres) {
                var $ = cheerio.load(pres.text);
                var divs = $(".discuss-main");
               
                for (var j = 0; j < divs.length; j++) {
                    var link = divs[j].children[1].attribs["href"];
                    links.push(link);
                }
                deal_link(links);

            })
    }
};


function deal_link(links) {
    var all_contents = [];
    var cc = 0;
    for (var i = 0; i < links.length; i++) {
        var link = "http://www.nowcoder.com" + links[i];
        superagent.get(link)
            .end(function (err, pres) {
                var $ = cheerio.load(pres.text);
                var post = {};
                $("script").remove();
                post.link = pres.request.url;
                var div1 = $(".post-topic-des");
                post.title = $(".discuss-title").text();
                post.time = $(".post-time").text();
                post.content = div1.html();
                if (post.content !== "") {
                    all_contents.push(post);
                    console.log("save post " + post.title);
                }
                cc++;


                if (cc === links.length) {
                    fs.writeFile('./output.json', JSON.stringify(all_contents),function () {
                        if(isMail) {
                            var mail_part = require("./mail_part.js");
                            mail_part.send_mail();
                        }
                    });
                }

            })
    }
}

