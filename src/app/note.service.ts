import { Injectable } from '@angular/core';
import { Note } from './note';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private fs: Firestore) { }

  //Add new Note code here
  addNote(note: Note) {
    note.id = doc(collection(this.fs, 'id')).id
    return addDoc(collection(this.fs, 'Notes'), note)
  }

  // get all notes from Database
  getNotes(): Observable<Note[]> {
    let notesRef = collection(this.fs, 'Notes')
    return collectionData(notesRef, { idField: 'id' }) as Observable<Note[]>
  }

  //Delete notes from Database
  deleteNote(note: Note) {
    let docRef = doc(this.fs, `Notes/${note.id}`);

    return deleteDoc(docRef)
  }

  //Update Notes from database 
  updateNote(Note: Note, notes: any) {
    let docRef = doc(this.fs, `Notes/$(note.id)`);
    return updateDoc(docRef, notes)
  }
}
