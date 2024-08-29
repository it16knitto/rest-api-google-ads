import { TRequestFunction } from '@knittotextile/knitto-http';
import { GoogleAuth } from 'google-auth-library';
import * as path from 'path';
// import { google } from 'googleapis';
import { fetchGoogleAdsTest } from '@root/services/google-ads.service';

// Path ke file JSON kunci akun layanan
const keyFile = path.join(
	__dirname,
	'../../../../indigo-proxy-293308-7c3dcd51dd06.json'
);

// Inisialisasi GoogleAuth dengan file kunci akun layanan
const googleAuth = new GoogleAuth({
	keyFile,
	scopes: ['https://www.googleapis.com/auth/adwords'] // Ganti dengan scope yang sesuai
});

export const testGoogleAds: TRequestFunction = async (req) => {
	const { access_token } = req.query;
	const data = await fetchGoogleAdsTest(access_token as string);
	return { result: data };
};

export const getAccessToken: TRequestFunction = async () => {
	const client = await googleAuth.getClient();

	// Mendapatkan access token
	const accessTokenResponse = await client.getAccessToken();
	return { result: accessTokenResponse };
};

// Function to create a conversion in Google Ads
