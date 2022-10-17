import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { connectDb } from "./config/db.js"
import priceModel from "./Model/PricesModel.js"
import { Prices } from "./Data.js"

dotenv.config();
connectDb();

const importData = async () => {
    try {
        await priceModel.deleteMany();
      const createdPrice=  await priceModel.insertMany(Prices);
        console.log("data uploaded")
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await priceModel.deleteMany();
        console.log("data deleted")
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
if (process.argv[2] === "-d") {
    destroyData()
} else {
    importData()
}