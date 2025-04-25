import { TestCommand } from "./commands/test.command";
import { ICommand } from "./commands/command.interface";

const core = require('@actions/core');
const github = require('@actions/github');

const map: {[key: string]: ICommand} = {
    "test": new TestCommand(),
}

async function bootstrap() {
  const name: string = core.getInput('command');
  await (map[name]).execute({});
}

(bootstrap)();
