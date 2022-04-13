import { createServer } from "http";
import { getAll, getByID, addNewFlight, updateFlightCountry, removeFlight } from "./controllers/flightsController.js";

const server = createServer((request, response) => {
  const requestParams = request.url.split('/');
  console.log(requestParams);
  if (request.method === "GET") {
    if (requestParams[1] === "flights") {
      if (requestParams[2] === undefined) {
        getAll(response);
      } else if (requestParams[2].match(/^\d+$/)) {
        getByID(requestParams[2], response);
      } else {
        response.end("error");
      }
    } else {
      response.end("error");
    }
  } else if (request.method === "POST") {
    if (requestParams[1] === "postFlight") {
      let id = requestParams[2];
      let name = requestParams[3];
      let callsign = requestParams[4];
      let country = requestParams[5];
      let active = requestParams[6];
      addNewFlight(id, name, callsign, country, active, response);
    } else {
      response.end("error");
    }
  } else if (request.method === "PUT") {
    if (requestParams[1] === "putFlight") {
      let id = requestParams[2];
      let newCountry = requestParams[3];
      updateFlightCountry(id, newCountry, response);
    }
  } else if (request.method === "DELETE") {
    if (requestParams[1] === "removeFlight") {
      let id = requestParams[2];
      removeFlight(id, response);
    }
  } else {
    response.end("error");
  }
});

const PORT = 5000;
server.listen(PORT, () => { });
