import { Note } from "../models/note";
import { BaseService } from "./baseService";

export class NoteServiceSuco extends BaseService {
    getNotes() {
        return this.get("api/v1/notes/all");
    }
    createNote(note: Note) {
        return this.post("api/v1/notes/create", note);
    }
}

export const noteServiceSuco = new NoteServiceSuco();   