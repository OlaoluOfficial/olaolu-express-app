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
exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = exports.getAllUsers = void 0;
const model_1 = require("../model/model");
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const database = yield (0, model_1.getDb)();
        res.end(database);
    });
}
exports.getAllUsers = getAllUsers;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const input = req.body;
        const body = yield (0, model_1.createRecord)(input);
        res.end(JSON.stringify(body));
    });
}
exports.createUser = createUser;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const database = yield (0, model_1.getDb)();
        const data = yield (0, model_1.getSingleRec)(id);
        res.end(JSON.stringify(data));
    });
}
exports.getUser = getUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const input = req.body;
        const body = yield (0, model_1.updateRecord)(id, input);
        res.end(JSON.stringify(body));
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const body = yield (0, model_1.deleteRecord)(id);
        res.end(JSON.stringify(body));
    });
}
exports.deleteUser = deleteUser;
exports.default = {
    getAllUsers,
    getDb: model_1.getDb
};
