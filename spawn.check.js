let spawnCheck = {

    /** @param {Creep} creep **/
    run: function(harvesters,builders,upgraders) {

        let builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        let upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        let harvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

        
        if(upgrader.length < upgraders) {
            let newName = 'Upgrader' + Game.time;
            console.log('Spawning new Upgrader: ' + newName);
            Game.spawns['Spawn_main'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'upgrader'}});
        }
        if(builder.length < builders) {
            let newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn_main'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'builder'}});
        }
        if(harvester.length < harvesters) {
            let newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn_main'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'harvester'}});
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