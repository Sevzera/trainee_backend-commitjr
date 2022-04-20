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

export function updateData(id, newCountry, flightCollection) {
    return new Promise((resolve, reject) => {
        flightCollection.updateOne({ "id": id }, { $set: { "country": newCountry } });
        resolve();
    });
}
