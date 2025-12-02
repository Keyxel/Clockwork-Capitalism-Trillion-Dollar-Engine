// priority: 0

// Visit the wiki for more info - https://kubejs.com/

console.info('(Loaded startup scripts)')

StartupEvents.registry('item', event => {

// 烦人数学
event.create('three_cast').texture("kubejs:item/cast/three_cast").unstackable()
event.create('eight_cast').texture("kubejs:item/cast/eight_cast").unstackable()
event.create('plus_cast').texture("kubejs:item/cast/plus_cast").unstackable()
event.create('minus_cast').texture("kubejs:item/cast/minus_cast").unstackable()
event.create('multiply_cast').texture("kubejs:item/cast/multiply_cast").unstackable()
event.create('divide_cast').texture("kubejs:item/cast/divide_cast").unstackable()
event.create('computation_matrix').parentModel("kubejs:item/computation_matrix").unstackable().rarity('epic')

// 数字
let number = (id, name) => {
	let e = id.toLowerCase()
	event.create(e).texture("kubejs:item/math/" + e).glow(true).displayName(name).rarity('uncommon')
}
number('Zero', '0')
number('One', '1')
number('Two', '2')
number('Three', '3')
number('Four', '4')
number('Five', '5')
number('Six', '6')
number('Seven', '7')
number('Eight', '8')
number('Nine', '9')
number('Plus', '+')
number('Minus', '-')
number('Multiply', '×')
number('Divide', '÷')
number('Missingno', '#DIV/0')

// 石英种子

// let types = ["Certus", "Fluix"]
// types.forEach(e => {
// 	let id = e.toLowerCase()
// 	event.create('growing_' + id + '_seed','create:sequenced_assembly').texture("kubejs:item/quartz/crystal_seed_" + id)
// 	event.create('tiny_' + id + '_crystal').texture("kubejs:item/quartz/crystal_seed_" + id + "2")
// 	event.create('growing_tiny_' + id + '_crystal','create:sequenced_assembly').texture("kubejs:item/quartz/crystal_seed_" + id + "2")
// 	event.create('small_' + id + '_crystal').texture("kubejs:item/quartz/crystal_seed_" + id + "3")
// 	event.create('growing_small_' + id + '_crystal','create:sequenced_assembly').texture("kubejs:item/quartz/crystal_seed_" + id + "3")
// }) // 已经没有注液合成了

event.create('nether_seed').texture("kubejs:item/quartz/crystal_seed_nether")
event.create('growing_nether_seed', 'create:sequenced_assembly').texture("kubejs:item/quartz/crystal_seed_nether")
event.create('tiny_nether_crystal').texture("kubejs:item/quartz/crystal_seed_nether2")
event.create('growing_tiny_nether_crystal', 'create:sequenced_assembly').texture("kubejs:item/quartz/crystal_seed_nether2")
event.create('small_nether_crystal').texture("kubejs:item/quartz/crystal_seed_nether3")
event.create('growing_small_nether_crystal', 'create:sequenced_assembly').texture("kubejs:item/quartz/crystal_seed_nether3")

// 构件
event.create('broken_precision_mechanism').texture("kubejs:item/mechanism/broken_precision_mechanism")
let mechanism = (id, rarity) => {
	let e = id.toLowerCase()
	event.create(e + '_mechanism').texture("kubejs:item/mechanism/" + e + "_mechanism").rarity(rarity ? rarity : 'common')
	event.create('incomplete_' + e + '_mechanism','create:sequenced_assembly').texture("kubejs:item/mechanism/incomplete_" + e + "_mechanism")
}
mechanism('Kinetic')
mechanism('Sealed')
mechanism('Logistic')
mechanism('Sturdy', 'uncommon')
mechanism('Infernal', 'uncommon')
mechanism('Inductive', 'uncommon')
mechanism('Abstruse', 'rare')
mechanism('Calculation', 'rare')

// 工具
event.create('sewing_spool').texture("kubejs:item/backpack/sewing_spool").maxDamage(12)
event.create('stone_saw').parentModel("kubejs:item/tool/stone_saw").maxDamage(128)
event.create('iron_saw').parentModel("kubejs:item/tool/iron_saw").maxDamage(512)
event.create('diamond_saw').parentModel("kubejs:item/tool/diamond_saw").maxDamage(1024)
event.create('netherite_saw').parentModel("kubejs:item/tool/netherite_saw").maxDamage(2653)
event.create('cutter_knife').texture("kubejs:item/tool/cutter_knife").maxDamage(512)
event.create('chromatic_resonator').texture("kubejs:item/tool/chromatic_resonator").maxDamage(512).rarity('uncommon')
event.create('calculator').texture("kubejs:item/tool/calculator").maxDamage(256).rarity('uncommon')
event.create('flash_drive').texture("kubejs:item/tool/boot_medium").maxDamage(256).rarity('uncommon')

// 粉末
event.create('brass_dust').texture("kubejs:item/dust/brass_dust")
event.create('cobalt_dust').texture("kubejs:item/dust/cobalt_dust")
event.create('zinc_dust').texture("kubejs:item/dust/zinc_dust")
event.create('desh_dust').texture("kubejs:item/dust/desh_dust")
event.create('ostrum_dust').texture("kubejs:item/dust/ostrum_dust")
event.create('calorite_dust').texture("kubejs:item/dust/calorite_dust")
event.create('aurum_sawdust').texture("kubejs:item/dust/mysterywood_sawdust")
event.create('rune_dust').texture("kubejs:item/dust/rune_dust")
event.create('naga_dust').texture("kubejs:item/dust/naga_dust").rarity('uncommon')
event.create('amethyst_dust').texture("kubejs:item/dust/amethyst_dust")

// 处理器
event.create('incomplete_calculation_processor', 'create:sequenced_assembly').texture("kubejs:item/processor/incomplete_calculation_processor")
event.create('incomplete_logic_processor', 'create:sequenced_assembly').texture("kubejs:item/processor/incomplete_logic_processor")
event.create('incomplete_engineering_processor', 'create:sequenced_assembly').texture("kubejs:item/processor/incomplete_engineering_processor")
event.create('incomplete_accumulation_processor', 'create:sequenced_assembly').texture("kubejs:item/processor/incomplete_accumulation_processor")	

event.create('incomplete_unassembled_pcb', 'create:sequenced_assembly').texture("kubejs:item/processor/incomplete_unassembled_pcb")
event.create('incomplete_advanced_control_circuit', 'create:sequenced_assembly').texture("kubejs:item/processor/incomplete_advanced_control_circuit")
event.create('incomplete_elite_control_circuit', 'create:sequenced_assembly').texture("kubejs:item/processor/incomplete_elite_control_circuit")
event.create('incomplete_ultimate_control_circuit', 'create:sequenced_assembly').texture("kubejs:item/processor/incomplete_ultimate_control_circuit")

// 黏性蕨
event.create('earth_slimy_fern_leaf').texture("kubejs:item/fern/leaf/earth_slimy_fern_leaf")
event.create('ender_slimy_fern_leaf').texture("kubejs:item/fern/leaf/ender_slimy_fern_leaf")
event.create('sky_slimy_fern_leaf').texture("kubejs:item/fern/leaf/sky_slimy_fern_leaf")
event.create('earth_slimy_fern_paste').texture("kubejs:item/fern/paste/earth_slimy_fern_paste")
event.create('ender_slimy_fern_paste').texture("kubejs:item/fern/paste/ender_slimy_fern_paste")
event.create('sky_slimy_fern_paste').texture("kubejs:item/fern/paste/sky_slimy_fern_paste")

// 管道模块
event.create('pipe_module_utility').texture("kubejs:item/pipe_module_utility")
event.create('pipe_module_tier_1').texture("kubejs:item/pipe_module_tier_1")
event.create('pipe_module_tier_2').texture("kubejs:item/pipe_module_tier_2")
event.create('pipe_module_tier_3').texture("kubejs:item/pipe_module_tier_3")

// 杂物
event.create('radiant_coil').glow(true).texture("kubejs:item/radiant_coil").rarity('uncommon')
event.create('circuit_scrap').texture("kubejs:item/circuit_scrap")
event.create('incomplete_coke_chunk', 'create:sequenced_assembly').texture("kubejs:item/incomplete_coke_chunk")
event.create('coke_chunk').texture("kubejs:item/coke_chunk")
event.create('smoke_mote').texture("kubejs:item/smoke_mote")
event.create('sand_ball').texture("kubejs:item/sand_ball").maxStackSize(4)
event.create('rough_sand').texture("kubejs:item/rough_sand")
event.create('purified_sand').texture("kubejs:item/purified_sand")
event.create('press_rod_die').texture("kubejs:item/press_rod_die").unstackable()
event.create('dye_entangled_singularity').texture("kubejs:item/dye_entangled_singularity").rarity('uncommon')
event.create('andesite_alloy_gear').texture("kubejs:item/andesite_alloy_gear")
event.create('matter_plastics').texture("kubejs:item/matter_plastics").rarity('uncommon')
event.create('gloden_hand').texture("kubejs:item/gloden_hand")
event.create('bronze_hand').texture("kubejs:item/bronze_hand")
// event.create('aethersite_alloy').texture("kubejs:item/aethersite_alloy").rarity('uncommon')
event.create('incomplete_upgrade_base', 'create:sequenced_assembly').texture("kubejs:item/backpack/incomplete_upgrade_base")
event.create('incomplete_hemp_fabric', 'create:sequenced_assembly').texture("kubejs:item/incomplete_hemp_fabric")
// event.create('polar_algal_blend').texture("kubejs:item/polar_algal_blend")
event.create('polar_kelp').texture("kubejs:item/polar_kelp")
event.create('andesite_alloy_ingot').texture("kubejs:item/andesite_alloy_ingot")
event.create('living_core').texture("kubejs:item/living_core").rarity('uncommon')
event.create('orundum').parentModel("kubejs:item/orundum").rarity('uncommon')
event.create('aurum_bark').texture("kubejs:item/aurum_bark")
event.create('aurum_pulp').texture("kubejs:item/aurum_pulp")

// 矿物
event.create('crushed_raw_cobalt').texture("kubejs:item/ore/crushed_raw_cobalt")
event.create('crushed_desh_ore').texture("kubejs:item/ore/crushed_desh_ore")
event.create('crushed_ostrum_ore').texture("kubejs:item/ore/crushed_ostrum_ore")
event.create('crushed_calorite_ore').texture("kubejs:item/ore/crushed_calorite_ore")

// 混合物
event.create('silicon_compound').texture("kubejs:item/compound/silicon_compound")
event.create('nickel_compound').texture("kubejs:item/compound/nickel_compound")
event.create('invar_compound', 'create:sequenced_assembly').texture("kubejs:item/compound/invar_compound")

// 锻造模板
event.create('andesite_upgrade_smithing_template').texture("kubejs:item/template/andesite_upgrade_smithing_template")
// event.create('c1_upgrade_smithing_template').texture("kubejs:item/template/andesite_upgrade_smithing_template")
// event.create('c2_upgrade_smithing_template').texture("kubejs:item/template/brass_upgrade_smithing_template")
// event.create('c3_upgrade_smithing_template').texture("kubejs:item/template/invar_upgrade_smithing_template")
// event.create('c4_upgrade_smithing_template').texture("kubejs:item/template/ae_upgrade_smithing_template")

// 食物
event.create('miners_treat').parentModel("kubejs:item/food/miners_treat").food(food => {food.hunger(4).saturation(0.5).effect('haste', 300, 0, 1).alwaysEdible().fastToEat()})
event.create('incomplete_sweet_mechanism', 'create:sequenced_assembly').texture("kubejs:item/mechanism/incomplete_sweet_mechanism").food(food => {food.hunger(6).saturation(0.5)})
event.create('sweet_mechanism').texture("kubejs:item/mechanism/sweet_mechanism").food(food => {food.hunger(20).saturation(5)
	.effect('haste', 6000, 0, 1)
	.effect('speed', 6000, 0, 2)
	.effect('farmersdelight:comfort', 1200, 0, 1)
	.effect('farmersdelight:nourishment', 2400, 0, 1)
	.effect('create_confectionery:stimulation', 600, 0, 1)})

})

StartupEvents.registry('block', event => {

event.create('polar_kelp_block').soundType('grass').hardness(2.0).tagBlock("minecraft:mineable/hoe")
event.create('budding_rose_quartz').soundType('amethyst').hardness(4.0).tagBlock("minecraft:mineable/pickaxe").tagBlock("create:wrench_pickup").lightLevel(1)

// 炼金镭射
event.create('ponder_laser_lamp').model('kubejs:block/ponder_laser_lamp').soundType("lantern").notSolid().renderType("translucent")
event.create('ponder_laser_lamp_on').model('kubejs:block/ponder_laser_lamp_on').soundType("lantern").notSolid().renderType("translucent")

// 机壳
event.create('manasteel_casing').soundType('wood').hardness(2.0).tagBlock("create:wrench_pickup").tagBlock("minecraft:mineable/pickaxe")
event.create('terrasteel_casing').soundType('wood').hardness(3.0).tagBlock("create:wrench_pickup").tagBlock("minecraft:mineable/pickaxe")
event.create('elementium_casing').soundType('wood').hardness(3.0).tagBlock("create:wrench_pickup").tagBlock("minecraft:mineable/pickaxe")
event.create('enderium_casing').model('kubejs:block/enderium_casing').soundType('metal').hardness(4.0).tagBlock("create:wrench_pickup").tagBlock("minecraft:mineable/pickaxe")
event.create('zinc_casing').soundType('metal').hardness(3.0).tagBlock("create:wrench_pickup").tagBlock("minecraft:mineable/pickaxe")
event.create('invar_casing').soundType('metal').hardness(3.0).tagBlock("create:wrench_pickup").tagBlock("minecraft:mineable/pickaxe")
event.create('fluix_casing').soundType('metal').hardness(3.0).tagBlock("create:wrench_pickup").tagBlock("minecraft:mineable/pickaxe")
event.create('matter_casing').soundType('stone').hardness(8.0).tagBlock("create:wrench_pickup").tagBlock("minecraft:mineable/pickaxe")
event.create('creative_casing').soundType('stone').hardness(-1.0).tagBlock("create:wrench_pickup").tagBlock("minecraft:mineable/pickaxe")

// 机器
let machine = (name, layer, material) => {
let id = name.toLowerCase()
	event.create(id + '_machine')
		.model('kubejs:block/' + id + '_machine')
		.soundType(material)
		.hardness(3.0)
		.notSolid()
		.renderType(layer)
		.tagBlock("create:wrench_pickup")
		.tagBlock("minecraft:mineable/pickaxe")
}

machine('Andesite', "translucent", "lantern")
machine('Inductive', "translucent", "lantern")
machine('Copper', "cutout", "lantern")
machine('Brass', "translucent", "lantern")
machine('Obsidian', "translucent", "lantern")
machine('Zinc', "cutout", "lantern")
machine('Enderium', "cutout", "lantern")

event.create('sweet_machine')
		.model('kubejs:block/sweet_machine')
		.soundType("stone")
		.hardness(2.0)
		.notSolid()
		.renderType("translucent")
		.tagBlock("create:wrench_pickup")
		.tagBlock("minecraft:mineable/pickaxe")

})

StartupEvents.registry('fluid', event => {

event.create("mana_resin").bucketColor(0x00adcf).stillTexture('kubejs:fluid/mana_resin_still').flowingTexture('kubejs:fluid/mana_resin_flow')
event.create("fine_sand").bucketColor(0xE3DBB0).stillTexture('kubejs:fluid/fine_sand_still').flowingTexture('kubejs:fluid/fine_sand_flow')
event.create("fine_sulfur").bucketColor(0xE3D167).stillTexture('kubejs:fluid/sulfur_still').flowingTexture('kubejs:fluid/sulfur_flow')
event.create("fine_gunpowder").bucketColor(0x494949).stillTexture('kubejs:fluid/fine_gunpowder_still').flowingTexture('kubejs:fluid/fine_gunpowder_flow')
event.create("waste").bucketColor(0x123d36).stillTexture('kubejs:fluid/waste_still').flowingTexture('kubejs:fluid/waste_flow')
event.create("sky_stone").bucketColor(0x595959).stillTexture('kubejs:fluid/sky_stone_still').flowingTexture('kubejs:fluid/sky_stone_flowing')
event.create("crystal_catalytic_liquid").bucketColor(0xb38ef3).stillTexture('kubejs:fluid/crystal_catalytic_liquid_still').flowingTexture('kubejs:fluid/crystal_catalytic_liquid_flow')
event.create("mana_crystal_catalytic_liquid").bucketColor(0x2fb8e4).stillTexture('kubejs:fluid/mana_crystal_catalytic_liquid_still').flowingTexture('kubejs:fluid/mana_crystal_catalytic_liquid_flow')

event.create('raw_logic').stillTexture('kubejs:fluid/number_still').flowingTexture('kubejs:fluid/number_flow').color(0xE7FFCB)
let colors = [0xCBE827, 0xAEE827, 0x68E827, 0x27E86E, 0x27E8B1, 0x27DEE8, 0x27B5E8, 0x2798E8, 0x2778E8, 0x2748E8]
for (let i = 0; i < 10; i++)
event.create('number_' + i).stillTexture('kubejs:fluid/number_still').flowingTexture('kubejs:fluid/number_flow').color(colors[i])
event.create('matrix').stillTexture('kubejs:fluid/matrix_still').flowingTexture('kubejs:fluid/matrix_flow').bucketColor(colors[0]).rarity('epic')


})

ItemEvents.modification(event => {
let colors = ["red", "yellow", "green", "blue", "magenta", "black"]
colors.forEach(element => {
	event.modify('ae2:' + element + '_paint_ball', item => {
		item.maxStackSize = 1
	})
});
})