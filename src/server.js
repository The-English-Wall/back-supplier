import app from "./app.js";
import { envs } from "./config/enviroments/enviroments.js";
import { authenticate, sincronize } from "./config/database/database.js"
import { initModel } from "./config/database/associations.js";

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


app.listen(envs.PORT, () => {
    console.log(`Server running on ${envs.PORT}`);
});