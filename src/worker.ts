import { ZBClient } from "zeebe-node";
import got from "got";
require("dotenv").config();

const zbc = new ZBClient();

const url = "https://api.corona-zahlen.org/germany";


const worker = zbc.createWorker("corona-update", async (job, complete) => {
  const updateInformation = await got(url).json();
  console.log(updateInformation);
  complete.success({ updateInformation });
});