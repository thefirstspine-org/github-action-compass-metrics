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
exports.pushMetric = pushMetric;
const axios_1 = __importDefault(require("axios"));
function pushMetric(userEmail, userApiKey, gatewayDomain, metricSourceId, value) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${gatewayDomain}/api/v1/metrics/${metricSourceId}`;
        try {
            const response = yield axios_1.default.post(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${Buffer.from(`${userEmail}:${userApiKey}`).toString("base64")}`,
                },
                body: JSON.stringify({
                    value: value,
                }),
            });
            return true;
        }
        catch (error) {
            console.error("Error pushing metric:", error);
            return false;
        }
    });
}
