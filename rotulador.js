const lineReader = require("line-reader");
const ValidateLine = require("./validateLine");
const LexicalAnalysis = require("./lexicalAnalysis");
var fs = require("fs");

const arrayLine = [];
const arrayLexical = [];

const verifyCodeFont = (line) => {
  let outPut;
  const validateLine = ValidateLine();
  const ignoreLine = validateLine.ignoreLine(line);
  const existsfunction = validateLine.existsfunction(line);
  const variableDeclaration = validateLine.variableDeclaration(line);
  const expressaoMatematica = validateLine.ExpressaoMatematica(line);
  const returnValue = validateLine.returnValue(line);
  const closeBlockCode = validateLine.closeBlockCode(line);
  const callFunction = validateLine.callFunction(line);
  const conditionalControl = validateLine.conditionalControl(line);
  const repeatControl = validateLine.repeatControl(line);

  ignoreLine && (outPut = ignoreLine);
  existsfunction && (outPut = existsfunction);
  variableDeclaration && (outPut = variableDeclaration);
  expressaoMatematica && (outPut = expressaoMatematica);
  returnValue && (outPut = returnValue);
  closeBlockCode && (outPut = closeBlockCode);
  callFunction && (outPut = callFunction);
  conditionalControl && (outPut = conditionalControl);
  repeatControl && (outPut = repeatControl);

  return outPut;
};
let countlin = 0;
const verifyCodeFontLexical = (line) => {
  const lexicalAnalysis = LexicalAnalysis();
  const existsfunction = lexicalAnalysis.existsfunction(line);
  const attributionDeclaration = lexicalAnalysis.attributionDeclaration(line);
  const operationMath = lexicalAnalysis.operationMath(line);
  const separator = lexicalAnalysis.separator(line);
  const delimiter = lexicalAnalysis.delimiter(line);
  const repeatControl = lexicalAnalysis.repeatControl(line);
  const conditionalControl = lexicalAnalysis.conditionalControl(line);
  const identifier = lexicalAnalysis.identifier(line);

  existsfunction &&
    arrayLexical.push("Posição linha " + countlin + ": " + existsfunction);

  attributionDeclaration &&
    arrayLexical.push(
      "Posição linha " + countlin + ": " + attributionDeclaration
    );

  operationMath &&
    arrayLexical.push("Posição linha " + countlin + ": " + operationMath);

  separator &&
    arrayLexical.push("Posição linha " + countlin + ": " + separator);

  delimiter &&
    arrayLexical.push("Posição linha " + countlin + ": " + delimiter);

  repeatControl &&
    arrayLexical.push("Posição linha " + countlin + ": " + repeatControl);

  conditionalControl &&
    arrayLexical.push("Posição linha " + countlin + ": " + conditionalControl);

  identifier &&
    arrayLexical.push("Posição linha " + countlin + ": " + identifier);
  countlin++;
};

const writeLineFile = () => {
  let logger = fs.createWriteStream("./gravacaoLexica.txt", {
    flags: "a",
  });
  arrayLexical.forEach((i) => {
    logger.write(i + "\n");
  });
  logger.end();
};

lineReader.eachLine("./codigoFonte.js", (line, finalFile) => {
  arrayLine.push(verifyCodeFont(line));
  verifyCodeFontLexical(line);
  if (finalFile) {
    console.table(arrayLine);
    ("--------------------");
    console.table(arrayLexical);
    writeLineFile(arrayLexical);
  }
});
