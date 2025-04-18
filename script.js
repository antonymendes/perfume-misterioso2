const firebaseConfig = {
  apiKey: "AIzaSyB3eTZTBPLSAxcGrqHMBnIHSf1YSGHwyPg",
  authDomain: "perfume-misterioso.firebaseapp.com",
  databaseURL: "https://perfume-misterioso-default-rtdb.firebaseio.com",
  projectId: "perfume-misterioso",
  storageBucket: "perfume-misterioso.firebasestorage.app",
  messagingSenderId: "618238888581",
  appId: "1:618238888581:web:8ba1a6f45b6b0cd59977ec"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const form = document.getElementById("quiz");
const loading = document.getElementById("loading");
const resultado = document.getElementById("resultado");
const encontro = document.getElementById("encontro");
const final = document.getElementById("final");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  form.style.display = "none";
  loading.style.display = "block";

  const frases = ["frase1", "frase2", "frase3"];
  frases.forEach((id, index) => {
    setTimeout(() => {
      document.getElementById(id).style.display = "block";
    }, index * 2000);
  });

  setTimeout(() => {
    loading.style.display = "none";
    resultado.style.display = "block";
    setTimeout(() => {
      encontro.style.display = "block";
    }, 3000);
  }, 6500);
});

document.getElementById("encontro").addEventListener("submit", function (e) {
  e.preventDefault();

  const respostas = {
    // Perguntas principais
    nota: form.nota.value,
    intensidade: form.intensidade.value,
    ocasião: form.ocasião.value,
    lugar: form.lugar.value,

    // Perguntas detalhadas sobre o perfume de nicho
    nota_detalhada: form.nota_detalhada.value,
    ocasião_nicho: form.ocasião_nicho.value,
    personalidade: form.personalidade.value,
    duracao: form.duracao.value,
    sensacao: form.sensacao.value,
    cidade: form.cidade.value,

    // Informações do encontro
    dia: this.dia.value,
    horario: this.horario.value,
    restaurante: this.restaurante.value,

    timestamp: new Date().toISOString()
  };

  db.ref("respostas").push(respostas)
    .then(() => {
      document.getElementById("encontro").style.display = "none";
      final.style.display = "block";
    })
    .catch(err => {
      console.error(err);
      alert("Erro ao salvar suas respostas! Tente novamente.");
    });
});
