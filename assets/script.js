var currentDayEl = $('#currentDay');
var tableBodyEl = $('#table-body');
var saveBtnEl;
var textInput;
var textArray;
var day = moment().format("dddd, MMMM Do");


// sets the currentDay element to the current day
currentDayEl.text(day);

// time starts at 9 so the throughTF index needs to start at 8
var throughTF = 8;
var afterTwelve = 0;
// loops to create the 9 time blocks
for(var i = 8; i <= 16; i++){
    var tableRowEl = $('<tr></tr>');
    var amORpm = 'AM';
    var temp = 0;
    // after 12am it displays 'pm' instead and restarts the 1-5 count
    if(i >= 12){
        amORpm = 'PM';
        temp = i;
        i = afterTwelve;
        afterTwelve++;
    }
    tableRowEl.attr("class", "row");
    tableRowEl.append('<td class="col-2 custom-col">' + (i+1) + amORpm + '</td>');
    if(throughTF+1 < moment().format("H")){
        tableRowEl.append('<td class="col-8 custom-col past"><textarea class="row' + throughTF + '"></textarea></td>');
    } else if (throughTF+1 > moment().format("H")){
        tableRowEl.append('<td class="col-8 custom-col future"><textarea class="row' + throughTF + '"></textarea></td>');
    } else {
        tableRowEl.append('<td class="col-8 custom-col present"><textarea class="row' + throughTF + '"></textarea></td>');
    }
    tableRowEl.append('<td class="col-2 custom-col"><img class="saveBtn" id="row' + throughTF + '" src="./assets/images/save-image.png"></td>');
    tableBodyEl.append(tableRowEl);
    if(amORpm === 'PM'){
        i = temp;
    }
    throughTF++;
}
saveBtnEl = $('.saveBtn');
textInput = $('textarea');
var prevDay = localStorage.getItem('prevDay');
if(prevDay < moment().format("DDD")){
    textArray = [];
} else {
    if(localStorage.getItem("textArray") == null){
        textArray = [];
    } else {
        textArray = JSON.parse(localStorage.getItem("textArray"));
    }
}
for(var i = 0; i <= textInput.length; i++){
    textInput.eq(i).val(textArray[i]); 
}


saveBtnEl.on('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
    var id = this.id;
    var tempArray = [];
    for(var i = 0; i < 24; i++){
        if (id == textInput.eq(i).attr('class') || (textInput.eq(i).val() == textArray[i])){
            tempArray.push(textInput.eq(i).val());
        } else {
            tempArray.push("");
        }
    }
    textArray = tempArray;
    localStorage.setItem("textArray", JSON.stringify(textArray));
    localStorage.setItem("prevDay", moment().format("DDD"));
})