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
  
      for (let i = 0; i < message.commands.length ; i++) {
         const command = message.commands[i];
         const commandType = command.commandType;
         const commandValue = command.value;
         if (['MOVE', 'MODE_CHANGE'].includes(commandType)) {
            if('MODE_CHANGE' === commandType && commandValue === 'LOW_POWER') {
               results.push({ completed: false });
            }
            else {
            results.push({ completed: true });
            }
         } else if (commandType === 'STATUS_CHECK') {
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