const { execSync } = require("child_process");
const fs = require("fs");

const results = [];
for (let i=1; i<=100; i++) {

    const probName = `${i}`.padStart(4, "0");
    const thisProblemJson = execSync(`ts-node ./problems/${probName}/${probName}.ts json`).toString();
    console.log(i, thisProblemJson);

    results.push(
        JSON.parse(thisProblemJson)
    );
}

fs.writeFileSync("./execution-data.json", JSON.stringify(results));