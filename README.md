# Housing Market Investigator - INST377 Final Project
## Project Description:
This web application allows users to investigate the financial performance of Real Estate Investment Trusts (REITs) in relation to U.S. economic indicators, including the federal funds rate, unemployment, and CPI (consumer price index) data.

Users can:
- View a 12-month trend of selected REIT prices
- Analyze U.S. unemployment trends
- Compare indicators over any selected year, ranging from 2020 to 2025 (current year in progress)
- See the most commonly viewed REITs based on real-time logs

This web application uses real-time data from [TwelveData](https://twelvedata.com) for REIT stock prices and [FRED](https://fred.stlouisfed.org/) for economic indicators.  These are free-to-use APIs, but have rate-limiting (800 calls per day).  As for JavaScript libraries, two are used in this web app: **Chart.js** (for visualizations) and **Day.js** (timestamp formatting).

## Target Browsers:
- Google Chrome (desktop-only)
- Apple Safari (desktop-only)
- Microsoft Edge

Tested on MacOS 11+, Windows 10+, and Windows Server 2016+

## Developer Manual (see below):
See below in this README for developer installation, usage instructions, and API documentation.

---
This guide is for future developers who will maintain or expand the project.  Basic familiarity with HTML, JavaScript, REST APIs, and Supabase is assumed.

---

### Installation & Dependencies:

1. Clone the repository:  
    - If using **GitHub Desktop**:  
        - Click **Code > Open with GitHub Desktop**
        - Choose a folder and clone it locally
    - If using terminal:
        ```bash
        git clone https://github.com/[enter your username here]/INST377FINAL.git
        cd INST377FINAL
        ```
    This will ensure all current files are on your system.

2. Install backend dependencies (used only for local server testing):
    ```bash
    npm install
    ```
3.  (OPTIONAL) Use server.js (Express.js) to test locally
    - Will be elaborated upon below 

4.  Initialize node.js
    ```bash
    npm init -y
    ```
5.  Install server-side tools/packages
    - Express (API routes)
    - CORS (allows front-end requests; solves some API issues)
    - @supabase/supabase-js (allows communication with the Supabase database)
    ```bash
    npm install express cors @supabase/supabase-js
    ```
6. Server.js for local testing
    ```bash
    node server.js
    ```
7.  If deploying on Vercel, use /api/ folder for interactions with Supabase and REIT

### Testing:

This project does not include any automated unit tests. Instead, it can be validated through the following manual testing process:

1. Open `index.html` or visit the Vercel URL created.
2. Select a REIT (NLY, EQR, or INVH) and confirm that a chart renders correctly.
3. Visit `main.html` and choose a REIT and year (2020 through 2025); ensure the following:
   - The REIT graph updates correctly
   - CPI, unemployment, and federal funds rate charts update
4. Check Supabase logs (via dashboard) to confirm entries are created after each user interaction.
5. User interactions should include a UID, a year (when in `main.html`) and REIT ticker.

Any caught errors will appear in the console in Visual Studio Code.
---
### Server-wide API Documentation:

This application uses two custom *REST API* endpoints, hosted via Vercel's `/api/` serverless functions (this excludes server.js, as that is intended for local testing only):

- */api/reitlogs.js* uses **GET** to retrieve (read) logs from the database
- */api/interactions.js* uses **POST** to create (write) logs to the database 

Each interaction with `index.html` or `main.html` stores:
- `reit`: the REIT ticker (NLY, EQR, or INVH)
- `year`: the selected year (e.g. 2021 or 2023)
- `action`: where the interaction originated ("Main Page" or "Home Page" graph requests)

The `reitlogs` endpoint is used by the front-end to analyze REIT popularity and identify the top 2 most accessed tickers.  This information is accessible at `main.html`.  The `interactions` endpoint is used by the front-end to send (POST) information to the back-end (Supabase).
---
### Current bugs/issues:

Initially, Alpha Vantage's APIs were implemented, but due to severe rate limiting (25 API requests *per day*), TwelveData and FRED had to be implemented, as they offer a greater quanity of requests per day (TwelveData offers 800 requests per day, and FRED offers 120 requests *per minute*).  If a sudden influx of users is anticipated, it is advised that you purchase a premium API key with each provider.  If you wish to use a single API source, you can use Alpha Vantage's premium plans, but note that it will be $50/month for just 75 API calls per minute.

### Future Progress:

Future development should find a way to limit current REIT data and the "other economic factors" data to the most current available dates.  If unemployment percentages haven't been released, everything should be limited to the most current available date for *all* data.  As stated previously, if your future development expects a mass amount of visitors, you should migrate to a better API version with a higher allowed amount of API calls/requests.
---