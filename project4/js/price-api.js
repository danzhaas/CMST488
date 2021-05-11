// https://rapidapi.com/coingecko/api/coingecko
// https://www.coingecko.com/api/documentations/v3
// https://api.jquery.com/jquery.ajax/

function getCoinPrice(coin, fieldId) {
	const settings = {
		"async": true,
		"crossDomain": true,
		"url": `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`,
		"method": "GET",
	};
	$.ajax(settings)
	.done(function (response) {
		$(fieldId).html(`\$${response[coin].usd}`);
	});
}
getCoinPrice("bitcoin","#btc-price");
getCoinPrice("ethereum","#eth-price");
getCoinPrice("litecoin","#ltc-price");
getCoinPrice("dogecoin","#doge-price");
