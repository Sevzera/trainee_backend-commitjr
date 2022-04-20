import { readFlightList, writeNewFlightList } from "../models/flightsModel.js";

let flightListObj, flightListStr;

async function updateReferences() {
    flightListStr = JSON.stringify(await readFlightList());
    flightListObj = JSON.parse(flightListStr);
}

async function updateData() {
    const newFlightListStr = JSON.stringify(flightListObj.flightList);
    await writeNewFlightList(newFlightListStr);
}

export async function getAll(response) {
    await updateReferences();
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(flightListObj.flightList));
}

export async function getByID(id, response) {
    await updateReferences();
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(flightListObj.flightList.filter(flight => flight.id === id)));
}

export async function addNewFlight(id, name, callsign, country, active, response) {
    await updateReferences();
    const newFlight = {
        "id": id.toString(),
        "name": name.toString(),
        "callsign": callsign.toString(),
        "country": country.toString(),
        "active": active.toString()
    };
    flightListObj.flightList.push(newFlight);
    updateData();
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end("Flight_#" + id + "_has_been_successfully_added_to_flight_list");
}

export async function updateFlightCountry(id, newCountry, response) {
    await updateReferences();
    flightListObj.flightList.find(flight => flight.id === id).country = newCountry;
    updateData();
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end("Flight_#" + id + "_has_been_successfully_updated_with_country_" + newCountry);
}

export async function removeFlight(id, response) {
    await updateReferences();
    flightListObj.flightList = flightListObj.flightList.filter(flight => flight.id !== id);
    updateData();
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end("Flight_#" + id + "_has_been_successfully_removed_from_flight_list");
}