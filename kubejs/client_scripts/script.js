// priority: 0

// Visit the wiki for more info - https://kubejs.com/

console.info('Hello, World! (Loaded client scripts)')

JEIEvents.hideItems(event => {
    event.hide(["twilightforest:uncrafting_table"])
})

JEIEvents.hideCategories(event => {
  
  event.hide(["twilightforest:uncrafting"]) 

})
