const Dockerode = require('dockerode');
const bluebird = require('bluebird');

class Docker {
    constructor() {
        this.docker =  bluebird.promisifyAll(new Dockerode({ socketPath: '/var/run/docker.sock' }));
    };

    listContainers(all, cb) {
        this.docker.listContainers({all: all}, cb);
    };

    stopAllContainers() {
        var base = this;
        this.docker.listContainersAsync()
            .then(containers => {
                containers.map(container => base.docker.getContainer(container.Id).stop(() => {}));
            });
    };
}

module.exports = new Docker();