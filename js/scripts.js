let pokemonList = [
    {
        name: 'Pikachu',
        nationalNumber: 025,
        height: 0.4,
        type: 'Electric',
        abilities: 'Static'
    },
    {
        name: 'Staryu',
        nationalNumber: 120,
        height: 0.8,
        type: 'Water',
        abilities: ['Illuminate', 'Natural Cure']
    },
    {
        name: 'Meowth',
        nationalNumber: 052,
        height: 0.4,
        type: 'Normal',
        abilities: ['Pickup', 'Technician']
    },
    {
        name: 'Poliwag',
        nationalNumber: 060,
        height: 0.6,
        type: 'Water',
        abilities: ['Water Absorb', 'Damp']
    },
    {
        name: 'Jigglypuff',
        nationalNumber: 39,
        height: 0.7,
        type: ['Normal', 'Fairy'],
        abilities: ['Pickup', 'Technician']
    },
    {
        name: 'Cubone',
        nationalNumber: 104,
        height: 0.4,
        type: 'Ground',
        abilities: ['Rock Head', 'Lightning Rod']
    },
    {
        name: 'Exeggutor',
        nationalNumber: 103,
        height: 2,
        type: ['Grass', 'Psychic'],
        abilities: 'Chlorophyll'
    },
    {
        name: 'Mewtwo',
        nationalNumber: 150,
        height: 2,
        type: 'Psychic',
        abilities: 'Pressure'
    }
] 

for (let i = 0; i < pokemonList.length; i++) {
    console.log(pokemonList[i].name + " - " + pokemonList[i].height + " " + 'meters');

}