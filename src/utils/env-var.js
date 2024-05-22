import dotenv from "dotenv";
dotenv.config();

const envVars = {
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  FORNTEND_URL: process.env.FORNTEND_URL,
  DB_CONNECT: process.env.DB_CONNECT,
};

export default function getEnvVar(varName) {
  if (typeof envVars[varName] === "undefined") {
    console.error(`'${varName}' is not available`);
    process.exit();
  } else {
    return envVars[varName];
  }
}
