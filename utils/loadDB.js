const { Pool } = require('pg'),
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err) => {
    console.error('unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = {
    loadDB: async (query) => {
        const client = await pool.connect();
        let res;
        try {
            res = await client.query(query);
        } finally {
            client.release();
            console.log(res.rows);
            return res;
        }
    }

}