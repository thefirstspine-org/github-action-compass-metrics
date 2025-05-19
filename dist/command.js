"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_command_1 = require("./commands/test.command");
const availability_command_1 = require("./commands/availability.command");
const open_vulnerabilities_command_1 = require("./commands/open-vulnerabilities.command");
const yargs_1 = __importDefault(require("yargs"));
const map = {
    "test": new test_command_1.TestCommand(),
    "availability": new availability_command_1.AvailabilityCommand(),
    "open-vulnerabilities": new open_vulnerabilities_command_1.OpenVulnerabilitiesCommand(),
};
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const argv = yield (0, yargs_1.default)(process.argv).argv;
        console.log({ argv });
        const name = argv.command;
        console.log(`Running command: ${name}`);
        if (typeof name == 'string') {
            yield (map[name]).execute({
                atlassianUserEmail: argv.atlassianUserEmail,
                atlassianUserApiKey: argv.atlassianUserApiKey,
                metricSourceId: argv.metricSourceId,
                gatewayDomain: argv.gatewayDomain,
                serviceUrl: argv.serviceUrl,
                path: argv.path,
                scanNpmVulnerabilities: argv.scanNpmVulnerabilities,
                scanDockerVulnerabilities: argv.scanDockerVulnerabilities,
            });
        }
    });
}
(bootstrap)();
