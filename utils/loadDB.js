function loadDB(dbClient, query) {
    dbClient.connect();
    dbClient.query(query, (err, res) => {
        if (err) throw err;
        return res.rows;
    });
    dbClient.end();
}

module.exports = {
    loadDB
}