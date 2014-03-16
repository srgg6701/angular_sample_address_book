function abController($scope){
    $scope.contacts = [];
    // get data from local storage as an array:
    var adressBook = JSON.parse(window.localStorage.getItem('adress_book'));
    // fill local data from scope or localStorage:
    var makeContacts = function(storage){
        $scope.contacts.push({
            name:           storage['name'], 
            surname:        storage['surname'], 
            phone_number:   storage['phone_number'], 
            group:          storage['group']
        });
    }
    // fill table from localStorage:
    for(var contact in adressBook){
        makeContacts(adressBook[contact]);
    }
    // add contact into Model and store it in the localStorage: 
    $scope.addContact = function(){
        if($scope.name && $scope.phone_number){
            makeContacts($scope);
            // clear data to make cells empty:
            $scope.name = '';
            $scope.surname = '';
            $scope.phone_number = '';
            $scope.group = '';
        }
        console.dir($scope.contacts);
        storeData();
    }
    $scope.handleRow = function(event){
        if($(event.currentTarget).hasClass('add')){           
            $scope.addContact();
        }
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
        console.log('store the record in DB...');
        window.localStorage.setItem('adress_book', JSON.stringify($scope.contacts));
    }
}
