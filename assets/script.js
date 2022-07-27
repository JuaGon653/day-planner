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
    // row element of the table
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
    // first column display the time
    tableRowEl.append('<td class="col-2 custom-col">' + (i+1) + amORpm + '</td>');
    // checks if time blocks are in the past, future, or present and changes their color appearance based off of time
    if(throughTF+1 < moment().format("H")){
        tableRowEl.append('<td class="col-8 custom-col past"><textarea class="row' + throughTF + '"></textarea></td>');
    } else if (throughTF+1 > moment().format("H")){
        tableRowEl.append('<td class="col-8 custom-col future"><textarea class="row' + throughTF + '"></textarea></td>');
    } else {
        tableRowEl.append('<td class="col-8 custom-col present"><textarea class="row' + throughTF + '"></textarea></td>');
    }
    // third column then contains a save button
    tableRowEl.append('<td class="col-2 custom-col"><img class="saveBtn" id="row' + throughTF + '" src="./assets/images/save-image.png"></td>');
    tableBodyEl.append(tableRowEl);
    // if it's the afternoon, 'i' is set back to the original 1-24 time
    if(amORpm === 'PM'){
        i = temp;
    }
    throughTF++;
}
// saves the save buttons and textareas after they have all been created
saveBtnEl = $('.saveBtn');
textInput = $('textarea');

// if it is a new day the older events are deleted
// if not a new day, all events are pulled from the local storage
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
// displays textarea inputs
for(var i = 0; i <= textInput.length; i++){
    textInput.eq(i).val(textArray[i]); 
}

// save button saves the textarea input of the row you pressed the save button
saveBtnEl.on('click', function(event) {
    event.preventDefault();
    // gets the save button element's id attribute that you pressed
    var id = this.id;
    var tempArray = [];
    // goes through all the time blocks to see which one has the same class name as the pressed element's id
    // or if the input was already in the saved array in order to save the event
    for(var i = 0; i <= 8; i++){
        if (id == textInput.eq(i).attr('class') || (textInput.eq(i).val() == textArray[i])){
            tempArray.push(textInput.eq(i).val());
        } else {
            tempArray.push("");
        }
    }
    textArray = tempArray;
    // sets the textArray variable in the local storage to the saved inputs from the tempArray
    localStorage.setItem("textArray", JSON.stringify(textArray));
    localStorage.setItem("prevDay", moment().format("DDD"));
})