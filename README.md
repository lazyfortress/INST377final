# Housing Market Investigator - INST377 Final Project
## Project Description:
This web application allows users to investigate the financial performance of Real Estate Investment Trusts (REITs) in relation to U.S. economic indicators, including the federal funds rate, unemployment, and CPI (consumer price index) data.

Users can:
- View a 12-month trend of selected REIT prices
- Analyze U.S. unemployment trends
- Compare indicators over any selected year, ranging from 2020 to 2025 (current year in progress)
- See the most commonly viewed REITs based on real-time logs

This web application uses real-time data from [TwelveData](https://twelvedata.com) for REIT stock prices and [FRED](https://fred.stlouisfed.org/) for economic indicators.

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

### Installation & Dependencies

1. Clone the repository:  
    - If using **GitHub Desktop**:  
        - Click **Code > Open with GitHub Desktop**
        - Choose a folder and clone it locally
    - If using terminal:
        ```bash
        git clone https://github.com/[enter your username here]/INST377FINAL.git
        cd INST377FINAL
        ```

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

### ✅ Testing

This project does not include automated unit tests. Instead, it can be validated through the following **manual testing process**:

1. Open `index.html` or visit the Vercel URL.
2. Select a REIT (NLY, EQR, or INVH) and confirm that a chart renders correctly.
3. Visit `main.html` and choose a REIT and year (2020 through 2025); confirm:
   - The REIT graph updates correctly
   - CPI, unemployment, and federal funds rate charts update
4. Check Supabase logs (via dashboard) to confirm entries are created after each user interaction.
