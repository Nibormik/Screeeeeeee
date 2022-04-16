let resourceFinder = require('resource.finder');

let roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            resourceFinder.pickup(creep,true)
        }
        else {
            resourceFinder.deposit(creep,'spawn')
        }
	}
};

module.exports = roleHarvester;