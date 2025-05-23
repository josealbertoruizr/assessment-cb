import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import { SailingCardProps } from "@/lib/types";

export function SailingCard({ data }: SailingCardProps) {
  const {
    name,
    region,
    duration,
    departureDate,
    returnDate,
    price,
    itinerary,
    ship,
  } = data;

  // algunas imagenes faltan en el API, entonces lo que hago es usar una imagen por defecto para evitar errores
  const imgSrc = (data.ship.image || "").trim();
  const logoSrc = (data.ship.line.logo || "").trim();

  return (
    <Card className="w-full max-w-3xl overflow-hidden rounded-xl shadow-md border">
      <div className="flex flex-col md:flex-row items-stretch">
        {/* Imágen Izquierda / Fecha */}
        <div className="relative w-full md:w-1/3 h-48 md:h-auto">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={data.ship.name}
              fill
              className="object-cover"
            />
          ) : (
            // placeholder si no hay imagen
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
              No image available
            </div>
          )}
          <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
            {new Date(departureDate).toLocaleDateString()} –{" "}
            {new Date(returnDate).toLocaleDateString()}
          </div>
        </div>

        {/* Información Derecha */}
        <div className="flex-1 p-4 space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">{name}</h2>
                <div className="text-sm text-muted-foreground flex items-center space-x-2 mt-1">
                  <span className="text-primary font-medium">{region}</span>
                  <span>•</span>
                  <span>{duration} nights</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {ship.rating}
                    <span className="text-xs text-gray-500">
                      ({ship.reviews} reviews)
                    </span>
                  </span>
                </div>
              </div>
              {/* Logo / Nombre */}
              <div className="flex flex-col items-end text-sm text-muted-foreground">
                {logoSrc ? (
                  <Image
                    src={logoSrc}
                    alt={data.ship.line.name}
                    width={100}
                    height={40}
                    className="object-contain"
                  />
                ) : (
                  <div className="w-24 h-10 bg-gray-100 flex items-center justify-center text-gray-400">
                    No logo
                  </div>
                )}
                <span>{ship.name}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mt-3 text-sm text-muted-foreground">
              {itinerary.map((port, index) => (
                <span key={index}>
                  {port}
                  {index < itinerary.length - 1 && " → "}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="text-sm text-muted-foreground">
              Interior from
              <span className="text-xl font-semibold text-black ml-2">
                ${price.toFixed(2)}
              </span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md">
              See sailings
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
