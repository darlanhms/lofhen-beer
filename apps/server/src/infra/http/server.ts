import validateEnvironmentVariables from '@core/utils/validateEnvironmentVariables';
import app from './app';

validateEnvironmentVariables();

app.listen(process.env.PORT || 80, () => {
  console.info(`Server listening on port ${process.env.PORT}`);
});
