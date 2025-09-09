function getActualWeek (ISODate) {
    const msSinceEpoch = new Date(ISODate).getTime();
    const actYearMs = msSinceEpoch / 1000 / 60 / 60 / 24 / 365;
    const percOfYear = actYearMs.toFixed(2).toString().split('.')[1];
    const week = Math.floor(percOfYear / (1 / 52 * 100));
    return (`${ISODate.slice(0, 4)}-W${week}`);
}

//getActualWeek(new Date().toISOString())

module.exports = { getActualWeek };

