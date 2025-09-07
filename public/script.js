async function loadCards() {
  const res = await fetch("/api/get");
  const data = await res.json();

  const cardsContainer = document.getElementById("cards");
  cardsContainer.innerHTML = "";

  data.forEach((card) => {
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = card.content; // user can copy text
    cardsContainer.appendChild(div);
  });
}

window.onload = loadCards;


 const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
      card.addEventListener("dblclick", () => {
        const text = card.textContent.trim(); // card ka text
        navigator.clipboard.writeText(text)
          .then(() => {
            // chhoti si feedback dene ke liye
            card.style.background = "#d4ffd4"; 
            setTimeout(() => card.style.background = "", 500);
          })
          .catch(err => {
            console.error("Copy failed", err);
          });
      });
    });
