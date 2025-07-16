const express = require("express");
const { createTrip, getAllTrips ,getTripById , deleteTrip} = require('../controllers/tripController');
const { isUser } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/adminMiddleware");
const upload = require("../storage/multer");

const router = express.Router();

router.get("/", getAllTrips);
router.get("/:id", getTripById);

router.post("/",isUser,isAdmin,upload.array("imageUrls",8), createTrip);
router.delete("/:id", isUser, isAdmin, deleteTrip);

module.exports = router;
