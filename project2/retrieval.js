$(document).ready(function () {

  $('#retrieve-resources').click(function () {
    var displayResources = $('#display-resources'); // set this to the display-resources ID in index.html
    var iso2code = $('#country')[0].value; // this variable should capture text input from the user
    
    displayResources.text('Loading data from JSON source...');
    /* AJAX Call to RESTful Service */
    $.ajax({
      type: "GET", // Specify "GET" or "POST"
      url: `https://restcountries.eu/rest/v2/alpha`,// URL of the service
      data: { codes: iso2code },// Use the format { parameterName: variable },
      success: function(result)
      {
        console.log(result);
        // Build output render
        var output="<table><thead><tr><th>Name</th><th>Alpha 2 Code</th><th>Alpha 3 Code</th></thead><tbody>";

        // Add data to the output render
        // Create a for loop that will iterate over the result.RestResponse.result object and add <tr><td> element
        // Hint: You will want to display result.RestResponse.result[i].name, result.RestResponse.result[i].alpha2_code, and result.RestResponse.result[i].alpha3_code in your table
        
        for (var i=0; i<result.length; i++) {
          const codeData = result[i];
          const row = `<tr><td>${codeData.name}</td><td>${codeData.alpha2Code}</td><td>${codeData.alpha3Code}</td></tr>`;
          output = output.concat(row);
        };
        output = output.concat("</tbody>");

        displayResources.html(output);

        // Add bootstrap class to the table for styling
        $("table").addClass("table");
      }
    });
  });
});
