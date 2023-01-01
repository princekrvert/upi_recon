const axios = require("axios").default;
const process = require("process");
const fs = require("fs");
const lineReader = require('line-reader');
// thsi script is made by prince kumar 
// this is the beta version of the script , update will come soon 
// make a small banner
function banner(){
	process.stdout.write(`
█████████████████████████████████████████████████
█▄─██─▄█▄─▄▄─█▄─▄█▄─▄▄▀█▄─▄▄─█─▄▄▄─█─▄▄─█▄─▀█▄─▄█
██─██─███─▄▄▄██─███─▄─▄██─▄█▀█─███▀█─██─██─█▄▀─██
▀▀▄▄▄▄▀▀▄▄▄▀▀▀▄▄▄▀▄▄▀▄▄▀▄▄▄▄▄▀▄▄▄▄▄▀▄▄▄▄▀▄▄▄▀▀▄▄▀Beta\n`);
	process.stdout.write("\033[33;1mMADE BY PRINCE\n")

}
// make a help function 
function help(){
	banner();
	process.stdout.write("\033[31;1m Please provide some argument \n");
	process.stdout.write("\033[32;1m Uses : node app.js number\n");

}
//handle the argument in node js 
if(process.argv.length == 2){
	// call the help function 
	help();
process.exit(0)}
else if(process.argv.length > 3){
	console.log("Too many argument");
} else
{
 global.s_id = process.argv[2];
}

// follow me on insta princekrvert
// Now read the file 

fs.readFile("suffix.txt",'utf-8',(err,data) =>{
	if (err){
		console.log("err");
		return;
	}
	const session = axios.create();
        session.defaults.withCredentials = true;
        session.defaults.headers['User-Agent'] = "Mozilla/5.0 (Linux; Android 7.0; SM-G892A Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/60.0.3112.107 Mobile Safari/537.36";
	let all_id = data.split(/().*\/n/)
	lineReader.eachLine('suffix.txt', (line, last) => {
		let search_id = s_id
          session({
        method : "post",
        url : `https://upibankvalidator.com/api/upiValidation?upi=${search_id}@${line}`
    }).then((res) => { 
    	if (res.status == 200){
    		console.log(`UPI id ${search_id}@${line}`);
			console.log(res.data.name)
			console.log(res.data.message)
    	}
    	else if(res.status == 429){
    		process.stdout.write("\033[31;1mToo many requests\n");
    	}
    })
    .catch(err =>{
    	console.log(err);
    })
	});
})