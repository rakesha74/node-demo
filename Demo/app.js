const yargs = require('yargs');
const notes = require('./notes.js');

const argv = yargs
    .command("add","Add a new note",{
        title:{
            describe:"Title of a note",
            demand:true,
            alias:"t"
        }

    });

var command = process.argv;


console.log("Command::"+command+"::"+argv._[0]);
console.log("Yargs::"+JSON.stringify(argv));

if(command[2] === "add") {
    var note = notes.addNote(argv.title,argv.body);
    if(note)
    {
        console.log("Node created");
        console.log("---------");
        console.log("Title: "+note.title);
        console.log("Body: "+note.body);
    }else{
        console.log("Node already created");
    }
}
if(command[2] === "remove"){
 var noteRemoved = notes.removeNote(argv.title);
 var message = noteRemoved ? "Note is removed":"Note not found";
 console.log(message);
}

//User input is node app.js add --title="Rakesh" --body="My Name is Rakesh"
//Yargs can handle inputs more easily than process