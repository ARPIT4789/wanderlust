const Listing = require("../Models/listing")

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const MY_ACCESS_TOKEN = process.env.MAPBOX_TOKEN
const geocodingClient = mbxGeocoding({ accessToken: MY_ACCESS_TOKEN });

module.exports.index = async (req, res) => {
    const { category } = req.query;

    let listings;
    if (category) {
        listings = await Listing.find({ category });
    } else {
        listings = await Listing.find({});
    }

    res.render("lists/index", { listings });
};module.exports.index = async (req, res) => {
  const { category } = req.query;

  let listings;
  if (category) {
    listings = await Listing.find({ category });
  } else {
    listings = await Listing.find({});
  }

  // default searchQuery for home page
  res.render("lists/index", {
    listings,
    searchQuery: ""
  });
};





// SEARCH ROUTE
module.exports.search = async (req, res) => {
  const q = req.query.q?.trim();

  if (!q) {
    return res.redirect("/listings");
  }

  const listings = await Listing.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { location: { $regex: q, $options: "i" } },
      { country: { $regex: q, $options: "i" } },
      { category: { $regex: q, $options: "i" } }
    ]
  });

  res.render("lists/index", {
    listings,
    searchQuery: q
  });
};



module.exports.renderNewForm = (req, res) => {
    res.render("lists/new.ejs");
}

module.exports.listingShow = async (req, res) => {
    const { id } = req.params;
    const wanderLust = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" }
        })
        .populate("owner");

    if (!wanderLust) {
        req.flash("error", "The requested listing does not exist");
        return res.redirect("/listings");                             // return
    }

    if (!wanderLust.geometry || !Array.isArray(wanderLust.geometry.coordinates) || wanderLust.geometry.coordinates.length < 2) {
        const geoResponse = await geocodingClient.forwardGeocode({
            query: `${wanderLust.location}, ${wanderLust.country}`,
            limit: 1
        }).send();

        const feature = geoResponse.body.features[0];
        if (feature && feature.geometry) {
            wanderLust.geometry = feature.geometry;
            await wanderLust.save();
        }
    }
    res.render("lists/show.ejs", { wanderLust });
}

module.exports.createNewListing = async (req, res) => {
    const response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send()

    const newList = new Listing(req.body.listing);
    const url = req.file.path
    const filename = req.file.filename
    //console.log(url,filename)
    // console.log(req.body.listing)
    newList.owner = req.user._id;
    newList.image = { url, filename }
    newList.geometry = response.body.features[0].geometry;
    await newList.save();
   
    req.flash("success", "new Listing created!")
    res.redirect("/listings");
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
    if (!listing) {
        req.flash("error", "this listing does not exist")
        return res.redirect("/listings")
    }
    let imageUrl = listing.image.url;
    imageUrl = imageUrl.replace("/upload", "/upload/w_250")
    res.render("lists/edit.ejs", { listing, imageUrl });
}

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
   
    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
    if (req.file && typeof req.file != undefined) {
        const url = req.file.path
        const filename = req.file.filename
        listing.image = { url, filename }
        await listing.save();
    }
    req.flash("success", "Listing updated!")
    res.redirect("/listings");
}

module.exports.distroyListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
}
