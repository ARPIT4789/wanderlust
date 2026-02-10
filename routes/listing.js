const express = require("express");
const router = express.Router();

const wrapasync = require("../utils/wrapasync.js")
const { isLoggedIn, isOwner, validateListing } = require("../Middleware.js")
const listingController = require("../controller/listings.js")
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage })

router.route("/")
.get(wrapasync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'), wrapasync(listingController.createNewListing))

//search
router.route("/search").get(wrapasync(listingController.search));



//new route to create a from to create a new place
router.get("/new", isLoggedIn, listingController.renderNewForm)



router.route("/:id")
.get(wrapasync(listingController.listingShow))
.put(isLoggedIn, isOwner, validateListing,upload.single('listing[image]'), wrapasync(listingController.updateListing))


//edit
router.get("/:id/edit", isLoggedIn, wrapasync(listingController.renderEditForm));

//delete
router.delete("/:id/delete", isLoggedIn, isOwner, wrapasync(listingController.distroyListing));

module.exports = router;