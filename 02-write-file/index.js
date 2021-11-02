const process = require('process')
const readLine = require('readline')
const path = require('path')
const fs = require('fs')

const ws = fs.createWriteStream('02-write-file/stream.txt', 'utf-8')
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ('Write text: \n')
})

rl.prompt()

rl.on('line', (input) => {
    if (input != 'exit') {
        ws.write(input + '\n')
    }
    if (input == 'exit') {
        rl.close()
    }
}).on('close', () => {
    console.log('Goodbye')
})