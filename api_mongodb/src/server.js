import { createServer } from "http";
import { MongoClient } from "mongodb";
import { addFlight, getAllFlights, getFlightById, removeFlight, updateFlight } from "./controllers/flightsController.js";

MongoClient.connect("mongodb+srv://sev:123321@cluster0.djqew.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  .then(client => {
    // DATABASE CONNECTION & SETUP
    console.log('Connected to Database');
    const db = client.db("flightData");
    const flightCollection = db.collection("flightList");
    // SERVER
    const server = createServer((req, res) => {
      const { headers, method, url } = req;
      console.log(`URL: ${url}`)
      // GET
      if (method === "GET") {
        if (url.match(/\/flights\/?$/)) {
          getAllFlights(res, flightCollection);
        } else if (url.match(/\/flights\/\d+?$/)) {
          let id = url.split('/')[2];
          getFlightById(res, id, flightCollection);
        }
      }
      // POST
      else if (method === "POST" && url.match(/\/flights/)) {
        addFlight(req, res, flightCollection);
      }
      // PUT
      else if (req.method === "PUT" && url.match(/\/flights/)) {
        updateFlight(req, res, flightCollection);
      }
      // DELETE
      else if (req.method === "DELETE") {
        removeFlight(req, res, flightCollection);
      }
      else {
        res.end("error");
      }
    }
    )
    server.listen(5000, () => { });
  })
  .catch(err => console.error(err))
