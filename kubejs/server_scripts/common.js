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
	unwantedRecipes(event)


	// C1
    algalAndesite(event)
	woodProcess(event)
	woodenStuff(event)
    andesiteMachine(event) 

	// C1A
	rubberMatters(event)
	copperMachine(event)

	// C2
	electronTube(event)
	redstoneStuff(event)
	brassMachine(event)

	// C2A
	zincMachine(event)

	obsidianMachine(event)

	inductiveMachine(event)

	// C3
	radiant_coil(event)
	invarMachine(event)

	// C3A
	enderMachine(event)

	// C4
	circuits(event)
	fluixMachine(event)
})

let colours = ['white', 'orange', 'magenta', 'light_blue', 'lime', 'pink', 'purple', 'light_gray', 'gray', 'cyan', 'brown', 'green', 'blue', 'red', 'black', 'yellow']

function ifiniDeploying(output, input, tool) {
	return {
		"type": "create:deploying",
		"ingredients": [
			Ingredient.of(input).toJson(),
			Ingredient.of(tool).toJson()
		],
		"results": [
			Item.of(output).toResultJson()
		],
		"keepHeldItem": true
	}
}

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

function unwantedRecipes(event) {

	event.remove({ output: "twilightforest:uncrafting_table" })
	event.remove({ output: '#forge:coins' })
	event.remove({ input: '#forge:coins' })
	event.remove({ output: AE2('vibration_chamber') })
	event.remove({ output: AE2('inscriber') })
	event.remove({ output: AE2('quartz_glass') })

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
	event.shaped(Item.of(KJ("andesite_upgrade_smithing_template")), [
		'SSS',
		'SPS',
		'SSS'
	], {
		P: CR("andesite_alloy"),
		S: MC("paper"),
	})

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
		.id('kubejs:kinetic_mechanism1')
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
	andesite_machine('create:mechanical_roller', 1, CR('crushing_wheel'))
	andesite_machine('create:contraption_controls', 1, MC('#buttons'))
	andesite_machine('create:rope_pulley', 1, SP('#ropes'))
	andesite_machine('createaddition:rolling_mill', 1, ('create:shaft'))
	andesite_machine('vintageimprovements:spring_coiling_machine', 1, ('vintageimprovements:spring_coiling_machine_wheel'))
	andesite_machine('vintageimprovements:vibrating_table', 1, ('vintageimprovements:iron_spring'))
	andesite_machine('createmetallurgy:mechanical_belt_grinder', 1, ('createmetallurgy:sandpaper_belt'))
	andesite_machine('vintageimprovements:centrifuge', 1)
	andesite_machine('create_dd:kinetic_motor', 1, ('createaddition:copper_spool'))
	// andesite_machine('kubejs:pipe_module_utility', 4)
	// andesite_machine('create_optical:optical_source', 1, ('create_optical:optical_device'))
	// andesite_machine('create_optical:beam_focuser', 1, ('create_optical:polarizing_filter'))
	// andesite_machine('create_optical:hologram_source', 2, ('create_optical:zinc_coil'))
	// andesite_machine('create_optical:optical_receptor', 2, ('create_optical:copper_coil'))
	// andesite_machine('create_optical:heavy_optical_receptor', 2, ('create_optical:golden_coil'))
	// andesite_machine('create_optical:beam_condenser', 2, ('create_optical:rose_quartz_catalyst_coil'))
	// andesite_machine('waterstrainer:strainer_base', 1, MC('iron_bars'))

	switchCutting(event, "create:andesite_funnel", "create:andesite_tunnel")
	switchCraft(event, "create:andesite_funnel", "create:andesite_tunnel")

	event.remove({ output: "vintageimprovements:belt_grinder" })
	event.remove({ output: "vintageimprovements:grinder_belt" })

	let bronzeUpgrade = (id, amount, base, other_ingredient) => {
		event.remove({ output: id })
		event.smithing(Item.of(id, amount), 'create_dd:bronze_casing', 'kubejs:andesite_machine', other_ingredient)
		event.recipes.createMechanicalCrafting(Item.of(id, amount), "CAB", { C: 'create_dd:bronze_casing', A: 'kubejs:andesite_machine', B: other_ingredient })
		event.shapeless(id, [base, 'create_dd:bronze_casing'])
	}
	bronzeUpgrade('create_dd:bronze_saw', 1, ('create:mechanical_saw'), ('thermal:saw_blade'))
	bronzeUpgrade('create_dd:bronze_drill', 1, ('create:mechanical_drill'), ('thermal:drill_head'))

	event.remove({ output: "vintageimprovements:vacuum_chamber" })
	event.smithing(Item.of("vintageimprovements:vacuum_chamber", 1), "create_dd:bronze_casing", "kubejs:andesite_machine", "create:mechanical_pump")
	event.recipes.createMechanicalCrafting(Item.of("vintageimprovements:vacuum_chamber", 1), "CAB", { C: 'create_dd:bronze_casing', A: 'kubejs:andesite_machine', B: "create:mechanical_pump" })


}

function rubberMatters(event) {
	event.remove({ id: 'thermal:rubber_3' })
	event.remove({ id: 'thermal:rubber_from_dandelion' })
	event.remove({ id: 'thermal:rubber_from_vine' })
	event.remove({ id: /create_dd:emptying\/sap_from_.*/ })
	event.remove({ id: 'create_dd:mixing/raw_rubber' })
	event.remove({ id: 'create_dd:compacting/crystallized_sap' })
	event.replaceInput({ id: 'create_dd:mixing/rubber_sapling' }, ('create_dd:crystallized_sap'), ('darkerdepths:amber'))

	event.remove({ id: TE('compat/biomesoplenty/tree_extractor_bop_magic') })

	// let overrideTreeOutput = (id, trunk, leaf, sapling, fluid, count) => {
	// 	event.remove({ id: id })
	// 	event.custom({
	// 		"type": "thermal:tree_extractor",
	// 		"trunk": {
	// 			"name": trunk
	// 		},
	// 		"leaves": {
	// 			"name": leaf
	// 		},
	// 		"sapling": sapling,
	// 		"min_height": 4,
	// 		"max_height": 16,
	// 		"min_leaves": 16,
	// 		"max_leaves": 24,
	// 		"result": {
	// 			"fluid": fluid,
	// 			"amount": count
	// 		}
	// 	});
	// }

	// 原版树
	// overrideTreeOutput(TE('devices/tree_extractor/tree_extractor_jungle'), MC("jungle_log"), MC("jungle_leaves"), MC("jungle_sapling"), "thermal:resin", 25)
	// overrideTreeOutput(TE('devices/tree_extractor/tree_extractor_spruce'), MC('spruce_log'), MC('spruce_leaves'), MC('spruce_sapling'), "thermal:resin", 25)
	// overrideTreeOutput(TE('devices/tree_extractor/tree_extractor_dark_oak'), MC('dark_oak_log'), MC('dark_oak_leaves'), MC('dark_oak_sapling'), "thermal:resin", 25)
	// overrideTreeOutput(TE('devices/tree_extractor/tree_extractor_acacia'), MC('acacia_log'), MC('acacia_leaves'), MC('acacia_sapling'), "thermal:resin", 35)
	// overrideTreeOutput(TE('compat/biomesoplenty/tree_extractor_bop_maple'), MC('oak_log'), ('biomesoplenty:maple_leaves'), ('biomesoplenty:maple_sapling'), "thermal:syrup", 25)
	// // 橡胶树
	// overrideTreeOutput("", ('create_dd:rubber_log'), ('create_dd:rubber_leaves'), ('create_dd:rubber_sapling'), "thermal:resin", 50)
	// overrideTreeOutput("", ('thermal:rubberwood_log'), ('thermal:rubberwood_leaves'), ('thermal:rubberwood_sapling'), "thermal:resin", 50)
	// // 特种树
	// overrideTreeOutput(TE('compat/biomesoplenty/tree_extractor_bop_magic'), Item.of('biomesoplenty:magic_log'), Item.of('biomesoplenty:magic_leaves'), Item.of('biomesoplenty:magic_sapling'), "kubejs:mana_resin", 25)

	event.remove({ id: ('create_dd:crafting/mechanical_belt_from_rubber') })
	event.shaped(Item.of('4x create:belt_connector', '{CustomModelData:1}'), [
		'SSS',
		'SSS'
	], {
		S: TE('cured_rubber')
	})

	event.blasting(Item.of('thermal:cured_rubber', 4), 'rubber_duck:rubber_duck_item').cookingTime(100)

	event.recipes.createMixing('1x ' + TE("rubber"), [Fluid.of(MC('water'), 250), MC("vine", 4)])
	event.recipes.createMixing('1x ' + TE("rubber"), [Fluid.of(MC('water'), 250), '4x #minecraft:flowers'])
	event.recipes.createCompacting(Item.of('thermal:rubber', '{CustomModelData:1}'), [Fluid.of(KJ('mana_resin'), 250)])
	event.recipes.createMixing('1x ' + TE("rubber"), [Fluid.of(TE('latex'), 250)])

	event.recipes.createCompacting('1x ' + ("darkerdepths:amber"), [Fluid.of(TE('resin'), 250)])
	event.recipes.createMixing(Fluid.of(TE('latex'), 250), [Fluid.of(TE('resin'), 300)])
	event.recipes.createMixing([Fluid.of(TE('latex'), 1000), Fluid.of(('manaliquidizer:mana_fluid'), 1)], [Fluid.of(KJ('mana_resin'), 1000)])
	event.custom({
		"type": "vintageimprovements:centrifugation",
		"ingredients": [
			{
				"fluid": "kubejs:mana_resin",
				"amount": 750
			}
		],
		"results": [
			{
				"fluid": "thermal:latex",
				"amount": 750
			},
			{
				"fluid": "manaliquidizer:mana_fluid",
				"amount": 1
			}
		],
		"processingTime": 200
	})
	event.custom({
  		"type": "create:mixing",
  		"heatRequirement": "lowheated",
  		"ingredients": [
  		  {
  		    "item": "darkerdepths:amber"
   		 }
 		 ],
 		 "results": [
 		   {
 		     "amount": 250,
  		    "fluid": "thermal:resin"
  		  }
 		 ]
	});

	// 细硫粉
	event.recipes.createEmptying([Fluid.of(KJ('fine_sulfur'), 250)], TE('sulfur_dust'))

	// 硫化橡胶 - 沉浸合金窑 - x2 定位：前期倍产
	event.recipes.immersiveengineeringAlloy(Item.of('2x thermal:cured_rubber'), ('thermal:rubber'), [('thermal:sulfur'), ('thermal:sulfur_dust')])
	// 硫化橡胶 - 机械动力加压处理 - x4 定位：前期倍产
	event.custom({
		"type": "vintageimprovements:pressurizing",
		"secondaryFluidInput": 0,
		"secondaryFluidOutput": 0,
		"heatRequirement": "lowheated",
		"ingredients": [
			{
				"tag": "forge:dusts/sulfur"
			},
			{
				"fluid": "thermal:latex",
				"amount": 250
			}
		],
		"results": [
			{
				"item": "thermal:cured_rubber",
				"count": 3
			},
			{
				"fluid": "mekanism:sulfur_dioxide",
				"amount": 50
			}
		],
		"processingTime": 200
	});
	event.custom({
		"type": "vintageimprovements:pressurizing",
		"secondaryFluidInput": 0,
		"secondaryFluidOutput": 0,
		"heatRequirement": "lowheated",
		"ingredients": [
			{
				"tag": "forge:dusts/sulfur"
			},
			{
				"item": "thermal:rubber"
			}
		],
		"results": [
			{
				"item": "thermal:cured_rubber",
				"count": 4
			},
			{
				"fluid": "mekanism:sulfur_dioxide",
				"amount": 50
			}
		],
		"processingTime": 200
	});
	// 硫化橡胶 - 热力感应炉 - x6 定位：中期倍产
	event.remove({ id: TE('machines/smelter/smelter_cured_rubber') })
	event.custom({
  		"type": "thermal:smelter",
 		 "ingredients": [
  		  {
   		   "item": "thermal:rubber",
    		  "count": 2
  		  },
  		  {
   		   "value": [
   		     {
    		      "tag": "forge:gems/sulfur"
   		     },
   		     {
   		       "tag": "forge:dusts/sulfur"
    		 }
  		    ],
 		    "count": 1
		    }
		  ],
 		 "result": [
 		   {
 		     "item": "thermal:cured_rubber",
  		    "count": 12
 		   }
 		 ]
	});
	// 硫化橡胶 - mek加压反应室 - x6 定位：获取化学品
	event.custom({
		"type":"mekanism:reaction",
		"duration":100,
		"fluidInput":{
			"amount":250,
			"fluid":"kubejs:fine_sulfur"},
		"gasInput":{
			"amount":100,
			"gas":"mekanism:oxygen"},
			"gasOutput":{
				"amount":100,
			"gas":"mekanism:sulfur_dioxide"},
			"itemInput":{
			"ingredient":{"item":"thermal:rubber"}},
			"itemOutput":{"count":6,"item":"thermal:cured_rubber"}
	});
	// 硫化橡胶 - 气动热气动加工机 - x12 定位：中期倍产
	event.custom({
 		 "type": "pneumaticcraft:thermo_plant",
 		 "exothermic": true,
  		"fluid_input": {
 		   "type": "pneumaticcraft:fluid",
 		   "amount": 250,
   		 "fluid": "kubejs:fine_sulfur"
 		 },
 		 "fluid_output": {
 		   "amount": 5,
 		   "fluid": "mekanism:sulfur_dioxide"
 		 },
 		 "item_input": {
 		   "item": "thermal:rubber"
 		 },
 		 "item_output": {
   			 "item": "thermal:cured_rubber",
			 "count": 12
  		},
 		 "speed": 0.6,
 		 "pressure": 1.5,
 		 "temperature": {
 		   "max_temp": 473.15,
  		  "min_temp": 413.15}
	});
}

function copperMachine(event) {

	// 密封构件
	let t = KJ('incomplete_sealed_mechanism')
	event.recipes.createSequencedAssembly([
		KJ('sealed_mechanism'),
	], KJ('kinetic_mechanism'), [
		event.recipes.createDeploying(t, [t, TE('cured_rubber')]),
		event.recipes.createDeploying(t, [t, TE('cured_rubber')]),
		// event.recipes.createDeploying(t, [t, F('#super_glues')])
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:sealed_mechanism')

	event.shaped(KJ('sealed_mechanism'), [
		'SCS'
	], {
		C: KJ('kinetic_mechanism'),
		S: TE('cured_rubber')
	})

	// 铜机器

	event.shaped(KJ('copper_machine'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: CR('copper_casing'),
		S: KJ('sealed_mechanism')
	})

	// 治炼炉核心
	event.remove({ id: TC("smeltery/casting/seared/smeltery_controller") })
	// event.remove({ id: TC("smeltery/melting/copper/smeltery_controller") })
	donutCraft(event, TC('smeltery_controller'), TC('seared_bricks'), KJ('sealed_mechanism'))

	let copper_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:andesite_upgrade_smithing_template', 'kubejs:copper_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: 'kubejs:copper_machine', B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), 'kubejs:copper_machine')
	}

	copper_machine('create:copper_backtank', 1, MC("copper_block"))
	copper_machine('create:portable_fluid_interface', 2)
	copper_machine('create:spout', 1, MC('hopper'))
	copper_machine('thermal:upgrade_augment_1', 1, MC('redstone'))
	copper_machine('create:hose_pulley', 1)
	copper_machine('create:item_drain', 1, MC("iron_bars"))
	copper_machine('thermal:dynamo_magmatic', 1, TE('rf_coil'))
	copper_machine('thermal:device_water_gen', 1, MC('bucket'))
	copper_machine('create:smart_fluid_pipe', 2)
	copper_machine('create_enchantment_industry:disenchanter', 1, CR('#sandpaper'))
	copper_machine('create_enchantment_industry:printer', 1, F('#plates/iron'))
	copper_machine('create:steam_engine', 1, 'createdieselgenerators:engine_piston')
	copper_machine('create:steam_whistle', 1, F('#plates/gold'))
	copper_machine('cookingforblockheads:sink', 1, MC('heart_of_the_sea'))
	copper_machine('create_dd:hydraulic_press', 1, 'create_dd:bronze_block')
	copper_machine('compressedcreativity:air_blower', 1, ('pneumaticcraft:pressure_tube'))
	copper_machine('compressedcreativity:compressed_air_engine', 1, ('pneumaticcraft:turbine_rotor'))
	// copper_machine('pipez:basic_upgrade', 4, CRD('integrated_circuit'))
	// copper_machine('create_optical:thermal_optical_source', 1, ('create_optical:optical_device'))
	// copper_machine('vintageimprovements:vacuum_chamber', 1, CR('mechanical_pump'))

	event.remove({ output: 'createdieselgenerators:pumpjack_hole' })
	event.custom({"type": "vintageimprovements:turning","ingredients": [{"item": "kubejs:copper_machine"}],"results": [{"item": "createdieselgenerators:pumpjack_hole","count": 1}]})

	
}

function electronTube(event) {
	event.remove({ id: CR('compat/ae2/milling/sky_stone_block') })
	event.remove({ id: CR('crafting/materials/electron_tube') })
	event.remove({ id: ('createutilities:shaped/graviton_tube') })
	event.remove({ id: CR('crafting/materials/rose_quartz') })
	// event.remove({ id: CR('compat/ae2/milling/nether_quartz') })
	// event.remove({ id: CR('compat/ae2/milling/certus_quartz') })

	event.recipes.createFilling(CR("electron_tube"), [CR('polished_rose_quartz'), Fluid.of(TC('molten_iron'), 20)])
	event.recipes.createFilling(Item.of('create:electron_tube', '{CustomModelData:1}'), [CR('polished_rose_quartz'), Fluid.of(TC('molten_nickel'), 20)])
	event.recipes.createFilling(("createutilities:graviton_tube"), [('createutilities:polished_amethyst'), Fluid.of(TE('ender'), 20)])

	// 注液催熟 (只剩下下界石英还在奋战)
	event.recipes.createMechanicalCrafting(Item.of(KJ('nether_seed'), 2), ['A'], { A: F('#gems/quartz') })

	let grow = (from, via, to, id) => {
		event.recipes.createSequencedAssembly([to], from, [
			event.recipes.createFilling(via, [via, Fluid.of(MC("water"), 500)]),
		]).transitionalItem(via)
			.loops(4)
			.id('kubejs:grow_' + id)
	}

	grow(KJ("nether_seed"), KJ('growing_nether_seed'), KJ('tiny_nether_crystal'), "tiny_nether_crystal")
	grow(KJ("tiny_nether_crystal"), KJ('growing_tiny_nether_crystal'), KJ('small_nether_crystal'), "small_nether_crystal")
	grow(KJ("small_nether_crystal"), KJ('growing_small_nether_crystal'), Item.of('minecraft:quartz', '{CustomModelData:1}'), "quartz_crystal")

	// 水晶物品化
	event.custom({"type": "farmersdelight:cutting","ingredients": [{"item": "minecraft:amethyst_cluster"}],"result": [{"count": 4, "item": "minecraft:amethyst_shard"}],"tool": {"tag": "forge:tools/knives"}})
	event.custom({"type": "farmersdelight:cutting","ingredients": [{"item": "ae2:quartz_cluster"}],"result": [{"count": 4, "item": "ae2:certus_quartz_crystal"}],"tool": {"tag": "forge:tools/knives"}})
	event.custom({"type": "farmersdelight:cutting","ingredients": [{"item": "biomesoplenty:rose_quartz_cluster"}],"result": [{"count": 4, "item": "biomesoplenty:rose_quartz_chunk"}],"tool": {"tag": "forge:tools/knives"}})

	event.custom({"type": "create:item_application","ingredients": [{"item": "minecraft:amethyst_cluster"},{"tag": "forge:tools/knives"}],"results": [{"count": 4, "item": "minecraft:amethyst_shard"}]})
	event.custom({"type": "create:item_application","ingredients": [{"item": "ae2:quartz_cluster"},{"tag": "forge:tools/knives"}],"results": [{"count": 4, "item": "ae2:certus_quartz_crystal"}]})
	event.custom({"type": "create:item_application","ingredients": [{"item": "biomesoplenty:rose_quartz_cluster"},{"tag": "forge:tools/knives"}],"results": [{"count": 2, "item": "biomesoplenty:rose_quartz_chunk"}]})
	

	// 陨石粉
	event.remove({ output: AE2("sky_dust") })
	event.recipes.createMilling([AE2('sky_dust'), AE2('sky_stone_block')], AE2('sky_stone_block')).processingTime(1000)
	event.recipes.createMixing(Fluid.of(KJ("sky_stone"), 500), [AE2('sky_dust', 4), Fluid.of(MC('water'), 500)])

	event.recipes.createMixing(CR('polished_rose_quartz'), [[AE2('certus_quartz_crystal'), KJ('purified_certus_quartz_crystal')], Fluid.of(TE("redstone"), 250)])

	// 不稳红石
	event.recipes.createMixing([AE2('certus_quartz_crystal'), Fluid.of(TE('redstone'), 250)], [AE2('charged_certus_quartz_crystal'), Fluid.of(KJ('sky_stone'), 250)])
	event.custom({
		"type": "vintageimprovements:centrifugation",
		"ingredients": [
			{
				"item": "ae2:charged_certus_quartz_crystal"
			},
			{
				"fluid": "kubejs:sky_stone",
				"amount": 250
			}
		],
		"results": [
			{
				"item": "ae2:certus_quartz_crystal"
			},
			{
				"fluid": "thermal:redstone",
				"amount": 500
			}
		],
		"processingTime": 200
	})

	// 充能萤石
	event.recipes.createMixing([AE2('certus_quartz_crystal'), Fluid.of(TE('glowstone'), 125)], [AE2('charged_certus_quartz_crystal'), Fluid.of(MC('lava'), 125)])
	event.custom({
		"type": "vintageimprovements:centrifugation",
		"ingredients": [
			{
				"item": "ae2:charged_certus_quartz_crystal"
			},
			{
				"fluid": "minecraft:lava",
				"amount": 250
			}
		],
		"results": [
			{
				"item": "ae2:certus_quartz_crystal"
			},
			{
				"fluid": "thermal:glowstone",
				"amount": 250
			}
		],
		"processingTime": 200
	})
}

function redstoneStuff(event) {

	// 红石伺服器
	event.shaped(Item.of('thermal:redstone_servo', '{CustomModelData:1}'), [
			'S',
			'B',
			'S'
		], {
			S: MC('redstone'),
			B: TE('lead_ingot'),
	})
	event.recipes.createFilling(TE("redstone_servo"), [MC('iron_ingot'), Fluid.of(TE('redstone'), 200)])
	event.recipes.createFilling(Item.of('thermal:redstone_servo', '{CustomModelData:1}'), [TE('lead_ingot'), Fluid.of(TE('redstone'), 200)])

	// 红石根
	event.shapeless(BO("redstone_root"), [MC('redstone'), ["twilightforest:liveroot", BO("living_root")]])
	event.recipes.createFilling(BO("redstone_root"), [[MC("grass"), MC("fern"), "twilightforest:liveroot", BO("living_root")], Fluid.of(TE('redstone'), 100)])

	// 红图
	event.recipes.createFilling(TE("redprint"), [MC('paper'), Fluid.of(TE('redstone'), 200)])

	// 匠魂浇筑
	let redstoneTransmute = (input, output, type, amount) => {
		event.custom({
			"type": "tconstruct:" + type,
			"cast": { "item": input },
			"cast_consumed": true,
			"fluid": {
				"name": "thermal:redstone",
				"amount": amount
			},
			"result": output,
			"cooling_time": 30
		})
	}
	redstoneTransmute(MC("cobblestone"), MC("netherrack"), "casting_basin", 50)
	redstoneTransmute(MC("sand"), MC("red_sand"), "casting_basin", 50)
	redstoneTransmute(MC('iron_ingot'), TE("redstone_servo"), "casting_table", 200) // 红石伺服器
	redstoneTransmute(MC('paper'), TE("redprint"), "casting_table", 200) // 红图
	redstoneTransmute("twilightforest:liveroot", BO("redstone_root"), "casting_table", 100) // 红石根
	redstoneTransmute(BO("living_root"), BO("redstone_root"), "casting_table", 100)

	// 红石酸 - 物品栏合成
	event.remove({ id: "immersiveengineering:crafting/redstone_acid" })
	event.custom({
		"type":"immersiveengineering:no_container_item",
		"baseRecipe":{
			"type":"minecraft:crafting_shapeless",
			"category":
			"misc",
			"ingredients":[{
				"tag":"forge:dusts/redstone"},{
				"tag":"forge:dusts/redstone"},{
				"tag":"forge:dusts/redstone"},{
				"tag":"forge:dusts/redstone"},{
				"item":"mekanism:sulfur_trioxide_bucket"}],
			"result":{
				"item":"immersiveengineering:redstone_acid_bucket"}
	}});
	// 红石酸 - 机械动力搅拌
	event.recipes.createMixing(Fluid.of(IM('redstone_acid'), 250), [Fluid.of(TE('redstone'), 100), Fluid.of(MEK('sulfur_trioxide'), 250)])
	event.recipes.createMixing(Fluid.of(IM('redstone_acid'), 250), [MC("redstone"), Fluid.of(MEK('sulfur_trioxide'), 250)])
	// 红石酸 - 沉浸搅拌机
	event.remove({ id: "immersiveengineering:mixer/redstone_acid" })
	event.custom({
		"type":"immersiveengineering:mixer",
		"energy":1600,
		"fluid":{
			"amount":500,
			"tag":"forge:sulfur_trioxide"},
		"inputs":[
			{"tag":"forge:dusts/redstone"}],
		"result":{
			"amount":500,
			"fluid":"immersiveengineering:redstone_acid"}
	});
	
}

function brassMachine(event) {

	// 精密构件 - 100% 电子管安装
	event.remove({ id: CR("sequenced_assembly/precision_mechanism") })
	let t = CR('incomplete_precision_mechanism')
	event.recipes.createSequencedAssembly([
		Item.of('create:precision_mechanism', '{CustomModelData:1}'),
	], KJ('kinetic_mechanism'), [
		event.recipes.createDeploying(t, [t, [CR('electron_tube')]]),
		event.recipes.createDeploying(t, [t, CR('electron_tube')]),
		// event.custom({"type": "create_optical:focusing","ingredients": [{"item": t}],"processingTime": 40,"required_beam_type": 2,"results": [{"item": t}]}),
		event.recipes.createDeploying(t, [t, F('#screwdrivers')])
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:precision_mechanism1')

	let t1 = CR('incomplete_precision_mechanism')
	event.recipes.createSequencedAssembly([
		Item.of('create:precision_mechanism', '{CustomModelData:2}'),
	], KJ('kinetic_mechanism'), [
		event.recipes.createDeploying(t, [t, [IM('electron_tube')]]),
		event.recipes.createDeploying(t, [t, F('#screwdrivers')])
	]).transitionalItem(t1)
		.loops(1)
		.id('kubejs:precision_mechanism2')

	// 精密构件 - 25%
	let t2 = CR('incomplete_precision_mechanism')
	event.recipes.createSequencedAssembly([
		Item.of('create:precision_mechanism', '{CustomModelData:1}').withChance(0.25),
		Item.of(KJ("broken_precision_mechanism")).withChance(0.75),
	], CR('golden_sheet'), [
		event.recipes.createDeploying(t2, [t2, CR('electron_tube')]),
		event.recipes.createDeploying(t2, [t2, F('#screwdrivers')])
	]).transitionalItem(t2)
		.loops(2)
		.id('kubejs:precision_mechanism3')

	// 回收破损构件
	event.recipes.createMilling(["2x create:electron_tube"], KJ("broken_precision_mechanism")).processingTime(300)
	event.recipes.thermal.sawmill("2x create:electron_tube", ["kubejs:broken_precision_mechanism"]).energy(500)

	event.remove({ output: "create_connected:control_chip" })
	event.replaceInput({ id: 'create_connected:crafting/kinetics/sequenced_pulse_generator' }, 'create_connected:control_chip', 'kubejs:kinetic_mechanism')

	// 黄铜机器
	event.shaped(KJ('brass_machine'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: CR('brass_casing'),
		S: CR('precision_mechanism')
	})

	let brass_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:andesite_upgrade_smithing_template', 'kubejs:brass_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: 'kubejs:brass_machine', B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), 'kubejs:brass_machine')
	}

	brass_machine('create:mechanical_crafter', 3, MC('crafting_table'))
	brass_machine('create:sequenced_gearshift', 2)
	brass_machine('create:rotation_speed_controller', 1)
	brass_machine('create:mechanical_arm', 1)
	brass_machine('create:stockpile_switch', 2)
	brass_machine('create:content_observer', 2)
	brass_machine('thermal:machine_press', 1, MC('dropper'))
	brass_machine('torchmaster:feral_flare_lantern', 1, MC('glowstone_dust'))
	brass_machine('thermal:dynamo_numismatic', 1, TE('rf_coil'))
	brass_machine('create:brass_funnel', 4)
	brass_machine('create:brass_tunnel', 4)
	brass_machine('create:elevator_pulley', 1, SP('#ropes'))
	brass_machine('createdieselgenerators:diesel_engine', 1, 'createdieselgenerators:engine_piston')
	brass_machine('createaddition:portable_energy_interface', 2, 'createaddition:copper_spool')
	brass_machine('vintageimprovements:laser', 1, 'vintageimprovements:laser_item')
	brass_machine('create_dd:accelerator_motor', 1, 'createaddition:electrum_spool')
	brass_machine('create:display_link', 1, CR('transmitter'))
	// brass_machine(PP('item_terminal'), 1, TE('diamond_gear'))
	// brass_machine(PP('pressurizer'), 1, CR('propeller'))
	// brass_machine('prettypipes:pipe', 8)
	// brass_machine('kubejs:pipe_module_tier_1', 4)


	switchCutting(event, "create:brass_funnel", "create:brass_tunnel")
	switchCraft(event, "create:brass_funnel", "create:brass_tunnel")

	event.remove({ output: "create_dd:reinforcement_plating" })
	event.shaped(('4x create_dd:reinforcement_plating'), [
		'SCS',
		'C C',
		'SCS'
	], {
		C: [('create_dd:industrial_iron_ingot'), ('create_dd:steel_ingot')],
		S: ('create_dd:bronze_ingot')
	})

	let smithingUpgrade = (id, amount, base, casing, machine, other_ingredient) => {
		event.remove({ output: id })
		event.smithing(Item.of(id, amount), casing, machine, other_ingredient)
		event.recipes.createMechanicalCrafting(Item.of(id, amount), "CAB", { C: casing, A: machine, B: other_ingredient })
		event.shapeless(id, [base, casing])
	}
	smithingUpgrade('createdieselgenerators:large_diesel_engine', 1, ('createdieselgenerators:diesel_engine'), [('create_dd:industrial_iron_ingot'), ('create_dd:steel_ingot')], ('kubejs:brass_machine'), ('createdieselgenerators:engine_piston'))
	smithingUpgrade('createdieselgenerators:huge_diesel_engine', 1, [('createdieselgenerators:large_diesel_engine'), ('createdieselgenerators:diesel_engine')], ('create_dd:reinforcement_plating'), ('kubejs:brass_machine'), ('create:steam_engine'))
}

function zincMachine(event) {
	event.remove({ id: TC('smeltery/casting/scorched/foundry_controller') })
	event.remove({ id: TC('smeltery/melting/soul/sand') })
	event.remove({ id: CRD('sequenced_assembly/infernal_mechanism') })

	//焦黑炉核心
	donutCraft(event, TC('foundry_controller'), TC('scorched_bricks'), KJ('infernal_mechanism'))

	event.recipes.createMixing(Fluid.of(TC("liquid_soul"), 500), [MC('twisting_vines'), MC('weeping_vines')]).heated()

	// 余烬合金
	event.recipes.createMixing(CRD('ember_alloy', 2), [CRD('smoked_planks'), CR('cinder_flour'), Fluid.of(TC("blazing_blood"), 50)]).heated()
	event.recipes.createMixing(CRD('ember_alloy', 2), [CRD('smoked_planks'), Fluid.of(TC("liquid_soul"), 250), Fluid.of(TC("blazing_blood"), 50)]).heated()

	// 酷热构件
	let t = KJ('incomplete_infernal_mechanism')
	event.recipes.createSequencedAssembly([
		KJ('infernal_mechanism'),
	], CR('precision_mechanism'), [
		event.recipes.createFilling(t, [t, Fluid.of(TC("liquid_soul"), 500)]),
		event.recipes.createFilling(t, [t, Fluid.of(MC("lava"), 1000)]),
		event.recipes.createFilling(t, [t, Fluid.of(MC("lava"), 1000)]),
		event.recipes.createFilling(t, [t, Fluid.of(MC("lava"), 1000)])
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:infernal_mechanism1')

	let t1 = KJ('incomplete_infernal_mechanism')
	event.recipes.createSequencedAssembly([
		KJ('infernal_mechanism'),
	], CR('precision_mechanism'), [
		event.recipes.createDeploying(t1, [t1, CRD('ember_alloy')]),
		event.recipes.createDeploying(t1, [t1, CRD('ember_alloy')]),
		event.recipes.createDeploying(t1, [t1, F('#saws')])
	]).transitionalItem(t1)
		.loops(1)
		.id('kubejs:infernal_mechanism2')

	// 锌机器
	event.shaped(KJ('zinc_machine'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: [KJ('zinc_casing'), CRD('zinc_casing')],
		S: KJ('infernal_mechanism')
	})

	let zinc_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:andesite_upgrade_smithing_template', 'kubejs:zinc_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: 'kubejs:zinc_machine', B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), 'kubejs:zinc_machine')
	}

	zinc_machine(TE('device_rock_gen'), 1, MC('piston'))
	zinc_machine(TE('device_collector'), 1, MC('ender_pearl'))
	zinc_machine(TE('device_nullifier'), 1, MC('lava_bucket'))
	zinc_machine(TE('device_potion_diffuser'), 1, MC('glass_bottle'))
	zinc_machine('storagedrawers:controller', 1, MC('diamond'))
	zinc_machine('storagedrawers:controller_slave', 1, MC('gold_ingot'))
	zinc_machine('torchmaster:megatorch', 1, MC('torch'))
	zinc_machine('thermal:upgrade_augment_2', 1, MC('redstone'))
	zinc_machine('create_dd:industrial_fan', 1, ['create:propeller', 'ad_astra:fan'])
	zinc_machine('createdieselgenerators:distillation_controller', 1)
	// zinc_machine('pipez:improved_upgrade', 4, CRD('integrated_circuit'))

	let pumpjack = (id) => {
		event.remove({ output: id })
		event.custom({
		"type": "vintageimprovements:turning",
		"ingredients": [
			{
				"item": "kubejs:zinc_machine"
			}
		],
		"results": [
			{
				"item": id,
				"count": 1
			}
		]
		})
	}
	pumpjack("createdieselgenerators:pumpjack_crank")
	pumpjack("createdieselgenerators:pumpjack_head")
	pumpjack("createdieselgenerators:pumpjack_bearing")

}

function obsidianMachine(event) {

	// 坚固板
	event.remove({ id: 'create:sequenced_assembly/sturdy_sheet' })
	let ss = 'create:unprocessed_obsidian_sheet'
	event.recipes.createSequencedAssembly([
		Item.of(CR('sturdy_sheet')).withChance(0.3),
		Item.of('create:unprocessed_obsidian_sheet', '{SequencedAssembly:{Progress:0.33333334f,Step:1,id:"kubejs:sturdy_sheet"}}').withChance(0.7),
	], CR('powdered_obsidian'), [
		event.recipes.createFilling(ss, [ss, Fluid.of(MC("lava"), 500)]),
		event.recipes.createPressing(ss, ss),
		event.recipes.createPressing(ss, ss)
	]).transitionalItem(ss)
		.loops(1)
		.id("kubejs:sturdy_sheet")

	event.custom({
 		 "type": "pneumaticcraft:thermo_plant",
 		 "exothermic": false,
 		 "fluid_input": {
 		   "type": "pneumaticcraft:fluid",
  		  "amount": 300,
  		  "fluid": "minecraft:lava"
 		 },
 		 "item_input": {
 		   "item": "create:powdered_obsidian"
  		},
 		 "item_output": {
 		   "item": "create:sturdy_sheet"
  		},
 		 "pressure": 4.0,
 		 "speed": 0.3,
 		 "temperature": {
 		   "min_temp": 323.15
 		 }
	})
	event.custom({
 		 "type": "pneumaticcraft:thermo_plant",
 		 "exothermic": false,
 		 "fluid_input": {
 		   "type": "pneumaticcraft:fluid",
  		  "amount": 250,
  		  "fluid": "minecraft:lava"
 		 },
 		 "item_input": {
 		   "item": "create:powdered_obsidian"
  		},
 		 "item_output": {
 		   "item": "create:sturdy_sheet"
  		},
 		 "pressure": 3.5,
 		 "speed": 0.5,
 		 "temperature": {
 		   "min_temp": 443.15
 		 }
	})
	event.custom({
 		 "type": "pneumaticcraft:thermo_plant",
 		 "exothermic": false,
 		 "fluid_input": {
 		   "type": "pneumaticcraft:fluid",
  		  "amount": 125,
  		  "fluid": "minecraft:lava"
 		 },
 		 "item_input": {
 		   "item": "create:powdered_obsidian"
  		},
 		 "item_output": {
 		   "item": "create:sturdy_sheet"
  		},
 		 "pressure": 3.0,
 		 "speed": 0.7,
 		 "temperature": {
 		   "min_temp": 773.15
 		 }
	})



	// 坚固构件
	let sm = KJ('incomplete_sturdy_mechanism')
	event.recipes.createSequencedAssembly([
		KJ('sturdy_mechanism'),
	], CR('precision_mechanism'), [
		event.recipes.createDeploying(sm, [sm, CR('sturdy_sheet')]),
		event.recipes.createDeploying(sm, [sm, CR('sturdy_sheet')])
	]).transitionalItem(sm)
		.loops(1)
		.id('kubejs:sturdy_mechanism')

	// 黑曜石机器
	event.shaped(KJ("obsidian_machine"), [
		"SSS",
		"SCS",
		"SSS"
	], {
		C: [CR("railway_casing")],
		S: KJ("sturdy_mechanism")
	})

	let obsidian_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:andesite_upgrade_smithing_template', "kubejs:obsidian_machine", other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: "kubejs:obsidian_machine", B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), "kubejs:obsidian_machine")
	}
	obsidian_machine(CR("track_station"), 1, MC("compass"))
	obsidian_machine(CR("track_signal"), 1, CR("electron_tube"))
	obsidian_machine(CR("track_observer"), 1, MC("observer"))
	obsidian_machine(CR("controls"), 1, MC("lever"))
}

function inductiveMachine(event) {

	// 美工刀
	event.shaped(KJ('cutter_knife'), [
		'  S',
		' B ',
		'C  '
	], {
		C: TE('cured_rubber'),
		S: CR('iron_sheet'),
		B: CR('brass_ingot')
	})

	// 物流构件
	let t = KJ('incomplete_logistic_mechanism')
	event.recipes.createSequencedAssembly([
		KJ('logistic_mechanism'),
	], CR('precision_mechanism'), [
		event.recipes.createDeploying(t, [t, CR('cardboard')]),
		event.recipes.createDeploying(t, [t, CR('cardboard')]),
		event.recipes.createDeploying(t, [t, F('#cutter_knife')])
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:logistic_mechanism')

	// 物流机器
	event.shaped(KJ("inductive_machine"), [
		"SSS",
		"SCS",
		"SSS"
	], {
		C: [CRD("overburden_casing")],
		S: KJ("logistic_mechanism")
	})

	let inductive_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:andesite_upgrade_smithing_template', "kubejs:inductive_machine", other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: "kubejs:inductive_machine", B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), "kubejs:inductive_machine")
	}
	inductive_machine(CR("stock_link"), 1, CR("transmitter"))
	inductive_machine(CR("stock_ticker"), 1, MC("gold_ingot"))
	inductive_machine(CR("packager"), 1, [CR("cardboard_block"), CR("bound_cardboard_block")])
	inductive_machine(CR("package_frogport"), 1, F("#slimeballs"))
	inductive_machine(CR("redstone_requester"), 1, MC("iron_ingot"))
	inductive_machine(("create_mobile_packages:bee_port"), 1, CR("andesite_casing"))
	inductive_machine(CR("factory_gauge"), 4)
	inductive_machine(("extra_gauges:logic_gauge"), 4)
	inductive_machine(("extra_gauges:integer_gauge"), 4)
	inductive_machine(("extra_gauges:comparator_gauge"), 4)
	inductive_machine(("extra_gauges:counter_gauge"), 4)
	inductive_machine(("extra_gauges:passive_gauge"), 4)
	inductive_machine(("extra_gauges:string_gauge"), 4)

	event.stonecutting(Item.of("create:item_hatch", 4), "kubejs:inductive_machine")
	
	event.remove({ output: "create:repackager" })
	switchCutting(event, "create:repackager", "create:packager")
	switchCraft(event, "create:repackager", "create:packager")

	event.remove({ output: "delivery_director:package_rewriter" })
	event.smithing(Item.of("delivery_director:package_rewriter", 1), 'create:brass_ingot', 'kubejs:inductive_machine', [CR("cardboard_block"), CR("bound_cardboard_block")])
	event.recipes.createMechanicalCrafting(Item.of("delivery_director:package_rewriter", 1), "CAB", { C: 'create:brass_ingot', A: 'kubejs:inductive_machine', B: [CR("cardboard_block"), CR("bound_cardboard_block")] })
	event.shapeless("delivery_director:package_rewriter", [["create:packager", "create:repackager"], 'create:brass_ingot'])
}

function radiant_coil(event) {
	event.remove({ id: CRD("mixing/chromatic_compound") })

	event.recipes.createMechanicalCrafting(KJ('radiant_coil', 8), ['  B', ' A ', 'B  '], { A: ['vintageimprovements:refined_radiance_spring', 'create_dd:refined_radiance_sheet'], B: 'create_dd:shadow_steel' })
	event.recipes.createMechanicalCrafting(KJ('radiant_coil'), ['A'], { A: 'vintageimprovements:refined_radiance_spring' })
	event.recipes.createMechanicalCrafting(KJ('radiant_coil'), ['A'], { A: 'create_dd:refined_radiance_sheet' })

	event.shaped(CRD('refined_radiance'), ['S'], { S: CR('refined_radiance') })
	event.shaped(CR('refined_radiance'), ['S'], { S: CRD('refined_radiance') })
	/*event.shaped(CRD('shadow_steel'), ['S'], { S: CR('shadow_steel') })
	event.shaped(CR('shadow_steel'), ['S'], { S: CRD('shadow_steel') })*/

}

function invarMachine(event) {

	// 黏液蕨
	let chop = (type, output) => {
		// event.custom({
 		// 	"type": "farmersdelight:cutting",
  		// 	"ingredients": [{"item": TC(type + "_slime_fern")}],
  		// 	"result": [{"count": 2, "item": Item.of(KJ(type + "_slimy_fern_leaf"))}],
  		// 	"tool": {"tag": "forge:tools/knives"}
		// })
		event.custom({
			"type": "occultism:spirit_fire",
			"ingredient": { "item": KJ(type + "_slimy_fern_leaf") },
			"result": { "item": TC(type + "_slime_fern") }
		})
		event.recipes.createMilling([KJ(type + "_slimy_fern_paste")], KJ(type + "_slimy_fern_leaf"))
		event.campfireCooking(output, KJ(type + "_slimy_fern_paste")).cookingTime(300)
	}

	chop("earth", MC('gunpowder'))
	chop("sky", MC('bone_meal'))
	chop("ender", AE2('ender_dust'))

	event.custom({"type": "farmersdelight:cutting","ingredients": [{"item": "tconstruct:earth_slime_fern"}],"result": [{"count": 2, "item": "kubejs:earth_slimy_fern_leaf"}],"tool": {"tag": "forge:tools/knives"}})
	event.custom({"type": "farmersdelight:cutting","ingredients": [{"item": "tconstruct:sky_slime_fern"}],"result": [{"count": 2, "item": "kubejs:sky_slimy_fern_leaf"}],"tool": {"tag": "forge:tools/knives"}})
	event.custom({"type": "farmersdelight:cutting","ingredients": [{"item": "tconstruct:ender_slime_fern"}],"result": [{"count": 2, "item": "kubejs:ender_slimy_fern_leaf"}],"tool": {"tag": "forge:tools/knives"}})


	let fern1 = KJ("ender_slimy_fern_leaf")
	let fern2 = KJ("sky_slimy_fern_leaf")
	let fern3 = KJ("earth_slimy_fern_leaf")
	event.shapeless(fern1, ["forbidden_arcanus:rune", fern2, fern2, fern2, fern2, fern3, fern3, fern3, fern3])
	event.shapeless(fern2, ["forbidden_arcanus:rune", fern3, fern3, fern3, fern3, fern1, fern1, fern1, fern1])
	event.shapeless(fern3, ["forbidden_arcanus:rune", fern2, fern2, fern2, fern2, fern1, fern1, fern1, fern1])

	event.campfireCooking(MC("torch"), MC("stick")).cookingTime(20)

	// 铁镍混合物 // 待分离
	event.shapeless(KJ('nickel_compound'), [TE('nickel_ingot'), TE("iron_dust"), TE("iron_dust"), TE("iron_dust"), TE("iron_dust")])
	event.blasting(KJ('invar_compound'), KJ('nickel_compound'))
	// 机械动力辊压
	let s = KJ('invar_compound')
	event.recipes.createSequencedAssembly([
		TE('invar_ingot'),
	], KJ('invar_compound'), [
		event.recipes.createPressing(s, s)
	]).transitionalItem(KJ('processing_invar_compound'))
		.loops(16)
		.id('kubejs:invar')
	// 机械动力锤击
	event.custom({
		"type": "vintageimprovements:hammering",
		"hammerBlows": 2,
		"ingredients": [
			{
				"item": "kubejs:invar_compound"
			}
		],
		"results": [
			{
				"item": "thermal:invar_ingot"
			}
		]
	})

	// 粉碎轮
	event.remove({ id: CR("mechanical_crafting/crushing_wheel") })
	event.recipes.createMechanicalCrafting(Item.of(CR('crushing_wheel'), 2), [
		' AAA ',
		'AABAA',
		'ABBBA',
		'AABAA',
		' AAA '
	], {
		A: F('#cobblestone'),
		B: MC('stick')
	})

	// 粉碎轮粉碎粉碎轮
	event.recipes.createCrushing([Item.of(AE2("singularity")).withChance(1)], CR('crushing_wheel')).processingTime(250)
	event.recipes.createCrushing([Item.of(AE2("singularity")).withChance(1)], '#design_decor:crushing_wheels').processingTime(250)

	event.remove({ id: /ae2:tools\/paintballs.*/ })
	let dyes = [MC('orange_dye'), MC('magenta_dye'), MC('light_blue_dye'), MC('yellow_dye'), MC('lime_dye'), MC('pink_dye'), MC('cyan_dye'), MC('purple_dye'), MC('blue_dye'), MC('brown_dye'), MC('green_dye'), MC('red_dye')]
	event.recipes.createCompacting('1x ' + KJ("dye_entangled_singularity"), [dyes, Item.of(AE2('quantum_entangled_singularity'), 1)])
	event.recipes.createConversion([AE2('quantum_entangled_singularity')], AE2("singularity"))
	event.recipes.createCrushing([
		Item.of(AE2("red_paint_ball"), 1).withChance(.90),
		Item.of(AE2("yellow_paint_ball"), 1).withChance(.80),
		Item.of(AE2("green_paint_ball"), 1).withChance(.70),
		Item.of(AE2("blue_paint_ball"), 1).withChance(.60),
		Item.of(AE2("magenta_paint_ball"), 1).withChance(.50)],
		KJ('dye_entangled_singularity')).processingTime(50)


	let colors = ["red", "yellow", "green", "blue", "magenta", "black"]
	for (let index = 0; index < colors.length; index++) {
		var element = colors[index];
		if (index == colors.length - 1)
			continue;
		event.recipes.createEmptying([AE2(colors[index + 1] + '_paint_ball'), Fluid.of(CRD('chromatic_waste'), 250)], AE2(element + '_paint_ball'))
	}

	event.recipes.createMechanicalCrafting(CRD('chromatic_compound'), [
		'AA',
		'AA'
	], {
		A: AE2('magenta_paint_ball')
	})

	// 感应构件
	let t = KJ('incomplete_inductive_mechanism')
	event.recipes.createSequencedAssembly([
		KJ('inductive_mechanism'),
	], CR('precision_mechanism'), [
		event.recipes.createDeploying(t, [t, KJ('radiant_coil')]),
		event.recipes.createDeploying(t, [t, KJ('radiant_coil')]),
		event.recipes.createDeploying(t, [t, F('#chromatic_resonators')])
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:inductive_mechanism')

	event.shaped(KJ('chromatic_resonator'), [
		' R ',
		'R S',
		'LS '
	], {
		R: '#forge:gems/ruby',
		L: TE('lead_ingot'),
		S: '#forge:gems/sapphire'
	})

	// 机器框架
	event.remove({ output: TE('machine_frame') })
	event.shaped(TE('machine_frame'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: KJ('invar_casing'),
		S: KJ('inductive_mechanism')
	})

	// 待分离
	event.shaped(CR('white_sail'), [
		'RS',
		'SA'
	], { R: '#thermal:rockwool', S: 'minecraft:stick', A: 'create:andesite_alloy' })

	event.replaceInput({ type: "minecraft:crafting_shaped", id: /ae2:.*/ }, F("#ingots/iron"), TE("lead_plate"))

	let invar_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:andesite_upgrade_smithing_template', TE('machine_frame'), other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: TE('machine_frame'), B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), TE('machine_frame'))
	}

	invar_machine(TE('dynamo_compression'), 1, TE('rf_coil'))
	// invar_machine('kubejs:pipe_module_tier_2', 4)
	// invar_machine('pipez:advanced_upgrade', 4, CRD('integrated_circuit'))
	// invar_machine('pipez:energy_pipe', 16)

	// invar_machine(TE('machine_crucible'), 1, MC('nether_bricks'))
	// invar_machine(TE('machine_furnace'), 1, MC('bricks'))
	// invar_machine(TE('machine_chiller'), 1, MC('packed_ice'))
	// invar_machine(TE('machine_pyrolyzer'), 1, MC('blaze_rod'))
	// invar_machine(TE('machine_bottler'), 1, MC('bucket'))
	// invar_machine(TE('machine_centrifuge'), 1, MC('compass'))
	// invar_machine(TE('machine_refinery'), 1, '#forge:glass')
	// invar_machine(TE('machine_pulverizer'), 1, MC('flint'))
	// invar_machine(TE('machine_smelter'), 1, MC('blast_furnace'))
	// invar_machine(TE('machine_sawmill'), 1, TE('saw_blade'))
	// invar_machine(TE('machine_brewer'), 1, MC('brewing_stand'))
	// invar_machine(TE('machine_insolator'), 1, MC('dirt'))

}

function enderMachine(event) {

	// worth it! 融了它们！
	let coinWorth = (coin, fluid, temp) => {
		event.custom({ 
		"type": "tconstruct:melting",
		"ingredient": { "item": coin },
		"result": {
			"fluid": fluid,
			"amount": 10
		},
		"temperature": temp,
		"time": 40
		})
	}

	coinWorth("numismatics:spur", "tconstruct:molten_copper", 500)
	coinWorth("numismatics:bevel", "tconstruct:molten_zinc", 420)
	coinWorth("numismatics:sprocket", "tconstruct:molten_silver", 790)
	coinWorth("numismatics:cog", "tconstruct:molten_brass", 605)
	coinWorth("numismatics:crown", "tconstruct:molten_gold", 700)
	coinWorth("numismatics:sun", "tconstruct:molten_netherite", 1250)

	event.recipes.thermal.insolator(['endergetic:tall_poise_bush'], 'endergetic:poise_bush').water(1000)
	event.recipes.thermal.insolator(['endergetic:poise_cluster'], 'endergetic:tall_poise_bush').water(1000)
	event.recipes.thermal.insolator(['tconstruct:ender_slime_ball', '3x endergetic:poise_bush'], 'endergetic:poise_cluster').water(1000)

	event.remove({ id: TE("machines/smelter/smelter_alloy_enderium") })
	event.recipes.thermal.smelter(TE("enderium_ingot"), [TE("silver_ingot"), "endergetic:tall_poise_bush", MC("ender_pearl")]).energy(10000)
	event.recipes.thermal.smelter(TE("enderium_ingot"), [TE("silver_ingot"), "endergetic:tall_poise_bush", AE2("ender_dust", 4)]).energy(10000)
	event.recipes.thermal.smelter(KJ("abstruse_mechanism"), [KJ("inductive_mechanism"), TE("enderium_ingot")]).energy(2000) // 谐振构件

	event.remove({ id: TE("enderium_dust_2") })
	event.shapeless(TE('enderium_dust'), [TE('silver_dust'),AE2('ender_dust'),AE2('ender_dust'),AE2('ender_dust'),AE2('ender_dust'),'endergetic:tall_poise_bush']).id("kubejs:enderium_dust")

	// 谐振机器
	event.shaped(KJ('enderium_machine'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: KJ('enderium_casing'),
		S: KJ('abstruse_mechanism')
	})

	let ender_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:andesite_upgrade_smithing_template', 'kubejs:enderium_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: 'kubejs:enderium_machine', B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), 'kubejs:enderium_machine')
	}

	ender_machine("enderstorage:ender_chest", 1, MC('chest'))
	ender_machine("enderstorage:ender_tank", 1, CR('fluid_tank'))
	ender_machine(TE("upgrade_augment_3"), 1, MC('redstone'))
	ender_machine(AE2("quantum_ring"), 1, AE2('energy_cell'))
	ender_machine(AE2("quantum_link"), 1, AE2('fluix_pearl'))
	ender_machine('createutilities:void_motor', 1, [('create_dd:accelerator_motor'), ('create_dd:kinetic_motor')])
	ender_machine("createutilities:void_battery", 1, "createaddition:modular_accumulator")
	// ender_machine('kubejs:pipe_module_tier_3', 4)
	// ender_machine('pipez:ultimate_upgrade', 4, CRD('integrated_circuit'))
	// ender_machine('pipez:item_pipe', 16)


	event.remove({ id: "createutilities:shaped/void_chest" })
	event.remove({ id: "createutilities:shaped/void_tank" })
	event.remove({ id: "createutilities:shaped/void_motor" })
	event.remove({ id: "createutilities:shaped/graviton_tube" })

	event.recipes.thermal.smelter("createutilities:graviton_tube", [["createutilities:polished_amethyst", "phantasm:void_crystal_spike_tip", "phantasm:crystal_spike_tip"], [TE("enderium_ingot"), TE("enderium_plate")]]).energy(2000)
	// event.recipes.thermal.smelter("createutilities:void_motor", [KJ("enderium_machine"), ["create_dd:accelerator_motor", "create_dd:kinetic_motor"], "createutilities:graviton_tube"]).energy(4000)
	switchCutting(event, "createutilities:void_tank", "enderstorage:ender_tank")
	switchCutting(event, "createutilities:void_chest", "enderstorage:ender_chest")
	switchCraft(event, "createutilities:void_tank", "enderstorage:ender_tank")
	switchCraft(event, "createutilities:void_chest", "enderstorage:ender_chest")
}

function circuits(event) {
	event.remove({ type: AE2('inscriber') })

	event.recipes.thermal.crucible(Fluid.of(TC("molten_diamond"), 100), MC("diamond")).energy(10000)

	event.custom({"type": "vintageimprovements:curving","itemAsHead": "ae2:silicon_press","ingredients": [{"item": "megacells:sky_steel_ingot"}],"results": [{"item": "megacells:printed_accumulation_processor"}]})

	let printedProcessor = (cast, output, fluid) => {
		event.custom({
		"type": "tconstruct:casting_table",
		"cast": { "item": cast },
		"cast_consumed": false,
		"fluid": { "tag": fluid, "amount": 90 },
		"result": { "item": output },
		"cooling_time": 150
		})

		event.recipes.thermal.chiller(output, [Fluid.of(fluid, 90), cast]).energy(5000)
	}
	printedProcessor(AE2("calculation_processor_press"), AE2("printed_calculation_processor"), "tconstruct:molten_copper")
	printedProcessor(AE2("logic_processor_press"), AE2("printed_logic_processor"), "tconstruct:molten_gold")
	printedProcessor(AE2("engineering_processor_press"), AE2("printed_engineering_processor"), "tconstruct:molten_diamond")

	// 硅板
	event.custom({"type": "vintageimprovements:curving","itemAsHead": "ae2:silicon_press","ingredients": [{"item": "ae2:silicon"}],"results": [{"item": "ae2:printed_silicon"}]})
	event.custom({"type": "vintageimprovements:laser_cutting","ingredients": [{"item": "ae2:silicon"}],"results": [{"item": "ae2:printed_silicon"},{"item": "ae2:printed_silicon","chance": 0.75},{"item": "ae2:printed_silicon","chance": 0.15}],"energy": 10000,"maxChargeRate": 100})

	// 序列组装电路
	let types = ["calculation", "logic", "engineering"]
	types.forEach(e => {
		let t = KJ('incomplete_' + e + '_processor')
		event.recipes.createSequencedAssembly([
			AE2(e + '_processor'),
		], AE2('printed_silicon'), [
			event.recipes.createDeploying(t, [t, AE2('printed_' + e + "_processor")]),
			event.recipes.createFilling(t, [t, Fluid.of(IM("redstone_acid"), 250)]), // 红石酸蚀刻
			event.recipes.createPressing(t, t),
			event.custom({"type": "vintageimprovements:laser_cutting","ingredients": [{"item": t}],"results": [{"item": t}],"energy": 2000,"maxChargeRate": 75})]).transitionalItem(t).loops(1).id('kubejs:' + e + "_processor")
		})
	
		let t2 = 'kubejs:incomplete_accumulation_processor'
		event.recipes.createSequencedAssembly([
			'megacells:accumulation_processor',
		], AE2('printed_silicon'), [
			event.recipes.createDeploying(t2, [t2, 'megacells:printed_accumulation_processor']),
			event.recipes.createFilling(t2, [t2, Fluid.of(IM("redstone_acid"), 250)]), // 红石酸蚀刻
			event.recipes.createPressing(t2, t2),
			event.custom({"type": "vintageimprovements:laser_cutting","ingredients": [{"item": t2}],"results": [{"item": t2}],"energy": 2000,"maxChargeRate": 75})]).transitionalItem(t2).loops(1).id("kubejs:accumulation_processor")

	event.recipes.thermal.smelter(AE2('quartz_glass'), AE2("certus_quartz_dust"))
}

function fluixMachine(event) {

	event.shaped(KJ('flash_drive'), [
		'SCA'
	], {
		A: TC('cobalt_ingot'),
		C: AE2('logic_processor'),
		S: MC('iron_ingot')
	})

	// 计算构件
	let t = KJ('incomplete_calculation_mechanism')
	event.recipes.createSequencedAssembly([
		KJ('calculation_mechanism'),
	], KJ('inductive_mechanism'), [
		event.recipes.createDeploying(t, [t, AE2('printed_silicon')]),
		event.recipes.createDeploying(t, [t, AE2('printed_silicon')]),
		event.recipes.createDeploying(t, [t, F('#flash_drives')])
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:calculation_mechanism')

	// 计算机器
	event.remove({ output: AE2('controller') })
	event.shaped(AE2('controller'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: [KJ('fluix_casing'), KJ('matter_casing')],
		S: KJ('calculation_mechanism')
	})

	let fluix_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:andesite_upgrade_smithing_template', AE2('controller'), other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: AE2('controller'), B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), AE2('controller'))
	}

	fluix_machine(AE2('condenser'), 1, AE2("fluix_pearl"))
	fluix_machine(AE2('drive'), 1, AE2("engineering_processor"))
	fluix_machine(AE2('formation_core'), 4, AE2("logic_processor"))
	fluix_machine(AE2('annihilation_core'), 4, AE2("calculation_processor"))
	fluix_machine(AE2('chest'), 1, MC('chest'))

	event.replaceInput({ id: AE2("network/cells/storage_components_cell_1k_part") }, MC("redstone"), KJ('calculation_mechanism'))
	event.replaceInput({ id: AE2("network/cells/storage_components_cell_1k_part") }, AE2("logic_processor"), F('#dusts/redstone'))
	event.replaceInput({ id: AE2("network/cells/fluid_storage_components_cell_1k_part") }, MC("green_dye"), KJ('calculation_mechanism'))
	event.replaceInput({ id: AE2("network/cells/fluid_storage_components_cell_1k_part") }, AE2("logic_processor"), F('#dyes/green'))
	event.replaceInput({ id: AE2("network/cells/spatial_components") }, MC("glowstone_dust"), KJ('calculation_mechanism'))
	event.replaceInput({ id: AE2("network/cells/spatial_components") }, AE2("engineering_processor"), F('#dusts/glowstone'))
	event.replaceInput({ id: AE2("network/crafting/patterns_blank") }, MC("glowstone_dust"), KJ('calculation_mechanism'))
	event.recipes.thermal.smelter(AE2("fluix_crystal", 2), [F("#gems/certus_quartz"), AE2("charged_certus_quartz_crystal"), MC("redstone")]).energy(4000)
}