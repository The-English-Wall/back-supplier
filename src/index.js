import app from "./app.js";
import { envs } from "./config/enviroments/enviroments.js";
import { authenticate, sincronize } from "./config/database/database.js"
import { initModel } from "./config/database/associations.js";
import { BASE_URL_COMPANY } from "./config/conections/axios.config.js";
import axios from "axios";

async function main() {
    try {
        await authenticate()
        initModel()
        await sincronize()
    } catch (error) {
        console.log(error);
    }
}

main()

app.listen(envs.PORT_SUPPLIER, () => {
    console.log(`Server running on ${envs.PORT_SUPPLIER}`);
});

// app.get('/companyValidation', async (req, res) => {
//     try {
//         const response = await axios.get(`/http://${envs.DB_HOST}:${envs.PORT_COMPANY}/api/v1`);
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch data from Microservice A' });
//     }
// });

// app.listen(envs.PORT_SUPPLIER, () => {
//     console.log(`Microservice B listening on port ${envs.PORT_SUPPLIER}`);
// });