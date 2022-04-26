import { writeData, removeData, updateData } from "../models/flightsModel.js";
import { getReqBody } from "../utils/getReqBody.js";

export async function getAllFlights(res, flightCollection) {
    const allFlights = await flightCollection.find().toArray();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(allFlights));
}

export async function getFlightById(res, id, flightCollection) {
    const flightsById = await flightCollection.find({ id: id.toString() }).toArray();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(flightsById));
}

export async function addFlight(req, res, flightCollection) {
    const body = await getReqBody(req);
    const { id, name, callsign, country, active } = JSON.parse(body);
    const newFlight = { id: id, name: name, callsign: callsign, country: country, active: active };
    writeData(newFlight, flightCollection)
        .then(() => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end("Flight_#" + id + "_has_been_successfully_added_to_DB")
        })
        .catch(err => console.error(err));
}

export async function updateFlight(req, res, flightCollection) {
    const body = await getReqBody(req);
    const { id, name, callsign, country, active } = JSON.parse(body);
    updateData(id, name, callsign, country, active, flightCollection)
        .then(() => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end("Flight_#" + id + "_has_been_successfully_updated");
        })
        .catch(err => console.error(err));
}

export async function removeFlight(req, res, flightCollection) {
    const body = await getReqBody(req);
    const { id } = JSON.parse(body);
    removeData(id, flightCollection)
        .then(() => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end("Flight_#" + id + "_has_been_successfully_removed_from_DB");
        })
        .catch(err => console.error(err));
}