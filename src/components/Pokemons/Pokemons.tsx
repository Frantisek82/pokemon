import React, { useEffect, useState } from "react";
import { Pokemon } from "./Pokemon";

interface PokemonData {
  count: string;
  next: string;
  previous: string | null;
  results: PokemonResult[];
}

// Le cambiamos el nombre a nuestro interfaz, de Pokemon a PokemonResult, ya que lo que realmente está definiendo es un resultado de la llamada al endpoint Pokemon, por eso lo llamamos PokemonResult
interface PokemonResult {
  name: string;
  url: string;
}

function Pokemons() {
  // Este valor guarda nuestra pagina actual
  const [page, setPage] = useState(0);
  // Este valor guarda nuestra lista de pokemons para la pagina actual
  const [pokemons, setPokemons] = useState<PokemonResult[]>([]);
  // Este valor guarda el 'id' del Pokemon el cual queremos mostrar los detalles
  // Recordad que en este caso el id del Pokemon sería realmente su 'name'
  // Se guarda sólo el 'name' porque es lo que necesitamos pasar a la siguiente petición para poder obtener los datos del Pokemon
  const [selectedPokemonName, setSelectedPokemonName] = useState<string>();

  useEffect(() => {
    // Esta petición se realiza cada vez que 'page' cambia de valor de esta forma nos actualiza la lista de pokemon cada vez que cambiamos de página.
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`)
      .then((res) => res.json())
      .then((data: PokemonData) => setPokemons(data.results));
  }, [page]);

  return (
    <div>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name}>
            {/* Creamosun botón por cada pokemon para poder selseccionarlo para mostrar sus datos al pulsarlo, lo ideal sería quizás tener un 'a' y hacer un link el próximo día cuando demos la navegación */}
            <button onClick={() => setSelectedPokemonName(pokemon.name)}>
              {pokemon.name}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(page - 1)}>Anterior</button>
      <button onClick={() => setPage(page + 1)}>Siguiente</button>
      {/* Aquí comprobamos que tenemos un 'name' definido, es decir, que hemos seleccionado un Pokemón, y sólo si tenemos seleccionado un Pokemon mostramos la ficha del mismo. */}
      {selectedPokemonName && <Pokemon name={selectedPokemonName} />}
      {/* También se podría mostrar usando un operador ternario como aparce aquí abajo */}
      {/* {selectedPokemonName ? <Pokemon name={selectedPokemonName} /> : null} */}
    </div>
  );
}

export default Pokemons;
