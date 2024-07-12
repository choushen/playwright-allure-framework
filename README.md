# Playwright Allure Test Framework

A test framework using Playwright and Allure Reporting that is suitable for real application testing. This framework includes features like dynamic environment setup, API steps, faker for test data generation, GitHub actions for CI/CD, and more.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (v14.x or later)
- [npm](https://www.npmjs.com/get-npm)
- [Git](https://git-scm.com/downloads)
- [Playwright](https://playwright.dev/)
- [Allure CLI](https://docs.qameta.io/allure/)

### Troubleshooting (IMPORTANT)

1. For context, I use VSCode and WSL on a Windows 11 machine and I had to install chromium on my WSL using the following command:
``` zsh
sudo apt update
sudo apt install chromium-browser
```

2. Update the exe path in playwright.config.ts within the projects array:
``` typescript
//... other code

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        launchOptions: {
          executablePath: '/usr/bin/chromium-browser', // Path to Chromium in WSL
        },
      },
    },

// ... other code
```

Just remove these options if they cause you issues

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/splaywright-allure-test-framework.git
   cd splaywright-allure-test-framework
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Install Playwright browsers:**

   ```sh
   npx playwright install
   ```

### Configuration

Configure your environment variables and other settings in the `.env` file located in the root of the project.

### Running Tests

To run the tests, use the following command:

```sh
npx playwright test
```

Alternatively, if you are running VScode, just download [this](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension to run the tests via the test explorer panel

### Generating Allure Reports

To generate Allure reports after running the tests, use the following commands:

```sh
npx playwright test --reporter=line
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

### Continuous Integration

This project is configured to run tests on GitHub Actions. Ensure your repository is linked with GitHub and push your changes to trigger the CI pipeline.

## Project Folder Structure

```plaintext
playwright-allure-test-framework
├── tests                   # Test specifications
├── pages                   # Page Object Models
├── playwright.config.ts    # Playwright configuration
├── package.json            # NPM package file
├── README.md               # Project documentation
├── .gitignore              # Ignores things that shouldn't be git pushed   
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Create a new Pull Request

---

Happy testing!
