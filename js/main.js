document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("watchlistBody");
  const msg = document.getElementById("watchlistMessage");

  // Temporary data so I can see the layout
  const sample = [
    { model: "RTX 3060", condition: "Used", price: 240, source: "eBay" },
    { model: "RX 6700 XT", condition: "Used", price: 280, source: "Facebook Marketplace" }
  ];

  renderWatchlist(sample);

  function renderWatchlist(items) {
    body.innerHTML = "";

    if (items.length === 0) {
      msg.textContent = "No saved GPUs yet.";
      return;
    }

    msg.textContent = `Saved GPUs: ${items.length}`;

    for (const item of items) {
      const tr = document.createElement("tr");

      tr.appendChild(cell(item.model));
      tr.appendChild(cell(item.condition));
      tr.appendChild(cell(`$${item.price}`));
      tr.appendChild(cell(item.source));

      const removeTd = document.createElement("td");
      const btn = document.createElement("button");
      btn.textContent = "Remove";
      btn.addEventListener("click", () => {
        tr.remove();
        msg.textContent = "Removed from watchlist (sample only).";
      });
      removeTd.appendChild(btn);
      tr.appendChild(removeTd);

      body.appendChild(tr);
    }
  }

  function cell(text) {
    const td = document.createElement("td");
    td.textContent = text;
    return td;
  }
});
