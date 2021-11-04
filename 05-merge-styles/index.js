const fs = require('fs')
const path = require('path')

let pathFiles = path.join(__dirname, 'styles')
let pathCopeFiles = path.join(__dirname, 'project-dist', 'bundle.css')

fs.readdir(pathFiles, function(err, files) {
    if (err) throw err
    for (const file of files) {
        fs.readFile(path.join(pathFiles, file), {recursive: true }, (err, files) => {
            if (path.extname(file) === '.css') {
                fs.appendFile(pathCopeFiles, files, (err) => {
                    if (err) throw err
                })
                console.log(`The content of the file ${path.basename(file)} have been successfully copied to the ${path.basename(pathCopeFiles)}`)
            }
        })
    }
})