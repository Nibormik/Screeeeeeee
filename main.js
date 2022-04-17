const roleUpgrader = require('role.upgrader');
const spawnCheck = require('spawn.check');
const roleBuilder = require('role.builder');
const roleHarvester = require('role.harvester');
const structureTower = require('structure.tower');

const harvesters = 4;
const builders = 2;
const upgraders = 2;

module.exports.loop = function () {
    spawnCheck.run(harvesters,builders,upgraders);
    structureTower.run();

    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        console.log(creep)
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
    let memthing = Object.keys(Memory.creeps);
    console.log(memthing)



}