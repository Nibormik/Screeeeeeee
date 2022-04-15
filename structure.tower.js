let structureTower = {

    run: function() {

        let Towers = Game.rooms['W1N7'].find(FIND_MY_STRUCTURES, {filter: (structure) => { return (structure.structureType == STRUCTURE_TOWER)}});

        for(let id in Towers) {
            let Tower = Towers[id]
            let mincap = Tower.store.getCapacity(RESOURCE_ENERGY)/4;
            let capacity = Tower.store.getCapacity(RESOURCE_ENERGY)-Tower.store.getFreeCapacity(RESOURCE_ENERGY)
            let closestHostile = Tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                Tower.attack(closestHostile);
            }
            else if (capacity>mincap){
                let closestRepair = Tower.pos.findClosestByRange(FIND_STRUCTURES , {filter: (structure) => structure.hits < structure.hitsMax});
                if(closestRepair) {
                    Tower.repair(closestRepair);
                }
            }
        }
	}
};

module.exports = structureTower;