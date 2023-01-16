let find = {

    Pickup: function(creep,structures,type) {

        for (let i in structures) {

            for (let o in type) {

                const target = Game.getObjectById(creep.memory.target);
    
                if (!structures[i] == FIND_SOURCES) {
    
                    
                    if (!target) {  
                        const targets = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structures[i]) && structure.store(type[o]) > 0;}});
                        creep.memory.target = targets[Math.floor(Math.random()*(targets.length))].id;
                    }
                            
                    if (target) {
                        if (creep.withdraw(target, type[o]) == ERR_NOT_IN_RANGE) {
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
        }
            
    },

    Deposit: function(creep,structures,type) {

        for (let i in structures){
            for (let o in type){

                const target = Game.getObjectById(creep.memory.target)

                if (!target) {
                    const targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == structures[i]) && structure.store.getFreeCapacity(type[o]) > 0;}});
                    if (targets.length > 0){
                        creep.memory.target = targets[Math.floor(Math.random()*(targets.length))].id;
                        return
                    } else {
                        continue
                    }

                }
    
                if (target) {
                    if (creep.transfer(target, type[o]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffff00'}});
                        return
                    }
                    if (target != "Source" && target.store.getFreeCapacity(type[o]) == 0){
                        delete creep.memory.target
                    }
                }
            }
        }
    },
    Count: function(creep,structures,type) {
        let num = 0
        for (let i in structures) {
            for (let o in type){
                const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == structures[i]) && structure.store.getFreeCapacity(type[o]) > 0;}});
                        num += targets.length
            }
        }
        return num
    }
}
module.exports = find;
