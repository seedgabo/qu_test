

export interface Planet {
    id: string;
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
}

export const getPlanets = async (): Promise<Planet[]> => {
    const planets = [];
    // get all planets from swap api page by page
    const firstResponse = await fetch('https://swapi.dev/api/planets/');
    let data = await firstResponse.json();
    planets.push(...data.results);
    while (data.next) {
        const response = await fetch(data.next);
        data = await response.json();
        planets.push(...data.results);
    }
    return planets;
}


export const getPlanet = async (id: string): Promise<Planet> => {
    const response = await fetch(`https://swapi.dev/api/planets/${id}/`);
    return response.json();
}
