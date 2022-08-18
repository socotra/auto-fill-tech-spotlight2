function priceExposures(exposure) {
    let price = 10000;
    
    if (exposure.exposureName == "vehicle") {
        const vehicleYear = parseInt(exposure.fieldValues.year);
        const age = (new Date().getFullYear()) - vehicleYear;
        if (age >= 1 && age < 5) {
            price *= 0.9;
        } else if (age >= 5) {
            price *= 0.6;
        }

        exposure.fieldValues.vehicle_value = price;
    }

    return exposure;
}

function getDataAutofill(data) {
    socotraApi.setAuxData("global", "autoFillInput", JSON.stringify(data));

    const res = {
        addExposures: data.updates.addExposures.map(priceExposures)
    }

    socotraApi.setAuxData("global", "autoFillOutput", JSON.stringify(res));

    return res;
}

module.exports = {
    getDataAutofill
}