import { Injectable } from "@nestjs/common";
import { Note, Stats } from "../helpers/note.interface";
import { getAllNotesDB } from '../helpers/notesDatabase';

@Injectable()
export class StatsService {
  getStats(): Array<Stats> {
    
    const stats = getAllNotesDB().reduce((prev: Array<Stats>, current: Note) => {
      const idStatsArr = prev.findIndex(item => item.category === current.category);
      
      if(idStatsArr !== -1) {
        prev[idStatsArr].active += +!current.archived;
        prev[idStatsArr].archived += +current.archived;
      }else {
        prev.push({
          category: current.category,
          active: +!current.archived,
          archived: +current.archived,
        });
      }
      
      return prev;
    }, []);

    return stats;
  }
}