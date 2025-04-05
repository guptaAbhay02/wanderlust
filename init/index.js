const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(()=>{
        console.log("connect to DB");
    })
    .catch((err)=>{
        console.log(err);
    }); 
async function main(){
    await mongoose.connect(MONGO_URL); 

}

// const initDB= async()=>{
//     await Listing.deleteMany({});
//     await Listing.insertMany(initData.data);
//     console.log("data was initialized");

// };
const initDB = async () => {
    try {
        await Listing.deleteMany({});
        initData.data=initData.data.map((obj)=>({...obj,
            owner:"674bc23bac7a0dffca295881"}));
        await Listing.insertMany(initData.data);
        console.log("Data initialized successfully");
    } catch (err) {
        if (err.name === "ValidationError") {
            console.error("Validation Error:", err.errors);
        } else {
            console.error("Error initializing database:", err);
        }
    }
};

initDB();
