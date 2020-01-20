const rp = require('request-promise');
const apiKey = '60dd1026-7efd-40df-a056-2a8afa82ace9';
const cryptoSchema = require('../../schemas/CryptoSchema');
const crypto = new mongoose.model('Crypto', cryptoSchema);

/**
 * Méthode pour la synchronisation des données
 * Lancer 1 fois par jours ou au clique du bouton
 * */

function latestCoinmarketcap() {
	const requestOptions = {
		method: 'GET',
		uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
		qs: {
			'start': '1',
			'limit': '1',
			'convert': 'EUR,BTC'
		},
		headers: {
			'X-CMC_PRO_API_KEY': apiKey
		},
		json: true,
		gzip: true
	};

	rp(requestOptions).then(response => {
		console.log('API call response:', response);
		var json = JSON.parse(response);
        res.json(json.Response);

        for (var data in json) {
            console.log(data + ": " + json[attributename]);
            var crypto = new crypto({
                id: json[id],
                name: json[name],
                symbol: json[symbol],
                slug: json[slug],
                date_added: json[date_added],
                max_supply: json[name],
                max_supply: json[max_supply],
                circulating_supply: json[circulating_supply],
                total_supply: json[total_supply],
                cmc_rank: json[cmc_rank],
                last_updated: json[last_updated],
                price: json[price],
                volume_24h: json[volume_24h],
                percent_change_24h: json[percent_change_24h],
                market_cap: json[market_cap]
            });
        }

	}).catch((err) => {
		console.log('API call error:', err.message);
    });

}
