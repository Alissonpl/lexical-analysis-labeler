const { messagesReturn } = require("./messagesReturn");
const ValidateLine = () => {
  const existsfunction = (line) => {
    const verifyfunction = /^(?:[\s]+)?(?:const|let|var|)?(?:[a-z0-9.]+(?:\.prototype)?)?(?:\s)?(?:[a-z0-9-_{}:\s]+\s?=)?\s?(?:[a-z0-9]+\s+\:\s+)?(?:function\s?)?(?:[a-z0-9_-]+)?\s?\(.*\)\s?(?:.+)?([=>]:)?\{(?:(?:[^}{]+|\{(?:[^}{]+|\{[^}{]*\})*\})*\}(?:\s?\(.*\)\s?\)\s?)?)?(?:\;)?$/gim;
    if (
      line.match(verifyfunction) &&
      !line.includes("for") &&
      !line.includes("if")
    ) {
      return messagesReturn[1];
    }
  };

  const variableDeclaration = (line) => {
    const verifyVariable = /let/;
    if (line.match(verifyVariable)) {
      return messagesReturn[2];
    }
  };

  const closeBlockCode = (line) => {
    const verifyBlockCode = /(?:})/g;

    if (line.match(verifyBlockCode)) {
      return messagesReturn[3];
    }
  };

  const ExpressaoMatematica = (line) => {
    const verifyExpreMat = /([-+]?[\/\+\-\*])/;

    if (line.match(verifyExpreMat)) {
      return messagesReturn[4];
    }
  };

  const returnValue = (line) => {
    const validReturn = /return\s\w/g;
    if (line.match(validReturn)) {
      return messagesReturn[5];
    }
  };

  const callFunction = (line) => {
    const verifyCallfunction = /[);]+[);]+$/g;

    if (line.match(verifyCallfunction)) {
      return messagesReturn[6];
    }
  };

  const conditionalControl = (line) => {
    const veriftFinalCondicional = /\W([{| { ]+$)/g;
    const verifyInicialCondicional = /if/g;
    if (
      line.match(veriftFinalCondicional) &&
      line.match(verifyInicialCondicional)
    ) {
      return messagesReturn[7];
    }
  };

  const repeatControl = (line) => {
    const veriftFinalCondicional = /\W([{| { ]+$)/g;
    const verifyInicialCondicional = /for/g;
    if (
      line.match(veriftFinalCondicional) &&
      line.match(verifyInicialCondicional)
    ) {
      return messagesReturn[8];
    }
  };

  const ignoreLine = (line) => {
    return !line.toString() && (outPut = messagesReturn[0]);
  };

  return {
    ignoreLine,
    existsfunction,
    variableDeclaration,
    closeBlockCode,
    ExpressaoMatematica,
    returnValue,
    conditionalControl,
    callFunction,
    repeatControl,
  };
};

module.exports = ValidateLine;
