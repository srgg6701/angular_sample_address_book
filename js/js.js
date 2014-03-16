var AddressBook;
$(function() {
    AddressBook={
        getTable:function(){
            return $('#tblAddressBook');
        },
        getLastTr:function(){
            return $('tr:last-child', this.table);
        },
        getBtn:function(){
            return $('#add_record');
        },
        setBtnValDefault:function(){
            $(this.getBtn()).text('Add record');
        },
        setBtnValCancel:function(){
            $(this.getBtn()).text('Cancel');
        }
    }
    /*  set TH width as HTML-attribute to be sure that it is fixed 
        and will not be changed in future */
    $('tbody tr:first-child th',AddressBook.getTable())//getAddressBook()
        .each(function(index,element){
            $(element).attr('width', $(element).width());
    });   
    // set default value on the button under the table:
    AddressBook.setBtnValDefault();
    // add new record (show next tr):
    $(AddressBook.getBtn()).on('click', function() {
        var btn_add_record = this;   
        // get the last row:
        var lastTr = AddressBook.getLastTr();
        $('td', $(lastTr).prev()).each(function(index, element) {
            // align the width of inputs and tds (width 100% is not the case :()
            $('td input[type="text"]', lastTr)
                    .eq($(element).index())
                    .css('width', setInputWidth(element));
        });
        // manage button text
        $(lastTr).toggle(400, function() {
            $(btn_add_record).text( ($(this).is(':visible')) ?
                    AddressBook.setBtnValCancel() : AddressBook.setBtnValDefault() );
        });
    });
    $('#gr').on('click', function(){
        if(!$(this).attr('data-collapsed')){
            console.dir(groups);
            var Table=AddressBook.getTable();
            var Ths=$('tr:has(th)',Table);
            $('tr:not(:has(th))',Table).hide();
            for(var i in groups){
                var tr=$('<tr/>',{
                    class:'group',
                    'data-group':groups[i]
                });
                var td=$('<td/>',{
                    colspan:6,
                    //onclick:alert('hello')
                }).text(groups[i]);
                $(tr).append(td)
                $(Ths).after(tr);            
            }
            $(this).attr('data-collapsed', '1');
        }
    });
    $(AddressBook.getTable()).on('click','tr.group', function(event){
        //alert('clicked');
        console.dir(Contacts);
        var Table=AddressBook.getTable();
        var Tr=event.currentTarget;
        var dataGroup = $(Tr).attr('data-group');
        var trGroup = $('tr:not(.group):has(td:contains("'+dataGroup+'"))',Table);
        $(Tr).after(trGroup);
        $(trGroup).toggle();
    });
});
// get th width as base param for calculations
function setInputWidth(element, wMinus) {
    if(!wMinus) wMinus = 0.5; //console.log(wType+' : '+$(element).innerWidth());
    var eIndex=$(element).index();
    var th = $('tbody tr:first-child th',AddressBook.getTable()).eq(eIndex);
    return $(th).attr('width')+'px';
} 