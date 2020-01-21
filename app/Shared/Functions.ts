export const Functions = new class FunctionsSingleton {

   public rand(min: number, max: number): number {
      return Math.floor(min + Math.random() * (max + 1 - min));
   }

   /** @param a Angle in degrees */
   public toRad(a: number): number {
      return a * Math.PI / 180;
   }

   /** @param a Angle in radians */
   public toDegrees(a: number): number {
      return a * 180 / Math.PI;
   }

}();
