$(function() {
    var tblAdressBook = getAddressBook();
    var lastTr = $('tr:last-child', tblAdressBook);
    // set td width as HTML-attribute to be sure that it is fixed and will not be changed
    $(lastTr).prev().find('td').each(function(index,element){
        var tdWidth = setInputWidth(element,'width')
        $(element).attr('width',tdWidth);                
    });   
    // the buttons
    var btn_add_record = $('#add_record');
    // manage btn text
    $(btn_add_record).text('Add record');
    var add_record_val_add = $(btn_add_record).text();
    var add_record_val_cancel = 'Cancel';
    // add new record (show next tr)
    $(btn_add_record).on('click', function() {
        $('td', $(lastTr).prev()).each(function(index, element) {
            // align the width of inputs and tds (width 100% is not the case :()
            $('td input[type="text"]', lastTr)
                    .eq($(element).index())
                    .css('width', setInputWidth(element, 'width', true));
        });
        // manage button text
        $(lastTr).toggle(400, function() {
            var btnVal = ($(this).is(':visible')) ?
                    add_record_val_cancel : add_record_val_add;
            $(btn_add_record).text(btnVal);
        });
    });
    // make cell text editable
    $('button.edit, button.save:not(.add)').on('click', function() {
        handleCell(this);
    });
});
function getAddressBook(){
    return $('#tblAddressBook');
}
// turn td content into input and vice versa
function handleCell(btn){
btn.className=(btn.className=='save')? 'edit':'save';    
$(btn).parents('tr').eq(0).find('td')
    .each(function(index, element) {
        if ($(element).has('button').size()) {
            return false;
        } else {
            if(btn.className=='save'){
                // store td text
                var cellText = $(element).text();
                // clean td and set width as HTML-attribute to be sure that it is fixed
                $(element).text('');
                // create cell
                var input = $('<input/>',{
                        value:cellText
                    }).css('width', $(element).attr('width')+'px');
                // set padding params for editable cell
                $(element).html(input);
            }else{
                var cellText = $('input',element).val();
                $(element).text(cellText);
                $('input',element).remove();
            }
        }
    });
}
// get th width as base param for calculations
function setInputWidth(element, wType, px, wMinus) {
    if(!wMinus) wMinus = 0.5; //console.log(wType+' : '+$(element).innerWidth());
    var eIndex=$(element).index();
    var w=$('tbody tr:first-child th',getAddressBook()).eq(eIndex)[wType]()- wMinus; //console.log('w : '+w)
    if(px) w+='px';
    return  w; 
} 