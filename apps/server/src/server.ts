import validateEnvironmentVariables from 'utils/validateEnvironmentVariables';
import 'database/middleware';
import app from './app';

validateEnvironmentVariables();

app.listen(process.env.PORT || 80, () => {
  console.info(`Server listening on port ${process.env.PORT}`);
});
