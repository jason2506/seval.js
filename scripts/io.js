var fs = require('fs');

function read(path) {
    return fs.readFileSync(path, 'utf8');
}

function write(path, content) {
    fs.writeFileSync(path, content);
}

exports.read = read;
exports.write = write;

