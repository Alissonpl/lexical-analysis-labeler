const { messagesReturn } = require("./messagesReturn");
const LexicalAnalysis = () => {
  const existsfunction = (line) => {
    const verifyfunction = /^(?:[\s]+)?(?:const|let|var|)?(?:[a-z0-9.]+(?:\.prototype)?)?(?:\s)?(?:[a-z0-9-_{}:\s]+\s?=)?\s?(?:[a-z0-9]+\s+\:\s+)?(?:function\s?)?(?:[a-z0-9_-]+)?\s?\(.*\)\s?(?:.+)?([=>]:)?\{(?:(?:[^}{]+|\{(?:[^}{]+|\{[^}{]*\})*\})*\}(?:\s?\(.*\)\s?\)\s?)?)?(?:\;)?$/gim;
    if (
      line.match(verifyfunction) &&
      !line.includes("for") &&
      !line.includes("if")
    ) {
      let lineFunction = line.split("function");
      lineFunction = lineFunction[1].split("(");
      return "classe definição de função, lexema" + lineFunction[0];
    }
  };

  const attributionDeclaration = (line) => {
    const verifyVariable = /=/;
    if (line.match(verifyVariable)) {
      return "classe atribuição, lexema =";
    }
  };

  const operationMath = (line) => {
    const verifyVariable = /[+]/;
    if (line.match(verifyVariable)) {
      return "classe operação matematica, lexema +";
    }
  };

  const separator = (line) => {
    const verifyVariable = /;/;
    if (line.match(verifyVariable)) {
      return "classe separador, lexema ;";
    }
  };

  const delimiter = (line) => {
    const verifyVariable = /{/;
    if (line.match(verifyVariable)) {
      return "classe separador, lexema {";
    }
  };

  const conditionalControl = (line) => {
    const veriftFinalCondicional = /\W([{| { ]+$)/g;
    const verifyInicialCondicional = /if/g;
    if (
      line.match(veriftFinalCondicional) &&
      line.match(verifyInicialCondicional)
    ) {
      return "classe controle de condicional, lexema if";
    }
  };

  const repeatControl = (line) => {
    const veriftFinalCondicional = /\W([{| { ]+$)/g;
    const verifyInicialCondicional = /for/g;
    if (
      line.match(veriftFinalCondicional) &&
      line.match(verifyInicialCondicional)
    ) {
      return "classe controle de repetição, lexema for";
    }
  };

  const identifier = (line) => {
    const veriftIdentifierl = /[(][a-z]|let [a-z]|return [a-z]/g;
    const message = "classe identificador, lexema ";
    if (line.match(veriftIdentifierl)) {
      if (line.includes("let")) return message + line.split("let")[1];
      if (line.includes("return")) return message + line.split("return")[1];
      if (line.includes("(") && line.includes(",")) {
        let lineIndentifier1 = line.split("(")[1];
        lineIndentifier1 = lineIndentifier1.split(",");
        if (lineIndentifier1[0]) return message + lineIndentifier1[0];

        if (lineIndentifier1[1]) {
          lineIndentifier1 = lineIndentifier1.split(")");
          return message + lineIndentifier1[0];
        }
      }
      if (line.includes("(") && !line.includes("<" || "<="))
        return message + line.split("(")[1].split(")")[0];

      if (
        line.includes("(") &&
        line.includes("<" || "<=") &&
        line.includes(";")
      )
        return message + line.split("(")[1].split("<=")[1].split(";")[0];

      if (
        line.includes("(") &&
        line.includes("<" || "<=") &&
        !line.includes(";")
      )
        return message + line.split("(")[1].split("<")[0];
    }
  };

  return {
    existsfunction,
    attributionDeclaration,
    operationMath,
    separator,
    delimiter,
    identifier,
    conditionalControl,
    repeatControl,
  };
};

module.exports = LexicalAnalysis;
