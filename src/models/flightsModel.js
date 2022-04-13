import * as fileManager from "fs";
import flightList from '../data/flightList.json' assert {type: "json"};

export function readFlightList() {
    return new Promise((resolve, reject) => {
        resolve(flightList);
    });
}

export function writeNewFlightList(newFlightList) {
    return new Promise((resolve, reject) => {
        fileManager.writeFile("./src/data/flightList.json", '{"flightList":' + newFlightList + '}', err => {
            if (err) {
                console.log('Error adding new flight', err)
            } else {
                console.log('Successfully added new flight')
            }
        });
        resolve();
    });
}