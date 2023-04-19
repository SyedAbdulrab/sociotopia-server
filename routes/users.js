import express from 'express'
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    getAllUsers,
} from '../controllers/users.js'

import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

/* READ ROUTES */

// /user/SOMEID we can grab this id and query the db with this id
router.get('/:id', verifyToken, getUser)
router.get('/', verifyToken, getAllUsers)

router.get("/:id/friends",verifyToken,getUserFriends)

/* UPDATE ROUTES */
router.patch("/:id/:friendId",verifyToken,addRemoveFriend)


export default router;
