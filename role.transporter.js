let workManager = require('work.manager')
let find = require('find');

let roleTransporter = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.task && creep.store.getUsedCapacity() == 0) {
            delete creep.memory.target
            creep.memory.task = false;
            creep.say('🔄 pickup');
	    }
	    if(!creep.memory.task && creep.store.getFreeCapacity() == 0) {
            delete creep.memory.target
            creep.memory.task = true;
	        creep.say('🚧 Deposit');
	    }
        
        if(!creep.memory.task) {
            find.Pickup(creep,[STRUCTURE_STORAGE,STRUCTURE_CONTAINER],RESOURCE_ENERGY)
        }
        else {
            find.Deposit(creep,[STRUCTURE_TOWER],[RESOURCE_ENERGY]);
            if (!creep.memory.target) {
                workManager.run(creep)
            }
        }


	}
};

module.exports = roleHarvester;