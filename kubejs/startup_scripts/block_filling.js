const directions = ["up", "north", "west", "south", "east", "down"]
CreateEvents.spoutHandler((event) => {
    /**
    * @param {string} id 配方id
    * @param {string} blockID 方块id,可以是列表和标签
    * @param {object} fluidInput 输入流体的种类及数量，一个形如{id:"xxx",amount:xxx}的对象
    * @param {Array} outputList 配方的产出，一个形如["blockid"]的列表，等概率产出
    */
    //基础注液合成
    function blockFillingBasic(id, blockID, fluidInput, outputList) {
        event.add(
            id,//id
            blockID,//目标方块
            (block, fluid, simulate) => {
                //配方开始条件
                if (fluid.id == fluidInput.id && fluid.amount >= fluidInput.amount) {
                    if (!simulate) {
                        let i = 0
                        if (outputList.length == 1) { i = 0 }
                        if (outputList.length > 1) {
                            i = Math.round(Math.random() * outputList.length)
                            if (i == outputList.length) {
                                i = 0
                            }
                        }
                        block.level.server.runCommandSilent(`/playsound create:spout block @a ${block.pos.x} ${block.pos.y} ${block.pos.z}`)
                        block.level.server.runCommandSilent(`/particle minecraft:block ${outputList[i]} ${block.pos.x} ${block.pos.y} ${block.pos.z} 0.25 0.25 0.25 0.3 8`)//粒子效果
                        block.set(outputList[i])
                    }
                    return fluidInput.amount//消耗量
                }
                return 0;
            }
        )
    }
    /**
    * @param {string} id 配方id
    * @param {string} blockID 方块id,可以是列表和标签
    * @param {object} fluidInput 输入流体的种类及数量，一个形如{id:"xxx",amount:xxx}的对象
    * @param {string} output 配方的产出，一个物品数据"{id:'xxx',Count:4b}"
    */
    //方块》物品
    function blockFillingItem(id, blockID, fluidInput, output) {
        event.add(
            id,//id
            blockID,//目标方块
            (block, fluid, simulate) => {
                //配方开始条件
                if (fluid.id == fluidInput.id && fluid.amount >= fluidInput.amount) {
                    if (block.down.id == "create:depot") {
                        if (block.down.entityData?.HeldItem == undefined) {
                            if (!simulate) {
                                block.level.server.runCommandSilent(`/playsound create:spout block @a ${block.pos.x} ${block.pos.y} ${block.pos.z}`)
                                block.level.server.runCommandSilent(`/particle minecraft:block ${block.id} ${block.pos.x} ${block.pos.y} ${block.pos.z} 0.25 0.25 0.25 0.3 8`)
                                block.level.server.runCommandSilent(`/execute in ${block.level.dimension} run data modify block ${block.down.pos.x} ${block.down.pos.y} ${block.down.pos.z} HeldItem.Item set value ` + output)
                                block.set("minecraft:air")
                            }
                            return fluidInput.amount//消耗量
                        }
                    }
                }
                return 0;
            }
        )
    }
    /**
    * @param {string} id 配方id
    * @param {string} blockID 方块id,可以是列表和标签
    * @param {object} fluidInput 输入流体的种类及数量，一个形如{id:"xxx",amount:xxx}的对象
    * @param {string} output 配方的产出，一个物品数据"{id:'xxx',Count:4b}"
    */
    //方块额外产出物品
    function blockFillingExtraItem(id, blockID, fluidInput, output) {
        event.add(
            id,//id
            blockID,//目标方块
            (block, fluid, simulate) => {
                //配方开始条件
                if (fluid.id == fluidInput.id && fluid.amount >= fluidInput.amount) {
                    if (block.down.id == "create:depot") {
                        if (block.down.entityData?.HeldItem == undefined) {
                            if (!simulate) {
                                block.level.server.runCommandSilent(`/playsound create:spout block @a ${block.pos.x} ${block.pos.y} ${block.pos.z}`)
                                block.level.server.runCommandSilent(`/particle minecraft:block ${block.id} ${block.pos.x} ${block.pos.y} ${block.pos.z} 0.25 0.25 0.25 0.3 8`)
                                block.level.server.runCommandSilent(`/execute in ${block.level.dimension} run data modify block ${block.down.pos.x} ${block.down.pos.y} ${block.down.pos.z} HeldItem.Item set value ` + output)
                            }
                            return fluidInput.amount//消耗量
                        }
                    }
                }
                return 0;
            }
        )
    }

    // 水晶增殖系列
    function registerStage(baseName, targetBlock, fluids, nextBlocks, modInfo, isStartStage) {
        // 生成唯一的事件ID
        var eventId = "dut_create:" + baseName + "_" + targetBlock;
        if (isStartStage) {
            eventId += "_spawn";
        } else {
            eventId += "_grow";
        }
        
        // 构建目标方块的完整ID
        var targetBlockFull;
        if (isStartStage && modInfo.startMod) {
            targetBlockFull = modInfo.startMod + ":" + targetBlock;
        } else {
            targetBlockFull = modInfo.modId + ":" + targetBlock;
        }
        
        // 注册事件
        event.add(
            eventId,
            targetBlockFull,
            function(block, fluid, simulate) {
                // 1. 判断使用哪种流体
                var useFluidA = (fluid.id === fluids.fluidA.id && fluid.amount >= fluids.fluidA.amount);
                var useFluidB = (fluid.id === fluids.fluidB.id && fluid.amount >= fluids.fluidB.amount);
                var usingFluid = null;
                var nextBlockId = null;
                
                if (useFluidA) {
                    usingFluid = fluids.fluidA;
                    nextBlockId = nextBlocks.fluidA;
                } else if (useFluidB) {
                    usingFluid = fluids.fluidB;
                    nextBlockId = nextBlocks.fluidB;
                } else {
                    return 0; // 不是目标流体
                }
                
                // 2. 如果是起始生长（从母岩开始），需要检查空气位置
                if (isStartStage) {
                    var foundAir = false;
                    var airDir = "up";
                    var dirs = ["up", "north", "west", "south", "east", "down"];
                    
                    for (var d = 0; d < dirs.length; d++) {
                        var dir = dirs[d];
                        if (block[dir] && block[dir].id === "minecraft:air") {
                            foundAir = true;
                            airDir = dir;
                            break;
                        }
                    }
                    
                    if (!foundAir) return 0;
                    
                    if (!simulate) {
                        playEffects(block);
                        var setPos = block[airDir];
                        block.level.server.runCommandSilent(
                            "/setblock " + setPos.x + " " + setPos.y + " " + setPos.z + " " + 
                            modInfo.modId + ":" + nextBlockId + "[facing=" + airDir + "]"
                        );
                    }
                    return 50;
                }
                
                // 3. 普通生长阶段（从小芽到中芽、中芽到大芽等）
                if (!simulate) {
                    var face = block.properties.facing ? block.properties.facing.toString() : "up";
                    playEffects(block);
                    block.level.server.runCommandSilent(
                        "/setblock " + block.x + " " + block.y + " " + block.z + " " + 
                        modInfo.modId + ":" + nextBlockId + "[facing=" + face + "]"
                    );
                }
                return 50;
            }
        );
    }

    // 播放音效和粒子效果
    function playEffects(block) {
        block.level.server.runCommandSilent(
            "/playsound create:spout block @a " + block.pos.x + " " + block.pos.y + " " + block.pos.z
        );
        block.level.server.runCommandSilent(
            "/particle minecraft:block " + block.id + " " + block.pos.x + " " + block.pos.y + " " + block.pos.z + " 0.25 0.25 0.25 0.3 8"
        );
    }

    // 注册完整的水晶生长链
    function registerFullCrystalChain(config) {
        var name = config.name;
        var startBlock = config.startBlock;
        var modInfo = config.modInfo;
        var fluids = config.fluids;
        var stageNames = config.stageNames; // [small, medium, large, cluster]
        
        // === 1. 注册起始生长（从母岩到小芽）===
        // 流体A：常规催化 -> 小芽
        // 流体B：魔力催化 -> 直接生成对应的最终产物（如紫水晶簇或石英簇）
        registerStage(
            name + "_start",
            startBlock,
            {
                fluidA: { id: fluids.fluidA.id, amount: fluids.startAmounts.fluidA },
                fluidB: { id: fluids.fluidB.id, amount: fluids.startAmounts.fluidB }
            },
            {
                fluidA: stageNames[0], // 小芽
                fluidB: stageNames[3]  // 直接到最终簇（对于魔力催化）
            },
            modInfo,
            true // 是起始阶段
        );
        
        // === 2. 注册生长阶段1：小芽 -> 中芽 ===
        registerStage(
            name + "_small",
            stageNames[0],
            {
                fluidA: { id: fluids.fluidA.id, amount: fluids.growAmounts.fluidA },
                fluidB: { id: fluids.fluidB.id, amount: 0 } // 流体B不参与此阶段
            },
            {
                fluidA: stageNames[1], // 中芽
                fluidB: stageNames[1]  // 实际上不会触发，但需要占位
            },
            modInfo,
            false
        );
        
        // === 3. 注册生长阶段2：中芽 -> 大芽 ===
        registerStage(
            name + "_medium",
            stageNames[1],
            {
                fluidA: { id: fluids.fluidA.id, amount: fluids.growAmounts.fluidA },
                fluidB: { id: fluids.fluidB.id, amount: 0 }
            },
            {
                fluidA: stageNames[2], // 大芽
                fluidB: stageNames[2]
            },
            modInfo,
            false
        );
        
        // === 4. 注册生长阶段3：大芽 -> 最终簇 ===
        registerStage(
            name + "_large",
            stageNames[2],
            {
                fluidA: { id: fluids.fluidA.id, amount: fluids.growAmounts.fluidA },
                fluidB: { id: fluids.fluidB.id, amount: 0 }
            },
            {
                fluidA: stageNames[3], // 最终簇
                fluidB: stageNames[3]
            },
            modInfo,
            false
        );
    }

    // ============== 水晶配置 ==============

    var crystalConfigs = [
        // 1. 原版紫水晶
        {
            name: "amethyst",
            startBlock: "budding_amethyst",
            stageNames: ["small_amethyst_bud", "medium_amethyst_bud", "large_amethyst_bud", "amethyst_cluster"],
            modInfo: {
                modId: "minecraft",
                startMod: "minecraft"
            },
            fluids: {
                fluidA: { id: "kubejs:crystal_catalytic_liquid" },
                fluidB: { id: "kubejs:mana_crystal_catalytic_liquid" }
            },
            startAmounts: {
                fluidA: 100,   // 常规催化：母岩->小芽
                fluidB: 250    // 魔力催化：母岩->直接到簇
            },
            growAmounts: {
                fluidA: 100,   // 常规催化：每阶段生长
                fluidB: 0      // 魔力催化：不参与中间生长
            }
        },
        
        // 2. AE2 赛特斯石英 (无暇)
        {
            name: "quartz_flawless",
            startBlock: "flawless_budding_quartz",
            stageNames: ["small_quartz_bud", "medium_quartz_bud", "large_quartz_bud", "quartz_cluster"],
            modInfo: {
                modId: "ae2",
                startMod: "ae2"
            },
            fluids: {
                fluidA: { id: "kubejs:crystal_catalytic_liquid" },
                fluidB: { id: "kubejs:mana_crystal_catalytic_liquid" }
            },
            startAmounts: {
                fluidA: 150,
                fluidB: 250
            },
            growAmounts: {
                fluidA: 150,
                fluidB: 0
            }
        },
        
        // 3. AE2 赛特斯石英 (有暇)
        {
            name: "quartz_flawed",
            startBlock: "flawed_budding_quartz",
            stageNames: ["small_quartz_bud", "medium_quartz_bud", "large_quartz_bud", "quartz_cluster"],
            modInfo: {
                modId: "ae2",
                startMod: "ae2"
            },
            fluids: {
                fluidA: { id: "kubejs:crystal_catalytic_liquid" },
                fluidB: { id: "kubejs:mana_crystal_catalytic_liquid" }
            },
            startAmounts: {
                fluidA: 200,
                fluidB: 350
            },
            growAmounts: {
                fluidA: 200,
                fluidB: 0
            }
        },
        
        // 4. AE2 赛特斯石英 (开裂)
        {
            name: "quartz_chipped",
            startBlock: "chipped_budding_quartz",
            stageNames: ["small_quartz_bud", "medium_quartz_bud", "large_quartz_bud", "quartz_cluster"],
            modInfo: {
                modId: "ae2",
                startMod: "ae2"
            },
            fluids: {
                fluidA: { id: "kubejs:crystal_catalytic_liquid" },
                fluidB: { id: "kubejs:mana_crystal_catalytic_liquid" }
            },
            startAmounts: {
                fluidA: 250,
                fluidB: 400
            },
            growAmounts: {
                fluidA: 250,
                fluidB: 0
            }
        },
        
        // 5. AE2 赛特斯石英 (损坏)
        {
            name: "quartz_damaged",
            startBlock: "damaged_budding_quartz",
            stageNames: ["small_quartz_bud", "medium_quartz_bud", "large_quartz_bud", "quartz_cluster"],
            modInfo: {
                modId: "ae2",
                startMod: "ae2"
            },
            fluids: {
                fluidA: { id: "kubejs:crystal_catalytic_liquid" },
                fluidB: { id: "kubejs:mana_crystal_catalytic_liquid" }
            },
            startAmounts: {
                fluidA: 300,
                fluidB: 450
            },
            growAmounts: {
                fluidA: 300,
                fluidB: 0
            }
        },
        
        // 6. AE2 赛特斯石英 (石英方块)
        {
            name: "quartz_block",
            startBlock: "quartz_block",
            stageNames: ["small_quartz_bud", "medium_quartz_bud", "large_quartz_bud", "quartz_cluster"],
            modInfo: {
                modId: "ae2",
                startMod: "ae2"
            },
            fluids: {
                fluidA: { id: "kubejs:crystal_catalytic_liquid" },
                fluidB: { id: "kubejs:mana_crystal_catalytic_liquid" }
            },
            startAmounts: {
                fluidA: 400,
                fluidB: 600
            },
            growAmounts: {
                fluidA: 400,
                fluidB: 0
            }
        },
        
        // 7. 玫瑰石英 (Biomes O' Plenty)
        {
            name: "rose_quartz",
            startBlock: "budding_rose_quartz",
            stageNames: ["small_rose_quartz_bud", "medium_rose_quartz_bud", "large_rose_quartz_bud", "rose_quartz_cluster"],
            modInfo: {
                modId: "biomesoplenty",
                startMod: "kubejs" // 注意：母岩来自kubejs
            },
            fluids: {
                fluidA: { id: "kubejs:crystal_catalytic_liquid" },
                fluidB: { id: "kubejs:mana_crystal_catalytic_liquid" }
            },
            startAmounts: {
                fluidA: 500,
                fluidB: 500  // 注意：你原来的配置中，玫瑰石英的魔力催化也是从母岩->小芽
            },
            growAmounts: {
                fluidA: 500,
                fluidB: 0
            }
        }
    ];

    // ============== 执行注册 ==============
    for (var i = 0; i < crystalConfigs.length; i++) {
        registerFullCrystalChain(crystalConfigs[i]);
    }

})