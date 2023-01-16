let spawnCheck = {

    /** @param {Creep} creep **/
    run: function(creepnum) {
        
        const nrwantedcreeps = creepnum.reduce((x, y) => x + y, 0);

        if ((_.filter(Game.creeps)).length < nrwantedcreeps) {

            const jobs = ["B","U","H"]
            const Bspec = [WORK,WORK,CARRY,CARRY,MOVE,MOVE]
            const Hspec = [WORK,WORK,WORK,CARRY,MOVE,MOVE]
            const Uspec = [WORK,CARRY,MOVE]
            const Tspec = [WORK,CARRY,CARRY,MOVE,MOVE]
            const Specs = [Bspec,Uspec,Hspec]
            const num = Memory.Num
            var energysum = 0;
            var energyAvailable = 0;
            
            for(let i in Specs) {
                const WantedSpecs = Specs[i]
                const currentnum = _.filter(Game.creeps, (creep) => creep.memory.role == jobs[i]);
                if (currentnum.length < creepnum[i]) {
                    const newName = jobs[i] + num;
                    Memory.Num = num + 1;

                    for (let x in WantedSpecs)
                        energysum += BODYPART_COST[WantedSpecs[x]];
                    
                    energyAvailable += Game.spawns.Spawn_main.energy;
                    _.filter(Game.structures, function(structure){
                        if (structure.structureType == STRUCTURE_EXTENSION){
                            energyAvailable += structure.energy;
                        }
                    });
                    
                    if (energysum < energyAvailable){
                        console.log('Spawning new '+jobs[i]+':' + newName)
                        Game.spawns['Spawn_main'].spawnCreep(Specs[i], newName, {memory: {role: jobs[i] }});
                    } else {
                        console.log('Spawning new '+jobs[i]+':' + newName)
                        Game.spawns['Spawn_main'].spawnCreep(Uspec, newName, {memory: {role: jobs[i] }});
                    }
                }
            }
        }
    }
}
module.exports = spawnCheck;