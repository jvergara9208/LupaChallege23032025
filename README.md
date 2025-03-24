# LupaChallege23032025

## Project Overview
This project contains automated tests for searching hotels and applying filters on Booking.com using Cypress and Gherkin.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/LupaChallege23032025.git
    cd LupaChallege23032025
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

### Running Tests

1. Open Cypress Test Runner:
    ```bash
    npx cypress open
    ```

2. Run tests in headless mode:
    ```bash
    npx cypress run
    ```

### Project Structure

- `cypress/e2e/hotel-search.feature`: Contains Gherkin scenarios for hotel search and filters.
- `cypress/e2e/hotel-search.js`: Step definitions for the Gherkin scenarios.
- `cypress/fixtures`: Contains test data files.
- `cypress/integration`: Contains additional test files.
- `cypress/plugins/index.js`: Cypress plugins configuration.
- `cypress/support/commands.js`: Custom Cypress commands.
- `cypress/support/index.js`: Cypress support file.

### Writing Tests

1. Add Gherkin scenarios to `cypress/e2e/hotel-search.feature`.
2. Implement step definitions in `cypress/e2e/hotel-search.js`.

### Running Specific Tests

To run a specific test file, use:
```bash
npx cypress run --spec "cypress/e2e/hotel-search.js"