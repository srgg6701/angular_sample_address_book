$(function(){
    var btn_add_record =$('#add_record'); 
    $(btn_add_record).text('Add record');
    var add_record_val_add = $(btn_add_record).text();
    var add_record_val_cancel = 'Cancel';
    $(btn_add_record).on('click', function(){
        var lastTr = $('#tblAddressBook tr:last-child');       
        $('td',$(lastTr).prev()).each(function(index,element){
            // align the width of inputs and tds (width 100% is not the case :()
            $('td input[type="text"]',lastTr)
                .eq($(element).index())
                    .css('width', parseInt($(element).css('width'))-1-1+'px');            
        });
        // manage button text
        $(lastTr).toggle(400, function(){
            var btnVal = ($(this).is(':visible'))?
                                add_record_val_cancel:add_record_val_add;
            console.log('btnVal: '+btnVal);
            $(btn_add_record).text(btnVal);
        });
    })
});