function getDataAutofill(data)
{
    socotraApi.setAuxData("global", "autoFillInput", JSON.stringify(data));

    let res = {};

    if(data.operation == "newBusiness" && 
       data.operationType == "create" && 
       data.updates.fieldValues.policy_type == "Rewrite")
    {
        res = rewritePolicy(data);
    }

    socotraApi.setAuxData("global", "autoFillOutput", JSON.stringify(res));

    return res;
}

function rewritePolicy(data)
{
    let referencePolicyId = data.updates.fieldValues.reference_policy_id;
    let referencePolicy = socotraApi.fetchByLocator(Policy, referencePolicyId);
    let addExposures = [];

    for(const exposure of referencePolicy.exposures)
    {
        let addPerils = [];
        for(const peril of exposure.perils)
        {
            addPerils.push({
                "name": peril.name,
                "fieldValues": peril.characteristics[0].fieldValues
            })
        }
        addExposures.push({
            "exposureName": exposure.name,
            "perils": addPerils,
            "fieldGroups": [],
            "fieldValues": exposure.characteristics[0].fieldValues
        })
    }
    
    return {
        "fieldValues": referencePolicy.characteristics[0].fieldValues,
        "addExposures": addExposures
    }
}

module.exports ={
    getDataAutofill
} 