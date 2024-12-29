// Esta interfaz trepresenta los datos nesteados del 'tipo' del Pokemon según nos viene del API, dato que después reusamos en la interfaz PokemonDetails
export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

// Esta omterfaz representa los datos de los 'sprites' del Pokemon según nos viene del API, dato que después reusamos en la interfaz PokemonDetails.
export interface PokemonSprites {
  front_default: string;
  back_default: string;
}

// Esta inerfaz representa los datos del Pokemón que obtenemos
export interface PokemonDetails {
  name: string;
  // Esto es una forma de descomponer una interfaz en partes reusables y más legibles aunque se podría declarar todo directamente aquí en PokemonDetails
  types: PokemonType[];
  sprites: PokemonSprites;
}
