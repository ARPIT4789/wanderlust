const express = require("express");
const router = express.Router({mergeParams:true});

const wrapasync = require("../utils/wrapasync.js")
const {validateReview} = require("../Middleware.js")
const {isLoggedIn,isReviewOwner} = require("../Middleware.js");
const reviewController = require("../controller/reviews.js")

router.post("/",isLoggedIn,validateReview,wrapasync(reviewController.createReview))

// delete review path
router.delete("/:reviewId",isLoggedIn,isReviewOwner,wrapasync(reviewController.distroyReview))

module.exports = router;