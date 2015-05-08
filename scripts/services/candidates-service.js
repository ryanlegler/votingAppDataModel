votingApp.factory('candidatesFactory', function(votingModel) {
    return {
        retreiveCandidates: function(dataModelFields) {

            var storedCandidates = JSON.parse(localStorage.getItem('storedCandidates'));

            if (storedCandidates === null || storedCandidates === undefined || storedCandidates.length < 1 ){

                var candidates = [
                    {
                        "label":'#cats','fields':[]
                    },
                    {
                        "label":'#dogs','fields':[]
                    },
                    {
                        "label":'#other','fields':[]
                    }
                ];

                localStorage.setItem('storedCandidates', JSON.stringify(candidates));
            } else {

                storedCandidates = JSON.parse(localStorage.getItem('storedCandidates'));

                votingModel.candidates.length = 0;

                for (var x = 0; x < storedCandidates.length; x++) {
                    votingModel.candidates.push(storedCandidates[x]);
                }

            }

        },
        clearCandidates: function(candidates){
            localStorage.setItem('storedCandidates', JSON.stringify(null));
        },
        storeCandidates: function(){
            localStorage.setItem('storedCandidates', JSON.stringify(votingModel.candidates));
        },

        updateCandidatesFieldLabel: function(field_label_current, field_label_new){

            var candidates = votingModel.candidates;

            for (var i = candidates.length - 1; i >= 0; i--) {
                for (var f = candidates[i].fields.length - 1; f >= 0; f--) {
                    if (candidates[i].fields[f].label === field_label_current){
                        candidates[i].fields[f].label = field_label_new;
                    }
                };
            }

            localStorage.setItem('storedCandidates', JSON.stringify(candidates));

            return candidates;
        },
        deleteCandidatesField: function(field_label, field_index){
            var candidates = votingModel.candidates;

            for (var i = candidates.length - 1; i >= 0; i--) {
                if (field_index > -1) {
                    candidates[i].fields.splice(field_index, 1);
                }
            }

            localStorage.setItem('storedCandidates', JSON.stringify(candidates));
        },
        updateCandidateValue: function(candidate_label, field_label, field_value, field_index) {

            var candidates = votingModel.candidates;

            for (var i = candidates.length - 1; i >= 0; i--) {
                if(candidates[i].label === candidate_label){

                    candidates[i].fields[field_index.toString()].value = field_value;

                }
            }

            console.log("candidates",candidates);

            localStorage.setItem('storedCandidates', JSON.stringify(candidates));

        }
    };
});

