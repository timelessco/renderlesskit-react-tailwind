const fs = require("fs");
const { exec } = require("child_process");

if (fs.existsSync("./dist/tailwind.css")) {
  console.log("tailwind.css found");
} else {
  console.log("tailwind.css not found, generating css");

  const twExec = exec(
    "npx tailwindcss-cli@latest build ./src/button/stories/style.css -o ./dist/tailwind.css",
  );

  twExec.stdout.on("data", function (data) {
    console.log(data);
  });
  twExec.stdout.on("error", function (err) {
    console.log(err);
  });
}
