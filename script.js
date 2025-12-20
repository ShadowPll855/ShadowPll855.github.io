const socket = new WebSocket("ws://localhost:21213");

const cats = {
  cat1: 0,
  cat2: 0
};

const finishLine = 80; // porcentagem

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.event === "like") {
    moveCat("cat1", 1);
  }

  if (data.event === "comment") {
    moveCat("cat2", 2);
  }

  if (data.event === "gift") {
    moveCat("cat1", 5);
    moveCat("cat2", 5);
  }
};

function moveCat(catId, amount) {
  cats[catId] += amount;
  document.getElementById(catId).style.left = cats[catId] + "%";

  if (cats[catId] >= finishLine) {
    alert(catId + " venceu!");
    resetRace();
  }
}

function resetRace() {
  cats.cat1 = 0;
  cats.cat2 = 0;
  document.getElementById("cat1").style.left = "0%";
  document.getElementById("cat2").style.left = "0%";
}
