import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { TestCommand } from "./commands/test.command";
import { ICommand } from "./commands/command.interface";

const map: {[key: string]: ICommand} = {
    "test": new TestCommand(),
}

async function bootstrap() {
  const argv = await yargs(hideBin(process.argv)).parse();
  const name: string = argv._ as unknown as string || "test";
  console.log("Arguments:", argv);
  await (map[name]).execute({
    ...argv,
    _: undefined,
    $0: undefined,
  });
}

(bootstrap)();
