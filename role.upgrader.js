let resourceFinder = require('resource.finder');
let finder = require('finder');

let roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.task && creep.store[RESOURCE_ENERGY] == 0) {
            delete creep.memory.target
            creep.memory.task = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.task && creep.store.getFreeCapacity() == 0) {
	        creep.memory.task = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.task) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ff00ff'}});
            }
        }
        else {
            finder.pickup(creep,[FIND_SOURCES])
        }
	}
};

module.exports = roleUpgrader;