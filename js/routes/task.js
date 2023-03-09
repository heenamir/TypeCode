var express = require('express');
var router = express.Router();
var unirest = require("unirest");


var User = require('../models/user');
router.get('/createTask', function (req, res) 
{
    var newTask = new Task();
    newTask.save(function (err, data) {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/task/' + data._id);
        }
    })
});

router.get('/task/:id', function (req, res) {
    if (req.params.id) {
        Task.findOne({ _id: req.params.id }, function (err, data) {
            if (err) {
                console.log("erooor " +err);
                res.render('error', { invalid : "This Collab doesn't exist"  });
            }
            if (data) {
                res.render('task', { content: data.content, roomID: data.id });
            } else {
                res.render('error', { invalid: "Is not you its me!" });
            }
        })
    } else {
        res.render('error');
    }
});

async function callback( body, req ){

 };

router.post('/task/:id', async (req, res,callback)=>{
    // console.log(req.body);
    // console.log(req);
    console.log(req.body.code);

    var unirest = require("unirest");
    var coded;

    // var unreq = unirest("POST", "https://api.judge0.com/submissions/");

    // unreq.headers({
    //     "x-rapidapi-host": "judge0.p.rapidapi.com",
    //     "x-rapidapi-key": "accc39c68bmshbb27afa680da227p1814c7jsn7f4a4bb3080d",
    //     "content-type": "application/json",
    //     "accept": "application/json",
    //     "useQueryString": true
    // });

    // unreq.type("json");
    // unreq.send({
    //     "language_id": 50,
    //     "source_code": `#include<iostream>
    // using namespace std;
    // int main()
    // {
    //     string s;
    //     cin>>s;
    //     cout<<"Holla "<<s<<endl;
    // }`,
    //     "stdin": "pawan"
    // });
    // var unirest = require("unirest");

    var unreq = unirest("POST", "https://judge0.p.rapidapi.com/submissions");

    unreq.headers({
        "x-rapidapi-host": "judge0.p.rapidapi.com",
        "x-rapidapi-key": "accc39c68bmshbb27afa680da227p1814c7jsn7f4a4bb3080d",
        "content-type": "application/json",
        "accept": "application/json",
        "useQueryString": true
    });

    unreq.type("json");
    unreq.send({
        "language_id": 53,
        "source_code": req.body.code,//"#include <stdio.h>\n\nint main(void) {\n  char name[10];\n  scanf(\"%s\", name);\n  printf(\"hello %s\\n\", name);\n  return 0;\n}",
        "stdin": req.body.input
    });

    unreq.end(function (res) {
        if (res.error) throw new Error(res.error);

        console.log(res.body);
    });

    unreq.end(async (response)=> {
        // console.log("\n#\n#\n#\n");
         if (response.error) {
            //  console.log(response.body.token);
             console.log(response.error);
             
             res.send({ error: "sorry something wrong on our side, please try again later!" })
         }

        // console.log("\n#\n#\n#\n#");

        coded = response.body.token;
        console.log(response.body.token);
        // console.log(res);
        setTimeout(function (res) {
            var rereq = unirest("GET", "https://judge0.p.rapidapi.com/submissions/" + response.body.token);

            rereq.headers({
                "x-rapidapi-host": "judge0.p.rapidapi.com",
                "x-rapidapi-key": "accc39c68bmshbb27afa680da227p1814c7jsn7f4a4bb3080d",
                "useQueryString": true
            });


            rereq.end(async (responses) => {
                console.log(responses.body);
                if (responses.error) {
                    console.log(responses.error);

                }
                // console.log("\n*\n*\n*\n");
                // if (responses.status.id == 3)
                res.send(responses.body);


                // console.log("i");
                // console.log(res.body);
            }); }, 5000,res);
            // var req = unirest("GET", "https://judge0.p.rapidapi.com/submissions/" + response.body.token);

            // req.headers({
            //     "x-rapidapi-host": "judge0.p.rapidapi.com",
            //     "x-rapidapi-key": "accc39c68bmshbb27afa680da227p1814c7jsn7f4a4bb3080d",
            //     "useQueryString": true
            // });


            // req.end(async (responses) => {
            //     console.log(responses.body);
            //     if (responses.error){
            //         console.log(responses.error);

            //     } 
            //     console.log("\n*\n*\n*\n");
            //     // if (responses.status.id == 3)
            //         res.send(responses);
                    

            //         console.log("i");
            //     // console.log(res.body);
            // });
        
        
        

        // var req = unirest("GET", "https://judge0.p.rapidapi.com/submissions/" + response.body.token);

        // req.headers({
        //     "x-rapidapi-host": "judge0.p.rapidapi.com",
        //     "x-rapidapi-key": "accc39c68bmshbb27afa680da227p1814c7jsn7f4a4bb3080d",
        //     "useQueryString": true
        // });

        
        // req.end(async (responses)=> {
        //     if (responses.error) throw new Error(responses.error);
        //     console.log("\n*\n*\n*\n");
        //     if(responses.status.id==2)
            
        //     console.log(responses.body);
        //     res.send(responses);
        //     // console.log(res.body);
        // });


    


        // res.send({ error: "holla pota" })
    });
    console.log(coded + "ps");
    
    
});

module.exports = router;