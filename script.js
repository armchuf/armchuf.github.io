const MAX_CARDS = 100; // Change this value as needed

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

        document.getElementById("loading").remove();

        const container = document.getElementById("cardContainer");

        sections.forEach(section => {
            const lines = section.trim().split(/\r?\n/);

            if (lines.length === 0) return;

            const title = lines.shift();      // First line = heading
            const body = lines.join("<br>");  // Remaining lines

            const card = document.createElement("div");

            card.innerHTML = `
            <div class="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
                <div style="height:6px; background: linear-gradient(90deg, #712cf9, #9b59b6);"></div>
                <div class="card-body p-4">
                    <h4 class="card-title fw-bold text-dark mb-0">
                        ${title}
                    </h4>
                    <p class="card-text fs-6 text-secondary mb-0" style="white-space: pre-line;">
                            ${body}
                    </p>
                </div>
            </div>
            `;

            container.appendChild(card);
        });

        document.getElementById("footer").style.display = "";

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