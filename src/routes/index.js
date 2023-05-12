// Routes
import express, { response }  from "express";
import fs  from "fs";
import { parse }  from "csv-parse";

const router = express.Router();

router.get('/',(req, res) =>{

    let index = 0;
    let nodes = [];
    var companies = []
    var countCompanies = {} 
    var roles = {}
    
    fs.createReadStream("./data.csv")
        .pipe(parse({ delimiter: ",", from_line: 1 }))
        .on("data", function (row) {  

                if(index === 0) {
                    for (let item in row){
                        nodes.push(row[item].trim())
                    } 
                } else {
                    let len = Object.keys(countCompanies).length;
                    countCompanies[row[0]] = 1
                    if (len != Object.keys(countCompanies).length){
                        companies.push({"organization":row[0],"users": [] })
                    }
                    
                    if (!(row[0]+"-"+row[1] in roles)) {
                        roles[row[0]+"-"+row[1]] = [row[2]]
                    } else {                        
                        const allRoles = roles[row[0]+"-"+row[1]].concat(row[2]);
                        roles[row[0]+"-"+row[1]] = allRoles                        
                    } 
                }                
                index += 1;
            }).on("end", function () {
                for (let i in companies){
                    let users = []
                    for (const [key, value] of Object.entries(roles)){                        
                        if(key.includes(companies[i].organization)){
                            let user = {"username": key.replace(companies[i].organization+"-", ""),
                                "roles": value};
                            users.push(user)
                        }
                    }                    
                    companies[i].users = users
                }
                const jsonString = JSON.stringify(companies);
                console.log(jsonString)
                res.json(companies)

              })
    
     
    
  });

export default router;