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
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const queue_1 = __importDefault(require("./routes/queue"));
const prom_client_1 = __importDefault(require("prom-client"));
// Collect default metrics
const collectDefaultMetrics = prom_client_1.default.collectDefaultMetrics;
collectDefaultMetrics({ register: prom_client_1.default.register });
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Register your routes
app.use('/users', user_1.default);
app.use('/queue', queue_1.default);
// Metrics endpoint
app.get('/metrics', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader("Content-Type", prom_client_1.default.register.contentType);
    res.send(yield prom_client_1.default.register.metrics());
}));
// Start the server
app.listen(4000, () => {
    console.log(`Server is running on port 4000`);
});
