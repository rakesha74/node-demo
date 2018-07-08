var fs = require('fs');

var fetchNotes =()=> {
    try{
        var notesString = fs.readFileSync("./playground/notes.json").toString();
        return JSON.parse(notesString);
    }catch(e)
    {
        return [];
    }
}

var saveNotes = (notes) => {
    fs.writeFileSync("./playground/notes.json",JSON.stringify(notes));
}

var addNote = (title,body)=>{
    var notes = fetchNotes();
    var note = {
        "title":title,
        "body":body
    };



    function checkTitle(note)
    {
        return note.title === title
    }

    var duplicateNotes = notes.filter(checkTitle);

    if(duplicateNotes.length ===0)
    {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
  console.log("Adding note::"+title+"::"+body);
};

var removeNote = (title) =>
{
    var notes = fetchNotes();

    function filter_note(note)
    {
        return note.title !==title;
    }
    var filtered_notes = notes.filter(filter_note);
    saveNotes(filtered_notes);
    return notes.length !== filtered_notes.length;
}
module.exports={
    addNote:addNote,
    removeNote : removeNote
}