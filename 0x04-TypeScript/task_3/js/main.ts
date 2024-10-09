// task_3/js/main.ts

/// <reference path="./crud.d.ts" />

// Import RowID and RowElement from interface.ts
import { RowID, RowElement } from './interface';

// Import everything from crud.js as CRUD
import * as CRUD from './crud';

// Create an object called row with the type RowElement
const row: RowElement = {
    firstName: 'Guillaume',
    lastName: 'Salva',
};

// Create a const variable named newRowID with the type RowID
const newRowID: RowID = CRUD.insertRow(row);

// Create a const variable named updatedRow with the type RowElement and update row with an age field
const updatedRow: RowElement = {
    firstName: 'Guillaume',
    lastName: 'Salva',
    age: 23,
};

// Call the updateRow and deleteRow commands
CRUD.updateRow(newRowID, updatedRow);
CRUD.deleteRow(newRowID);

