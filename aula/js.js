class Aluno {
  constructor(nome, nota1, nota2, nota3) {
    this.nome = nome;
    this.nota1 = nota1;
    this.nota2 = nota2;
    this.nota3 = nota3;

    this.media = (nota1 + nota2 + nota3) / 3;
    if (this.media >= 7) {
      this.situacao = "Aprovado";
    } else if (this.media >= 5) {
      this.situacao = "Recuperação";
    } else {
      this.situacao = "Reprovado";
    }
  }
}

function PushDados() {
  nome = document.querySelector("#nome").value;
  nota1 = parseFloat(document.querySelector("#nota1").value);
  nota2 = parseFloat(document.querySelector("#nota2").value);
  nota3 = parseFloat(document.querySelector("#nota3").value);
  novoAluno = new Aluno(nome, nota1, nota2, nota3);
  localStorage.setItem("novoAluno", JSON.stringify(novoAluno));

  document.querySelector("#nomeAluno").textContent = novoAluno.nome;
  document.querySelector("#nota1Aluno").textContent = novoAluno.nota1;
  document.querySelector("#nota2Aluno").textContent = novoAluno.nota2;
  document.querySelector("#nota3Aluno").textContent = novoAluno.nota3;
  document.querySelector("#mediaAluno").textContent = novoAluno.media.toFixed(2);
  document.querySelector("#status").textContent = novoAluno.situacao;
  console.log(novoAluno);
}
