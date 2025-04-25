import { ICommand } from "./command.interface";
import axios from "axios";

export class AvailabilityCommand implements ICommand<IArgs> {
  async execute(args: IArgs): Promise<boolean> {
    try {
      // Ping the service URL to check availability
      const response = await axios.get(args.serviceUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return true;
    } catch (error) {
      // Handle the error and return false if the service is not available
      console.error("Service is not available:", error);
      return false;
    }
  }
}

interface IArgs {
  userEmail: string;
  userApiKey: string;
  gatewayDomain: string;
  metricSourceId: string;
  serviceUrl: string;
}
