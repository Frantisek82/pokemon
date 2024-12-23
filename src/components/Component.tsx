import React, { useEffect, useState } from "react";

// Esta interfaz representa lo que vamos a recibir por props
interface Props {
  name: string;
}

// Esta interfaz trepresenta los datos nesteados del 'tipo' del Pokemon según nos viene del API, dato que después reusamos en la interfaz PokemonDetails
interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

// Esta omterfaz representa los datos de los 'sprites' del Pokemon según nos viene del API, dato que después reusamos en la interfaz PokemonDetails.
interface PokemonSprites {
  front_default: string;
  back_default: string;
}

// Esta inerfaz representa los datos del Pokemón que obtenemos
interface PokemonDetails {
  name: string;
  // Esto es una forma de descomponer una interfaz en partes reusables y más legibles aunque se podría declarar todo directamente aquí en PokemonDetails
  types: PokemonType[];
  sprites: PokemonSprites;
}

export const Pokemon: React.FC<Props> = (props) => {
  // Este valor guarda nuestra información completa del Pokemon en cuestión
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>();

  useEffect(() => {
    // Esta petición se realiza cada vez que el props 'name' cambia se valor de esta forma nos actualiza los datos del pokemon seleccionado.
    fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`)
      .then((res) => res.json())
      .then((data) => setPokemonDetails(data));
  }, [props.name]);

  // La primera vez que lo ejecutemos no tendremos aún ningún pokemón seleccionado hasta que cargue el primero, así que devolvemos un loading mientras tanto.
  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  // Renderizamos dos imagenes del pokemón, junto con su nombre y los tipos que tiene
  return (
    <div>
      <img
        width="200"
        src={pokemonDetails.sprites.front_default}
        alt={`${pokemonDetails.name} front`}
      />
      <img
        width="200"
        src={pokemonDetails.sprites.back_default}
        alt={`${pokemonDetails.name} back`}
      />
      <h1>{pokemonDetails.name}</h1>
      <p>Types:</p>
      <ul>
        {pokemonDetails.types.map((type) => (
          <li>{type.type.name}</li>
        ))}
      </ul>
    </div>
  );
};
