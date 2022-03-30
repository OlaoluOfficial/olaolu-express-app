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
exports.readerPromise = exports.db_path = exports.deleteRecord = exports.updateRecord = exports.createRecord = exports.getSingleRec = exports.getDb = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
// import { v4 as uuidv4 } from 'uuid';
const util_1 = require("util");
const readerPromise = (0, util_1.promisify)(fs_1.readFile);
exports.readerPromise = readerPromise;
const writePromise = (0, util_1.promisify)(fs_1.writeFile);
const db_path = path_1.default.join(__dirname, '../../..', '/data/database.json');
exports.db_path = db_path;
function getDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield readerPromise(db_path, { encoding: 'utf8', flag: 'r' });
        }
        catch (error) {
            yield writePromise(db_path, JSON.stringify([]));
            return yield readerPromise(db_path, { encoding: 'utf8', flag: 'r' });
        }
    });
}
exports.getDb = getDb;
function getSingleRec(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const database = yield getDb();
        const data = JSON.parse(database);
        const singleRec = data.find((rec) => rec.id === id);
        if (!singleRec) {
            return `Cannot find record with id ${id}. Please enter a valid id`;
        }
        return singleRec;
        // let data = await getDb();
        // let database = JSON.parse(data);
        // database = database.find((rec: { id: number }) => rec.id === id);
        // return JSON.stringify(database);
    });
}
exports.getSingleRec = getSingleRec;
function createRecord(record) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield getDb();
        let database = JSON.parse(data);
        const newDatabase = Object.assign(Object.assign({}, record), { id: database.length + 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
        database.push(newDatabase);
        yield writePromise(db_path, JSON.stringify(database));
        return database;
    });
}
exports.createRecord = createRecord;
function updateRecord(id, info) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield getDb();
        let database = JSON.parse(data);
        const index = database.findIndex((rec) => rec.id === id);
        if (index === -1) {
            return `Cannot update this record because its id(${id}) does not exist. Please enter a valid id`;
        }
        database[index] = Object.assign(Object.assign(Object.assign({}, database[index]), info), { updatedAt: new Date().toISOString() });
        yield writePromise(db_path, JSON.stringify(database));
        return database[index];
    });
}
exports.updateRecord = updateRecord;
function deleteRecord(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield getDb();
        let database = JSON.parse(data);
        const index = database.findIndex((rec) => rec.id === id);
        if (index === -1) {
            return `Cannot find record with id ${id}. Please enter a valid id`;
        }
        database.splice(index, 1);
        yield writePromise(db_path, JSON.stringify(database));
        return `Deleted record with id ${id}`;
    });
}
exports.deleteRecord = deleteRecord;
