var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("table")

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Happyboy1!",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    //  console.log('connected as id ' + connection.threadId);
    //  connection.end()
    bidAuction();
});

    function bidAuction() {
        // query the database for all items being auctioned
        connection.query("SELECT * FROM inventory", function (err, results) {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "choice",
                        type: "rawlist",
                        choices: function () {
                            var choiceArray = [];
                            for (var i = 0; i < results.length; i++) {
                                choiceArray.push(results[i].item + "  In Stock : "+ results[i].stock + " Price " + results[i].price);
                               // choiceArray.push(results[i].stock);

                            }
                            return choiceArray;
                        },
                        message: "What would you like to buy?"
                    },
                    {
                        name: "num",
                        type: "input",
                        message: "How many would you like?"
                    }
                ])
                .then(function (answer) {
                    // get the information of the chosen item
                    var chosenItem;
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].item === answer.choice) {
                            chosenItem = results[i];
                        }
                    }
                    // determine if enough in stock
                    if (chosenItem.stock > parseInt(answer.num)) {
                        connection.query(
                            "UPDATE inventory SET ? WHERE ?",
                            [
                                {
                                    stock: chosenItem.stock-answer.num
                                },
                                {
                                    id: chosenItem.id
                                }
                            ],
                            function (error) {
                                if (error) throw err;
                                console.log("Ok. That will be $" + answer.num*chosenItem.price);
                               // start();
                            }
                        );
                    }
                    else {
                        console.log("We dont have that many");
                        //start();
                    }
                });
        });
    }

