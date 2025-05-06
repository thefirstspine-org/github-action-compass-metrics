# Compass Metrics GitHub Action

This GitHub Action allows you to interact with Atlassian Compass by running various commands to push metrics, check service availability, and analyze vulnerabilities.

## Inputs

The action accepts the following inputs:

| Input Name                | Required | Default Value | Description                                                                 |
|---------------------------|----------|---------------|-----------------------------------------------------------------------------|
| `command`                 | Yes      | `test`        | The command to execute. Available commands: `test`, `availability`, `open-vulnerabilities`. |
| `atlassianUserEmail`      | No       | `''`          | The email address of the Atlassian user.                                   |
| `atlassianUserApiKey`     | No       | `''`          | The API key for the Atlassian user.                                        |
| `gatewayDomain`           | No       | `''`          | The domain of the Atlassian gateway.                                       |
| `metricSourceId`          | No       | `''`          | The ID of the metric source in Compass.                                    |
| `serviceUrl`              | No       | `''`          | The URL of the service to check availability.                              |
| `path`                    | No       | `''`          | The path to the project directory for vulnerability scanning.              |
| `scanNpmVulnerabilities`  | No       | `''`          | Whether to scan for npm vulnerabilities (`true` or `false`).               |
| `scanDockerVulnerabilities` | No     | `''`          | Whether to scan for Docker vulnerabilities (`true` or `false`).            |

## Usage

### Example Workflow

Below is an example of how to use this action in a GitHub Actions workflow:

```yaml
name: Compass Metrics

on:
  workflow_dispatch:
  push:

jobs:
  test:
    name: Run Test Command
    runs-on: ubuntu-latest
    steps:
      - name: Run the "test" command
        uses: thefirstspine-org/github-action-compass-metrics@master
        with:
          command: 'test'

  availability:
    name: Check Service Availability
    runs-on: ubuntu-latest
    steps:
      - name: Run the "availability" command
        uses: thefirstspine-org/github-action-compass-metrics@master
        with:
          command: 'availability'
          atlassianUserApiKey: ${{ secrets.ATLASSIAN_API_KEY }}
          atlassianUserEmail: 'your-email@example.com'
          gatewayDomain: 'your-domain.atlassian.net'
          metricSourceId: 'your-metric-source-id'
          serviceUrl: 'https://your-service-url.com'

  open-vulnerabilities:
    name: Check Open Vulnerabilities
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          path: 'tmp'
      - name: Run the "open-vulnerabilities" command
        uses: thefirstspine-org/github-action-compass-metrics@master
        with:
          command: 'open-vulnerabilities'
          atlassianUserApiKey: ${{ secrets.ATLASSIAN_API_KEY }}
          atlassianUserEmail: 'your-email@example.com'
          gatewayDomain: 'your-domain.atlassian.net'
          metricSourceId: 'your-metric-source-id'
          path: 'tmp'
          scanNpmVulnerabilities: true
          scanDockerVulnerabilities: true
```

### Commands

- test: A simple test command to verify the action.
- availability: Checks the availability of a service by pinging the provided serviceUrl.
- open-vulnerabilities: Scans for npm and Docker vulnerabilities in the specified path.

### Setup

- Add the action to your workflow file.
- Provide the required inputs, such as command, atlassianUserApiKey, and atlassianUserEmail.
- Use GitHub Secrets to securely store sensitive information like atlassianUserApiKey.
