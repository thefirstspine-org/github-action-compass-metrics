import { exec, ExecException } from "child_process";
import { ICommand } from "./command.interface";

export class OpenVulnerabilitiesCommand implements ICommand<IArgs> {
  async execute(args: IArgs): Promise<boolean> {
    console.log(`Trying to watch open vulnerabilities: ${args.path}`);
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
