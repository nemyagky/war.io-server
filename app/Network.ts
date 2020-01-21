import { Socket } from "socket.io";
import { io } from "./Shared/io";
import { Troops } from "./Troops/Troops";

// Обрабатывает все запросы, которые приходят от клиента
export const Network = new class NetworkSingleton {

   public init() {
      io.on("connection", (socket: Socket) => {
         Troops.addPlayerById(socket.id);

         socket.emit("mainPlayerData", { id: socket.id, team: "blue" });

         socket.on("disconnect", () => {
            Troops.removePlayerById(socket.id);
         });

         // Клиент шлет массив moveTo. У каждого солдата есть id, благодаря которому ставится moveTo

         socket.on("divisionMove", (movingCordsArray) => {
            Troops.getPlayerById(socket.id).divisions.forEach((division) => {
               division.solders.forEach((solder, index) => {
                  solder.setMoveTo(movingCordsArray[index][0], movingCordsArray[index][1]);
               });
            });
         });
      });
   }
}();
