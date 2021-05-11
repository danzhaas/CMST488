//get market chart data 
function getMarketChartData(id, days, interval) {
	var marketChartData = [];
	const settings = {
		"async": true,
		"crossDomain": true,
		"url": `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`,
		"method": "GET",
	};
	$.ajax(settings)
	.done(function (response) {
		const p = response.prices;
		for ( var i=0; i<p.length; i++) {
			marketChartData[i] = new Object;
			marketChartData[i].x = new Date(p[i][0]);
			marketChartData[i].y = Number(p[i][1]);
		}
	})
	return marketChartData;
}

const lineData = (getMarketChartData("bitcoin","1","minutely"));

//render chart
setTimeout(function () {

	var options = {
		theme: "light2",
		title: { text: "Bitcoin"},
		data: [{type: "line", dataPoints: lineData}]
	};
	$("#chartContainer").CanvasJSChart(options);
}, 1000);