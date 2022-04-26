export function writeData(newFlight, flightCollection) {
    return new Promise((resolve, reject) => {
        flightCollection.insertOne(newFlight);
        resolve();
    });
}

export function removeData(id, flightCollection) {
    return new Promise((resolve, reject) => {
        flightCollection.deleteOne({ id: id });
        resolve();
    });
}

export function updateData(id, name, callsign, country, active, flightCollection) {
    return new Promise((resolve, reject) => {
        flightCollection.updateOne({ "id": id }, { $set: { "name": name, "callsign": callsign, "country": country, "active": active } });
        resolve();
    });
}
