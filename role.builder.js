let resourceFinder = require('resource.finder');
let workManager = require('work.manager')

let roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

		let targets = creep.room.find(FIND_CONSTRUCTION_SITES);

		if (targets.length > 0) {
			if(creep.memory.task && creep.store[RESOURCE_ENERGY] == 0) {
				creep.memory.task = false;
				creep.say('🔄 harvest');
			}
			if(!creep.memory.task && creep.store.getFreeCapacity() == 0) {
				creep.memory.task = true;
				creep.say('🚧 build');
			}

			if(creep.memory.task) {
				if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#22ff22'}});
				}
			}
			else {
				resourceFinder.pickup(creep,false)
			}
		}
		else {
			workManager.run(creep)
		}
	}
};

module.exports = roleBuilder;