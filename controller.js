var lang = null;
// 
function abController($scope) {
    var settings = null;
    if (!lang) {
        lang = (settings = JSON.parse(window.localStorage.getItem('settings'))) ? settings[0]['language'] : 'en'; //console.log('lang = '+lang) 
    }
    // the main container:
    $scope.contacts = [];
    // the container for data which is editing in line:
    var temp_contact_data = [];
    // make scope fields array:
    var fields = ['name', 'surname', 'phone_number', 'group'];
    // get data from local storage as an array:
    var adressBook = JSON.parse(window.localStorage.getItem('adress_book'));
    // fill local data from scope or localStorage:
    var makeContacts = function(storage, className) {
        $scope.contacts.push({
            name: storage['name'],
            surname: storage['surname'],
            phone_number: storage['phone_number'],
            group: storage['group'],
            class: className,
        });
        var groups = [];
        var contacts_book = [];
        for (var i in $scope.contacts) { //console.log('contacts:');console.dir($scope.contacts[i]);
            var current_group = $scope.contacts[i].group;
            if (!groups.length) {
                // initialize an array:
                groups[0] = current_group;
            } else {
                // add new group to the array:
                if ($.inArray(current_group, groups) == -1) {
                    groups.push(current_group);
                }
            }
            contacts_book.push($scope.contacts[i]);
        }
        groups.sort();
        $scope.contacts = [];
        /*  console.log('%cgroups, contacts_book:', 'color:blue');
         console.dir(groups); console.dir(contacts_book); */
        // rebuild $scope.contacts sorted by group name:
        for (var g in groups) {
            for (var i in contacts_book) {
                if (contacts_book[i].group == groups[g]) {
                    //console.log('coincedence: '+groups[g]);
                    $scope.contacts.push(contacts_book[i]);
                }
            }
        } //console.log('%ccope.contacts:', 'color:violet');console.dir($scope.contacts);
        //Contacts=$scope.contacts;
    }
    // fill table from localStorage:
    for (var contact in adressBook) {
        makeContacts(adressBook[contact]);
    }
    // add contact into Model and store it in the localStorage: 
    $scope.handleRow = function(event) {
        var bttn = event.currentTarget;
        if ($(bttn).hasClass('add')) { // the button in the last row
            if ($scope.name && $scope.phone_number) {
                $('tr.added_now', AddressBook.getTable()).toggleClass('added_now added_before');
                makeContacts($scope, 'added_now');
                storeData();
                // clear data to make cells empty:
                $scope.name = '';
                $scope.surname = '';
                $scope.phone_number = '';
                $scope.group = '';
                storeData();
                $(AddressBook.getLastTr()).fadeOut(400);
            } else {
                alert('Sorry, you have missed some mandatory data.');
                return false;
            }
        }
        else if ($(bttn).hasClass('save') || $(bttn).hasClass('save_ru')) { // the button in the row while edit mode
            console.log('%ctemp_contact_data: ', 'color:green');
            console.dir(temp_contact_data);
            for (var i in $scope.contacts) {
                if ($scope.contacts[i].name == temp_contact_data['name'] &&
                        $scope.contacts[i].surname == temp_contact_data['surname'] &&
                        $scope.contacts[i].phone_number == temp_contact_data['phone_number'] &&
                        $scope.contacts[i].group == temp_contact_data['group']
                        ) {
                    // get inputs to have access to their values:
                    var inputs = getInputs(bttn);
                    // change data in contacts:
                    for (var k = 0, j = fields.length; k < j; k++) {
                        $scope.contacts[i][fields[k]] = $(inputs).eq(k).val();
                    }
                    // empty the temporary array:
                    temp_contact_data = [];
                    console.log('%c$scope.contacts[i]', 'color:orange');
                    console.dir($scope.contacts[i]);
                    break;
                }
            }
            storeData();
            handleCell(bttn);
        }
        else if ($(bttn).hasClass('edit') || $(bttn).hasClass('edit_ru')) {// the button in the row while static mode
            handleCell(bttn);
            /* store old data in the temporary array: */
            // get inputs:
            var inputs = getInputs(bttn);
            // save previous data (before editing):
            for (var i = 0, j = fields.length; i < j; i++)
                temp_contact_data[fields[i]] = $(inputs).eq(i).val();
            console.dir(temp_contact_data);
        }
    }
    // remove a record from the local data and store renewed data in the localStorage: 
    $scope.removeRecord = function(event) {
        var TR = $(event.currentTarget).parents('tr').eq(0);
        $(TR).fadeOut(400, function() {
            var ind = $(TR).index() - 1;
            $scope.contacts.splice(ind, 1);
            storeData();
            $(this).remove();
        });
    }
    // set interface language
    $scope.setLang = function(lang) {
        window.localStorage.setItem('settings', JSON.stringify([{language: lang}]));
        location.reload();
    }
    // store data in the localStorage: 
    var storeData = function() {
        //console.log('store the record in DB...');
        window.localStorage.setItem('adress_book', JSON.stringify($scope.contacts));
    }
    
    if (lang == 'en') {
        $scope.btns = {
                edit: "edit",
                save: "save"
            };
        $scope.caption = 
            {   caption: "Address book",
                pholder: "search contact",
                fields: "The fields",
                name: "Name",
                and: "and",
                phone_number: "Phone Number",
                are_mandatory: "are mandatory",
            };
        $scope.headers = 
            {
                Name: "Name",
                Surname: "Surname",
                Phone_Number: "Phone Number",
                grManage: "Collapse/Expand groups",
                Group: "Group",
                Edit_Save: "Edit/Save",
                Remove: "Remove"
            };
    } else if (lang == 'ru') {
        $scope.btns = {
                edit: "edit_ru",
                save: "save_ru"
            };
        $scope.caption = 
            {   caption: "Адресная книга",
                pholder: "найти контакт",
                fields: "Поля",
                name: "Имя",
                and: "и",
                phone_number: "Номер телефона",
                are_mandatory: "Обязательны",
            };
        $scope.headers = 
            {
                Name: "Имя",
                Surname: "Фамилия",
                Phone_Number: "Номер телефона",
                grManage: "Груп./Разв.",
                Group: "Группа",
                Edit_Save: "Ред./Сохр",
                Remove: "Удалить"
            };
    }
}
// turn td content into input and vice versa
function handleCell(btn) { //console.log('btn: '); console.dir(btn);
    var cEdit, cSave;
    if (lang == 'en') {
        cEdit = 'edit';
        cSave = 'save';
    } else if (lang == 'ru') {
        cEdit = 'edit_ru';
        cSave = 'save_ru';
    }
    btn.className = (btn.className == 'save' || btn.className == 'save_ru') ? cEdit : cSave;
    var THs = $(AddressBook.getTable()).find('th');
    $(btn).parents('tr').eq(0).find('td')
            .each(function(index, element) {
                if ($(element).has('button').size()) {
                    return false;
                } else {
                    if (btn.className == 'save' || btn.className == 'save_ru') {
                        // store td text
                        var cellText = $(element).text();
                        // clean td and set width as HTML-attribute to be sure that it is fixed
                        $(element).text('');
                        // create cell
                        var input = $('<input/>', {
                            type: 'text',
                            value: cellText
                        }).css('width', $(THs).eq(index).attr('width') + 'px');
                        // set padding params for editable cell
                        $(element).html(input);
                    } else {
                        var cellText = $('input', element).val();
                        $(element).text(cellText);
                        $('input', element).remove();
                    }
                }
            });
}
// get inputs 
function getInputs(btn) {
    return $(btn).parents('tr').eq(0).find('input[type="text"]')
}