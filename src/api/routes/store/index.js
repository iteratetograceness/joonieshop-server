"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreRouter = void 0;
var cors = require("cors");
var express_1 = require("express");
var bodyParser = require("body-parser");
var custom_route_handler_1 = require("./custom-route-handler");
var medusa_1 = require("@medusajs/medusa");
var storeRouter = (0, express_1.Router)();
function getStoreRouter(storeCorsOptions) {
    storeRouter.use(cors(storeCorsOptions), bodyParser.json());
    storeRouter.post("/store/my-custom-path", (0, medusa_1.wrapHandler)(custom_route_handler_1.default));
    return storeRouter;
}
exports.getStoreRouter = getStoreRouter;
