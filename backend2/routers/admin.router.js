const express = require ("express");
const router = express.Router();
const adminMiddleware = require("../middlewares/admin.middleware");
const getdataforadmin = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/auth.middleware");


router.route("/userdata").get(authMiddleware , adminMiddleware ,getdataforadmin.getAllUsers);
router.route("/contactdata").get(authMiddleware ,adminMiddleware ,getdataforadmin.getAllContacts);
router
  .route("/userdata/delete/:id")
  .delete(authMiddleware, adminMiddleware, getdataforadmin.deleteUserById);

router
  .route("/userdata/update/:id")
  .patch(authMiddleware, adminMiddleware, getdataforadmin.updateUserById);

router
  .route("/userdata/:id")
  .get(authMiddleware, adminMiddleware, getdataforadmin.getUserById);


router
  .route("/contactdata/delete/:id")
  .delete(authMiddleware, adminMiddleware, getdataforadmin.deleteContactById); 
  
module.exports = router;