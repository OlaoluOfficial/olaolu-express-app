"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controllers_1 = require("../controllers/controllers");
/* GET users listing. */
router.route('/').get(controllers_1.getAllUsers).post(controllers_1.createUser);
router.route('/:id').get(controllers_1.getUser).put(controllers_1.updateUser).delete(controllers_1.deleteUser);
exports.default = router;
// module.exports = router;
