const mongoose = require("mongoose");
const Listing = require("../Models/listing");
const initData = require("./data.js")

const URL = "mongodb+srv://arpitsachan009_db_user:Ymc4Bnul0HRsohpl@wanderlustclustor0.jmft9r5.mongodb.net/?appName=wanderLustClustor0"
main().then(()=>{
    console.log("connected to server")
}).catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect(URL)
}

const initDB = async()=>{
    await Listing.deleteMany({})
    initData.data = initData.data.map((obj)=>({...obj,owner:"6989e462c9ed192a9c8584d0"}))
    await Listing.insertMany(initData.data)
    console.log("intialized success");
}
initDB();