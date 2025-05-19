import { exec, ExecException } from "child_process";
import { ICommand } from "./command.interface";
import fs from "fs";
import { pushMetric } from "../compass/push-metric.function";

export class OpenVulnerabilitiesCommand implements ICommand<IArgs> {
  async execute(args: IArgs): Promise<boolean> {
    console.log(`Trying to watch open vulnerabilities: ${args.path}`);
    let numVulnerabilities = 0;

    if (args.scanNpmVulnerabilities) {
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
      Object.keys(vulnerabilities).forEach((key) => {
        const vulnerability = vulnerabilities[key];
        if (levels.includes(vulnerability.severity)) {
          console.log(`Vulnerability with severity ${vulnerability.severity} found: ${key}`);
          numVulnerabilities++;
        }
      });
    }

    if (args.scanDockerVulnerabilities) {
      const dockerfile = fs.readFileSync(`${args.path}/Dockerfile`);
      const version = dockerfile.toString().match(/^FROM\s+([^\s:]+)(?::([^\s]+))?/);
      if (version == null) {
        console.error(`Unable to find Docker base image`);
        return false;
      }
      console.log(`Trying to find vulnerabilities from ${version[1]}:${version[2]}`);
      await new Promise((resolve, reject) => {
        exec(
          `docker run --rm aquasec/trivy image --severity CRITICAL ${version[1]}:${version[2]} -f json -q > trivy-report.json`,
          (error: ExecException | null, stdout: string, stderr: string) => {
            if (error) {
                resolve(stdout); 
              } else {
                resolve(stdout); 
              }
          });
      });
      const reportFile = fs.readFileSync('trivy-report.json');
      const reportJson = JSON.parse(reportFile.toString());
      reportJson.Results.forEach((r: any) => {
        if (typeof(r?.Vulnerabilities?.length) != 'undefined') {
          numVulnerabilities += r.Vulnerabilities.length;
          console.log(`Found ${r.Vulnerabilities.length} vulnerabilities with critical level on Docker image`);
        }
      });
    }

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
