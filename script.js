const MAX_CARDS = 200; // Change this value as needed

async function loadCards() {
    try {
        const response = await fetch("confessions.txt");

        if (!response.ok) {
            throw new Error("Unable to read confessions.txt");
        }

        const text = await response.text();

        const sections = text
            .split(/\r?\n\r?\n+/)
            .map(section => section.trim())
            .filter(section => section.length > 0)
            .slice(0, MAX_CARDS);

        if (sections.length === 0) {
            return;
        }

        const container = document.getElementById("cardContainer");

        sections.forEach(section => {
            const lines = section.trim().split(/\r?\n/);

            if (lines.length === 0) return;

            const title = lines.shift();
            const time = lines.pop()
            const body = lines.join("<br>");

            const card = document.createElement("div");

            card.innerHTML = `
            <div class="card confession-card">
                <div class="card-header-strip"></div>
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p>${body}</p>
                    <div class="card-date">${time}</div>
                </div>
            </div>
            `;

            container.appendChild(card);
        });

    } catch (err) {
        console.error(err);

        document.getElementById("cardContainer").innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">
                    Failed to load data.
                </div>
            </div>
        `;
    }
}

loadCards();
