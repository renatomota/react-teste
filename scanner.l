%{
#include <stdio.h>
#include <stdlib.h>
%}
TKN_ID [a-zA-z][a-zA-Z0-9]*
TKN_NUM [0-9]+("."[0-9]+)?
TKN_ATRIB "="
TKN_PTOVIRGULA ";"
TKN_MULT "*"
TKN_DIV "/"
TKN_MAIS "+"
TKN_MENOS "-"
TKN_PAA "("
TKN_PAF ")"
TKN_COS "cos"
TKN_SEN "sen"

%%
{TKN_ID} {printf("tipo: TKN_ID %s \n", yytext);}
{TKN_NUM} {printf("tipo: TKN_NUM %d \n", atoi(yytext));}
{TKN_ATRIB} {printf("tipo: TKN_ATRIB %s \n", yytext);}
{TKN_PTOVIRGULA} {printf("tipo: TKN_PTOVIRGULA %s \n", yytext);}
{TKN_MULT} {printf("tipo: TKN_MULT %s \n", yytext);}
{TKN_DIV} {printf("tipo: TKN_DIV %s \n", yytext);}
{TKN_MAIS} {printf("tipo: TKN_MAIS %s \n", yytext);}
{TKN_MENOS} {printf("tipo: TKN_MENOS %s \n", yytext);}
{TKN_PAA} {printf("tipo: TKN_PAA %s \n", yytext);}
{TKN_PAF} {printf("tipo: TKN_PAF %s \n", yytext);}
{TKN_COS} {printf("tipo: TKN_COS %s \n", yytext);}
{TKN_SEN} {printf("tipo: TKN_SEN %s \n", yytext);}

%%
int main( argc, argv )
int argc;
char **argv;
    {
    ++argv, --argc;
    if ( argc > 0 )
            yyin = fopen( argv[0], "r" );
    else
            yyin = stdin;

    yylex();
    }
