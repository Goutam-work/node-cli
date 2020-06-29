var fs = require('fs');
var archiver = require('archiver');
const readline = require('readline');
const r = readline.createInterface({
	input: process.stdin,
	output: process.stdout
  })
// create a file to stream archive data to.
const output = fs.createWriteStream('example.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

 

archive.on('error', function(err) {
  throw err;
});

function getFiles(dir){
    let directory = fs.readdirSync(dir);

    directory.forEach(file => {

    	let filePath = dir + '/' + file;

    	let stats = fs.statSync(filePath);

        if (stats.isFile()) {

            archive.file(filePath, { name: file });
        } else {

            getFiles(filePath);
        }
    });
}

(function main(){
    r.question(`name of the folder to zip :- \n`, (answer) => {
        getFiles('./'+answer);

        archive.pipe(output);

        archive.finalize();

        console.log('Data has been archived');
      })
    r.close();
})()