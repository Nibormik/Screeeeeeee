const roleUpgrader = require('role.upgrader');
const spawnCheck = require('spawn.check');
const roleBuilder = require('role.builder');
const roleHarvester = require('role.harvester');
const structureTower = require('structure.tower');

const harvesters = 4;
const builders = 2;
const upgraders = 1;
const transporter = 1;

module.exports.loop = function () {
    spawnCheck.run([builders,upgraders,harvesters]);
    structureTower.run();

    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if(creep.memory.role == 'U') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'B') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'H') {
            roleHarvester.run(creep);
        }
    }
}