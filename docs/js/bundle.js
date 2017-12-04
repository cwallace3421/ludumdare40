(function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.d = function(exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                configurable: false,
                enumerable: true,
                get: getter
            });
        }
    };
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function getDefault() {
            return module["default"];
        } : function getModuleExports() {
            return module;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
    };
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = 2);
})([ function(module, exports, __webpack_require__) {
    (function(global) {
        var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports ], __WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var global = {
                game: null,
                sprGrp: null,
                uiGrp: null,
                decGrp: null,
                ui: null,
                countdownAmount: 3 * 60 + 1,
                scale: 2,
                roomW: 2e3,
                roomH: 2e3,
                wallH: 252,
                glasses: 0
            };
            exports.default = global;
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }).call(exports, __webpack_require__(6));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports, __webpack_require__(0) ], 
    __WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, global_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var Utils = function() {
            function Utils() {}
            Utils.randomIntFromInterval = function(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            };
            Utils.scale = function(value) {
                return value * global_1.default.scale;
            };
            return Utils;
        }();
        exports.default = Utils;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports, __webpack_require__(13), __webpack_require__(12), __webpack_require__(3), __webpack_require__(0) ], 
    __WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, end_1, enter_1, playing_1, global_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        window.onload = function() {
            global_1.default.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "app", null, false, false);
            global_1.default.game.state.add("enter", new enter_1.default(), true);
            global_1.default.game.state.add("playing", new playing_1.default());
            global_1.default.game.state.add("end", new end_1.default());
        };
        window.addEventListener("resize", function() {
            if (global_1.default.game.state.states[global_1.default.game.state.current].resize) {
                global_1.default.game.state.states[global_1.default.game.state.current].resize();
            }
        }.bind(this));
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports, __webpack_require__(4), __webpack_require__(7), __webpack_require__(8), __webpack_require__(10), __webpack_require__(0), __webpack_require__(11), __webpack_require__(1) ], 
    __WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, crate_1, pickup_1, player_1, ui_1, global_1, types_1, utils_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var Playing = function() {
            function Playing() {}
            Playing.prototype.init = function() {
                global_1.default.game.stage.disableVisibilityChange = true;
                global_1.default.game.renderer.clearBeforeRender = false;
                global_1.default.game.renderer.renderSession.roundPixels = true;
                global_1.default.game.stage.backgroundColor = "#9e9e9e";
                global_1.default.game.physics.startSystem(Phaser.Physics.ARCADE);
                global_1.default.game.world.setBounds(0, 0, utils_1.default.scale(global_1.default.roomW), utils_1.default.scale(global_1.default.roomH));
            };
            Playing.prototype.createBackground = function() {
                this.env = {};
                this.env.wall = global_1.default.game.add.sprite(0, 0, "wall", 0, global_1.default.sprGrp);
                this.env.wall.width = global_1.default.roomW;
                global_1.default.game.physics.arcade.enable(this.env.wall);
                this.env.wall.body.immovable = true;
                this.env.wall.body.setSize(utils_1.default.scale(this.env.wall.width), utils_1.default.scale(this.env.wall.height), 0, 0);
                this.env.wall.body.moves = false;
                this.env.door = global_1.default.game.add.sprite(500, global_1.default.wallH + 2, "exit_door", 0, global_1.default.sprGrp);
                this.env.door.anchor.setTo(.1, 1);
                global_1.default.game.physics.arcade.enable(this.env.door);
                this.env.door.body.setSize(utils_1.default.scale(this.env.door.width), utils_1.default.scale(this.env.door.width / 2), utils_1.default.scale(0) - this.env.door.anchor.x * this.env.door.width, utils_1.default.scale(this.env.door.height) - this.env.door.anchor.y * this.env.door.height - 20);
                this.env.door.body.immovable = true;
                this.env.door.body.moves = false;
            };
            Playing.prototype.create = function() {
                global_1.default.decGrp = global_1.default.game.add.group(undefined, "decor_group");
                global_1.default.decGrp.scale.setTo(global_1.default.scale);
                global_1.default.sprGrp = global_1.default.game.add.group(undefined, "sprite_group");
                global_1.default.sprGrp.scale.setTo(global_1.default.scale);
                global_1.default.uiGrp = global_1.default.game.add.group(undefined, "ui_group");
                global_1.default.uiGrp.fixedToCamera = true;
                this.tint = global_1.default.game.add.sprite(0, 0, "tint", 0, global_1.default.uiGrp);
                this.tint.width = global_1.default.game.camera.width;
                this.tint.height = global_1.default.game.camera.height;
                this.tint.tint = 0;
                this.tint.alpha = 0;
                this.gunner = global_1.default.game.add.sprite(0, 0, "tint", 0, global_1.default.uiGrp);
                this.gunner.width = global_1.default.game.camera.width;
                this.gunner.height = global_1.default.game.camera.height;
                this.gunner.tint = 15782964;
                this.gunner.alpha = 0;
                this.redblue = [];
                this.redblue.push(global_1.default.game.add.sprite(0, 0, "tint", 0, global_1.default.uiGrp));
                this.redblue[0].width = global_1.default.game.camera.width / 2;
                this.redblue[0].height = global_1.default.game.camera.height;
                this.redblue[0].tint = 13500416;
                this.redblue[0].alpha = 0;
                this.redblue.push(global_1.default.game.add.sprite(global_1.default.game.camera.width / 2, 0, "tint", 0, global_1.default.uiGrp));
                this.redblue[1].width = global_1.default.game.camera.width / 2;
                this.redblue[1].height = global_1.default.game.camera.height;
                this.redblue[1].tint = 10446;
                this.redblue[1].alpha = 0;
                global_1.default.ui = new ui_1.default();
                this.createBackground();
                this.player = new player_1.default(this.env.door.centerX, this.env.door.y + 20);
                this.generateMap();
                global_1.default.game.camera.follow(this.player.getSprite(), Phaser.Camera.FOLLOW_TOPDOWN);
            };
            Playing.prototype.update = function() {
                this.setDelta();
                global_1.default.ui.update();
                this.player.update(this.delta);
                this.player.collide(this.searchables, this.env.wall);
                var pickedUp = this.player.interact(this.pickups, this.searchables);
                for (var i = 0; i < pickedUp.length; i++) {
                    var type = pickedUp[i];
                    switch (type) {
                      case 1:
                        {
                            global_1.default.ui.pingMessage("+1 " + types_1.default[type]);
                            this.tint.alpha += .02;
                            break;
                        }

                      case 2:
                        {
                            global_1.default.ui.pingMessage("+1 " + types_1.default[type]);
                            this.gunner.alpha += .05;
                            break;
                        }

                      case 3:
                        {
                            global_1.default.ui.pingMessage("+1 " + types_1.default[type]);
                            this.redblue[0].alpha += .05;
                            this.redblue[1].alpha += .05;
                            break;
                        }
                    }
                    global_1.default.glasses++;
                }
                this.pickups = this.pickups.filter(function(value, index, array) {
                    return value.isAlive();
                });
                if (global_1.default.ui.isCountdownDone() || global_1.default.glasses > 0 && this.player.isOverlap(this.env.door)) {
                    global_1.default.game.world.removeAll();
                    global_1.default.game.state.start("end", false, false, global_1.default.ui.isCountdownDone(), global_1.default.ui.getTimeLeft());
                }
                global_1.default.sprGrp.sort("y", Phaser.Group.SORT_ASCENDING);
            };
            Playing.prototype.generateMap = function() {
                this.pickups = [];
                this.searchables = [];
                var tileSize = 80;
                var numTileX = Math.floor(global_1.default.roomW / 80);
                var numTileY = Math.floor((global_1.default.roomH - global_1.default.wallH) / 80);
                for (var y = 0; y < numTileY; y++) {
                    for (var x = 0; x < numTileX; x++) {
                        var chance = Math.random();
                        if (chance <= .1) {
                            var posX = x * 80 + utils_1.default.randomIntFromInterval(30, 50);
                            var posY = y * 80 + utils_1.default.randomIntFromInterval(30, 50) + global_1.default.wallH + 30;
                            this.pickups.push(new pickup_1.default(posX, posY));
                        } else if (chance <= .4) {
                            var posX = x * 80 + utils_1.default.randomIntFromInterval(30, 50);
                            var posY = y * 80 + utils_1.default.randomIntFromInterval(30, 50) + global_1.default.wallH + 30;
                            this.searchables.push(new crate_1.default(posX, posY, Math.random() <= .3));
                        } else if (chance >= .93) {
                            var posX = x * 80 + utils_1.default.randomIntFromInterval(30, 50);
                            var posY = y * 80 + utils_1.default.randomIntFromInterval(30, 50) + global_1.default.wallH + 30;
                            global_1.default.game.add.sprite(posX, posY, "decoration", utils_1.default.randomIntFromInterval(0, 7), global_1.default.decGrp).anchor.setTo(.5);
                        }
                    }
                }
            };
            Playing.prototype.render = function() {
                var debug = false;
                if (debug) {
                    global_1.default.game.debug.body(this.player.getSprite());
                    for (var i = 0; i < this.searchables.length; i++) {
                        global_1.default.game.debug.body(this.searchables[i].getSprite());
                        global_1.default.game.debug.body(this.searchables[i].getTrigger());
                    }
                    for (var i = 0; i < this.pickups.length; i++) {
                        global_1.default.game.debug.body(this.pickups[i].getSprite());
                    }
                    global_1.default.game.debug.body(this.env.wall);
                    global_1.default.game.debug.body(this.env.door);
                }
            };
            Playing.prototype.resize = function() {
                global_1.default.game.scale.setGameSize(window.innerWidth, window.innerHeight);
                global_1.default.ui.updateCountdownPos();
                this.tint.width = global_1.default.game.camera.width;
                this.tint.height = global_1.default.game.camera.height;
                this.gunner.width = global_1.default.game.camera.width;
                this.gunner.height = global_1.default.game.camera.height;
                this.redblue[0].width = global_1.default.game.camera.width / 2;
                this.redblue[0].height = global_1.default.game.camera.height;
                this.redblue[1].width = global_1.default.game.camera.width / 2;
                this.redblue[1].height = global_1.default.game.camera.height;
                this.redblue[1].x = global_1.default.game.camera.width / 2;
            };
            Playing.prototype.setDelta = function() {
                this.delta = global_1.default.game.time.elapsedMS * global_1.default.game.time.fps / 1e3;
            };
            return Playing;
        }();
        exports.default = Playing;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    var __extends = this && this.__extends || function() {
        var extendStatics = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function(d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports, __webpack_require__(5), __webpack_require__(0), __webpack_require__(1) ], 
    __WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, searchable_1, global_1, utils_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var Crate = function(_super) {
            __extends(Crate, _super);
            function Crate(x, y, tall) {
                var _this = _super.call(this) || this;
                var chance = Math.random();
                if (chance <= .1) {
                    _this.type = 3;
                } else if (chance <= .2) {
                    _this.type = 2;
                } else if (chance <= .5) {
                    _this.type = 1;
                } else {
                    _this.type = 0;
                }
                _this.looted = false;
                _this.createCrate(x, y, tall ? "crate_tall" : "crate_small");
                return _this;
            }
            Crate.prototype.createCrate = function(x, y, key) {
                this.sprite = global_1.default.game.add.sprite(x, y, key, 0, global_1.default.sprGrp);
                this.sprite.anchor.set(.5, 1);
                this.highlight = global_1.default.game.add.sprite(x, y + 6, "crate_highlight", 0, global_1.default.decGrp);
                this.highlight.anchor.set(.5, 1);
                this.highlight.visible = false;
                this.createCollision();
                this.createTrigger();
                var shadow = global_1.default.game.add.sprite(0, 3, "crate_shadow", 0, global_1.default.decGrp);
                shadow.anchor.set(.5, 1);
                this.sprite.addChild(shadow);
            };
            Crate.prototype.createCollision = function() {
                global_1.default.game.physics.arcade.enable(this.sprite);
                this.sprite.body.setSize(utils_1.default.scale(this.sprite.width), utils_1.default.scale(this.sprite.width), utils_1.default.scale(0) - this.sprite.anchor.x * this.sprite.width, utils_1.default.scale(this.sprite.height) - utils_1.default.scale(this.sprite.width) - this.sprite.anchor.y * this.sprite.height);
                this.sprite.body.immovable = true;
                this.sprite.body.moves = false;
            };
            Crate.prototype.createTrigger = function() {
                var padding = 10;
                this.trigger = global_1.default.game.add.sprite(0, 0, undefined);
                this.trigger.anchor.setTo(.5, 1);
                this.trigger.width = utils_1.default.scale(this.sprite.width + padding * 2);
                this.trigger.height = utils_1.default.scale(this.sprite.width + padding * 2);
                this.trigger.position.y = padding;
                this.sprite.addChild(this.trigger);
                global_1.default.game.physics.arcade.enable(this.trigger);
            };
            Crate.prototype.loot = function() {
                this.looted = true;
                var t = this.type;
                this.type = 0;
                return t;
            };
            Crate.prototype.hasBeenLooted = function() {
                return this.looted;
            };
            Crate.prototype.isSolid = function() {
                return true;
            };
            Crate.prototype.toggleHighlight = function(visible) {
                this.highlight.visible = visible;
            };
            Crate.prototype.getTrigger = function() {
                return this.trigger;
            };
            Crate.prototype.getSprite = function() {
                return this.sprite;
            };
            return Crate;
        }(searchable_1.default);
        exports.default = Crate;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports ], __WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var Searchable = function() {
            function Searchable() {}
            return Searchable;
        }();
        exports.default = Searchable;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports) {
    var g;
    g = function() {
        return this;
    }();
    try {
        g = g || Function("return this")() || (1, eval)("this");
    } catch (e) {
        if (typeof window === "object") g = window;
    }
    module.exports = g;
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports, __webpack_require__(0), __webpack_require__(1) ], 
    __WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, global_1, utils_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var Pickup = function() {
            function Pickup(x, y) {
                this.alive = true;
                var chance = Math.random();
                if (chance <= .1) {
                    this.type = 3;
                } else if (chance <= .2) {
                    this.type = 2;
                } else {
                    this.type = 1;
                }
                this.createPickup(x, y);
            }
            Pickup.prototype.createPickup = function(x, y) {
                var variation = utils_1.default.randomIntFromInterval(0, 2);
                this.sprite = global_1.default.game.add.sprite(x, y, "pickup", (this.type - 1) * 4 + variation, global_1.default.decGrp);
                this.sprite.anchor.set(.5);
                this.highlight = global_1.default.game.add.sprite(x, y + 2, "pickup_highlight", 0, global_1.default.decGrp);
                this.highlight.anchor.set(.5);
                this.highlight.visible = false;
                this.createCollision();
            };
            Pickup.prototype.createCollision = function() {
                global_1.default.game.physics.arcade.enable(this.sprite);
                var radius = this.sprite.width / 2;
                this.sprite.body.setCircle(utils_1.default.scale(radius), utils_1.default.scale(0) - this.sprite.anchor.x * this.sprite.width, utils_1.default.scale(0) - this.sprite.anchor.y * this.sprite.width);
                this.sprite.body.immovable = true;
                this.sprite.body.moves = false;
            };
            Pickup.prototype.toggleHighlight = function(visible) {
                this.highlight.visible = visible;
            };
            Pickup.prototype.kill = function() {
                this.sprite.destroy();
                this.highlight.destroy();
                this.type = 0;
                this.alive = false;
            };
            Pickup.prototype.isAlive = function() {
                return this.alive;
            };
            Pickup.prototype.getSprite = function() {
                return this.sprite;
            };
            Pickup.prototype.getType = function() {
                return this.type;
            };
            return Pickup;
        }();
        exports.default = Pickup;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports, __webpack_require__(0), __webpack_require__(9), __webpack_require__(1) ], 
    __WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, global_1, keys_1, utils_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var Player = function() {
            function Player(x, y) {
                this.speed = 200;
                this.createPlayer(x, y);
            }
            Player.prototype.createPlayer = function(x, y) {
                this.sprite = global_1.default.game.add.sprite(x, y, "character", 0, global_1.default.sprGrp);
                this.sprite.anchor.set(.5, 1);
                this.createCollision();
            };
            Player.prototype.createCollision = function() {
                global_1.default.game.physics.arcade.enable(this.sprite);
                this.sprite.body.collideWorldBounds = true;
                this.sprite.body.setSize(utils_1.default.scale(this.sprite.width), utils_1.default.scale(6), utils_1.default.scale(0) - this.sprite.anchor.x * this.sprite.width, utils_1.default.scale(this.sprite.height) - utils_1.default.scale(6) - this.sprite.anchor.y * this.sprite.height);
                this.sprite.body.bounce.set(0, 0);
            };
            Player.prototype.update = function(delta) {
                this.movement(delta);
                if (global_1.default.glasses > 0) {
                    this.sprite.frame = 1;
                }
            };
            Player.prototype.collide = function(searchables) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                for (var i = 0; i < searchables.length; i++) {
                    if (!searchables[i].isSolid()) {
                        continue;
                    }
                    global_1.default.game.physics.arcade.collide(this.sprite, searchables[i].getSprite());
                }
                if (args) {
                    for (var i = 0; i < args.length; i++) {
                        if (!args[i].visible || !args[i].alive) {
                            continue;
                        }
                        global_1.default.game.physics.arcade.collide(this.sprite, args[i]);
                    }
                }
            };
            Player.prototype.isOverlap = function(obj) {
                return global_1.default.game.physics.arcade.overlap(this.sprite, obj);
            };
            Player.prototype.movement = function(delta) {
                var dirY = 0;
                dirY -= this.isAnyKeyDown(keys_1.default.up) ? 1 : 0;
                dirY += this.isAnyKeyDown(keys_1.default.down) ? 1 : 0;
                var dirX = 0;
                dirX -= this.isAnyKeyDown(keys_1.default.left) ? 1 : 0;
                dirX += this.isAnyKeyDown(keys_1.default.right) ? 1 : 0;
                var vector = new Phaser.Point(dirX, dirY);
                vector.normalize();
                this.sprite.body.velocity.set(vector.x * this.speed, vector.y * this.speed);
            };
            Player.prototype.interact = function(pickups, searchables) {
                var result = [];
                for (var i = 0; i < pickups.length; i++) {
                    if (pickups[i].isAlive()) {
                        if (global_1.default.game.physics.arcade.overlap(this.sprite, pickups[i].getSprite())) {
                            pickups[i].toggleHighlight(true);
                            if (this.isAnyKeyDown(keys_1.default.pickup)) {
                                result.push(pickups[i].getType());
                                pickups[i].kill();
                            }
                        } else {
                            pickups[i].toggleHighlight(false);
                        }
                    }
                }
                for (var i = 0; i < searchables.length; i++) {
                    if (global_1.default.game.physics.arcade.overlap(this.sprite, searchables[i].getTrigger())) {
                        if (!searchables[i].hasBeenLooted()) {
                            searchables[i].toggleHighlight(true);
                            if (this.isAnyKeyDown(keys_1.default.search)) {
                                var lootedType = searchables[i].loot();
                                if (lootedType === 0) {
                                    global_1.default.ui.pingMessage("Crate is empty");
                                } else {
                                    result.push(lootedType);
                                }
                            }
                        } else {
                            searchables[i].toggleHighlight(false);
                        }
                    } else {
                        searchables[i].toggleHighlight(false);
                    }
                }
                return result;
            };
            Player.prototype.isAnyKeyDown = function(keycodes) {
                for (var i = 0; i < keycodes.length; i++) {
                    if (global_1.default.game.input.keyboard.isDown(keycodes[i])) {
                        return true;
                    }
                }
                return false;
            };
            Player.prototype.getSprite = function() {
                return this.sprite;
            };
            return Player;
        }();
        exports.default = Player;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports ], __WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = {
            up: [ Phaser.Keyboard.UP, Phaser.Keyboard.W ],
            right: [ Phaser.Keyboard.RIGHT, Phaser.Keyboard.D ],
            down: [ Phaser.Keyboard.DOWN, Phaser.Keyboard.S ],
            left: [ Phaser.Keyboard.LEFT, Phaser.Keyboard.A ],
            pickup: [ Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.E ],
            search: [ Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.E ]
        };
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports, __webpack_require__(0) ], 
    __WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, global_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var UI = function() {
            function UI() {
                this.timestamp = Math.floor(+new Date() / 1e3);
                this.createCountdown();
            }
            UI.prototype.pingMessage = function(message) {
                var x = global_1.default.game.camera.width - 10;
                var y = global_1.default.game.camera.height;
                var text = global_1.default.game.add.text(x, y, message, {
                    font: "bold 18px press-start-2p",
                    fill: "black",
                    align: "right",
                    boundsAlignV: "center"
                }, global_1.default.uiGrp);
                text.anchor.set(1, 0);
                text.alpha = 1;
                global_1.default.game.add.tween(text).to({
                    alpha: 0,
                    y: y / 2
                }, 3e3, "Linear", true).onComplete.add(function() {
                    text.destroy();
                });
            };
            UI.prototype.update = function() {
                var timeLeft = Math.max(this.timestamp + global_1.default.countdownAmount - Math.floor(+new Date() / 1e3), 0);
                var minutes = Math.floor(timeLeft / 60);
                var seconds = Math.floor(timeLeft % 60);
                this.countdown.text = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
                if (timeLeft < 60) {
                    this.countdown.fill = "#ce0000";
                }
            };
            UI.prototype.createCountdown = function() {
                var x = global_1.default.game.camera.width / 2;
                var y = 50;
                this.countdown = global_1.default.game.add.text(x, y, "00:00", {
                    font: "bold 24px press-start-2p",
                    fill: "white",
                    align: "center",
                    stroke: "black",
                    strokeThickness: 6
                }, global_1.default.uiGrp);
                this.countdown.anchor.set(.5, 1);
            };
            UI.prototype.isCountdownDone = function() {
                return Math.max(this.timestamp + global_1.default.countdownAmount - Math.floor(+new Date() / 1e3), 0) === 0;
            };
            UI.prototype.getTimeLeft = function() {
                return Math.max(this.timestamp + global_1.default.countdownAmount - Math.floor(+new Date() / 1e3), 0);
            };
            UI.prototype.updateCountdownPos = function() {
                this.countdown.position.x = global_1.default.game.camera.width / 2;
            };
            return UI;
        }();
        exports.default = UI;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports ], __WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = {
            "0": "Unknown",
            "1": "Sunglasses",
            "2": "Gunners",
            "3": "3D Glasses"
        };
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports, __webpack_require__(0) ], 
    __WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, global_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var Enter = function() {
            function Enter() {}
            Enter.prototype.init = function() {
                global_1.default.game.stage.disableVisibilityChange = true;
                global_1.default.game.renderer.clearBeforeRender = false;
                global_1.default.game.renderer.renderSession.roundPixels = true;
                global_1.default.game.stage.backgroundColor = "#0784df";
                this.state = 2;
            };
            Enter.prototype.createBackground = function() {};
            Enter.prototype.create = function() {
                var _this = this;
                global_1.default.glasses = 0;
                global_1.default.game.input.keyboard.onDownCallback = function(event) {
                    if (event.keyCode === Phaser.Keyboard.ENTER) {
                        _this.state--;
                        if (_this.state <= 0) {
                            global_1.default.game.input.keyboard.onDownCallback = null;
                            global_1.default.game.world.removeAll();
                            global_1.default.game.state.start("playing");
                        } else if (_this.state === 1) {
                            _this.introText.visible = true;
                            _this.titleText.visible = false;
                            _this.anykeyText.text = "Press ENTER to start...";
                        }
                    }
                };
                this.titleText = global_1.default.game.add.text(global_1.default.game.camera.width / 2, global_1.default.game.camera.height / 2, "Aliens Stole My Sunglasses", {
                    font: "bold 38px press-start-2p",
                    fill: "white",
                    align: "center",
                    stroke: "black",
                    strokeThickness: 6
                });
                this.titleText.visible = true;
                this.titleText.anchor.setTo(.5);
                this.anykeyText = global_1.default.game.add.text(global_1.default.game.camera.width / 2, global_1.default.game.camera.height - 60, "Press ENTER to continue...", {
                    font: "bold 18px press-start-2p",
                    fill: "black",
                    align: "center"
                });
                this.anykeyText.visible = true;
                this.anykeyText.anchor.setTo(.5);
                this.introText = global_1.default.game.add.text(global_1.default.game.camera.width / 2, global_1.default.game.camera.height / 2, "Strange aliens have landed on Earth.\n" + "We don't know why they're here.\n" + "To human eyes they look like red monoliths for some reason....\n\n" + "You are one of the aliens. You have entered a warehouse \nand set off the slient ALARM.\n" + "You have 3 minutes to steal as many glasses as you can.\n" + "Get back to the exit before time runs out! Or you'll be caught.\n\n" + "Since you have no arms you have to carry them on your face.\nWhich may cause problems...\n\n\n" + "WASD to Move\n" + "E or SPACEBAR to Pickup\n" + "E or SPACEBAR to Search Crates\n", {
                    font: "bold 22px press-start-2p",
                    fill: "black",
                    align: "center"
                });
                this.introText.wordWrap = true;
                this.introText.wordWrapWidth = global_1.default.game.camera.width - 100;
                this.introText.visible = false;
                this.introText.anchor.setTo(.5);
                this.leftSpr = global_1.default.game.add.sprite(global_1.default.game.camera.width / 4, global_1.default.game.camera.height / 2, "pickup", 0);
                this.leftSpr.anchor.setTo(.5);
                this.leftSpr.scale.setTo(18);
                this.leftSpr.sendToBack();
                this.leftSpr.angle = 60;
                this.rightSpr = global_1.default.game.add.sprite(global_1.default.game.camera.width / 4 * 3, global_1.default.game.camera.height / 2, "pickup", 2);
                this.rightSpr.anchor.setTo(.5);
                this.rightSpr.scale.setTo(18);
                this.rightSpr.sendToBack();
                this.rightSpr.angle = 160;
            };
            Enter.prototype.update = function() {
                this.leftSpr.angle += 1;
                this.rightSpr.angle += 1;
            };
            Enter.prototype.preload = function() {
                global_1.default.game.load.spritesheet("character", "assets/character.png", 32, 64, 2);
                global_1.default.game.load.spritesheet("pickup", "assets/pickup.png", 32, 32, 8 * 8);
                global_1.default.game.load.image("pickup_highlight", "assets/pickup_highlight.png");
                global_1.default.game.load.image("crate_small", "assets/crate_small.png");
                global_1.default.game.load.image("crate_tall", "assets/crate_tall.png");
                global_1.default.game.load.image("crate_shadow", "assets/crate_shadow.png");
                global_1.default.game.load.image("crate_highlight", "assets/crate_highlight.png");
                global_1.default.game.load.image("wall", "assets/wall_tiled.png");
                global_1.default.game.load.image("exit_door", "assets/exit_door.png");
                global_1.default.game.load.spritesheet("decoration", "assets/decoration.png", 42, 42, 8);
                global_1.default.game.load.image("tint", "assets/tint.png");
            };
            Enter.prototype.resize = function() {
                global_1.default.game.scale.setGameSize(window.innerWidth, window.innerHeight);
                this.titleText.x = global_1.default.game.camera.width / 2;
                this.titleText.y = global_1.default.game.camera.height / 2;
                this.anykeyText.x = global_1.default.game.camera.width / 2;
                this.anykeyText.y = global_1.default.game.camera.height - 100;
                this.introText.x = global_1.default.game.camera.width / 2;
                this.introText.y = global_1.default.game.camera.height / 2;
                this.introText.wordWrapWidth = global_1.default.game.camera.width - 100;
            };
            return Enter;
        }();
        exports.default = Enter;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__, exports, __webpack_require__(0) ], 
    __WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, global_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var End = function() {
            function End() {}
            End.prototype.init = function(didTimeRunOut, leftOnCountdown) {
                global_1.default.game.stage.disableVisibilityChange = true;
                global_1.default.game.renderer.clearBeforeRender = false;
                global_1.default.game.renderer.renderSession.roundPixels = true;
                global_1.default.game.stage.backgroundColor = "#0784df";
                this.didTimeRunOut = didTimeRunOut;
                this.leftOnCountdown = leftOnCountdown;
            };
            End.prototype.create = function() {
                global_1.default.game.input.keyboard.onDownCallback = function(event) {
                    if (event.keyCode === Phaser.Keyboard.ENTER) {
                        global_1.default.game.input.keyboard.onDownCallback = null;
                        global_1.default.game.state.start("enter", true, true);
                    }
                };
                var message = "";
                if (this.didTimeRunOut) {
                    message = "You were caught in the act!\nYou will be taken to a dark room and expriemented on...\n\nYou could have delivered " + global_1.default.glasses + " glasses to the cause!\n\n\n\n" + "Thank you for playing :)\n\nCreated by Conor Wallace";
                } else {
                    message = "Congratulations! You have collected " + global_1.default.glasses + " glasses for the cause.\n\n" + "There were " + this.leftOnCountdown + " second(s) left on the countdown.\n\n\n\n" + "Thank you for playing :)\n\nCreated by Conor Wallace";
                }
                this.endText = global_1.default.game.add.text(global_1.default.game.camera.width / 2, global_1.default.game.camera.height / 2, message, {
                    font: "bold 22px press-start-2p",
                    fill: "black",
                    align: "center"
                });
                this.endText.wordWrap = true;
                this.endText.wordWrapWidth = global_1.default.game.camera.width - 100;
                this.endText.anchor.setTo(.5);
                this.anykeyText = global_1.default.game.add.text(global_1.default.game.camera.width / 2, global_1.default.game.camera.height - 60, "Press ENTER to restart...", {
                    font: "bold 18px press-start-2p",
                    fill: "black",
                    align: "center"
                });
                this.anykeyText.visible = true;
                this.anykeyText.anchor.setTo(.5);
            };
            End.prototype.update = function() {};
            End.prototype.preload = function() {};
            End.prototype.resize = function() {
                global_1.default.game.scale.setGameSize(window.innerWidth, window.innerHeight);
                this.anykeyText.x = global_1.default.game.camera.width / 2;
                this.anykeyText.y = global_1.default.game.camera.height - 100;
                this.endText.x = global_1.default.game.camera.width / 2;
                this.endText.y = global_1.default.game.camera.height / 2;
                this.endText.wordWrapWidth = global_1.default.game.camera.width - 100;
            };
            return End;
        }();
        exports.default = End;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} ]);