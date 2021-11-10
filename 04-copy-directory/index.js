const fs = require('fs')
const path = require('path')

let pathFiles = path.join(__dirname, 'files')
let pathCopyFiles = path.join(__dirname, 'files-copy')

function copyFile() {
    fs.readdir(pathFiles, { withFileTypes: true }, function(err, files) {
        if (err) throw err
        for (const file of files) {
            fs.mkdir('04-copy-directory/files-copy', { recursive: true }, (err) => {
                if (err) throw err
                fs.copyFile(path.join(pathFiles, file.name), path.join(pathCopyFiles, file.name), (err) => {
                    if (err) throw err
                    console.log(`The file ${file.name} was successfully copied to the directory: ${path.basename(pathCopyFiles)}.`)
                })
            })
        }
    })
}

function del() {
    if (pathCopyFiles) {
        fs.rmdir(pathCopyFiles, { recursive: true}, () => {
            copyFile()
        })
    } else {
        copyFile()
    }
}

del()
