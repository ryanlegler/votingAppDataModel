votingApp.factory('candidateDataModelFactory', function(votingModel) {
    return {
        createField: function() {
            // Put the time object into storage
            localStorage.setItem('storedFields', JSON.stringify(votingModel.fields));

        },
        retrieveFields: function() {
            var fields = JSON.parse(localStorage.getItem('storedFields'));

            votingModel.fields.length = 0;

            for (var x = 0; x < fields.length; x++) {
                votingModel.fields.push(fields[x]);
            }

        },
        updateFieldLabel: function(field_label_current,field_label_new) {

            var fields = votingModel.fields;

            for (var i = fields.length - 1; i >= 0; i--) {
                if (fields[i].label === field_label_current){
                    fields[i].label = field_label_new;
                }
            };

            localStorage.setItem('storedFields', JSON.stringify(fields));

            return fields;
        },
        deleteField: function(field_label) {

            var fields = votingModel.fields;

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

