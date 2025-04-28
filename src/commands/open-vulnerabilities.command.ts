import { ICommand } from "./command.interface";

export class OpenVulnerabilitiesCommand implements ICommand<IArgs> {
  async execute(args: IArgs): Promise<boolean> {
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
