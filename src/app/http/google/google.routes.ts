import { requestHandler, Router } from '@knittotextile/knitto-http';
import { getAccessToken, testGoogleAds } from './google.controller';

const defaultRouter = Router();
defaultRouter.get('/google/test-google-ads', requestHandler(testGoogleAds));
defaultRouter.get('/google/access-token', requestHandler(getAccessToken));

export default defaultRouter;
