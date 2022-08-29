let finder = {

    Pickup: function(creep,structures,type) {

        for (let i in structures) {
            
            const target = Game.getObjectById(creep.memory.target);

            if (!structures[i] == FIND_SOURCES) {

                
                if (!target) {  
                    const targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structures[i]) && structure.store(type) > 0;}});
                    creep.memory.target = targets[Math.floor(Math.random()*(targets.length))].id;
                }
                        
                if (target) {
                    if (creep.withdraw(target, type) == ERR_NOT_IN_RANGE) {
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

    deposit: function(creep,structures,type) {

        for (let i in structures){

            const target = game.getObjectById(creep.memory.target)

            if (!target) {
                const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structures[i]) && structure.store.getFreeCapacity(type) > 0 ;}});
                creep.memory.target = targets[Math.floor(Math.random()*(targets.length))].id;       
            }

            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffff00'}});
                    return
                }
            }
            
        }
    }
}
module.exports = finder;
