function alertEnvVar(name: string): void {
  throw new Error(
    `[ENVIRONMENT SETUP ERROR] ${name} is a mandatory environment variable and it is null or undefined.`,
  );
}

const mandatoryVars = ['JWT_SECRET', 'DATABASE_URL'];

export default function validateEnvironmentVariables(): void {
  for (const envVar of mandatoryVars) {
    if (!process.env[envVar]) {
      alertEnvVar(envVar);
    }
  }
}
