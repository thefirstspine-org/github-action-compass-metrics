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
exports.AvailabilityCommand = void 0;
const axios_1 = __importDefault(require("axios"));
const core = require('@actions/core');
class AvailabilityCommand {
    execute(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Ping the service URL to check availability
                const response = yield axios_1.default.get(args.serviceUrl, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                core.setOutput(`Service response: ${response.status} - ${response.statusText}`);
                return true;
            }
            catch (error) {
                // Handle the error and return false if the service is not available
                core.setFailed("Service is not available:", error);
                return false;
            }
        });
    }
}
exports.AvailabilityCommand = AvailabilityCommand;
