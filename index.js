/**
 * Created by ysysz on 2016/8/4.
 */
var main = require("./main.js");
var argv = process.argv.splice(" ");
if (argv[0] === "mail") {
    var mail_part = require("./mail_part.js");
    mail_part.send_mail();
}else{
    main.get_data();
}
