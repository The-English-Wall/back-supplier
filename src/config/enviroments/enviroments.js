import "dotenv/config"

import env from "env-var"

export const envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    NODE_ENV: env.get("NODE_ENV").required().asString(),
    DB_URI: env.get("DB_URI").required().asString(),
    SECRET_JWD_SEED: env.get("SECRET_JWD_SEED").required().asString(),
    // JWT_EXPIRE_IN: env.get("JWT_EXPIRE_IN").required().asString(),
}

