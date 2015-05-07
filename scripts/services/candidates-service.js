votingApp.factory('candidatesFactory', function() {
    return {
        retreiveCandidates: function(dataModelFields) {

            var candidates = JSON.parse(localStorage.getItem('storedCandidates'));

            if (candidates === null){

                candidates = [
                    {
                        "label":'name1','fields':[]
                    },
                    {
                        "label":'name2','fields':[]
                    },
                    {
                        "label":'name3','fields':[]
                    }
                ];
            }

            localStorage.setItem('storedCandidates', JSON.stringify(candidates));

            return candidates;
        },
        clearCandidates: function(candidates){
            localStorage.setItem('storedCandidates', JSON.stringify(null));
        },
        storeCandidates: function(candidates){
            localStorage.setItem('storedCandidates', JSON.stringify(candidates));
        },

        updateCandidatesFieldLabel: function(field_label_current, field_label_new){

            var candidates = JSON.parse(localStorage.getItem('storedCandidates'));
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
            var candidates = JSON.parse(localStorage.getItem('storedCandidates'));
            for (var i = candidates.length - 1; i >= 0; i--) {
                if (field_index > -1) {
                    candidates[i].fields.splice(field_index, 1);
                }
            }

            localStorage.setItem('storedCandidates', JSON.stringify(candidates));

            return candidates;
        },
        updateCandidateValue: function(candidate_label, field_label, field_value, field_index) {

            var candidates = JSON.parse(localStorage.getItem('storedCandidates'));


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

