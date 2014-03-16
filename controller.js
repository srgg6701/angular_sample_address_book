function abController($scope){
    $scope.contacts = [
        { name: "Anton", 
          surname: "Cruseiro", 
          phone_number: "+12563214785", 
          group: "Designer" 
        },
    ];
    $scope.addContact = function(){
        if($scope.name && $scope.phone_number){
            $scope.contacts.push({
                name:           $scope.name, 
                surname:        $scope.surname, 
                phone_number:   $scope.phone_number, 
                group:          $scope.group
            });
            $scope.name = '';
            $scope.surname = '';
            $scope.phone_number = '';
            $scope.group = '';/**/
        }
        console.log('addContact');
        console.dir($scope.contacts);
    }
    $scope.handleRow = function(event){
        //console.dir(event.currentTarget);
        if($(event.currentTarget).hasClass('add')){           
            $scope.addContact();
        }
    }
    $scope.removeRecord = function(event){
        var TR = $(event.currentTarget).parents('tr').eq(0);
        $(TR).fadeOut(400,function(){
            console.log('deleting record from local storage...');
            var ind = $(TR).index()-1;
            //console.log('index to remove: '+ind)        
            $scope.contacts.splice(ind,1);
        });
    }
}
