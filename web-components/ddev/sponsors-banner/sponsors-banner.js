class DdevSponsorsBanner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    fetch("https://raw.githubusercontent.com/ddev/sponsorship-data/refs/heads/main/data/all-sponsorships.json")
      .then((response) => response.json())
      .then((json) => {
        const goal = json.current_goal?.target_amount || 12000;
        const formattedIncome = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(json.total_monthly_average_income);

        const formattedGoal = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(goal);

        console.log("DDEV Sponsorship Data:", json);

        this.shadowRoot.innerHTML = `
          <style>
            .ddev-sponsor-us-banner {
              --ddev-sub-color-blue: #02a8e2;
              --ddev-sub-color-black: #1e2127;
              --ddev-sub-color-white: #ffffff;
              --ddev-sub-spacing: 1rem;
            }

            .ddev-sponsor-us-banner,
            .ddev-sponsor-us-banner *,
            .ddev-sponsor-us-banner *::before,
            .ddev-sponsor-us-banner *::after {
              box-sizing: border-box;
            }

            .ddev-sponsor-us-banner {
              display: grid;
              grid-template-columns: 1fr 6fr 1fr;
              gap: 1rem;
              padding: 1rem;
              font-family: var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");
              text-align: center;
              background: var(--ddev-sub-color-black);
              color: var(--ddev-sub-color-white);
            }

            .ddev-sponsor-us-banner h2 {
              margin-block-start: 0;
            }

            .ddev-sponsor-us-banner meter {
              width: 100%;
              background: var(--ddev-sub-color-white);
              border: 2px solid var(--ddev-sub-color-black);
            }

            .ddev-sponsor-us-banner meter:-moz-meter-optimum::-moz-meter-bar,
            .ddev-sponsor-us-banner meter::-webkit-meter-optimum-value {
              background: var(--ddev-sub-color-blue);
            }

            .ddev-sponsor-us-banner__logo,
            .ddev-sponsor-us-banner__cta {
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .ddev-sponsor-us-banner__link {
              display: inline-block;
              padding: 1rem;
              border-radius: 0.25rem;
              font-weight: bold;
              text-decoration: none;
              color: var(--ddev-sub-color-white);
              background: var(--ddev-sub-color-blue);
              transition: 0.3s;
            }

            .ddev-sponsor-us-banner__link:hover,
            .ddev-sponsor-us-banner__link:focus {
              text-decoration: underline;
              background-color: var (--ddev-sub-color-white);
              color: var(--ddev-sub-color-black);
            }
          </style>

          <div class="ddev-sponsor-us-banner">
            <div class="ddev-sponsor-us-banner__logo">
              <img src="https://raw.githubusercontent.com/ddev/ddev/refs/heads/main/docs/content/developers/logos/SVG/Logo.svg" alt="DDEV Logo">
            </div>

            <div class="ddev-sponsor-us-banner__content">
              <h2>Sponsor DDEV</h2>
              <p>Help us reach our goal of ${formattedGoal} per month</p>
              <p>Currently ${formattedIncome} of ${formattedGoal}</p>
              <meter value="${json.total_monthly_average_income}" max="${goal}"></meter>
            </div>

            <div class="ddev-sponsor-us-banner__cta">
              <a href="https://github.com/sponsors/ddev" class="ddev-sponsor-us-banner__link">Sponsor Us</a>
            </div>
          </div>
        `;
      });
  }
}

customElements.define('ddev-sponsors-banner', DdevSponsorsBanner);
