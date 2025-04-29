import { exec, ExecException } from "child_process";
import { ICommand } from "./command.interface";
import fs from "fs";

export class OpenVulnerabilitiesCommand implements ICommand<IArgs> {
  async execute(args: IArgs): Promise<boolean> {
    console.log(`Trying to watch open vulnerabilities: ${args.path}`);
    console.log(fs.readdirSync(args.path));
    const result = await new Promise((resolve, reject) => {
      exec(
         `cd ${args.path} && npm audit --json`,
         (error: ExecException | null, stdout: string, stderr: string) => {
           if (error) {
             reject(error);
           } else {
             resolve(stdout); 
           }
         });
    });
    console.log(result);
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
