// priority: 0

// Visit the wiki for more info - https://kubejs.com/

console.info('(Loaded server scripts)')

// Mod shortcuts
let MOD = (domain, id, x) => (x ? `${x}x ` : "") + (id.startsWith('#') ? '#' : "") + domain + ":" + id.replace('#', '')
let AE2 = (id, x) => MOD("ae2", id, x)
let TE = (id, x) => MOD("thermal", id, x)
let AP = (id, x) => MOD("architects_palette", id, x)
let CR = (id, x) => MOD("create", id, x)
let TC = (id, x) => MOD("tconstruct", id, x)
let MC = (id, x) => MOD("minecraft", id, x)
let KJ = (id, x) => MOD("kubejs", id, x)
let EG = (id, x) => MOD("endergetic", id, x)
let FD = (id, x) => MOD("farmersdelight", id, x)
let BOP = (id, x) => MOD("biomesoplenty", id, x)
let RQ = (id, x) => MOD("reliquary", id, x)
let SD = (id, x) => MOD("storagedrawers", id, x)
let SP = (id, x) => MOD("supplementaries", id, x)
let F = (id, x) => MOD("forge", id, x)
let AC = (id, x) => MOD("aquaculture", id, x)
let PP = (id, x) => MOD("prettypipes", id, x)
let OC = (id, x) => MOD("occultism", id, x)
let IM = (id, x) => MOD("immersiveengineering", id, x)
let CO = (id, x) => MOD("createoreexcavation", id, x)
let BO = (id, x) => MOD("botania", id, x)
let FA = (id, x) => MOD("forbidden_arcanus", id, x)
let ARS = (id, x) => MOD("ars_nouveau", id, x)
let BM = (id, x) => MOD("bloodmagic", id, x)
let PC = (id, x) => MOD("pneumaticcraft", id, x)
let MEK = (id, x) => MOD("mekanism", id, x)
let TF = (id, x) => MOD("twilightforest", id, x)
let PR_C = (id, x) => MOD("projectred_core", id, x)
let PR_T = (id, x) => MOD("projectred_transmission", id, x)
let PR_I = (id, x) => MOD("projectred_illumination", id, x)
let Q = (id, x) => MOD("quark", id, x)
let IW = (id, x) => MOD("immersive_weathering", id, x)
let CRD = (id, x) => MOD("create_dd", id, x)
let CRC = (id, x) => MOD("create_connected", id, x)

ServerEvents.recipes(event => {

	// C1
    algalAndesite(event)
	woodProcess(event)
	woodenStuff(event)
    andesiteMachine(event) 

})

let colours = ['white', 'orange', 'magenta', 'light_blue', 'lime', 'pink', 'purple', 'light_gray', 'gray', 'cyan', 'brown', 'green', 'blue', 'red', 'black', 'yellow']

let donutCraft = (event, output, center, ring) => {
	event.shaped(output, [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: center,
		S: ring
	})
}

let ingotToBlock = (event, output, ingot) => {
	event.shaped(output, [
		'SSS',
		'SSS',
		'SSS'
	], {
		S: ingot
	})
}

let blockToIngot = (event, output, block) => {
	event.shapeless(output, [
		block
	])
}

let switchCutting = (event, output, input) => {
	event.stonecutting(output, input)
	event.stonecutting(input, output)
}

let switchCraft = (event, a, b) => {
	event.shaped(a, [
		'S'
	], {
		S: b
	})

	event.shaped(b, [
		'S'
	], {
		S: a
	})
}

function algalAndesite(event) {
	event.remove({ id: TC('compat/create/andesite_alloy_iron') })
	event.remove({ id: CR('crafting/materials/andesite_alloy') })
	event.remove({ id: CR('crafting/materials/andesite_alloy_from_zinc') })
	event.remove({ id: CR('mixing/andesite_alloy') })
	event.remove({ id: CR('mixing/andesite_alloy_from_zinc') })
	event.remove({ id: TE('compat/create/smelter_create_alloy_andesite_alloy') })
	event.remove({ id: TE('compat/create/smelter_create_alloy_andesite_alloy') })
	event.remove({ id: TC('compat/create/andesite_alloy_zinc') })
	event.remove({ id: TC('compat/create/andesite_alloy_iron') })
	event.remove({ id: 'create_dd:industrial_iron/andesite_alloy' })
	event.remove({ id: 'create_dd:industrial_iron/andesite_alloy_mixing' })
	event.replaceInput({ id: CRD("mechanical_crafting/shimmer_bucket") }, CRD('sap_bucket'), TE('resin_bucket')) // 微光

	// 极光海带
	blockToIngot(event, KJ("polar_kelp", 9), KJ("polar_kelp_block"))
	event.recipes.createFilling(KJ('polar_kelp'), [MC('kelp'), Fluid.of(CRD('shimmer'), 1)])
	event.recipes.createFilling(KJ('polar_kelp'), [MC('kelp'), Fluid.of('manaliquidizer:mana_fluid', 2)])
	event.recipes.botania.mana_infusion(KJ('polar_kelp'), MC('kelp'), 200)

	// 极光海带块
	ingotToBlock(event, KJ("polar_kelp_block"), KJ("polar_kelp"))
	event.recipes.createFilling(KJ('polar_kelp_block'), ["upgrade_aquatic:kelp_block", Fluid.of(CRD('shimmer'), 9)])
	event.recipes.createFilling(KJ('polar_kelp_block'), ["upgrade_aquatic:kelp_block", Fluid.of('manaliquidizer:mana_fluid', 18)])
	event.recipes.botania.mana_infusion(KJ('polar_kelp_block'), "upgrade_aquatic:kelp_block", 180)

	// 以太岩
	event.recipes.createFilling(CRD('aethersite'), [MC('andesite'), Fluid.of('manaliquidizer:mana_fluid', 4)])
	event.recipes.botania.mana_infusion(CRD('aethersite'), MC('andesite'), 400)


	// 滴水石块
	event.recipes.createCompacting([MC('dripstone_block')], [CR('limestone'), Fluid.of(MC("water"), 500)])
	event.recipes.createSplashing([Item.of(MC("dripstone_block"))], CRD('weathered_limestone'))

	// 海藻砖
	event.remove({ output: AP('algal_brick') })
	event.remove({ id: AP('algal_blend') })
	event.smelting(AP('algal_brick'), Item.of(AP('algal_blend'))).xp(0).cookingTime(120)

	// 海藻混合物
	// x1
	event.shaped(Item.of(AP('algal_blend'), 4), [
		'SS',
		'AA'
	], {
		A: 'minecraft:clay_ball',
		S: ['minecraft:kelp', 'minecraft:seagrass', 'aquaculture:algae']
	})
	event.shaped(Item.of(AP('algal_blend'), 4), [
		'AA',
		'SS'
	], {
		A: 'minecraft:clay_ball',
		S: ['minecraft:kelp', 'minecraft:seagrass', 'aquaculture:algae']
	})
	// 动力搅拌
	event.recipes.createMixing(Item.of(AP('algal_blend'), 2), ['minecraft:clay_ball', ['minecraft:kelp', 'minecraft:seagrass', 'aquaculture:algae']])
	// x2
	event.shaped(Item.of('6x architects_palette:algal_blend', '{CustomModelData:1}'), [
		'SS',
		'AA'
	], {
		A: 'minecraft:clay_ball',
		S: 'kubejs:polar_kelp'
	})
	event.shaped(Item.of('6x architects_palette:algal_blend', '{CustomModelData:1}'), [
		'AA',
		'SS'
	], {
		A: 'minecraft:clay_ball',
		S: 'kubejs:polar_kelp'
	})
	// 动力搅拌
	event.recipes.createMixing(Item.of('3x architects_palette:algal_blend', '{CustomModelData:1}'), ['minecraft:clay_ball', 'kubejs:polar_kelp'])
	
	// 安山合金
	// x1
	event.shaped(Item.of(CR('andesite_alloy'), 2), [
		'SS',
		'AA'
	], {
		A: MC('andesite'),
		S: AP('algal_brick')
	})
	event.shaped(Item.of(CR('andesite_alloy'), 2), [
		'AA',
		'SS'
	], {
		A: MC('andesite'),
		S: AP('algal_brick')
	})
	// x2
	event.shaped(Item.of('4x create:andesite_alloy', '{CustomModelData:1}'), [
		'SS',
		'AA'
	], {
		A: CRD('aethersite'),
		S: AP('algal_brick')
	})
	event.shaped(Item.of('4x create:andesite_alloy', '{CustomModelData:1}'), [
		'AA',
		'SS'
	], {
		A: CRD('aethersite'),
		S: AP('algal_brick')
	})
	event.recipes.createMixing(Item.of(CR('andesite_alloy'), 2), [AP('algal_brick'), MC('andesite')])
	// x3
	event.recipes.createMixing(Item.of('3x create:andesite_alloy', '{CustomModelData:1}'), [AP('algal_brick'), CRD('aethersite')])
	event.recipes.immersiveengineeringAlloy((KJ('andesite_alloy_ingot')), AP('algal_brick'), MC('andesite'))
	// x3 25%+1
	event.recipes.createCutting([Item.of(CR('andesite_alloy'), 2), Item.of(CR('andesite_alloy')).withChance(0.25)], (KJ('andesite_alloy_ingot'))).processingTime(50)
	// x4
	event.recipes.immersiveengineeringAlloy(Item.of('4x create:andesite_alloy', '{CustomModelData:1}'), AP('algal_brick'), CRD('aethersite'))


	// 安山合金齿轮
	// 热力冲压机
	event.recipes.thermalPress("kubejs:andesite_alloy_gear", [
		"create:andesite_alloy",
		"thermal:press_gear_die",
	]);
	// 沉浸冲压机
	event.recipes.immersiveengineeringMetalPress("kubejs:andesite_alloy_gear", "create:andesite_alloy", "immersiveengineering:mold_gear")
	// 机械动力冲压机
	event.custom({
		"type": "vintageimprovements:curving",
		"itemAsHead": "thermal:press_gear_die",
		"ingredients": [
			{
				"item": "create:andesite_alloy"
			}
		],
		"results": [
			{
				"item": "kubejs:andesite_alloy_gear",
				"count": 1
			}
		]
	});
	// 无序合成
	event.shapeless(KJ('andesite_alloy_gear'), [
		F('#saws'),
		CR('andesite_alloy'),
		CR('andesite_alloy')
	]).id("kubejs:andesite_alloy_gear_manual_only")
		.damageIngredient(Item.of(KJ('stone_saw')))
		.damageIngredient(Item.of(KJ('iron_saw')))
		.damageIngredient(Item.of(KJ('diamond_saw')))
		.damageIngredient(Item.of(KJ('netherite_saw')))
		.damageIngredient(Item.of('#forge:saws'))
		.damageIngredient(Item.of('create_dd:deforester_saw'))

}

function woodProcess(event) {
	// 移除MEK的锯木机
 	event.remove({ type: 'mekanism:sawing' })
	event.remove({ output: 'mekanism:precision_sawmill' })
	event.remove({ output: 'mekanism:basic_sawing_factory' })
	event.remove({ output: 'mekanism:advanced_sawing_factory' })
	event.remove({ output: 'mekanism:elite_sawing_factory' })
	event.remove({ output: 'mekanism:ultimate_sawing_factory' })

	// 替换秘金木去皮产生的树皮
	event.remove({ id: "everycomp:fd/cutting/forbidden_arcanus/aurum_log" })
	event.remove({ id: "everycomp:fd/cutting/forbidden_arcanus/aurum_log_using_deployer" })
	event.remove({ id: "everycomp:fd/cutting/forbidden_arcanus/aurum_wood" })
	event.remove({ id: "everycomp:fd/cutting/forbidden_arcanus/aurum_wood_using_deployer" })
	event.custom({
		"type": "farmersdelight:cutting",
		"ingredients": [
			{
			"item": "forbidden_arcanus:aurum_log"
			}
		],
		"result": [
			{
			"item": "forbidden_arcanus:stripped_aurum_log"
			},
			{
			"item": "kubejs:aurum_bark"
			}
		],
		"sound": "minecraft:item.axe.strip",
		"tool": {
			"type": "farmersdelight:tool_action",
			"action": "axe_strip"
		}
	})
	event.custom({
		"type": "farmersdelight:cutting",
		"ingredients": [
			{
			"item": "forbidden_arcanus:aurum_wood"
			}
		],
		"result": [
			{
			"item": "forbidden_arcanus:stripped_aurum_wood"
			},
			{
			"item": "kubejs:aurum_bark"
			}
		],
		"sound": "minecraft:item.axe.strip",
		"tool": {
			"type": "farmersdelight:tool_action",
			"action": "axe_strip"
		}
	})

	// 热力相关
	event.remove({ type: 'thermal:sawmill' })
	event.remove({ id: 'thermal:machines/pulverizer/pulverizer_logs' })
	event.remove({ id: 'thermal:machines/pulverizer/pulverizer_diamond_tools' })
	// 保留热力锯木机切瓜
	event.custom({
 		 "type": "thermal:sawmill",
 		 "ingredient": {
  		  "item": "thermal:frost_melon"
  		},
  		"result": [
   		 {
  		    "item": "thermal:frost_melon_slice",
   		   "count": 8
   		 },
   		 {
   		   "item": "thermal:frost_melon_seeds",
   		   "chance": 0.25
   		 }
 		 ],"energy": 800
	})
	event.custom({
 		 "type": "thermal:sawmill",
 		 "ingredient": {
  		  "item": "minecraft:melon"
  		},
  		"result": [
   		 {
  		    "item": "minecraft:melon_slice",
   		   "count": 8
   		 },
   		 {
   		   "item": "minecraft:melon_seeds",
   		   "chance": 0.25
   		 }
 		 ],"energy": 800
	})
	event.custom({
 		 "type": "thermal:sawmill",
 		 "ingredient": {
  		  "item": "fruitsdelight:hamimelon"
  		},
  		"result": [
   		 {
  		    "item": "fruitsdelight:hamimelon_slice",
   		   "count": 8
   		 },
   		 {
   		   "item": "fruitsdelight:hamimelon_stem",
   		   "chance": 0.25
   		 }
 		 ],"energy": 800
	})
	event.custom({
 		 "type": "thermal:sawmill",
 		 "ingredient": {
  		  "item": "delightful:cantaloupe"
  		},
  		"result": [
   		 {
  		    "item": "delightful:cantaloupe_slice",
   		   "count": 3
   		 },
   		 {
   		   "item": "delightful:cantaloupe_seeds",
   		   "chance": 0.25
   		 }
 		 ],"energy": 800
	})

	event.remove({ type: 'immersiveengineering:sawmill' })

	const SpecialWoods = {
        // 下界木材
        'crimson': {
            log: 'crimson_stem',
            stripped_log: 'stripped_crimson_stem',
            wood: 'crimson_hyphae', // 绯红菌核
            stripped_wood: 'stripped_crimson_hyphae'
        },
        'warped': {
            log: 'warped_stem',
            stripped_log: 'stripped_warped_stem',
            wood: 'warped_hyphae', // 诡异菌核
            stripped_wood: 'stripped_warped_hyphae' 
        }
    };

	let woodTypes = (mod, id, barks, chips, createSlabs) => {
		let woodData = SpecialWoods[id];

        let logs = woodData ? `${mod}:${woodData.log}` : `${mod}:${id}_log`;
        let woods = woodData ? `${mod}:${woodData.wood}` : `${mod}:${id}_wood`;
        let planks = `${mod}:${id}_planks`;
        let slabs = `${mod}:${id}_slab`;
        let stripped_logs = woodData ? `${mod}:${woodData.stripped_log}` : `${mod}:stripped_${id}_log`;
        let stripped_woods = woodData ? `${mod}:${woodData.stripped_wood}` : `${mod}:stripped_${id}_wood`;

		// 共同配方列表
		const commonRecipes = [
			// 原木切木板 - 沉浸工程
			() => event.custom({
				"type": "immersiveengineering:sawmill",
				"energy": 1600,
				"input": { "item": logs },
				"result": { "count": 6, "item": planks },
				"secondaries": [
					{ "output": { "item": barks }, "stripping": true },
					{ "output": { "item": chips }, "stripping": false },
					{ "output": { "item": chips }, "stripping": false }
				],
				"stripped": { "item": stripped_logs }
			}),
			// 木切木板 - 沉浸工程
			() => event.custom({
				"type": "immersiveengineering:sawmill",
				"energy": 1600,
				"input": { "item": woods },
				"result": { "count": 6, "item": planks },
				"secondaries": [
					{ "output": { "item": barks }, "stripping": true },
					{ "output": { "item": chips }, "stripping": false },
					{ "output": { "item": chips }, "stripping": false }
				],
				"stripped": { "item": stripped_woods }
			}),
			// 原木切去皮原木 - 热力膨胀
			() => event.recipes.thermal.sawmill([Item.of(stripped_logs), Item.of(barks)], logs),
			// 去皮木切木板 - 热力膨胀
			() => event.recipes.thermal.sawmill([
				Item.of(planks, 6), 
				Item.of(chips).withChance(0.50), 
				Item.of(planks).withChance(0.25), 
				Item.of(planks).withChance(0.15)
			], stripped_logs),
			// 木切去皮木 - 热力膨胀
			() => event.recipes.thermal.sawmill([Item.of(stripped_woods), Item.of(barks)], woods),
			// 去皮木切木板 - 热力膨胀
			() => event.recipes.thermal.sawmill([
				Item.of(planks, 6), 
				Item.of(chips).withChance(0.50), 
				Item.of(planks).withChance(0.25), 
				Item.of(planks).withChance(0.15)
			], stripped_woods),
			// 木板切台阶 - 沉浸工程
			() => event.custom({
				"type": "immersiveengineering:sawmill",
				"energy": 1600,
				"input": { "item": planks },
				"result": { "count": 3, "item": slabs },
				"secondaries": [{ "output": { "item": chips }, "stripping": false }]
			}),
			// 木板切台阶 - 热力膨胀
			() => event.recipes.thermal.sawmill([Item.of(slabs, 2), Item.of(chips).withChance(0.50)], planks)
		];

		// 执行共同配方
		commonRecipes.forEach(recipe => recipe());

		if (createSlabs) {
			event.recipes.createCutting(['2x ' + slabs], planks).processingTime(50);
		}

	};

	let chip = ("createdieselgenerators:wood_chip")
	let bark = FD("tree_bark")

	// 原版木材
	woodTypes("minecraft", "oak", bark, chip, false)
	woodTypes("minecraft", "spruce", bark, chip, false)
	woodTypes("minecraft", "birch", bark, chip, false)
	woodTypes("minecraft", "jungle", bark, chip, false)
	woodTypes("minecraft", "acacia", bark, chip, false)
	woodTypes("minecraft", "dark_oak", bark, chip, false)
	woodTypes("minecraft", "crimson", bark, chip, false)
	woodTypes("minecraft", "warped", bark, chip, false)
	// biomesoplenty
	woodTypes("biomesoplenty", "fir", bark, chip, false)
	woodTypes("biomesoplenty", "redwood", bark, chip, false)
	woodTypes("biomesoplenty", "mahogany", bark, chip, false)
	woodTypes("biomesoplenty", "jacaranda", bark, chip, false)
	woodTypes("biomesoplenty", "willow", bark, chip, false)
	woodTypes("biomesoplenty", "dead", bark, chip, false)
	woodTypes("biomesoplenty", "magic", bark, chip, false)
	woodTypes("biomesoplenty", "umbran", bark, chip, false)
	woodTypes("biomesoplenty", "hellbark", bark, chip, false)
	woodTypes("biomesoplenty", "palm", bark, chip, false)
	// architects_palette
	woodTypes("architects_palette", "twisted", bark, chip, false)	
	// create_dd
	woodTypes("create_dd", "smoked", bark, chip, false)	
	woodTypes("create_dd", "spirit", bark, chip, false)	
	woodTypes("create_dd", "rose", bark, chip, false)	
	woodTypes("create_dd", "rubber", bark, chip, false)
	// forbidden_arcanus
	woodTypes("forbidden_arcanus", "aurum", 'kubejs:aurum_bark', 'kubejs:aurum_sawdust', false)
	// thermal
	woodTypes("thermal", "rubberwood", bark, chip, false)
	// darkerdepths
	woodTypes("darkerdepths", "petrified", bark, chip, false)

	// 单独为匠魂添加配方
	let slimewoodTypes = (mod, type, barks, chips) => {
		let logs = mod+ ":" + type + "_log"
        let woods =	mod+ ":" + type + "_wood"
        let planks = mod+ ":" + type + "_planks"
        let slabs = mod+ ":" + type + "_planks_slab"
        let stripped_logs = mod+ ":stripped_" + type + "_log"
        let stripped_woods = mod+ ":stripped_" + type + "_wood"

			// 原木切木板 - 沉浸工程
			event.custom({
				"type": "immersiveengineering:sawmill",
				"energy": 1600,
				"input": { "item": logs },
				"result": { "count": 6, "item": planks },
				"secondaries": [
					{ "output": { "item": barks }, "stripping": true },
					{ "output": { "item": chips }, "stripping": false },
					{ "output": { "item": chips }, "stripping": false }
				],
				"stripped": { "item": stripped_logs }
			}),
			// 木切木板 - 沉浸工程
			event.custom({
				"type": "immersiveengineering:sawmill",
				"energy": 1600,
				"input": { "item": woods },
				"result": { "count": 6, "item": planks },
				"secondaries": [
					{ "output": { "item": barks }, "stripping": true },
					{ "output": { "item": chips }, "stripping": false },
					{ "output": { "item": chips }, "stripping": false }
				],
				"stripped": { "item": stripped_woods }
			}),
			// 原木切去皮原木 - 热力膨胀
			event.recipes.thermal.sawmill([Item.of(stripped_logs), Item.of(barks)], logs),
			// 去皮木切木板 - 热力膨胀
			event.recipes.thermal.sawmill([
				Item.of(planks, 6), 
				Item.of(chips).withChance(0.50), 
				Item.of(planks).withChance(0.25), 
				Item.of(planks).withChance(0.15)
			], stripped_logs),
			// 木切去皮木 - 热力膨胀
			event.recipes.thermal.sawmill([Item.of(stripped_woods), Item.of(barks)], woods),
			// 去皮木切木板 - 热力膨胀
			event.recipes.thermal.sawmill([
				Item.of(planks, 6), 
				Item.of(chips).withChance(0.50), 
				Item.of(planks).withChance(0.25), 
				Item.of(planks).withChance(0.15)
			], stripped_woods),
			// 木板切台阶 - 沉浸工程
			event.custom({
				"type": "immersiveengineering:sawmill",
				"energy": 1600,
				"input": { "item": planks },
				"result": { "count": 3, "item": slabs },
				"secondaries": [{ "output": { "item": chips }, "stripping": false }]
			}),
			// 木板切台阶 - 热力膨胀
			event.recipes.thermal.sawmill([Item.of(slabs, 2), Item.of(chips).withChance(0.50)], planks)
			event.recipes.createCutting(['2x ' + slabs], planks).processingTime(50);
	};

	slimewoodTypes("tconstruct", "greenheart", bark, chip)
	slimewoodTypes("tconstruct", "skyroot", bark, chip)
	slimewoodTypes("tconstruct", "bloodshroom", bark, chip)
	slimewoodTypes("tconstruct", "enderbark", bark, chip)
	// 意外的能兼容夸克配方
	slimewoodTypes("quark", "blossom", bark, chip, true)
	slimewoodTypes("quark", "azalea", bark, chip, true)
	slimewoodTypes("quark", "ancient", bark, chip, true)


	// 单独为至高木添加配方
	let archwoodTypes = (color, barks, chips) => {
		let logs = "ars_nouveau:" + color + "_archwood_log"
        let woods =	"ars_nouveau:" + color + "_archwood_wood"
        let planks = "ars_nouveau:archwood_planks"
        let slabs = "ars_nouveau:archwood_slab"
        let stripped_logs = "ars_nouveau:stripped_" + color + "_archwood_log"
        let stripped_woods = "ars_nouveau:stripped_" + color + "_archwood_wood"

			// 原木切木板 - 沉浸工程
			event.custom({
				"type": "immersiveengineering:sawmill",
				"energy": 1600,
				"input": { "item": logs },
				"result": { "count": 6, "item": planks },
				"secondaries": [
					{ "output": { "item": barks }, "stripping": true },
					{ "output": { "item": chips }, "stripping": false },
					{ "output": { "item": chips }, "stripping": false }
				],
				"stripped": { "item": stripped_logs }
			}),
			// 木切木板 - 沉浸工程
			event.custom({
				"type": "immersiveengineering:sawmill",
				"energy": 1600,
				"input": { "item": woods },
				"result": { "count": 6, "item": planks },
				"secondaries": [
					{ "output": { "item": barks }, "stripping": true },
					{ "output": { "item": chips }, "stripping": false },
					{ "output": { "item": chips }, "stripping": false }
				],
				"stripped": { "item": stripped_woods }
			}),
			// 原木切去皮原木 - 热力膨胀
			event.recipes.thermal.sawmill([Item.of(stripped_logs), Item.of(barks)], logs),
			// 去皮木切木板 - 热力膨胀
			event.recipes.thermal.sawmill([
				Item.of(planks, 6), 
				Item.of(chips).withChance(0.50), 
				Item.of(planks).withChance(0.25), 
				Item.of(planks).withChance(0.15)
			], stripped_logs),
			// 木切去皮木 - 热力膨胀
			event.recipes.thermal.sawmill([Item.of(stripped_woods), Item.of(barks)], woods),
			// 去皮木切木板 - 热力膨胀
			event.recipes.thermal.sawmill([
				Item.of(planks, 6), 
				Item.of(chips).withChance(0.50), 
				Item.of(planks).withChance(0.25), 
				Item.of(planks).withChance(0.15)
			], stripped_woods),
			// 木板切台阶 - 沉浸工程
			event.custom({
				"type": "immersiveengineering:sawmill",
				"energy": 1600,
				"input": { "item": planks },
				"result": { "count": 3, "item": slabs },
				"secondaries": [{ "output": { "item": chips }, "stripping": false }]
			}),
			// 木板切台阶 - 热力膨胀
			event.recipes.thermal.sawmill([Item.of(slabs, 2), Item.of(chips).withChance(0.50)], planks)
	};

	archwoodTypes("blue", ("arsdelight:cascading_bark"), ("createdieselgenerators:wood_chip"))
	archwoodTypes("red", ("arsdelight:blazing_bark"), ("createdieselgenerators:wood_chip"))
	archwoodTypes("purple", ("arsdelight:vexing_bark"), ("createdieselgenerators:wood_chip"))
	archwoodTypes("green", ("arsdelight:flourishing_bark"), ("createdieselgenerators:wood_chip"))

	// 单独为埃德木添加处理配方
	// 木板
	event.custom({
		"type": "immersiveengineering:sawmill",
		"energy": 1600,
		"input": { "item": "forbidden_arcanus:edelwood_log" },
		"result": { "count": 6, "item": "forbidden_arcanus:edelwood_planks" },
		"secondaries": [
			{ "output": { "item": bark }, "stripping": false },
			{ "output": { "item": chip }, "stripping": false },
			{ "output": { "item": chip }, "stripping": false }
		]
	})
	event.recipes.thermal.sawmill([Item.of("forbidden_arcanus:edelwood_planks", 6), Item.of(bark)], "forbidden_arcanus:edelwood_log")
	// 台阶
	event.custom({
		"type": "immersiveengineering:sawmill",
		"energy": 1600,
		"input": { "item": "forbidden_arcanus:edelwood_planks" },
		"result": { "count": 3, "item": "forbidden_arcanus:edelwood_slab" },
		"secondaries": [{ "output": { "item": chip }, "stripping": false }]
	})
	event.recipes.thermal.sawmill([Item.of("forbidden_arcanus:edelwood_slab", 2), Item.of(chip).withChance(0.50)], "forbidden_arcanus:edelwood_planks")

}

function woodenStuff(event) {
	// event.remove({ id: /createdieselgenerators:crushing\/wood_chip_.*/ })

	// 木屑
	event.recipes.createMilling([Item.of("createdieselgenerators:wood_chip"), Item.of("createdieselgenerators:wood_chip").withChance(0.80)], FD("tree_bark")) 
	event.recipes.createCrushing([Item.of("createdieselgenerators:wood_chip", 2), Item.of("createdieselgenerators:wood_chip").withChance(0.50)], FD("tree_bark"))

	// 秘金木屑
	event.recipes.createMilling([Item.of(KJ("aurum_sawdust")), Item.of(KJ("aurum_sawdust")).withChance(0.80)], KJ("aurum_bark")) 
	event.recipes.createCrushing([Item.of(KJ("aurum_sawdust", 2)), Item.of(KJ("aurum_sawdust")).withChance(0.50)], KJ("aurum_bark"))

	// 纸浆
	event.remove({ id: "create:mixing/cardboard_pulp" })
	// 纸浆 - 机械动力搅拌
	event.recipes.createMixing(CR("pulp"), [
		FD("tree_bark", 2),
		Fluid.of('minecraft:water', 250)
	])
	event.recipes.createMixing(CR("pulp"), [
		"3x createdieselgenerators:wood_chip",
		Fluid.of('minecraft:water', 250)
	])
	event.recipes.createMixing(Item.of('create:pulp', '{CustomModelData:1}'), [
		"2x #arsdelight:barks",
		Fluid.of('minecraft:water', 250)
	])
	event.recipes.createMixing(CR("pulp"), [
		CR("#pulpifiable", 6),
		Fluid.of('minecraft:water', 250)
	])
	// 纸浆 - 发酵
	event.recipes.createdieselgenerators.bulk_fermenting([Item.of(CR("pulp")), Item.of(CR("pulp")).withChance(0.50)],[
		FD("tree_bark"),
		Fluid.of('minecraft:water', 250)
	]).processingTime(400)
	event.recipes.createdieselgenerators.bulk_fermenting([Item.of(CR("pulp")), Item.of(CR("pulp")).withChance(0.50)],[
		"2x createdieselgenerators:wood_chip",
		Fluid.of('minecraft:water', 250)
	]).processingTime(400)
	event.recipes.createdieselgenerators.bulk_fermenting([Item.of('create:pulp', '{CustomModelData:1}'), Item.of('create:pulp', '{CustomModelData:1}').withChance(0.50)],[
		"#arsdelight:barks",
		Fluid.of('minecraft:water', 250)
	]).processingTime(400)

	// 秘金纸浆
	// 秘金纸浆 - 机械动力搅拌
	event.recipes.createMixing(KJ("aurum_pulp"), [
		KJ("aurum_bark", 2),
		Fluid.of('minecraft:water', 250)
	])
	event.recipes.createMixing(KJ("aurum_pulp"), [
		KJ("aurum_sawdust", 3),
		Fluid.of('minecraft:water', 250)
	])
	event.recipes.createMixing(KJ("aurum_pulp"), [
		FA("aurum_sapling", 4),
		Fluid.of('minecraft:water', 250)
	])
	// 秘金纸浆 - 发酵
	event.recipes.createdieselgenerators.bulk_fermenting([Item.of(KJ("aurum_pulp")), Item.of(KJ("aurum_pulp")).withChance(0.50)],[
		KJ("aurum_bark"),
		Fluid.of('minecraft:water', 250)
	]).processingTime(400)
	event.recipes.createdieselgenerators.bulk_fermenting([Item.of(KJ("aurum_pulp")), Item.of(KJ("aurum_pulp")).withChance(0.50)],[
		KJ("aurum_sawdust", 2),
		Fluid.of('minecraft:water', 250)
	]).processingTime(400)
	event.recipes.createdieselgenerators.bulk_fermenting([Item.of(KJ("aurum_pulp")), Item.of(KJ("aurum_pulp")).withChance(0.50)],[
		FA("aurum_sapling", 3),
		Fluid.of('minecraft:water', 250)
	]).processingTime(400)

	// 秘金硬纸板
	event.recipes.createPressing(Item.of('create:cardboard', '{CustomModelData:1}'), KJ("aurum_pulp"))
	event.recipes.thermalPress(Item.of('create:cardboard', '{CustomModelData:1}'), [KJ("aurum_pulp")]) // 热力冲压
	event.recipes.immersiveengineeringMetalPress(Item.of('create:cardboard', '{CustomModelData:1}'), KJ("aurum_pulp"), "immersiveengineering:mold_plate") // 沉浸冲压

	// 硬纸板箱
	event.remove({ id: "mekanism:cardboard_box" })
	event.shaped(Item.of(MEK('cardboard_box')), [
		'P',
		'P',
	], {
		P: CR("cardboard"),
	})

	// 安山锻造模板
	event.shapeless(KJ("andesite_upgrade_smithing_template", 4), [CR("cardboard"), CR("andesite_alloy")])

	// 匠魂模具
	event.recipes.createCompacting([TC('pattern')], [("createdieselgenerators:wood_chip"), ("createdieselgenerators:wood_chip")]) // 机械动力塑性
	event.recipes.thermalPress(TC('pattern'), ["createdieselgenerators:wood_chip"]) // 热力冲压
	event.recipes.immersiveengineeringMetalPress(TC('pattern'), "createdieselgenerators:wood_chip", "immersiveengineering:mold_plate") // 沉浸冲压
	// 木屑块切割
	event.recipes.createCutting([TC('pattern', 2)], "createdieselgenerators:chip_wood_block").processingTime(50) // 机械动力切割
	event.recipes.createCutting([TC('pattern')], "2x createdieselgenerators:chip_wood_slab").processingTime(50)
	event.recipes.immersiveengineeringSawmill(TC('pattern', 2), "createdieselgenerators:chip_wood_block", [])  // 沉浸切割
	event.recipes.immersiveengineeringSawmill(TC('pattern'), "createdieselgenerators:chip_wood_slab", [])
	event.recipes.thermal.sawmill([Item.of(TC('pattern'), 2), Item.of(TC('pattern')).withChance(0.25), ], "createdieselgenerators:chip_wood_block") // 热力切割
	event.recipes.thermal.sawmill([Item.of(TC('pattern')), Item.of(TC('pattern')).withChance(0.25), ], "createdieselgenerators:chip_wood_slab")

	// 硬纸板
	event.recipes.thermalPress(CR('cardboard'), [CR('pulp')]) // 热力冲压
	event.recipes.immersiveengineeringMetalPress(CR('cardboard'), CR('pulp'), "immersiveengineering:mold_plate") // 沉浸冲压
}

function andesiteMachine(event) {

	// 锯子
	let sawCraft = (event, output, material) => {
	event.shaped(output, [
		'BBA',
		'SSA',
	], {
		S: material,
		B: F('#cobblestone'),
		A: F('#rods/wooden'),
	})}
	sawCraft(event, KJ("stone_saw"), MC("flint"))
	sawCraft(event, KJ("iron_saw"), MC("iron_ingot"))
	sawCraft(event, KJ("diamond_saw"), MC("diamond"))
	event.smithing(KJ("netherite_saw"), KJ("diamond_saw"), MC("netherite_ingot")) // 下界合金锯

	// 动力构件 - 序列装配
	let transitional = 'kubejs:incomplete_kinetic_mechanism'
	event.recipes.createSequencedAssembly([
		'kubejs:kinetic_mechanism',
	], [TC('pattern'), '#minecraft:wooden_slabs'], [
		event.recipes.createDeploying(transitional, [transitional, CR('andesite_alloy')]),
		event.recipes.createDeploying(transitional, [transitional, CR('andesite_alloy')]),
		event.recipes.createDeploying(transitional, [transitional, F('#saws')])
	]).transitionalItem(transitional)
		.loops(1)
		.id('kubejs:kinetic_mechanism')
	// 序列装配简化合成
	let transitional2 = 'kubejs:incomplete_kinetic_mechanism'
	event.recipes.createSequencedAssembly([
		'kubejs:kinetic_mechanism',
	], [TC('pattern'), '#minecraft:wooden_slabs'], [
		event.recipes.createDeploying(transitional2, [transitional2, KJ('andesite_alloy_gear')]),
	]).transitionalItem(transitional2)
		.loops(1)
		.id('kubejs:kinetic_mechanism2')

	
	// 动力构件 - 无序合成
	event.shapeless(KJ('kinetic_mechanism'), [
		F('#saws'),
		CR('cogwheel'),
		CR('andesite_alloy'),
		'#minecraft:logs'
	]).id("kubejs:kinetic_mechanism_manual_only")
		.damageIngredient(Item.of(KJ('stone_saw')))
		.damageIngredient(Item.of(KJ('iron_saw')))
		.damageIngredient(Item.of(KJ('diamond_saw')))
		.damageIngredient(Item.of(KJ('netherite_saw')))
		.damageIngredient(Item.of('#forge:saws'))


	// 安山机器

	
	event.shaped(KJ('andesite_machine'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: CR('andesite_casing'),
		S: KJ('kinetic_mechanism')
	})

	let andesite_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:andesite_upgrade_smithing_template', 'kubejs:andesite_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: 'kubejs:andesite_machine', B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), 'kubejs:andesite_machine')
	}

	event.remove({ output: TE('drill_head') })
	event.shaped(TE('drill_head'), [
		'NN ',
		'NLP',
		' PL'
	], {
		N: MC('iron_nugget'),
		P: CR('iron_sheet'),
		L: TE('lead_ingot')
	})

	event.remove({ output: TE('saw_blade') })
	event.shaped(TE('saw_blade'), [
		'NPN',
		'PLP',
		'NPN'
	], {
		N: MC('iron_nugget'),
		P: CR('iron_sheet'),
		L: TE('lead_ingot')
	})

	andesite_machine('create:portable_storage_interface', 2)
	andesite_machine('create:encased_fan', 1, CR('propeller'))
	andesite_machine('create:mechanical_press', 1, MC('iron_block'))
	andesite_machine('create:mechanical_mixer', 1, CR('whisk'))
	andesite_machine('create:mechanical_drill', 1, TE('drill_head'))
	andesite_machine('create:mechanical_saw', 1, TE('saw_blade'))
	andesite_machine('create:deployer', 1, KJ('#hand'))
	andesite_machine('create:mechanical_harvester', 2)
	andesite_machine('create:mechanical_plough', 2)
	andesite_machine('thermal:device_tree_extractor', 1, MC('bucket'))
	andesite_machine(AE2('meteorite_compass'), 1, AE2('charged_certus_quartz_crystal'))
	andesite_machine(AE2('charger'), 1, MC('copper_ingot'))
	andesite_machine('thermal:dynamo_stirling', 1, TE('rf_coil'))
	andesite_machine('create:andesite_funnel', 4)
	andesite_machine('create:andesite_tunnel', 4)
	andesite_machine('kubejs:pipe_module_utility', 4)
	andesite_machine('create:mechanical_roller', 1, CR('crushing_wheel'))
	andesite_machine('create:contraption_controls', 1, MC('#buttons'))
	andesite_machine('create:rope_pulley', 1, SP('#ropes'))
	andesite_machine('createaddition:rolling_mill', 1, ('create:shaft'))
	andesite_machine('vintageimprovements:spring_coiling_machine', 1, ('vintageimprovements:spring_coiling_machine_wheel'))
	andesite_machine('vintageimprovements:vibrating_table', 1, ('vintageimprovements:iron_spring'))
	andesite_machine('vintageimprovements:belt_grinder', 1, ('vintageimprovements:grinder_belt'))
	andesite_machine('vintageimprovements:centrifuge', 1)
	andesite_machine('create_dd:kinetic_motor', 1, ('createaddition:copper_spool'))
	// andesite_machine('waterstrainer:strainer_base', 1, MC('iron_bars'))

	// event.remove({ output: 'create_dd:bronze_saw' })
	// event.smithing('create_dd:bronze_saw', 'create:mechanical_saw', 'create_dd:bronze_casing')
	// event.recipes.createMechanicalCrafting('create_dd:bronze_saw', "AB", { A: 'create:mechanical_saw', B: 'create_dd:bronze_casing' })
	// event.remove({ output: 'create_dd:bronze_drill' })
	// event.smithing('create_dd:bronze_drill', 'create:mechanical_drill', 'create_dd:bronze_casing')
	// event.recipes.createMechanicalCrafting('create_dd:bronze_drill', "AB", { A: 'create:mechanical_drill', B: 'create_dd:bronze_casing' })

}