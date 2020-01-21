import { Functions } from "./../../../../Shared/Functions";
export class Solder {

   public x: number;
   public y: number;
   public moveTo: {
      x: number,
      y: number
   };
   private rotate: number;

   constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
   }

   public nextState() {
      this.move();
   }

   public setMoveTo(x: number, y: number) {
      this.moveTo = { x, y };
      this.rotate = Functions.toDegrees(Math.atan2(y - this.y, x - this.x));
   }

   private move() {
      if (!this.moveTo) { return; }

      this.x += Math.cos(Functions.toRad(this.rotate)) * 3;
      this.y += Math.sin(Functions.toRad(this.rotate)) * 3;

      // If solder is in necessary point - stop it
      if (Math.abs(this.x - this.moveTo.x) < 3 && Math.abs(this.y - this.moveTo.y) < 3) {
         this.x = this.moveTo.x;
         this.y = this.moveTo.y;
      }
   }

}
