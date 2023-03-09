 var unirest = require("unirest");

function callit(){
    var reqq = unirest("POST", "https://judge0.p.rapidapi.com/submissions");

    reqq.headers({
        "x-rapidapi-host": "judge0.p.rapidapi.com",
        "x-rapidapi-key": "18c523759dmsh7666d68c362130cp1166e8jsnb39d42270efb",
        "content-type": "application/json",
        "accept": "application/json",
        "useQueryString": true
    });

    reqq.type("json");
    var token;

    reqq.send({
        "language_id": 50,
        "source_code": "#include <stdio.h>\n\nint main(void) {\n  char name[10];\n  scanf(\"%s\", name);\n  printf(\"hello %s\\n\", name);\n  return 0;\n}",
        "stdin": "world"
    });

     reqq.end(function (response) {
                if (response.error) {
                    return response.error;
                }
                token = response.body;
                return response.body;
            });

    while(!token)
    {
    }


    return token;
 }
 data = callit();
console.log(data);

// function getToken() {
//     return new Promise((resolve, reject) => {
//         unirest.post('https://judge0.p.rapidapi.com/submissions')
//             .headers({
//                 "x-rapidapi-host": "judge0.p.rapidapi.com",
//                 "x-rapidapi-key": "18c523759dmsh7666d68c362130cp1166e8jsnb39d42270efb",
//                 "content-type": "application/json",
//                 "accept": "application/json",
//                 "useQueryString": true
//             })
//             .send({"language_id": 50,
//                 "source_code": "#include <stdio.h>\n\nint main(void) {\n  char name[10];\n  scanf(\"%s\", name);\n  printf(\"hello %s\\n\", name);\n  return 0;\n}",
//                 "stdin": "world"})
//             .end(function (response) {
//                 if (response.error) {
//                     return reject(response.error)
//                 }
//                 return resolve(response.body);
//             });
//     })
// }
// getToken().then((body) => console.log("success", body)).catch((error) =>
//     console.log("error", error))









console.log("next");