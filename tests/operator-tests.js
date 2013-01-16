var assert = require('assert'),
    seval = require('../lib/seval');

function testOperator(str, test) {
    var expr = seval.parse(str);
    return function() {
        var result = expr(test.data);
        assert.deepEqual(result, test.expected);
    };
}

function testExpression(expr, expected) {
    return function() {
        assert.strictEqual(seval.eval(expr), expected);
    };
}

function hello() {
    return 'hi';
}

function sum(x, y, z) {
    return x + y + z;
}

function multipleCall(x) {
    return function(y) {
        return x * y;
    }
}

function returnObject() {
    return {
        x: "value",
        foo: { bar: 2.7183 },
        sqrt: function(x) {
            return Math.sqrt(x);
        }
    };
}

var obj = returnObject();
var obj2 = new (function(x) {
    this.x = x;
    this.plus = function(y) {
        return this.x + y;
    };
})(5);

exports['test member operator'] = {
    'test single . operator': testOperator('obj.x',
        { data: { obj: obj }, expected: obj.x }),
    'test multiple . operator': testOperator('obj.foo.bar',
        { data: { obj: obj }, expected: obj.foo.bar }),
    'test single [] operator': testOperator('obj["x"]',
        { data: { obj: obj }, expected: obj["x"] }),
    'test multiple [] operator': testOperator('obj["foo"]["bar"]',
        { data: { obj: obj }, expected: obj["foo"]["bar"] }),
    'test . followed by []': testOperator('obj.foo["bar"]',
        { data: { obj: obj }, expected: obj.foo["bar"] }),
    'test [] followed by .': testOperator('obj["foo"].bar',
        { data: { obj: obj }, expected: obj["foo"].bar }),
};

exports['test call operator'] = {
    'test the simplest function': testOperator('hello()', {
        data: { hello: hello }, expected: hello() }),
    'test function with multiple arguments': testOperator('sum(3, 15, 1.5)', {
        data: { sum: sum }, expected: sum(3, 15, 1.5) }),
    'test multiple function call': testOperator('multipleCall(-3)(2.3)', {
        data: { multipleCall: multipleCall }, expected: multipleCall(-3)(2.3) }),
    'test member access after function call': testOperator('returnObject().x', {
        data: { returnObject: returnObject }, expected: returnObject().x }),
    'test member function': testOperator('obj["sqrt"](2)', {
        data: { obj: obj }, expected: obj["sqrt"](2) }),
    'test member function that involves `this`': testOperator('obj2.plus(-3)', {
        data: { obj2: obj2 }, expected: obj2.plus(-3) }),
};

exports['test operator precedence'] = {
    'test if ?: is right-to-left':
        testExpression('0 ? 0 : 1 ? 1 : 1', 0 ? 0 : 1 ? 1 : 1),
    'test if || is higher than ?:':
        testExpression('1 ? 0: 0 || 1', 1 ? 0: 0 || 1),
    'test if && is higher than ||':
        testExpression('1 || 0 && 0', 1 || 0 && 0),
    'test if | is higher than &&':
        testExpression('0 | 0 && 1', 0 || 0 && 1),
    'test if ^ is higher than |':
        testExpression('1 | 0 ^ 1', 1 | 0 ^ 1),
    'test if & is higher than ^':
        testExpression('1 ^ 0 & 0', 1 ^ 0 & 0),
    'test if equality operator is higher than &':
        testExpression('0 & 0 == 0', 0 & 0 == 0),
    'test if relational operator is higher than equality operator':
        testExpression('0 == 0 < 0', 0 == 0 < 0),
    'test if shift operator is higher than relational operator':
        testExpression('1 < 1 << 1', 1 < 1 << 1),
    'test if additive operator is higher than shift operator':
        testExpression('0 << 0 + 1', 0 << 0 + 1),
    'test if multiplicative operator is higher than additive operator':
        testExpression('1 + 0 * 0', 1 + 0 * 0),
    'test if unary operator is higher than multiplicative operator':
        testExpression('~1 * 0', ~1 * 0),
    'test if () is higher than unary operator':
        testExpression('-(1 - 1)', -(1 - 1)),
};

