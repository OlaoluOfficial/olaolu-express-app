import express from 'express';
const router = express.Router();
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/controllers';

/* GET users listing. */
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
export default router;
// module.exports = router;
