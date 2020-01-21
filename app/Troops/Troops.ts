import { Player } from "./Players/Player";

export const Troops = new class TroopsSingleton {

   private players: Player[] = [];

   public getState() {
      // Преобразует данные
      // На клиент будут отправлены только те данные, которые были описаны ниже
      // Чтобы отправить на клиент какое-то новое свойство необходимо внести его в объект ниже
      // TODO refactoring
      return {
         troops: {
            players: this.players.map((player) => {
               return {
                  id: player.id,
                  team: player.team,
                  divisions: player.divisions.map((division) => {
                     return {
                        solders: division.solders.map((solder) => {
                           return [solder.x, solder.y];
                        })
                     };
                  })
               };
            })
         }
      };
   }

   public nextState() {
      this.players.forEach((player) => {
         player.nextState();
      });
   }

   public addPlayerById(playerId: string) {
      // tslint:disable-next-line: max-line-length
      this.players.push(new Player(playerId, "red"));

      // Заглушка
      for (let x = 200; x < 400; x += 11) {
         for (let y = 30; y < 300; y += 11) {
            this.players[this.players.length - 1].addSolder(x, y);
         }
      }
   }

   public removePlayerById(playerId: string) {
      const playerIndex = this.players.findIndex((player) => {
         return player.id === playerId;
      });

      this.players.splice(playerIndex, 1);
   }

   public getPlayerById(playerId: string) {
      return this.players.find((player) => {
         return player.id === playerId;
      });
   }

   public setMoveToForPlayerDivision() {

   }

}();
