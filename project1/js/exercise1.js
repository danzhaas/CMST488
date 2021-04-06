$(function () {
    /* Selectors */
    $("#add-classes").click(function () {
        $('.selector-examples li:first').addClass('first');
        $('.selector-examples li:even').addClass('even');
        $('.selector-examples li:odd').addClass('odd');
        $('.selector-examples li:nth-child(4)').addClass('highlighter');
        $('.selector-examples li:last').addClass('last');
    });

    /* Change Text */
    $("#change-language").click(function () {
        // Step 1: Create a new variable called inputValue and set it to the value of the #newLanguage id
        const inputValue = $('#newLanguage').val();
        // Step 2: Create a new variable called element and set it to the .currentLanguage class
        var element = $('.currentLanguage');
        // Step 4: Using .html (http://api.jquery.com/html/), update element with inputValue
        element.html(inputValue);
    });

    /* Toggles Part 1: Modifying CSS attributes with .css() */
    var boxColor = "rgb(153, 51, 51)"

    $("#button_toggle_colors").click(function() {
        /* Your code goes here */
        $(".box").each(function () {

            if ($(this).css('background-color') == boxColor) {
                $(this).css('background-color','rgba(0,0,0,0)');
            }
            else {
                $(this).css('background-color',boxColor);
            }
        });
    });

    /* Toggles Part 2: Adding/Removing classes to manipulate shapes */
    $("#button_toggle_roundedges").click(function() {
        $(".box").each(function () {
            $(this).toggleClass('round-edge');
        });
    });

    /* Toggles Part 3: Adding new elements */
    $("#button_add_box").click(function() {
        var newBox = $(document.createElement('div'));
        newBox.attr('id','box4');
        newBox.addClass('box');
        newBox.addClass('outlined');
        var existingBoxes = $('#boxes');
        existingBoxes.append(newBox);
    });
});
