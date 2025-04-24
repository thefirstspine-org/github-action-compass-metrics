import { ICommand } from "./command.interface";

export class TestCommand implements ICommand<IArgs> {
  async execute(args: IArgs): Promise<boolean> {
    console.log("Command executed with args:", args);
    return true;
  }
}

interface IArgs {
}