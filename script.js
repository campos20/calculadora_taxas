function calcularWCA(valorInscricao) {
  if (valorInscricao * 0.15 > 2.32) {
    var valorWCA = valorInscricao * 0.15;
  } else {
    var valorWCA = 2.32;
  }
  return valorWCA;
}

function calcularAluguel() {
  if (document.getElementById("abracm").checked) {
    var associacao = "ABRACM";
    var valorAssociacao = "2";
  }
  if (document.getElementById("abcm").checked) {
    var associacao = "ABCM";
    var valorAssociacao = "1";
  }
  var diasCompeticao = document.getElementById("diasCompeticoes").value;
  return [valorAssociacao * diasCompeticao, associacao];
}

function calcularStripe(valorInscricao) {
  return valorInscricao * 0.0399 + 0.39;
}

function adicionaRow(nomeRow, valorCompetidor, numeroCompetidores) {
  return `
        <tr>
          <td>${nomeRow}</td>
          <td>R$${arredondaDinheiro(valorCompetidor)}</td>
          <td>R$${arredondaDinheiro(valorCompetidor * numeroCompetidores)}</td>
        </tr>
        `;
}

function arredondaDinheiro(dinheiro) {
  return Math.round(dinheiro * 100) / 100;
}

function verificaInputs() {
  if (!parseInt(document.getElementById("quantidadeCompetidores").value)) {
    return false;
  }
  if (!parseInt(document.getElementById("valorInscricao").value)) {
    return false;
  }
  return true;
}

function adicionaHeader(h1, h2, h3) {
  return `
          <tr>
            <th>${h1}</th>
            <th>${h2}</th>
            <th>${h3}</th>
          </tr>`;
}

function adicionaOrcamento(
  numeroCompetidores,
  totalCompetidor,
  valorInscricao
) {
  orcamento = `<br><p style="font-size:small">Orçamento</p><table class="center">`;
  orcamento += adicionaHeader("Descrição", "Por competidor", "Total");
  orcamento += adicionaRow("Inscrições", valorInscricao, numeroCompetidores);
  orcamento += adicionaRow("Taxas", totalCompetidor, numeroCompetidores);
  orcamento += adicionaHeader(
    "Líquido",
    "R$" + arredondaDinheiro(valorInscricao - totalCompetidor),
    "R$" +
      arredondaDinheiro((valorInscricao - totalCompetidor) * numeroCompetidores)
  );
  return orcamento + `</table>`;
}

function calcularTaxa() {
  if (!verificaInputs()) {
    document.getElementById(
      "caixaDados"
    ).innerHTML = `<p style="color: red;font-size: x-small;">Insira corretamente o número de competidores e valor da inscrição</p>`;
    document.getElementById("valorTaxa").innerHTML = "";
    return;
  } else {
    document.getElementById("caixaDados").innerHTML = "";
  }

  var numeroCompetidores = document.getElementById(
    "quantidadeCompetidores"
  ).value;
  var valorInscricao = document.getElementById("valorInscricao").value;

  tabela = `<table class="center">`;

  tabela += adicionaHeader("Taxa", "Por Competidor", "Total");

  var valorWCA = calcularWCA(valorInscricao);
  tabela += adicionaRow("WCA", valorWCA, numeroCompetidores);
  var totalCompetidor = valorWCA;

  if (document.getElementById("aluguel").checked) {
    var valorAluguelCompetidor = calcularAluguel()[0];
    var associacao = calcularAluguel()[1];
    tabela += adicionaRow(
      associacao,
      valorAluguelCompetidor,
      numeroCompetidores
    );
    totalCompetidor += valorAluguelCompetidor;
  }

  if (document.getElementById("stripe").checked) {
    var valorStripe = calcularStripe(valorInscricao);
    tabela += adicionaRow("Stripe", valorStripe, numeroCompetidores);
    totalCompetidor += valorStripe;
  }

  tabela += adicionaHeader(
    "Total",
    "R$" + arredondaDinheiro(totalCompetidor),
    "R$" + arredondaDinheiro(totalCompetidor * numeroCompetidores)
  );

  document.getElementById("valorTaxa").innerHTML = tabela + "</table>";
  document.getElementById("valorTaxa").innerHTML += adicionaOrcamento(
    numeroCompetidores,
    totalCompetidor,
    valorInscricao
  );
}

function htmlAluguel(opcaoAluguel) {
  if (opcaoAluguel.checked == true) {
    document.getElementById("associacoesEquipamentos").innerHTML = `
        <label>
          <input type="radio" name="choice-radio" checked="true" id="abracm">
          ABRACM
        </label>
        <label>
          <input type="radio" name="choice-radio" id="abcm">
          ABCM
        </label>
        <br>
        <label for="diasCompeticoes">Número de dias de competição:
          <select name="diasCompeticoes" id="diasCompeticoes">
            <option value="1">1</option>
            <option value="2" selected>2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </label>
          `;
  }
  if (opcaoAluguel.checked == false) {
    document.getElementById("associacoesEquipamentos").innerHTML = ``;
  }
}
