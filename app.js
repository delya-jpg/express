const express = require("express");
 
const app = express();

app.get("/", function(request, response){
     
    response.send("<h1>Привет Октагон!</h1>");
});

app.get("/static", function(request, response) {
    response.json({
        header: "Hello",
        body: "Octagon NodeJS Test"
    });
});

app.get("/dynamic", function(request, response) {
    const a = request.query.a;
    const b = request.query.b;
    const c = request.query.c;

    const numA = Number(a);
    const numB = Number(b);
    const numC = Number(c);

    if (isNaN(numA) || isNaN(numB) || isNaN(numC)) {
        response.json({ header: "Error" });
    } else {
        const result = (numA * numB * numC) / 3;
        response.json({
            header: "Calculated",
            body: result
        });
    }
});
app.listen(3000);