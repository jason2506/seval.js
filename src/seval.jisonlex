/* Patterns: Numeric Literal */
DecimalDigits                       [0-9]+
DecimalIntegerLiteral               "0"|([1-9]{DecimalDigits}?)
ExponentPart                        [eE][+-]?{DecimalDigits}
DecimalLiteral                      ({DecimalIntegerLiteral}"."{DecimalDigits}?{ExponentPart}?)|("."{DecimalDigits}{ExponentPart}?)|({DecimalIntegerLiteral}{ExponentPart}?)
OctalDigit                          [0-7]
OctalIntegerLiteral                 "0"{OctalDigit}+
HexDigit                            [0-9a-fA-F]
HexIntegerLiteral                   "0"[xX]{HexDigit}+
NumericLiteral                      {HexIntegerLiteral}|{OctalIntegerLiteral}|{DecimalLiteral}

/* Patterns: String Literal */
LineContinuation                    \\(\r\n|\r|\n)
OctalEscapeSequence                 (?:[1-7][0-7]{0,2}|[0-7]{2,3})
HexEscapeSequence                   [x]{HexDigit}{2}
UnicodeEscapeSequence               [u]{HexDigit}{4}
CharacterEscapeSequence             [^0-9xu]
EscapeSequence                      {CharacterEscapeSequence}|{OctalEscapeSequence}|{HexEscapeSequence}|{UnicodeEscapeSequence}
DoubleStringCharacter               ([^\"\\\n\r]+)|(\\{EscapeSequence})|{LineContinuation}
SingleStringCharacter               ([^\'\\\n\r]+)|(\\{EscapeSequence})|{LineContinuation}
StringLiteral                       (\"{DoubleStringCharacter}*\")|(\'{SingleStringCharacter}*\')

/* Patterns: Regular Expression Literal */
RegularExpressionNonTerminator      [^\n\r]
RegularExpressionBackslashSequence  \\{RegularExpressionNonTerminator}
RegularExpressionClassChar          [^\n\r\]\\]|{RegularExpressionBackslashSequence}
RegularExpressionClass              \[{RegularExpressionClassChar}*\]
RegularExpressionFlags              {IdentifierPart}*
RegularExpressionFirstChar          ([^\n\r\*\\\/\[])|{RegularExpressionBackslashSequence}|{RegularExpressionClass}
RegularExpressionChar               ([^\n\r\\\/\[])|{RegularExpressionBackslashSequence}|{RegularExpressionClass}
RegularExpressionBody               {RegularExpressionFirstChar}{RegularExpressionChar}*
RegularExpressionLiteral            \/{RegularExpressionBody}\/{RegularExpressionFlags}

/* Patterns: Identifier */
IdentifierStart                     [$_A-Za-z\x7f-\uffff]
IdentifierPart                      {IdentifierStart}|[0-9]
IdentifierName                      {IdentifierStart}{IdentifierPart}*

%%

\s+                                 /* skip whitespaces */;

/* Tokens: Literal */
"null"                              return 'NULL';
"undefined"                         return 'UNDEFINED';
"NaN"                               return 'NAN';
"true"                              return 'TRUE';
"false"                             return 'FALSE';
{NumericLiteral}                    return 'NUMBER';
{StringLiteral}                     return 'STRING';
{RegularExpressionLiteral}          return 'REGEXP';

/* Tokens: Operator */
","                                 return ",";
"?"                                 return '?';
":"                                 return ':';
"||"                                return '||';
"&&"                                return '&&';
"|"                                 return '|';
"^"                                 return '^';
"&"                                 return '&';
"<<"                                return '<<';
">>>"                               return '>>>';
">>"                                return '>>';
"==="                               return '===';
"!=="                               return '!==';
"=="                                return '==';
"!="                                return '!=';
"<="                                return '<=';
"<"                                 return '<';
">="                                return '>=';
">"                                 return '>';
"+"                                 return '+';
"-"                                 return '-';
"*"                                 return '*';
"/"                                 return '/';
"%"                                 return '%';
"!"                                 return '!';
"~"                                 return '~';
"("                                 return '(';
")"                                 return ')';
"["                                 return '[';
"]"                                 return ']';
"."                                 return '.';
"in"                                return 'IN';
"instanceof"                        return 'INSTANCEOF';
"typeof"                            return 'TYPEOF';

/* Tokens: Others */
{IdentifierName}                    return 'IDENTIFIER';
<<EOF>>                             return 'EOF';

