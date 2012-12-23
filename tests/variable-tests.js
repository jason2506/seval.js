var assert = require('assert'),
    seval = require('../lib/seval').parser;

function testVariable(variable, value) {
    var data = {};
    data[variable] = value;

    return function() {
        assert.strictEqual(seval.parse(variable)(data), value);
    };
}

exports['test variable'] = {
    'test single character name': testVariable('x', "hello, world"),
    'test ascii name': testVariable('$math_PI', 3.14159),
    'test unicode name': testVariable('π', 3.14159),
    'test name contains unicode escape sequence': testVariable('\\u03C0', 3.14159),
};

