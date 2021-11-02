const fs = require('fs')
const path = require('path')

const readStream = fs.createReadStream('01-read-file/text.txt', 'utf-8')

readStream.on('data', (text) => {
    console.log(text)
})