// Priority: 900
console.info('Starting to load KubeJS tags...')

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

ServerEvents.tags('item', event => {

    let colours = ['white', 'orange', 'magenta', 'light_blue', 'lime', 'pink', 'purple', 'light_gray', 'gray', 'cyan', 'brown', 'green', 'blue', 'red', 'black', 'yellow']

	colours.forEach(element => {
		event.get(F('glazed_terracotta')).add(MC(`${element}_glazed_terracotta`))
	});
    
    event.get("forge:sandstone/venus_sandstone").add("ad_astra:venus_sandstone")// 修复mek报错
   

    // c1
    event.get('kubejs:hand')
		.add('create:brass_hand')
		.add('kubejs:gloden_hand')
		.add('kubejs:bronze_hand')

	event.get('forge:saws')
		.add(KJ('stone_saw'))
		.add(KJ('iron_saw'))
		.add(KJ('diamond_saw'))
		.add(KJ('netherite_saw'))

	event.get('farmersdelight:barks')
		.add(KJ('aurum_bark'))

	// c2 
	event.get('forge:screwdrivers')
		.add('projectred_core:screwdriver')
	
	// c2a
	event.get('forge:cutter_knife')
		.add('kubejs:cutter_knife')

	// c3
	event.get('forge:chromatic_resonators')
		.add('kubejs:chromatic_resonator')

	// c4
	event.get("forge:circuit_press")
		.add(AE2("name_press"))
		.add(AE2("silicon_press"))
		.add(AE2("logic_processor_press"))
		.add(AE2("engineering_processor_press"))
		.add(AE2("calculation_processor_press"))

	event.get('thermal:crafting/casts')
		.add(KJ("three_cast"))
		.add(KJ("eight_cast"))
		.add(KJ("plus_cast"))
		.add(KJ("minus_cast"))
		.add(KJ("multiply_cast"))
		.add(KJ("divide_cast"))
		.add(F("#circuit_press"))

	event.get('thermal:crafting/dies').add('kubejs:press_rod_die')
	
	event.get('vintageimprovements:curving_heads')
		.add('#forge:circuit_press')
		.add('#thermal:crafting/dies')

	event.get('forge:flash_drives').add(KJ('flash_drive'))
})

ServerEvents.tags('fluid', event => {

    event.get('forge:crude_oil').add('beyond_earth:oil')

})