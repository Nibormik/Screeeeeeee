let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');



let roleWorker = {

    /** @param {Creep} creep **/
    run: function(creep) {

        for(let name in Game.creeps) {
            let creep = Game.creeps[name];
            if(creep.memory.job == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.job == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.job == 'builder') {
                roleBuilder.run(creep);
            }
        }
	    if(!creep.memory.working) {
            let gatherTarget = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_TOWER ||
                        structure.structureType == STRUCTURE_EXTENSION || 
                        structure.structureType == STRUCTURE_CONTAINER || 
                        structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            })
            let constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (gatherTarget.length > 0) {
                creep.memory.job = 'harvester';
            }
            else if (constructionSites.length > 0) {
                creep.memory.job = 'builder';
            }
            else {
                creep.memory.job = 'upgrader';
            }
	    }
	}
};
module.exports = roleWorker;