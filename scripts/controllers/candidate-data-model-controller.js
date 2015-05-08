votingApp.controller('candidateDataModelController',
function($scope, $http, $timeout, candidateDataModelFactory, candidatesFactory, votingModel) {
    $scope.addingField = {}
    $scope.editingFieldName = false;
    $scope.debugOpen = false;


    // // grab fields array from local storage and put it into the "Value Provider"

    candidateDataModelFactory.retrieveFields();

    // grab candidates array from local storage and put it into the "Value Provider"
    candidatesFactory.retreiveCandidates(votingModel.fields);

    $scope.createField = function(field_label, field_type) {

        $scope.addingField.adding = true;

        $timeout(function(){

            $scope.addingField = {};
            $scope.new_field_type = false;

            votingModel.fields.push({
                'label': field_label,
                'type': field_type,
                'value':''
            });

            //and insert it into each candidates fields []
            for (var i = votingModel.candidates.length - 1; i >= 0; i--) {
                votingModel.candidates[i].fields.push({
                    'label': field_label,
                    'type': field_type,
                    'value': ''
                });
            };

            candidatesFactory.storeCandidates();
            candidateDataModelFactory.createField();

        }, 300);

    };

    $scope.updateFieldLabel = function(field_label_current, field_label_new) {

        candidateDataModelFactory.updateFieldLabel(field_label_current, field_label_new);
        // candidateDataModelFactory.retrieveFields();
        candidatesFactory.updateCandidatesFieldLabel(field_label_current, field_label_new);

    };

    $scope.deleteField = function(field_label, field_index) {

        candidateDataModelFactory.deleteField(field_label);
        // candidateDataModelFactory.retrieveFields();
        candidatesFactory.deleteCandidatesField(field_label, field_index);

    };

    $scope.toggleFieldActionsOpen = function (fields,index) {

        for (var i = fields.length - 1; i >= 0; i--) {
            if(index === i){
                fields[i].actionsOpen = !fields[i].actionsOpen;
            } else {
                fields[i].actionsOpen = false;
            }
        };
    }


    $scope.updateCandidateValue = function (candidate_label, field_label, field_value, field_index) {
        candidatesFactory.updateCandidateValue(candidate_label, field_label, field_value, field_index);
    }

    $scope.clearCandidates = function () {
        candidatesFactory.clearCandidates();
    }

    $scope.toggleCandidateEditOpen = function (candidates, candidateFields, parent_index, index) {

        for (var i = candidates.length - 1; i >= 0; i--) {

            if(parent_index === i){
                for (var f = candidateFields.length - 1; f >= 0; f--) {
                    if(f === index) {
                        candidates[i].fields[index].editOpen = !candidates[i].fields[index].editOpen;
                    } else {
                        candidates[i].fields[f].editOpen = false;
                    }
                };

            } else {
                for (var f = candidateFields.length - 1; f >= 0; f--) {
                    candidates[i].fields[f].editOpen = false;
                };
            }
        }
    }

    $scope.toggleDebug = function() {
        $scope.debugOpen = !$scope.debugOpen;
    }
});
