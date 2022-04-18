let finder = {

    pickup: function(creep,types) {

        for (let i in types) {

            if (!types[i] == FIND_SOURCES) {

                const target = Game.getObjectById(creep.memory.source);

                if (!target) {
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

                if (!source) {
                    const targets = creep.room.find(FIND_SOURCES)
                    creep.memory.target = targets[Math.floor(Math.random()*(targets.length))].id;
                }
                
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffff00'}});
                    return
                }
            }
        }
    },

    deposit: function(creep,types) {
        
    }
}
module.exports = finder;