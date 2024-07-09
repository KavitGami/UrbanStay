const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");



main().then(()=>{
    console.log("Connected to DB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/AirBnb');

}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"))
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res)=>{
    res.send("Hi, I am root")
})
//Index Route
app.get("/listings", async (req,res) =>{
    const alllistings =await Listing.find({});
    res.render("Listings/index.ejs", {alllistings});
});

//New Route
app.get("/listings/new", async (req,res) =>{
    res.render("Listings/new.ejs");
});

//post Route
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  });
  

//Show Route
app.get("/listings/:id", async (req,res) =>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("Listings/show.ejs", { listing });
});

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  });

//Update Route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
  });
  
//Delete Route
app.delete("/listings/:id",async (req, res) => {
    let { id } = req.params;
    let deleted = await Listing.findByIdAndDelete(id);
    console.log(deleted);
    res.redirect("/listings");
  });

/* app.get("/testListing", async (req,res) =>{
    let sampleListing = new Listing({
        title: "My Home",
        description: "By the beach",
        price: 3000,
        location: "Edmonton",
        country: "Canada",
    });
    await sampleListing.save();
    console.log("sample was saved");
    res.send("successful testing");
}) */
app.listen(8080, ()=>{
    console.log("Server is listening to port 8080");
});

