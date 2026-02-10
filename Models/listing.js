const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")
const listingSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    // image: {
    //     filename: { type: String, required: true },
    //     url: { type: String, required: true }
    // },
    image:{
        url:String,
        filename:String
    },
    price:Number,
    location:String,
    country:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      //required: true
    },
    coordinates: {
      type: [Number],
      //required: true
    },
  },
   category:{
        type:String,
        enum:["Trending","Rooms","Iconic Cities","Mountains","Castles","Amazing Pools","Farms","Camping","Arctic"],
        required:true
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
})
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;

// 1️⃣ User deletes a listing
// 2️⃣ Listing.findByIdAndDelete(id) runs
// 3️⃣ MongoDB deletes listing
// 4️⃣ Middleware receives the deleted document as listing
// 5️⃣ listing.reviews contains review _ids
// 6️⃣ All matching reviews are deleted