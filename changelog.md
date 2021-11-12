# Changelog

**./src/common/enum/criteria-types.js**
* New file - Definition for route criteria types.

---

**./src/common/route-criteria.js**
* Removed 'criteriaTypesEnum' global object.
* Required './enum/criteria-types'
* Replaced references to 'criteriaTypesEnum' with 'criteriaTypes'
* Removed `criteriaTypes: criteriaTypesEnum,` module export.

---

**./src/common/possible-criteria-validation.js**
* Removed 'routeCriteria' requirement.
* Required './enum/criteria-types'
* Replaced references to 'routeCriteria.criteriaTypes' with 'criteriaTypes'