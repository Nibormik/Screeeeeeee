let spawnCheck = {

    /** @param {Creep} creep **/
    run: function(workers) {

        let worker = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
        let upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

        
        if(upgrader.length < 2) {
            let newName = 'Upgrader' + Game.time;
            console.log('Spawning new Upgrader: ' + newName);
            Game.spawns['Spawn_main'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'upgrader'}});
        }
        if(worker.length < workers) {
            let newName = 'W' + Game.time;
            console.log('Spawning new Worker: ' + newName);
            Game.spawns['Spawn_main'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'worker'}});
        }
        
        if(Game.spawns['Spawn_main'].spawning) { 
            let spawningCreep = Game.creeps[Game.spawns['Spawn_main'].spawning.name];
            Game.spawns['Spawn_main'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn_main'].pos.x + 1, 
                Game.spawns['Spawn_main'].pos.y, 
                {align: 'left', opacity: 0.8});
        }
    }
}
module.exports = spawnCheck;