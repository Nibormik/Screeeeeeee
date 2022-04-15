let roleWorker = require('role.worker');
let roleUpgrader = require('role.upgrader');
let spawnCheck = require('spawn.check');
let roleBuilder = require('role.builder');
let roleHarvester = require('role.harvester');
let structureTower = require('structure.tower');

let nrWorkers = 4;

module.exports.loop = function () {
    spawnCheck.run(nrWorkers);
    structureTower.run();

    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if(creep.memory.role == 'worker') {
            roleWorker.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
    }
}