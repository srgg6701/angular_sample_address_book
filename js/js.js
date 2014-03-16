$(function() {
    /*  set TH width as HTML-attribute to be sure that it is fixed 
        and will not be changed in future */
    $('tbody tr:first-child th',getAddressBook())
        .each(function(index,element){
            $(element).attr('width', $(element).width());
    });   
    // get the buttons
    var btn_add_record = $('#add_record');
    // manage btn texts
    $(btn_add_record).text('Add record');
    var add_record_val_add = $(btn_add_record).text();
    var add_record_val_cancel = 'Cancel';
    // add new record (show next tr)
    $(btn_add_record).on('click', function() {
        // get the last row:
        var lastTr = getLastTr();   
        $('td', $(lastTr).prev()).each(function(index, element) {
            // align the width of inputs and tds (width 100% is not the case :()
            $('td input[type="text"]', lastTr)
                    .eq($(element).index())
                    .css('width', setInputWidth(element));
        });
        // manage button text
        $(lastTr).toggle(400, function() {
            var btnVal = ($(this).is(':visible')) ?
                    add_record_val_cancel : add_record_val_add;
            $(btn_add_record).text(btnVal);
        });
    });
});
// get the table as jQuery object
function getAddressBook(){
    return $('#tblAddressBook');
}
// get last row in the table
function getLastTr(tblAdressBook){
    if(!tblAdressBook) tblAdressBook=getAddressBook();
    return $('tr:last-child', tblAdressBook);
}
// get th width as base param for calculations
function setInputWidth(element, /*px, */wMinus) {
    if(!wMinus) wMinus = 0.5; //console.log(wType+' : '+$(element).innerWidth());
    var eIndex=$(element).index();
    var th = $('tbody tr:first-child th',getAddressBook()).eq(eIndex);
    return $(th).attr('width')+'px';
} 