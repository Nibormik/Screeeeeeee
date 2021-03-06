let resourceFinder = require('resource.finder');
let workManager = require('work.manager')
let finder = require('finder');

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
	        creep.say('🚧 build');
	    }
        
        if(!creep.memory.task) {
            finder.pickup(creep,[FIND_SOURCES])
        }
        else {
            let work = resourceFinder.deposit(creep,'spawn');
            if (work == false && creep.memory.role == 'harvester') {
                workManager.run(creep)
            }
        }


	}
};

module.exports = roleHarvester;