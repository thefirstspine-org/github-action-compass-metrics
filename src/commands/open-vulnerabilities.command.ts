import { exec, ExecException } from "child_process";
import { ICommand } from "./command.interface";
import fs from "fs";
import { pushMetric } from "../compass/push-metric.function";

export class OpenVulnerabilitiesCommand implements ICommand<IArgs> {
  async execute(args: IArgs): Promise<boolean> {
    console.log(`Trying to watch open vulnerabilities: ${args.path}`);
    console.log(fs.readdirSync(args.path));
    const result = await new Promise((resolve, reject) => {
      exec(
        `cd ${args.path} && npm audit --json`,
        (error: ExecException | null, stdout: string, stderr: string) => {
          if (error) {
              resolve(stdout); 
            } else {
              resolve(stdout); 
            }
        });
    });
    const vulnerabilities = JSON.parse(result as string).vulnerabilities;
    const levels = ["high", "critical"];
    let numVulnerabilities = 0;
    Object.keys(vulnerabilities).forEach((key) => {
      const vulnerability = vulnerabilities[key];
      if (levels.includes(vulnerability.severity)) {
        console.log(`Vulnerability with severity ${vulnerability.severity} found: ${key}`);
        numVulnerabilities++;
      }
    });
    pushMetric(
      args.atlassianUserEmail,
      args.atlassianUserApiKey,
      args.gatewayDomain,
      args.metricSourceId,
      numVulnerabilities
    );
    return true;
  }
}

interface IArgs {
  atlassianUserEmail: string;
  atlassianUserApiKey: string;
  gatewayDomain: string;
  metricSourceId: string;
  path: string;
  scanNpmVulnerabilities: boolean;
  scanDockerVulnerabilities: boolean;
}
