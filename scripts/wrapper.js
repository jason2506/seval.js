var generator = require('./generator'),
    IO = require('./io');

var wrap = function(raw_path, lex_path, output_path, wrapper, options, exports) {
    var raw = IO.read(raw_path),
        lex = IO.read(lex_path);

    var parser = generator.processGrammar(raw, lex, options);
    var output = '';
    output += 'var seval = (function() {\n';
    output += parser + '\n';
    output += 'var seval = ' + seval + ';\n';
    output += 'return seval(parser);\n';
    output += '})();\n';
    output += exports;

    IO.write(output_path, output);
};

var seval = function(parser) {
    var parse = function(expr) {
        return parser.parse.call(parser, expr);
    };

    var eval = function(expr, data) {
        return parse(expr)(data);
    };

    return { parse: parse, eval: eval };
};

var options = {
    moduleType: 'js',
    moduleName: 'parser'
};

wrap('src/seval.jison', 'src/seval.jisonlex', 'web/seval.js', seval, options, '');
wrap('src/seval.jison', 'src/seval.jisonlex', 'lib/seval.js', seval, options,
        'exports.parse = seval.parse;\n' +
        'exports.eval = seval.eval;\n');

