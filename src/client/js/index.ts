import Playing from './playing';
import global from './global/global';

window.onload = function() {
    global.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'app', null, false, false);
    global.game.state.add('playing', new Playing(), true);
};

window.addEventListener('resize', function() {
    if (global.game.state.states[global.game.state.current].resize) {
        global.game.state.states[global.game.state.current].resize();
    }
}.bind(this));