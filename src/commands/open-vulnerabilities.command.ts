import { exec, ExecException } from "child_process";
import { ICommand } from "./command.interface";

export class OpenVulnerabilitiesCommand implements ICommand<IArgs> {
  async execute(args: IArgs): Promise<boolean> {
    console.log(`Trying to watch open vulnerabilities`);
    console.log(`Trying to clone service repository: ${args.serviceRepository}`);
    const result = await new Promise((resolve, reject) => {
      exec(
         `git clone git@github.com:${args.serviceRepository}.git`,
         (error: ExecException | null, stdout: string, stderr: string) => {
           if (error) {
             reject(error);
           } else {
             resolve(stdout); 
           }
         });
    });
    console.log(`Command output: ${result}`);
    return true;
  }
}

interface IArgs {
  atlassianUserEmail: string;
  atlassianUserApiKey: string;
  gatewayDomain: string;
  metricSourceId: string;
  serviceRepository: string;
  scanNpmVulnerabilities: boolean;
  scanDockerVulnerabilities: boolean;
}
