votingApp.factory('candidateDataModelFactory', function() {
    return {
        createField: function(fields) {
            // Put the time object into storage
            localStorage.setItem('storedFields', JSON.stringify(fields));

        },
        retrieveFields: function(fields) {

            var fields = JSON.parse(localStorage.getItem('storedFields'));

            if (fields === null){
                fields = [{'label':'tag','type':'text'}];
            }
            return fields;
        },
        updateFieldLabel: function(field_label_current,field_label_new) {

            var fields = JSON.parse(localStorage.getItem('storedFields'));

            for (var i = fields.length - 1; i >= 0; i--) {
                if (fields[i].label === field_label_current){
                    fields[i].label = field_label_new;
                }
            };

            localStorage.setItem('storedFields', JSON.stringify(fields));

            return fields;
        },
        deleteField: function(field_label) {

            var fields = JSON.parse(localStorage.getItem('storedFields'));

            for (var i = fields.length - 1; i >= 0; i--) {
                if (fields[i].label === field_label){
                    fields.splice(i, 1);
                }
            };

            localStorage.setItem('storedFields', JSON.stringify(fields));

            return fields;
        }
    };
});

