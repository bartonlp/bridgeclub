// JavaScript for addDonation.php
// BLP 2022-01-08 -- added blur logic to total inputs.

'use strict';

// When we click on a 'name' in the table we do an add via a GET which
// lets us add a specific date and amount.
// in addDonation.php

$("#donate-tbl td:first-of-type").on("click", function() {
  let id = $(this).attr('data-id');
  location.replace("addDonation.php?page=add&id="+id);
});

// This looks for the data-type 'currency' and then does its magic.

$("input[data-type='currency']").on({
  keyup: function() {
    formatCurrency($(this));
  },
  blur: function() { 
    formatCurrency($(this), "blur");
  }
});

function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.

  // get input value
  var input_val = input.val();

  // BLP 2022-01-08 -- added. This does a total of the inputs and sets
  // it in the tfoot as total.
  if(blur) {
    let total = 0;
    $("input[data-type='currency']").each(function() {
      total += parseFloat(((total = $(this).val()) == '') ? 0 : total);
    });
    $("#donate-tbl tfoot th:last-of-type").text(total);
  }
  // BLP 2022-01-08 -- end add
  
  // don't validate empty input
  if (input_val === "") { return; }

  // original length
  var original_len = input_val.length;

  // initial caret position 
  var caret_pos = input.prop("selectionStart");

  // check for decimal
  if (input_val.indexOf(".") >= 0) {

    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);

    // On blur make sure 2 numbers after decimal
/*    if (blur === "blur") {
      right_side += "00";
    }
*/
    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = left_side + "." + right_side;

  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = input_val;

    // final formatting
    /*if (blur === "blur") {
      input_val += ".00";
    }*/
  }

  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}
