import { TestCommand } from "./commands/test.command";
import { ICommand } from "./commands/command.interface";
import { AvailabilityCommand } from "./commands/availability.command";
import { OpenVulnerabilitiesCommand } from "./commands/open-vulnerabilities.command";

const core = require('@actions/core');
const github = require('@actions/github');

const map: {[key: string]: ICommand} = {
    "test": new TestCommand(),
    "availability": new AvailabilityCommand(),
    "open-vulnerabilities": new OpenVulnerabilitiesCommand(),
}

async function bootstrap() {
  const name: string = core.getInput('command');
  console.log(`Running command: ${name}`);
  await (map[name]).execute({
    atlassianUserEmail: core.getInput('atlassianUserEmail'),
    atlassianUserApiKey: core.getInput('atlassianUserApiKey'),
    metricSourceId: core.getInput('metricSourceId'),
    gatewayDomain: core.getInput('gatewayDomain'),
    serviceUrl: core.getInput('serviceUrl'),
    path: core.getInput('path'),
    scanNpmVulnerabilities: core.getInput('scanNpmVulnerabilities'),
    scanDockerVulnerabilities: core.getInput('scanDockerVulnerabilities'),
  });
}

(bootstrap)();
