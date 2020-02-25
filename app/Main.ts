import { Network } from "./Network";
import { io } from "./Shared/io";
import { Troops } from "./Troops/Troops";

// Работа над внедрением онлайна только началась. По всему проекту встречаются места, где необходима доработка и
// рефакторинг
// Качество кода на текущем этапе рассматривать не стоит
const Main = new class MainSingleton {

   constructor() {
      Network.init();

      setInterval(() => {
         Troops.nextState();
      }, 1000 / 60);

      setInterval(() => {
         io.emit("updateState", Troops.getState());
      }, 1000 / 20);
   }

}();
