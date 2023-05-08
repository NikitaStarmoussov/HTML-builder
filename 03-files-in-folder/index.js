const fs = require("fs");
const path = require("path");
//require modulees
const dirSecretFolder = path.join(__dirname, "secret-folder");
//add correct path
function getInfo(pathFolder) {
  fs.readdir(pathFolder, { withFileTypes: true }, (error, array) => {
    if (error) {
      throw error;
    } else {
      const filesArr = array
        .filter((file) => file.isFile())
        .map((file) => file.name);
      for (let i = 0; i < filesArr.length; i++) {
        fs.stat(path.join(pathFolder, filesArr[i]), (error, stats) => {
          if (error) {
            throw error;
          } else {
            let name = path.basename(filesArr[i], path.extname(filesArr[i]));
            let ext = "";
            let size = "0B";
            if (name[0] !== ".") {
              ext = path.extname(filesArr[i]).slice(1);
            } else {
              name = "Not have name";
              ext = path
                .basename(filesArr[i], path.extname(filesArr[i]))
                .slice(1);
            }
            if (stats.size) {
              size = stats.size.toString() + "B";
            }
            let result = name + " - " + ext + " - " + size;
            console.log(result);
          }
        });
      }
    }
  });
}
getInfo(dirSecretFolder);

