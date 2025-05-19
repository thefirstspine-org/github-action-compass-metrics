import { TestCommand } from "./commands/test.command";
import { ICommand } from "./commands/command.interface";
import { AvailabilityCommand } from "./commands/availability.command";
import { OpenVulnerabilitiesCommand } from "./commands/open-vulnerabilities.command";
import yargs from "yargs";

const map: {[key: string]: ICommand} = {
    "test": new TestCommand(),
    "availability": new AvailabilityCommand(),
    "open-vulnerabilities": new OpenVulnerabilitiesCommand(),
}


async function bootstrap() {
  const argv = await yargs(process.argv).argv;
  console.log({argv});

  const name: string | unknown = argv.command;

  console.log(`Running command: ${name}`);
  if (typeof name == 'string') {
    await (map[name]).execute({
      atlassianUserEmail: argv.atlassianUserEmail,
      atlassianUserApiKey: argv.atlassianUserApiKey,
      metricSourceId: argv.metricSourceId,
      gatewayDomain: argv.gatewayDomain,
      serviceUrl: argv.serviceUrl,
      path: argv.path,
      scanNpmVulnerabilities: argv.scanNpmVulnerabilities,
      scanDockerVulnerabilities: argv.scanDockerVulnerabilities,
    });
  }
}

(bootstrap)();
