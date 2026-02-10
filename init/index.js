if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const mongoose = require("mongoose");
const Listing = require("../Models/listing");
const initData = require("./data.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const UrlDb = process.env.ATLAS_DB;
const MY_ACCESS_TOKEN = process.env.MAPBOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: MY_ACCESS_TOKEN });

main().then(() => {
    console.log("connected to server");
}).catch((err) => {
    console.log(err);
});
async function main() {
    await mongoose.connect(UrlDb);
}

const initDB = async () => {
    if (!MY_ACCESS_TOKEN) {
        throw new Error("Missing MAPBOX_TOKEN in environment.");
    }

    await Listing.deleteMany({});

    const seeded = [];
    for (const obj of initData.data) {
        const geoResponse = await geocodingClient.forwardGeocode({
            query: `${obj.location}, ${obj.country}`,
            limit: 1
        }).send();

        const feature = geoResponse.body.features[0];
        if (!feature) {
            throw new Error(`Geocoding failed for: ${obj.location}, ${obj.country}`);
        }

        seeded.push({
            ...obj,
            owner: "6989e462c9ed192a9c8584d0",
            geometry: feature.geometry
        });
    }

    await Listing.insertMany(seeded);
    console.log("intialized success");
};

initDB();
