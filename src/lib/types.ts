/**
 * Archivo de types que retorna la API de sailings.
 * Se usa para definir los tipos de datos que se manejan en la aplicación.
 * Esto me ayuda a evitar errores de tipado y saber que estructura es la que tengo que manejar.
 **/

export interface Sailing {
  price: number;
  name: string;
  region: string;
  departureDate: string;
  returnDate: string;
  duration: number;
  itinerary: string[];
  ship: {
    name: string;
    rating: number;
    reviews: number;
    image: string;
    line: {
      logo: string;
      name: string;
    };
  };
}

export interface SailingCardProps {
  data: Sailing;
}
