function renderNavbar() {
  const navbarContent = `<nav class="navbar navbar-expand-lg navbar-light bg-warning">
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
            <a class="nav-link" href="about.html">About</a>
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
}

if (document.title === "Coinboard - Market") {
  function generateCoinCard(coinId) {
    return `
        <div class="card col col-md-6 col-lg-4">
            <div class="card-img-top" id="chartContainer" style="width:100%; height:300px;"></div>	
            <div class="card-body">
                <h2 id="${coinId}-price" class="text-success">$400</h2>
                <h5 class="card-title"><i class="fas fa-coins"></i>${coinId}</h5>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    `;
  }

  function getTrendingCoins() {
    const settings = {
      async: true,
      crossDomain: true,
      url: `https://api.coingecko.com/api/v3/search/trending`,
      method: "GET",
    };
    $.ajax(settings).done(function (response) {
      const topCoinsArray = response.coins.map((coin) => coin.item.id);
      console.log(topCoinsArray);
      const topCoinsHtml = topCoinsArray
        .map((coin) => generateCoinCard(coin))
        .join();
      $(topCoins).html(topCoinsHtml);
    });
  }
  getTrendingCoins();
}

// Guides
if (document.title === "Coinboard - Guides") {
  // $("#content").hide();
  $("#content").load("../content/how-to-buy-bitcoin.html")
  // $("#content").fadeIn()
  $("#buy-btc").click(() => $("#content").load("../content/how-to-buy-bitcoin.html"))
  $("#buy-doge").click(() => $("#content").load("../content/how-to-buy-dogecoin.html"))
  $("#sell-btc").click(() => $("#content").load("../content/how-to-sell-bitcoin.html"))
  $(".list-group-item").click(e => {
    $(".active").removeClass("active");
    $(e.target).addClass("active");
  });
}

// Articles
if (document.title === "Coinboard - Articles") {
  function getArticles() {
    const settings = {
      async: true,
      crossDomain: true,
      url: "https://newsapi.org/v2/everything?q=Cryptocurrency&from=2021-05-11&sortBy=popularity&apiKey=2d7e18bad58649caa13c464fffbf3aa6",
      method: "GET",
    };
    $.ajax(settings)
    .done(function (response) {
      console.log(response.body.articles);
    });
  }
  getArticles();
}
