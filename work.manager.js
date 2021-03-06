let workManager = {

    /** @param {Creep} creep **/
    run: function(creep) {

        let gatherTarget = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {return (
                structure.structureType == STRUCTURE_TOWER ||
                structure.structureType == STRUCTURE_EXTENSION || 
                structure.structureType == STRUCTURE_CONTAINER || 
                structure.structureType == STRUCTURE_SPAWN) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
        let constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);

        if ((gatherTarget.length > 0) && (creep.memory.role == 'builder')) {
            let roleHarvester = require('role.harvester');
            roleHarvester.run(creep)
        }
        else if ((constructionSites.length > 0) && (creep.memory.role == 'harvester')) {
            let roleBuilder = require('role.builder');
            roleBuilder.run(creep);
        }
        else {
            let roleUpgrader = require('role.upgrader');
            roleUpgrader.run(creep);
        }
	}
};
module.exports = workManager;