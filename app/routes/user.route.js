const express = require('express');
const { authorize } = require('../middleware/authorize');
const { avatarUploadController, getAvatarController, deleteAvatarController } = require('../controllers/user.controller');
const { upload } = require('../middleware/multer');
const router = express.Router();

router.route('/avatar').post(authorize, upload.single('avatar'), avatarUploadController)
router.route('/avatar').put(authorize, getAvatarController)
router.route('/avatar').delete(authorize, deleteAvatarController)

module.exports = router