var fs = require('fs');

var obj = {
    name:'Rakesh'
}

var stringObj = JSON.stringify(obj);
console.log(stringObj);

var personString = '{"name":"Rakesh","age":25}';
var personObj = JSON.parse(personString);
console.log(personObj);

//Check on the doule colon...In Objects key doesn't have double colons
//In String key has double colon



var originalNote = {
    title:"Dan Brown",
    body:"Night And the Angles"
}

var originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json',originalNoteString);

var noteString = fs.readFileSync('notes.json');
var note = JSON.parse(noteString);

console.log("Title::"+note.title);


