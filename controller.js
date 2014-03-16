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
            $scope.group = '';
        }
    }
}
