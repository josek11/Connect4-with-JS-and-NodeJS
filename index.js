const http = require('http');
const url = require('url');
const fs   = require('fs');
const crypto = require('crypto');

var server = http.createServer(function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');

	if(req.url == "/register" && req.method == "POST"){
		let body = '';
		req.on('data', (chunk) => {
			body += chunk;
		});

		req.on('end', () => {
			try { 
				var confirm =0;
				var bquery = JSON.parse(body);
				console.log(JSON.stringify(bquery));
				fs.readFile("mydata.json", function(err,data) {
					if(!err) {
						var htmlnick = bquery.nick;
						var htmlpass = crypto.createHash('md5').update(bquery.pass).digest('hex');
						var regdata = JSON.parse(data.toString());
              			for(var i = 0; i<regdata.users.length; i++){
                			var user = regdata.users[i];
                			if(user.nick==htmlnick){
                  				if(user.pass!=htmlpass) confirm=1;
                  				else confirm=2;
                  				break;
                			}
              			}
              			if(confirm==0){
              				var obj = JSON.parse(data);
                			obj.users.push({nick: htmlnick, pass: htmlpass});
                			fs.writeFile("mydata.json",JSON.stringify(obj),function(err){
                  				if(err) throw err;
                			});
              			}

              			if(confirm==0 || confirm==2){
                			res.writeHead(200, {'Content-Type': "application/json"});
                			res.end(JSON.stringify({}));
                		}

                		else{
                			res.writeHead(401, {'Content-Type': "application/json"});
                			res.end(JSON.stringify(
                  				{"error": "User registered with a different password"}));
              			}
					}
				});
			}
			catch(err) {  console.log(err.message); }
		});

		req.on('error', (err) => { console.log(err.message);});

	}

	else if(req.url == "/ranking" && req.method== "POST"){
		let body = '';
		req.on('data', (chunk) => {
			body += chunk;
		});

		req.on('end', function () {
			try{ var bquery = JSON.parse(body);
				console.log(JSON.stringify(bquery));

				if(bquery.size == undefined){
          			res.writeHead(400, {'Content-Type': "application/json"});
          			res.end(JSON.stringify({"error": "Undefined size"}));
          		}
          		else if(!Number.isInteger(bquery.size.rows)){
          			res.writeHead(400, {'Content-Type': "application/json"});
          			res.end(JSON.stringify({"error": "Invalid size"}));
        		}
          		else{
          			fs.readFile("ranking.json",function(err,data) {
          				if(!err) {
			             	var dados = JSON.parse(data.toString());
			             	console.log(dados);
			              	res.writeHead(200, {'Content-Type': "application/json"});
			         		res.end(JSON.stringify(dados));
			             
            			} 
            			else console.log(err);

          			});
          		}


			}
			catch(err) {  console.log(err.message); }
		});
		req.on('error', (err) => { console.log(err.message);});
	}


	else{
    	res.writeHead(404, {"Content-Type": "application/json"});
    	res.write(JSON.stringify({ "error": "404 Page not found"}));
    	res.end();
  	}
});
server.listen(8114);