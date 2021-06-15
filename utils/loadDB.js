function loadDB(dbClient, query) {
    dbClient.connect();
    dbClient.query(query, (err, res) => {
        if (err) throw err;
        return res.rows;
    });
    client.end();
}

module.exports = {
    loadDB
}