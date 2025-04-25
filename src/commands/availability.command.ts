import { ICommand } from "./command.interface";

export class AvailabilityCommand implements ICommand<IArgs> {
  async execute(args: IArgs): Promise<boolean> {
    return true;
  }
}

interface IArgs {
  userEmail: string;
  userApiKey: string;
  gatewayDomain: string;
  metricSourceId: string;
  serviceUrl: string;
}
