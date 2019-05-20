
/**
 * First level must type="PAGE".
 * Page must have a name (can be "", empty string).
 *
 * Page has data as a key, contains an array of objects
 * Second level can be type="SECTION" or type="FIELD"
 *
 * Page can contain sections or fields in any order
 * Sections can contain fields
 *
 * Sections must have labels
 *
 * Fields may have an empty string for label (it isn't a required configuration, but it must still be present as empty string)
 * Options for mandatory & readonly:
 *    true, false, undefined (inherit from field)
 * Options for description & placeholder:
 *    A string (e.g. "example@email.com"), an empty string "", or null (inherit from field)
 **/

// Example outputs for the form builder:
export let basic_form = [
  {
    "type": "PAGE",
    "name": "Label of page",
    "data": [{
      "type": "FIELD",
      "label": "Field with label",
      "fieldId": "301",
      "recordId": "130",
      "options": {
        "mandatory": true,
        "readonly": false,
        "description": "Put description here. Set as empty string to show no description. Set as null to inherit description from the field.",
        "placeholder": "Put placeholder here. Set as empty string to show no placeholder. Set as null to inherit placeholder from the field."
      }
    }, {
      "type": "SECTION",
      "name": "Label of section",
      "data": [
      ]
    }]
  }
];

export let form_with_sections = [
  {
    "type": "PAGE",
    "name": "Label of page",
    "data": [{
      "type": "FIELD",
      "label": "",
      "fieldId": "301",
      "recordId": "130",
      "options": {
        "mandatory": true,
        "readonly": false,
        "description": "Put description here. Set as empty string to show no description. Set as null to inherit description from the field.",
        "placeholder": "Put placeholder here. Set as empty string to show no placeholder. Set as null to inherit placeholder from the field."
      }
    }, {
      "type": "SECTION",
      "name": "Label of section",
      "data": [{
        "type": "FIELD",
        "label": "",
        "fieldId": "402",
        "recordId": "130",
        "options": {
          "mandatory": true,
          "readonly": false,
          "description": "Put description here. Set as empty string to show no description. Set as null to inherit description from the field.",
          "placeholder": "Put placeholder here. Set as empty string to show no placeholder. Set as null to inherit placeholder from the field."
        }
      }, {
        "type": "FIELD",
        "label": "",
        "fieldId": "403",
        "recordId": "130",
        "options": {
          "mandatory": true,
          "readonly": false,
          "description": "Put description here. Set as empty string to show no description. Set as null to inherit description from the field.",
          "placeholder": "Put placeholder here. Set as empty string to show no placeholder. Set as null to inherit placeholder from the field."
        }
      },
      ]
    }]
  }
];

export let form_with_multiple_pages = [
  {
    "type": "PAGE",
    "name": "Page 1",
    "data": [
      {
        "id": "1",
        "type": "FIELD",
        "label": "Email Field",
        "fieldId": "402",
        "recordId": "130",
        "options": {
          "mandatory": true,
          "readonly": false,
          "description": "Test description.",
          "placeholder": "john@smith.com"
        }
      }
    ]
  },
  {
    "type": "PAGE",
    "name": "Page 2",
    "data": [
      {
        "id": "1",
        "type": "FIELD",
        "label": "Label",
        "fieldId": "301",
        "recordId": "130",
        "options": {
          "description": "",
          "placeholder": ""
        }
      }
    ]
  },
  {
    "type": "PAGE",
    "name": "Page 3",
    "data": [
      {
        "id": 311,
        "type": "FIELD",
        "recordId": 130,
        "name": "Name",
        "settings": {
          "mandatory": true,
          "displayField": true
        },
        "fieldType": "text",
        "formId": "c8ec14bd-a22f-4853-b04e-e81bcbcb0132"
      },
      {
        "id": 131,
        "recordId": 130,
        "type": "FIELD",
        "name": "Industry",
        "settings": {
          "options": {
            "field": 1299,
            "record": 3890
          },
          "mandatory": false,
          "displayField": true,
          "displayOnParent": true
        },
        "fieldType": "select",
        "formId": "c8ec14bd-a22f-4853-b04e-e81bcbcb0132"
      },
      {
        "id": 309,
        "recordId": 130,
        "type": "FIELD",
        "name": "Phone Number",
        "settings": {
          "mandatory": false,
          "customOwners": "",
          "displayField": true
        },
        "fieldType": "phone",
        "formId": "c8ec14bd-a22f-4853-b04e-e81bcbcb0132"
      },
      {
        "id": 40,
        "recordId": 130,
        "type": "FIELD",
        "name": "Email",
        "settings": {
          "mandatory": false,
          "customOwners": "",
          "displayField": true
        },
        "fieldType": "email",
        "formId": "c8ec14bd-a22f-4853-b04e-e81bcbcb0132"
      },
      {
        "id": 40,
        "recordId": 130,
        "type": "FIELD",
        "name": "Billing Address",
        "settings": {
          "mandatory": false,
          "customOwners": "",
          "displayField": true,
          "displayOnParent": false
        },
        "fieldType": "address",
        "formId": "c8ec14bd-a22f-4853-b04e-e81bcbcb0132"
      },
    ]
  },
];

// Fields that can be used for testing.
// Remember that a form can include one or more fields, it doesn't have to use all of them.
// The user decides by dragging them into the "form preview" panel that we discussed!

// You will need to display all of these as a list that the user can choose to drag into the "form preview".
export const fields = [
  {
    "id": 301,
    "recordId": 130,
    "label": "Name",
    "settings": {
      "mandatory": true,
      "displayField": true
    },
    "fieldType": "text",
    "formId": "c8ec14bd-a22f-4853-b04e-e81bcbcb0132"
  },
  {
    "id": 1302,
    "recordId": 130,
    "label": "Industry",
    "settings": {
      "options": {
        "field": 1299,
        "record": 3890
      },
      "mandatory": false,
      "displayField": true,
      "displayOnParent": true
    },
    "fieldType": "select",
    "formId": "c8ec14bd-a22f-4853-b04e-e81bcbcb0132"
  },
  {
    "id": 358,
    "recordId": 130,
    "label": "Phone Number",
    "settings": {
      "mandatory": false,
      "customOwners": "",
      "displayField": true
    },
    "fieldType": "phone",
    "formId": "c8ec14bd-a22f-4853-b04e-e81bcbcb0132"
  },
  {
    "id": 402,
    "recordId": 130,
    "label": "Email",
    "settings": {
      "mandatory": false,
      "customOwners": "",
      "displayField": true
    },
    "fieldType": "email",
    "formId": "c8ec14bd-a22f-4853-b04e-e81bcbcb0132"
  },
  {
    "id": 403,
    "recordId": 130,
    "label": "Billing Address",
    "settings": {
      "mandatory": false,
      "customOwners": "",
      "displayField": true,
      "displayOnParent": false
    },
    "fieldType": "address",
    "formId": "c8ec14bd-a22f-4853-b04e-e81bcbcb0132"
  },
  {
    "id": 640,
    "recordId": 130,
    "label": "Mobile",
    "settings": {
      "mandatory": false,
      "customOwners": "",
      "readonly": true,
      "displayField": false
    },
    "fieldType": "phone",
    "formId": "c8ec14bd-a22f-4853-b04e-e81bcbcb0132"
  }
];
