class Message {
   constructor(name, commands){
      this.name = name;
      if (!name) {
         throw Error("Name is required.");
       }
       this.commands = commands || [];
     }        // Write code here!
}

module.exports = Message;