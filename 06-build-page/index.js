const fs = require('fs')
const path = require('path')

let pathDist = path.join(__dirname, 'project-dist', 'index.html')

let pathHtml = path.join(__dirname, 'template.html')
let pathComponents = path.join(__dirname, 'components')

let pathStyles = path.join(__dirname, 'styles')
let pathCopeFiles = path.join(__dirname, 'project-dist', 'style.css')

let pathAssets = path.join(__dirname, 'assets', 'fonts')
let pathImg = path.join(__dirname, 'assets', 'img')
let pathSvg = path.join(__dirname, 'assets', 'svg')

let pathCopyFonts = path.join(__dirname, 'project-dist', 'assets', 'fonts')
let pathCopyImg = path.join(__dirname, 'project-dist', 'assets', 'img')
let pathCopySvg = path.join(__dirname, 'project-dist', 'assets', 'svg')


//============ HTML ==================

fs.readFile(pathHtml, 'utf-8', function(err, data) {
    if (err) throw err
    fs.readdir(pathComponents, (err, files) => {
        if (err) throw err
        for (const file of files) {    
            fs.readFile(path.join(pathComponents, file), 'utf-8', (err, info) => {
                if (err) throw err
                let name = file.split('.')[0]
                let key = new RegExp(`{{${name}}}`, 'g')

                data = data.replace(key, info)

                fs.writeFile(path.join(pathDist), data, 'utf-8', (err) => {
                    if (err) throw err
                })
            })
        }
    })
})


//============COPY STYLES==================
function copyFile() {
fs.readdir(pathStyles, function(err, files) {
    if (err) throw err
    for (const file of files) {
        fs.mkdir('06-build-page/project-dist', {recursive: true}, err => {
            if (err) throw err
            fs.readFile(path.join(pathStyles, file), (err, files) => {
                if (path.extname(file) == '.css') {
                    fs.appendFile(pathCopeFiles, files, (err) => {
                        if (err) throw err
                    })
                }
            })
        })
    }
})
}


function del() {
    if (pathCopeFiles) {
        fs.unlink(pathCopeFiles, (err) => {
        })
        copyFile()
    } else {
        copyFile()
    }
}

del()

//============COPY ASSETS==================

function copyFonts(){
fs.readdir(pathAssets, { withFileTypes: true }, function(err, files) {
    if (err) throw err
    for (const file of files) {
        fs.mkdir('06-build-page/project-dist/assets', { recursive: true }, (err) => {
            if (err) throw err
            fs.mkdir('06-build-page/project-dist/assets/fonts', {recursive: true }, (err) => {
                if (err) throw err
                fs.copyFile(path.join(pathAssets, file.name), path.join(pathCopyFonts, file.name), (err) => {
                    if (err) throw err
                })
            })
        })
    }
})
}
copyFonts()

function copyImg(){
    fs.readdir(pathImg, { withFileTypes: true }, function(err, files) {
        if (err) throw err
        for (const file of files) {
            fs.mkdir('06-build-page/project-dist/assets/img', {recursive: true }, (err) => {
                if (err) throw err
                fs.copyFile(path.join(pathImg, file.name), path.join(pathCopyImg, file.name), (err) => {
                    if (err) throw err
                })
            })
        }
    })
}
copyImg()

function copySvg(){
    fs.readdir(pathSvg, { withFileTypes: true }, function(err, files) {
        if (err) throw err
        for (const file of files) {
            fs.mkdir('06-build-page/project-dist/assets/svg', {recursive: true }, (err) => {
                if (err) throw err
                fs.copyFile(path.join(pathSvg, file.name), path.join(pathCopySvg, file.name), (err) => {
                    if (err) throw err
                })
            })
        }
    })
}
copySvg()

console.log('Success!')