function entend(target, source) {
    for (var property in source) {
        target[property] = source[property];
    }
}

entend(exports, require('./literal-tests'));
entend(exports, require('./variable-tests'));
entend(exports, require('./operator-tests'));

if (require.main === module) {
    require('test').run(exports);
}

