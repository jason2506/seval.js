var assert = require('assert'),
    seval = require('../lib/seval').parser;

function testLiteral(literal, expected) {
    return function() {
        assert.strictEqual(seval.parse(literal)(), expected);
    };
}

exports['test numeric literal'] = {
    'test zero': testLiteral('0', 0),
    'test non-zero number': testLiteral('999', 999),
    'test floating-point number': testLiteral('3.1416', 3.1416),
    'test floating-point number in lower-case scientific notation': testLiteral('.313e-2', .313e-2),
    'test floating-point number in upper-case scientific notation': testLiteral('3E+2', 3E+2),
    'test octal number': testLiteral('010', 010),
    'test hexadecimal number in lower-case': testLiteral('0xff', 0xff),
    'test hexadecimal number in upper-case': testLiteral('0XFF', 0XFF),
};

exports['test string literal'] = {
    'test single-quoted string': testLiteral("'hello, world'", 'hello, world'),
    'test double-quoted string': testLiteral('"hello, world"', "hello, world"),
    'test single-quoted empty string': testLiteral("''", ''),
    'test double-quoted empty string': testLiteral('""', ""),
    'test unicode string': testLiteral('"π"', "π"),
    'test escape unicode string': testLiteral('"\\u4f60\\u597D"', "\u4f60\u597D"),
    'test escape characters': testLiteral('"\\\"\\t\\\"\\n"', "\"\t\"\n"),
    'test line continuation': testLiteral('"abc\\\ndef"', "abc\
def"),
};

exports['test boolean literal'] = {
    'test true': testLiteral('true', true),
    'test false': testLiteral('false', false),
};

exports['test regexp literal'] = {
    // TODO: add test cases
};

exports['test other literal'] = {
    'test null': testLiteral('null', null),
    'test undefined': testLiteral('undefined', undefined),
    'test NaN': function() { assert(isNaN(seval.parse('NaN')())); },
};

