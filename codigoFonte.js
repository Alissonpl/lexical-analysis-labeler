function calcularSoma(valor1, valor2) {
  let valor3;

  valor3 = valor1 + valor2;

  return valor3;
}

const resultado = calcularSoma(1, 2);

function greaterThanOne(resultado) {
  for (x = 0; x <= resultado; x++) {
    if (x > 1) {
      return resultado;
    }
  }
}

function lessThanOne(resultado) {
  for (x = 0; x <= resultado; x++) {
    if (x < 1) {
      return resultado;
    }
  }
}

greaterThanOne(resultado);
lessThanOne(resultado);
