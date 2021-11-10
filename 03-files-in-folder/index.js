const fs = require('fs')
const path = require('path')

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, function(err, files) {
    err ? console.log(err) : null
    const filterDirectories = files.filter(files => !files.isDirectory())

    for (const file of filterDirectories) {
        const name = file.name
        
        fs.stat(path.join(__dirname, 'secret-folder', name), (err, data) => {
            console.log(`${path.basename(file.name.split('.').splice(0, 1).join(''))} - ${path.basename(file.name.split('.').splice(1, 1).join(''))} - ${(data.size / 1024)}`)
        })
    }
})