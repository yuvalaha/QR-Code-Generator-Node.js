
import inquirer from "inquirer";
import fs from "fs";
import qr from 'qr-image';

// Handling the user input
inquirer.prompt([
{   type: "input",
    message: "Type in your URL: ",
    name: "URL"
}]).then((answers) => {

    const url = answers.URL;

    // Handling the QR Code
    let qr_png = qr.image(url, { type: 'png' });
    qr_png.pipe(fs.createWriteStream(`${url}.png`));

    // Creating txt file with the new url/ adding url
    // fs.write("URL.txt", url, err => {
    //     if (err) throw err;
    // })
    try {fs.appendFileSync("URL.txt", `${url}\n`)}
    catch(err){
        fs.writeFile("URL.txt", url, err => {
                if (err) throw err;
            })
    }

  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

