// import { GoogleAuth } from 'google-auth-library';
// import * as path from 'path';

// const keyFile = path.join(
// 	__dirname,
// 	'../../indigo-proxy-293308-7c3dcd51dd06.json'
// );

// const googleAuth = new GoogleAuth({
// 	keyFile,
// 	scopes: ['https://www.googleapis.com/auth/adwords']
// });

interface GoogleAdsResponse {
	// Define the response structure based on the actual API response
	results: any[];
	// Add other properties as needed
}

export async function fetchGoogleAdsTest(
	accessToken: string
): Promise<GoogleAdsResponse> {
	const url =
		'https://googleads.googleapis.com/v17/customers/3026150909/googleAds:search';
	const headers = {
		'Content-Type': 'application/json',
		'developer-token': 'h7YAMtgfVJnBSrE_IQmm-Q',
		'login-customer-id': '3026150909',
		Authorization: `Bearer ${accessToken}`
	};
	const body = JSON.stringify({
		query:
			'SELECT campaign.name, campaign_budget.amount_micros, campaign.status, campaign.optimization_score, campaign.advertising_channel_type, metrics.clicks, metrics.impressions, metrics.ctr, metrics.average_cpc, metrics.cost_micros, campaign.bidding_strategy_type FROM campaign WHERE segments.date DURING LAST_7_DAYS AND campaign.status != REMOVED',
		validateOnly: false
	});

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: headers,
			body: body
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response}`);
		}

		const data: GoogleAdsResponse = await response.json();
		return data;
	} catch (error: any) {
		throw new Error(error.message ?? error);
	}
}
