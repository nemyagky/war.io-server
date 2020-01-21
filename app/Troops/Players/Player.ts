import { Division } from "./Division/Division";

export class Player {

   public divisions: Division[] = [];
   public id: string;
   public team: string;

   constructor(id: string, team: string) {
      this.id = id;
      this.team = team;

      // TODO delete this
      this.divisions.push(new Division());
   }

   public nextState() {
      this.divisions.forEach((division) => {
         division.nextState();
      });
   }

   public addSolder(x: number, y: number, divisionIndex?: number) {
      this.divisions[divisionIndex || this.divisions.length - 1].addSolder(x, y);
   }

}
