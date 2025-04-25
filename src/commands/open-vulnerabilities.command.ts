import { ICommand } from "./command.interface";

export class OpenVulnerabilitiesCommand implements ICommand<IArgs> {
  async execute(args: IArgs): Promise<boolean> {
    return true;
  }
}

interface IArgs {
  userEmail: string;
  userApiKey: string;
  gatewayDomain: string;
  metricSourceId: string;
  serviceRepository: string;
  scanNpmVulnerabilities: boolean;
  scanDockerVulnerabilities: boolean;
}
