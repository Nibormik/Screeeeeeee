let resourceFinder = require('resource.finder');
let workManager = require('work.manager')
let find = require('find');

let roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.task && creep.store[RESOURCE_ENERGY] == 0) {
            delete creep.memory.target
            creep.memory.task = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.task && creep.store.getFreeCapacity() == 0) {
            delete creep.memory.target
            creep.memory.task = true;
	        creep.say('🚧 Refuel');
	    }
        
        if(!creep.memory.task) {
            find.Pickup(creep,[FIND_SOURCES],[RESOURCE_ENERGY])
        }
        else {
            if (find.Count(creep,[STRUCTURE_SPAWN,STRUCTURE_EXTENSION],[RESOURCE_ENERGY]) == 0 && creep.memory.role == "H") {
                workManager.run(creep)
            } else {
                find.Deposit(creep,[STRUCTURE_SPAWN,STRUCTURE_EXTENSION,STRUCTURE_TOWER],[RESOURCE_ENERGY]);
            }
        }


	}
};

module.exports = roleHarvester;