class Note {
    constructor(id, name, important = false){
        this.id = id;
        this.name = name;
        this.important = important;
    }

    toggleImportant(){
        this.important = !this.important;
    }
}

class NotesManager{
    constructor(){
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.renderPage();

    }

    toggleNoteImportance(id){
        const note = this.notes.find(note => note.id === id);
        if(note){
            const noteInstance = new Note(note.id, note.name, note.important);
            noteInstance.toggleImportant();
            this.notes = this.notes.map(note => {
                return note.id === id ? noteInstance : note 
            });
            this.saveNotes();
            this.renderPage();
        } 
    };

    addNotes(nameNote){
        const id = this.notes.length ? this.notes[this.notes.length - 1].id + 1 : 1;
        const note = new Note(id, nameNote);
        this.notes.push(note);
        this.saveNotes();   
        this.renderPage();
    };

    deleteNote(id){
        this.notes = this.notes.filter(note => note.id !== id);
        this.saveNotes();
        this.renderPage();
    }

    updateNote(id, newName){
        const noteToUptdate = this.notes.find(note => 
            note.id === id
        );
        noteToUptdate.name = newName;
        this.saveNotes();
        this.renderPage();
    }

    saveNotes(){
        localStorage.setItem('notes', JSON.stringify(this.notes))
    }

    renderPage(){
        const $ulNotes = document.getElementById('ul-notes');
        $ulNotes.innerHTML = "";
        this.notes.sort((a, b) => (a.important && !b.important) ? -1 : (b.important && !a.important) ? 1 : 0);

        this.notes.forEach(note => {
            const $liNote = document.createElement('LI');
            $liNote.classList.add('li-styles')
            $liNote.innerHTML = note.name;

            const $buttonDelete = document.createElement('BUTTON');
            $buttonDelete.textContent = "Delete";
            $buttonDelete.addEventListener('click', e => {
                e.stopPropagation();
                this.deleteNote(note.id);
            });

            const $buttonUpdate = document.createElement('BUTTON');
            $buttonUpdate.textContent = "Update";
            $buttonUpdate.addEventListener('click', e => {
                e.stopPropagation();
                const newName = prompt("Enter the new name")
                while(!newName){
                    alert("Enter a valid name")
                }
                this.updateNote(note.id, newName)

            });

            const $buttonImportant = document.createElement('BUTTON'); 
            $buttonImportant.addEventListener('click', e => {
                e.stopPropagation();
                this.toggleNoteImportance(note.id);
                
            }); 

            const $important = document.createElement('P');
            const resultado = note.important ? () => {
                console.log("Caso verdadero");
                $important.innerHTML = "Important task";
                $important.classList.add('important-note');
                $buttonImportant.textContent = "downplay"
            } : () => {
                console.log("Caso falso");
                $important.innerHTML = "";
                $buttonImportant.textContent = "put importance"
            };
            resultado();
            

            $liNote.append( $buttonUpdate, $buttonDelete, $buttonImportant, $important)
            $ulNotes.appendChild($liNote);
        });//ForEach close
    

    }};

document.addEventListener('DOMContentLoaded', () => {
    const notesManager = new NotesManager();
    
    const $addButton = document.getElementById('add-button')

    
    
    $addButton.addEventListener('click', () => {
        const newNote = document.getElementById('input-note').value;
        if(newNote){
            notesManager.addNotes(newNote);
            document.getElementById('input-note').value = '';

        }
    })


});