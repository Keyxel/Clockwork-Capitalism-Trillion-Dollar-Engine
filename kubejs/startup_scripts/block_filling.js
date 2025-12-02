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
        // 生成事件ID
        var eventId = "dut_create:" + baseName + "_" + targetBlock + (isStartStage ? "_spawn" : "_grow");
        
        // 构建目标方块完整ID
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
                // 检查流体A
                var useFluidA = false;
                if (fluids.fluidA && fluids.fluidA.id && fluid.id === fluids.fluidA.id && fluid.amount >= (fluids.fluidA.amount || 0)) {
                    useFluidA = true;
                }
                
                // 检查流体B（如果有）
                var useFluidB = false;
                if (fluids.fluidB && fluids.fluidB.id && fluid.id === fluids.fluidB.id && fluid.amount >= (fluids.fluidB.amount || 0)) {
                    useFluidB = true;
                }
                
                // 没有匹配的流体
                if (!useFluidA && !useFluidB) return 0;
                
                // 确定下一个方块
                var nextBlockId;
                if (useFluidA) {
                    nextBlockId = nextBlocks.fluidA;
                } else if (useFluidB) {
                    // 流体B的方块，如果没有专门定义就使用流体A的
                    nextBlockId = nextBlocks.fluidB || nextBlocks.fluidA;
                } else {
                    return 0;
                }
                
                // 起始生长阶段
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
                        var targetPos = block[airDir];
                        var command = "/setblock " + targetPos.x + " " + targetPos.y + " " + targetPos.z + " " + 
                                    modInfo.modId + ":" + nextBlockId + "[facing=" + airDir + "]";
                        block.level.server.runCommandSilent(command);
                    }
                    return 50;
                }
                
                // 普通生长阶段
                if (!simulate) {
                    var face = block.properties.facing ? block.properties.facing.toString() : "up";
                    playEffects(block);
                    var command = "/setblock " + block.x + " " + block.y + " " + block.z + " " + 
                                modInfo.modId + ":" + nextBlockId + "[facing=" + face + "]";
                    block.level.server.runCommandSilent(command);
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

    // 注册完整水晶生长链
    function registerCrystalChain(config) {
        console.log("注册水晶: " + config.name);
        
        var name = config.name;
        var startBlock = config.startBlock;
        var stageNames = config.stageNames; // [小芽, 中芽, 大芽, 簇]
        var modInfo = config.modInfo;
        
        // 准备起始生长流体配置 - 这是关键修复！！！
        var startFluids = {
            fluidA: {
                id: "kubejs:crystal_catalytic_liquid",
                amount: config.startAmountA || 100
            }
        };
        
        // 只有在有startAmountB时才添加流体B
        if (config.startAmountB !== undefined && config.startAmountB > 0) {
            startFluids.fluidB = {
                id: "kubejs:mana_crystal_catalytic_liquid",
                amount: config.startAmountB
            };
        }
        
        // 1. 起始生长（从母岩开始）
        registerStage(
            name + "_start",
            startBlock,
            startFluids, // 使用正确构建的流体对象
            {
                fluidA: stageNames[0],  // 常规催化 -> 小芽
                fluidB: stageNames[3]   // 魔力催化 -> 直接到簇
            },
            modInfo,
            true
        );
        
        // 2. 小芽 -> 中芽
        registerStage(
            name + "_small",
            stageNames[0],
            {
                fluidA: {
                    id: "kubejs:crystal_catalytic_liquid",
                    amount: config.growAmountA || 100
                }
                // 注意：这里没有fluidB，因为只有常规催化参与此阶段
            },
            {
                fluidA: stageNames[1]
            },
            modInfo,
            false
        );
        
        // 3. 中芽 -> 大芽
        registerStage(
            name + "_medium",
            stageNames[1],
            {
                fluidA: {
                    id: "kubejs:crystal_catalytic_liquid",
                    amount: config.growAmountA || 100
                }
            },
            {
                fluidA: stageNames[2]
            },
            modInfo,
            false
        );
        
        // 4. 大芽 -> 簇
        registerStage(
            name + "_large",
            stageNames[2],
            {
                fluidA: {
                    id: "kubejs:crystal_catalytic_liquid",
                    amount: config.growAmountA || 100
                }
            },
            {
                fluidA: stageNames[3]
            },
            modInfo,
            false
        );
    }

    // ============== 水晶配置 ==============
    var crystalConfigs = [
        {
            name: "amethyst",
            startBlock: "budding_amethyst",
            stageNames: ["small_amethyst_bud", "medium_amethyst_bud", "large_amethyst_bud", "amethyst_cluster"],
            modInfo: { modId: "minecraft", startMod: "minecraft" },
            startAmountA: 100,
            startAmountB: 250,
            growAmountA: 100
        },
        {
            name: "quartz_flawless",
            startBlock: "flawless_budding_quartz",
            stageNames: ["small_quartz_bud", "medium_quartz_bud", "large_quartz_bud", "quartz_cluster"],
            modInfo: { modId: "ae2", startMod: "ae2" },
            startAmountA: 150,
            startAmountB: 250,
            growAmountA: 150
        },
        {
            name: "quartz_flawed",
            startBlock: "flawed_budding_quartz",
            stageNames: ["small_quartz_bud", "medium_quartz_bud", "large_quartz_bud", "quartz_cluster"],
            modInfo: { modId: "ae2", startMod: "ae2" },
            startAmountA: 200,
            startAmountB: 350,
            growAmountA: 200
        },
        {
            name: "quartz_chipped",
            startBlock: "chipped_budding_quartz",
            stageNames: ["small_quartz_bud", "medium_quartz_bud", "large_quartz_bud", "quartz_cluster"],
            modInfo: { modId: "ae2", startMod: "ae2" },
            startAmountA: 250,
            startAmountB: 400,
            growAmountA: 250
        },
        {
            name: "quartz_damaged",
            startBlock: "damaged_budding_quartz",
            stageNames: ["small_quartz_bud", "medium_quartz_bud", "large_quartz_bud", "quartz_cluster"],
            modInfo: { modId: "ae2", startMod: "ae2" },
            startAmountA: 300,
            startAmountB: 450,
            growAmountA: 300
        },
        {
            name: "quartz_block",
            startBlock: "quartz_block",
            stageNames: ["small_quartz_bud", "medium_quartz_bud", "large_quartz_bud", "quartz_cluster"],
            modInfo: { modId: "ae2", startMod: "ae2" },
            startAmountA: 400,
            startAmountB: 600,
            growAmountA: 400
        },
        {
            name: "rose_quartz",
            startBlock: "budding_rose_quartz",
            stageNames: ["small_rose_quartz_bud", "medium_rose_quartz_bud", "large_rose_quartz_bud", "rose_quartz_cluster"],
            modInfo: { modId: "biomesoplenty", startMod: "kubejs" },
            startAmountA: 500,
            startAmountB: 500,
            growAmountA: 500
        }
    ];

    // ============== 执行注册 ==============
    console.log("===== 开始注册水晶增殖系统 =====");

    for (var i = 0; i < crystalConfigs.length; i++) {
        try {
            registerCrystalChain(crystalConfigs[i]);
            console.log("✓ 已注册: " + crystalConfigs[i].name);
        } catch (err) {
            console.error("✗ 注册失败: " + crystalConfigs[i].name + " - " + err);
        }
    }

    console.log("===== 水晶增殖系统注册完成 =====");
    console.log("总计: " + crystalConfigs.length + " 种水晶已注册");
})