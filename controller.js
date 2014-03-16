function abController($scope){
    $scope.contacts = [];
    // get data from local storage as an array:
    var adressBook = JSON.parse(window.localStorage.getItem('adress_book'));
    // fill local data from scope or localStorage:
    var makeContacts = function(storage, className){
        $scope.contacts.push({
            name:           storage['name'], 
            surname:        storage['surname'], 
            phone_number:   storage['phone_number'], 
            group:          storage['group'],
            class:          className,
        });
        var groups=[], contacts_book=[];
        for(var i in $scope.contacts){ //console.log('contacts:');console.dir($scope.contacts[i]);
            var current_group = $scope.contacts[i].group;
            if(!groups.length) {
                // initialize an array:
                groups[0]=current_group;
            }else{
                // add new group to the array:
                if($.inArray(current_group, groups)==-1){ 
                    groups.push(current_group);
                }
            }
            contacts_book.push($scope.contacts[i]);
        }   
        groups.sort(); 
        $scope.contacts=[];
        /*  console.log('%cgroups, contacts_book:', 'color:blue');
            console.dir(groups); console.dir(contacts_book); */
        // rebuild $scope.contacts sorted by group name:
        for(var g in groups){
            for(var i in contacts_book){
                if(contacts_book[i].group==groups[g]){
                    //console.log('coincedence: '+groups[g]);
                    $scope.contacts.push(contacts_book[i]);
                }
            }
        } console.log('%ccope.contacts:', 'color:violet');console.dir($scope.contacts);
    }
    // fill table from localStorage:
    for(var contact in adressBook){
        makeContacts(adressBook[contact]);
    }
    // add contact into Model and store it in the localStorage: 
    /*$scope.addContact = function(){
        if($scope.name && $scope.phone_number){
            makeContacts($scope, 'new');
            // clear data to make cells empty:
            $scope.name = '';
            $scope.surname = '';
            $scope.phone_number = '';
            $scope.group = '';
        } //console.dir($scope.contacts);
        storeData();
    }*/
    $scope.handleRow = function(event){
        if($(event.currentTarget).hasClass('add')){  
            if($scope.name && $scope.phone_number){
                $('tr.added_now',getAddressBook()).toggleClass('added_now added_before');
                makeContacts($scope, 'added_now');
                // clear data to make cells empty:
                $scope.name = '';
                $scope.surname = '';
                $scope.phone_number = '';
                $scope.group = '';
            }else{
                alert('Sorry, you have missed some mandatory data.');
                return false;
            }
            storeData();
        }else if($(event.currentTarget).hasClass('edit'))
            handleCell(event.currentTarget);
    }
    // remove a record from the local data and store renewed data in the localStorage: 
    $scope.removeRecord = function(event){
        var TR = $(event.currentTarget).parents('tr').eq(0);
        $(TR).fadeOut(400,function(){
            var ind = $(TR).index()-1;
            $scope.contacts.splice(ind,1);
            storeData();
        });
    }
    // store data in the localStorage: 
    var storeData = function(){
        //console.log('store the record in DB...');
        window.localStorage.setItem('adress_book', JSON.stringify($scope.contacts));
    } 
}

// turn td content into input and vice versa
function handleCell(btn){ //console.log('btn: '); console.dir(btn);
btn.className=(btn.className=='save')? 'edit':'save';    
var THs =$(getAddressBook()).find('th');  
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
                    }).css('width', $(THs).eq(index).attr('width')+'px');
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
