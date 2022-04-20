let finder = {

    pickup: function(creep,types) {

        for (let i in types) {
            
            const target = Game.getObjectById(creep.memory.target);

            if (!types[i] == FIND_SOURCES) {

                
                if (!target) {ource
                    creep.memory.source = targets[Math.floor(Math.random()*(targets.length))].id;
                    const targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (types[i]) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
                            creep.memory.target = targets[Math.floor(Math.random()*(targets.length))].id;
                        }
                        
                if (targets.length) {
                    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffff00'}});
                        return
                    }
                }
            }
            else {

                if (!target) {
                    const targets = creep.room.find(FIND_SOURCES)
                    creep.memory.target = targets[Math.floor(Math.random()*(targets.length))].id;
                }
                
                if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffff00'}});
                    return
                }
            }
        }
    },

    deposit: function(creep,types) {
        
    }
}
module.exports = finder;