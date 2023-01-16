let workManager = {

    /** @param {Creep} creep **/
    run: function(creep) {

        let gatherTarget = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {return (
                structure.structureType == STRUCTURE_EXTENSION || 
                structure.structureType == STRUCTURE_CONTAINER || 
                structure.structureType == STRUCTURE_SPAWN) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
        let constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
        let storage = let = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {return (
                structure.structureType == STRUCTURE_STORAGE || 
                structure.structureType == STRUCTURE_CONTAINER) &&
                structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;}});

        if ((gatherTarget.length > 0) && !(creep.memory.role == 'H')) {
            let roleHarvester = require('role.harvester');
            roleHarvester.run(creep)
        }
        else if ((constructionSites.length > 0) && !(creep.memory.role == 'B')) {
            let roleBuilder = require('role.builder');
            roleBuilder.run(creep);
        }
        else if ((storage.length > 0) && !(creep.memory.role == 'T')){
            let roleTransporter = require('role.transporter')
            roleTransporter.run(creep);
        }
        else {
            let roleUpgrader = require('role.upgrader');
            roleUpgrader.run(creep);
        }
	}
};
module.exports = workManager;