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
Object.defineProperty(exports, "__esModule", { value: true });
const test_command_1 = require("./commands/test.command");
const availability_command_1 = require("./commands/availability.command");
const open_vulnerabilities_command_1 = require("./commands/open-vulnerabilities.command");
const core = require('@actions/core');
const github = require('@actions/github');
const map = {
    "test": new test_command_1.TestCommand(),
    "availability": new availability_command_1.AvailabilityCommand(),
    "open-vulnerabilities": new open_vulnerabilities_command_1.OpenVulnerabilitiesCommand(),
};
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const name = core.getInput('command');
        core.setOutput(`Running command: ${name}`);
        yield (map[name]).execute({
            userEmail: core.getInput('userEmail'),
            userApiKey: core.getInput('userApiKey'),
            metricSourceId: core.getInput('metricSourceId'),
            gatewayDomain: core.getInput('gatewayDomain'),
            serviceUrl: core.getInput('serviceUrl'),
            serviceRepository: core.getInput('serviceRepository'),
            scanNpmVulnerabilities: core.getInput('scanNpmVulnerabilities'),
            scanDockerVulnerabilities: core.getInput('scanDockerVulnerabilities'),
        });
    });
}
(bootstrap)();
