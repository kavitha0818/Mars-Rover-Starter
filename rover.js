class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   
   receiveMessage(message) {
      if (!(message)) {
          throw new Error("Invalid message format. Expected Message object.");
      }
  
      const results = [];
      let isLowPower = false;
      for (let i = 0; i < message.commands.length; i++) {
         const command = message.commands[i];
         const commandType = command.commandType;
         const commandValue = command.value;
         if ('MODE_CHANGE' === commandType && commandValue === 'LOW_POWER') {
            this.mode = 'LOW_POWER';
            isLowPower = true;
            results.push({ completed: true });
         }
         if ('MOVE' === commandType) {
            if (!isLowPower) {
               this.position = commandValue;
               results.push({ completed: true });
            } else {
               results.push({ completed: false });
            }
         }
         if (commandType === 'STATUS_CHECK') {
            results.push({
               completed: true,
               roverStatus: { mode: this.mode, generatorWatts: this.generatorWatts, position: this.position }
            });
         }
      }
  
      // Return an object containing the original message name and the results
      return {
          message: message.name,
          results: results
      };
  }
}

module.exports = Rover;