var jison_path = '../node_modules/jison/lib/';
var jison = require(jison_path + 'jison'),
    bnf = require(jison_path + 'jison/bnf'),
    jisonlex = require(jison_path + 'jison/jisonlex');

var processGrammar = function(raw, lex, options) {
    var grammar = bnf.parse(raw);
    grammar.lex = jisonlex.parse(lex);

    var generator = new jison.Generator(grammar, options);
    return generator.generate(options);
};

exports.processGrammar = processGrammar;

