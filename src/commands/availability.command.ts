import { ICommand } from "./command.interface";
import axios from "axios";

const core = require('@actions/core');

export class AvailabilityCommand implements ICommand<IArgs> {
  async execute(args: IArgs): Promise<boolean> {
    try {
      console.log(`Trying to ping the service URL: ${args.serviceUrl}`);
      // Ping the service URL to check availability
      const response = await axios.get(args.serviceUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(`Service response: ${response.status} - ${response.statusText}`);
      return true;
    } catch (error) {
      // Handle the error and return false if the service is not available
      console.log("Service is not available:", error);
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
