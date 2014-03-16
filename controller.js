function abController($scope){
    $scope.contacts = [
        { name: "Anton", 
          surname: "Cruseiro", 
          phone_number: "+12563214785", 
          group: "Designer" 
        },
    ];
    $scope.addContact = function(){
        console.log('scope.name = '+$scope.name);
        console.log('scope.surname = '+$scope.name);
        console.log('scope.phone_number = '+$scope.name);
        console.log('scope.group = '+$scope.name);
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
            console.log('has class "add"!');
            $scope.addContact();
            centerTdContent();
        }
    }
    $scope.removeRecord = function(event){
        $(event.currentTarget).parents('tr').eq(0).fadeOut(400,function(){
            console.log('deleting record from local storage...');
        });
    }
}
