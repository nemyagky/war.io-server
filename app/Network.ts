import { Socket } from "socket.io";
import { SoldersMoveToCordsArray } from "./Interfaces/client/soldersMoveToCords.interface";
import { io } from "./Shared/io";
import { Troops } from "./Troops/Troops";

// Обрабатывает все запросы, которые приходят от клиента
export const Network = new class NetworkSingleton {

   public init() {
      io.on("connection", (socket: Socket) => {

         // Отправляет на клиент список игроков, чтобы добавить их в массив players
         socket.emit("setInitialState", Troops.getInitialPlayers());

         this.createNewPlayer(socket);

         // socket.on("createNewDivision", (divisionId: string) => {
         //    Troops.getPlayerById(socket.id).createDivision(divisionId);
         // });

         // socket.on("updateDivisionMoveTo", (moveToCordsArray: SoldersMoveToCordsArray) => {
         //    Troops.updateMoveToForPlayerDivision(socket.id, moveToCordsArray);
         // });

         socket.on("disconnect", () => {
            // Уведомить всех игроков о дисконнекте
            socket.broadcast.emit("deletePlayer", { id: socket.id });
            Troops.removePlayerById(socket.id);
         });

      });
   }

   private createNewPlayer(socket: Socket) {
      // Создаем нового игрока. Отправляем createMainPlayer на текущий сокет и createPlayer на все остальные
      socket.emit("createMainPlayer", { id: socket.id, team: "blue" });
      socket.broadcast.emit("createPlayer", { id: socket.id, team: "red" });

      Troops.addPlayer(socket.id);
   }

}();
