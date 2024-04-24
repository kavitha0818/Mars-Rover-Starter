const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  test("constructor sets position and default values for mode and generatorWatts", function() {
    const rover = new Rover(98382);
    expect(rover.position).toBe(98382);
    expect(rover.mode).toBe('NORMAL');
    expect(rover.generatorWatts).toBe(110);    
});

test("response returned by receiveMessage contains the name of the message", function() {
  const message = new Message('boom',[]);
  const rover = new Rover();
  const response = rover.receiveMessage(message)
  expect(rover.receiveMessage(message).message).toBe('boom');

});

test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
  const commands = [new Command('MOVE',100), new Command('MOVE',200)];
  const message = new Message('Calling Rover',commands);
  const rover = new Rover(98382);
  expect(rover.receiveMessage(message).results).toHaveLength(2);
});

test("responds correctly to the status check command", function() {
  const commands = [new Command('STATUS_CHECK')];
  const message = new Message('Calling Rover',commands);
  const rover = new Rover(98382);
  const response = rover.receiveMessage(message);
  expect(rover.receiveMessage(message).results[0]).toHaveProperty('roverStatus');

});

test("responds correctly to the mode change command", function() {
  const commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
  const message = new Message('message', commands);
  const rover = new Rover(98382);
  const response = rover.receiveMessage(message);
  expect(response.results[0].completed).toEqual(true);
});

test("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 1000)];
    const message = new Message('Test message', commands);
    const rover = new Rover(100);
    const response = rover.receiveMessage(message);
    expect(response.results[1].completed).toEqual(false);
    expect(rover.position).toEqual(100); 
  })
test("responds with the position for the move command", function() {
 const commands = [new Command('MOVE', 100)];
  const message = new Message('Test message', commands);
  const rover = new Rover(100);
  const response = rover.receiveMessage(message);
  expect(response.results[0].completed).toEqual(true);
  expect(rover.position).toEqual(100);

});
});
