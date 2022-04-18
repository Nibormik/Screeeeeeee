let spawnCheck = {

    /** @param {Creep} creep **/
    run: function(creepnum) {
        
        const nrwantedcreeps = creepnum.reduce((x, y) => x + y, 0);

        if ((_.filter(Game.creeps)).length < nrwantedcreeps) {

            const jobs = ["builder","harvester","upgrader"]
            const Bspec = [WORK,WORK,CARRY,CARRY,MOVE,MOVE]
            const Hspec = [WORK,WORK,WORK,CARRY,MOVE,MOVE]
            const Uspec = [WORK,CARRY,MOVE]
            const Specs = [Bspec,Hspec,Uspec]

            for(let i in Specs) {
                const currentnum = _.filter(Game.creeps, (creep) => creep.memory.role == jobs[i]);
                if (currentnum.length < creepnum[i]) {
                    const newName = jobs[i] + Game.time ; 
                    console.log('Spawning new '+jobs[i]+':' + newName)
                    Game.spawns['Spawn_main'].spawnCreep(Specs[i], newName, {memory: {role: jobs[i] }});
                }
            }
        }
    }
}
module.exports = spawnCheck;