function entend(target, source) {
    for (var property in source) {
        target[property] = source[property];
    }
}

entend(exports, require('./literal-tests'));

if (require.main === module) {
    require('test').run(exports);
}

