let roleBuilder = {

    /** Finds resources **/
    pickup: function(creep,harvest=false) {
        
        if (!harvest) {
            let containers = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && 
                    (structure.store.getCapacity(RESOURCE_ENERGY)-structure.store.getFreeCapacity(RESOURCE_ENERGY)) > 0;}});
            let targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_EXTENSION) &&
                            (structure.store.getCapacity(RESOURCE_ENERGY)-structure.store.getFreeCapacity(RESOURCE_ENERGY)) > 0;}});

            if (containers.length) {
                let storage = containers[Math.floor(Math.random()*(containers.length))];
                if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            }
            else if (targets.length) {
                let storage = targets[Math.floor(Math.random()*(targets.length))];
                if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            }
            else {
                let harvest = true;
            }

        }
        if (harvest) {
            let source = Game.getObjectById(creep.memory.source);
            if (!source) {
                let targets = creep.room.find(FIND_SOURCES)
                let sources = targets[Math.floor(Math.random()*(targets.length))];
                creep.memory.source = sources.id
            }
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }

        }
	},
    /** Finds Storage **/
    deposit: function(creep,mode='') {
        if (mode == 'spawn' || mode == '') {
	        let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_EXTENSION || 
                        structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    return
                }
            }
            else {
                creep.memory.working = false;
            }
        }
        if (mode == 'storage' || mode == '') {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_STORAGE || 
                        structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    return
                }
            }
            else {
                creep.memory.working = false;
            }
        }
        if (mode == 'tower' || mode == '') {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    return
                }
            }
            else {
                creep.memory.working = false;
            }
        }
        else {
            creep.memory.working = false;
        }

	}
};

module.exports = roleBuilder;