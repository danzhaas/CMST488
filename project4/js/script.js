function renderNavbar() {
  const navbarContent = `
  <nav class="navbar navbar-expand-lg navbar-light bg-warning">
    <div class="container-fluid">
      <a class="navbar-brand" href="index.html"><i class="fas fa-coins"></i> Coinboard</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="index.html">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="basics.html">Basics</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="articles.html">Articles</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="guides.html">Guides</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="market.html">Market</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="research.html">Research</a>
          </li>
      </div>
    </div>
  </nav>
`;
$("#navbar").html(navbarContent);
}

renderNavbar();

// Market
if (document.title === "Coinboard - Market") {

  function plotChart(coinId) {
    const nameCap = coinId.charAt(0).toUpperCase() + coinId.slice(1);
    var marketChartData = [];
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1&interval=minutely`,
      "method": "GET",
    };
    $.ajax(settings)
    .done(function (response) {
      const p = response.prices;
      for ( var i=0; i<p.length; i++) {
        marketChartData[i] = new Object;
        marketChartData[i].x = new Date(p[i][0]);
        marketChartData[i].y = Number(p[i][1]);
      };
      $("#chartContainer").CanvasJSChart({
        theme: "light2",
        title: { text: nameCap},
        data: [{type: "line", dataPoints: marketChartData}]
      });
    })
  }

  plotChart("bitcoin");

  function getCoinPrice(coin, fieldId) {
    const settings = {
      async: true,
      crossDomain: true,
      url: `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`,
      method: "GET",
    };
    $.ajax(settings).done(function (response) {
      $(fieldId).html(`\$${response[coin].usd}`);
    });
  };

  function generateCoinCard(coinId) {
    return `
        <div class="card col col-md-6 col-lg-4">
            <div class="card-body">
                <h2 id="${coinId}-price" class="text-success">$400</h2>
                <h5 class="card-title"><i class="fas fa-coins"></i> ${coinId}</h5>
                <a href="#" class="btn btn-primary" onclick="plotChart('${coinId}')" >See Graph</a>
            </div>
        </div>
    `;
  };
  
  getCoinPrice("bitcoin","#btc-price");
  getCoinPrice("ethereum","#eth-price");
  getCoinPrice("litecoin","#ltc-price");
  getCoinPrice("dogecoin","#doge-price");

  function getTrendingCoins() {
    const settings1 = {
      async: true,
      crossDomain: true,
      url: `https://api.coingecko.com/api/v3/search/trending`,
      method: "GET",
    };
    $.ajax(settings1)
    .done(function (response) {
      const topCoinsArray = response.coins.map((coin) => coin.item.id);
      const topCoinsHtml = topCoinsArray
        .map((coin) => generateCoinCard(coin))
        .concat();
      $(topCoins).html(topCoinsHtml);
      topCoinsArray.forEach(coin => {
        const fieldId = `#${coin}-price`;
        console.log(coin);
        console.log(fieldId);
        getCoinPrice(coin, fieldId);
      })
    });
  };
  getTrendingCoins();
}

// Guides
if (document.title === "Coinboard - Guides") {
  $("#content").load("../content/how-to-buy-bitcoin.html")
  $("#buy-btc").click(() => $("#content").load("../content/how-to-buy-bitcoin.html"))
  $("#buy-doge").click(() => $("#content").load("../content/how-to-buy-dogecoin.html"))
  $(".list-group-item").click(e => {
    $(".active").removeClass("active");
    $(e.target).addClass("active");
  });
}

// Research
if (document.title === "Coinboard - Research") {
  $("#content").load("../content/what-is-blockchain.html")
  $("#res-blockchain").click(() => $("#content").load("../content/what-is-blockchain.html"))
  // $("#buy-doge").click(() => $("#content").load("../content/how-to-buy-dogecoin.html"))
  $(".list-group-item").click(e => {
    $(".active").removeClass("active");
    $(e.target).addClass("active");
  });
}

// Articles
if (document.title === "Coinboard - Articles") {
  function generateArticleCard(article) {
    return `
        <div class="card col-sm-6 col-md-4 col-lg-3 p-3">
            <div class="card-img-top">
              <a href="${article.url}" target="_blank" ><img src="${article.image}" style="max-width:100%"></a>
            </div>	
            <div class="card-body">
                <strong class="card-title"><a href="${article.url}" target="_blank" >${article.title}</a></strong>
                <p><a href="${article.source.url}" target="_blank" >${article.source.name}</a></p>
            </div>
        </div>
    `;
  }
  
  function getArticles() {
    const settings = {
      async: true,
      crossDomain: true,
      url: "https://gnews.io/api/v4/search?q=cryptocurrency&max=12&lang=en&topic=cryptocurrency&token=700c188868a0a217867afc2ee479aea3",
      method: "GET",
    };
    $.ajax(settings)
    .done(function (response) {
      console.log(response.articles.map(article => generateArticleCard(article)).join());
      $("#articles").html( response.articles.map(article => generateArticleCard(article)).concat());
    });
  }

  getArticles();  
}
