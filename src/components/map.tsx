"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import UpdatePixel from "./update-pixel";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import DesktopOnly from "./desktop-only";
import CguAccepted from "./cgu-accepted";
import Chat from "./chat";

type MapDataType = {
  coords: number[];
  colorHex: string;
}[];

type RawDataType = {
  _id: string;
  x: number;
  y: number;
  updatedAt: string;
  colorHex: string;
}[];

interface MapProps {
  initialMapData: MapDataType;
}

const colors = [
  {
    name: "Blanc",
    color: "FFFFFF",
  },
  {
    name: "Gris clair",
    color: "E4E4E4",
  },
  {
    name: "Gris",
    color: "888888",
  },
  {
    name: "Gris foncé",
    color: "222222",
  },
  {
    name: "Rose",
    color: "FFA7D1",
  },
  {
    name: "Rouge",
    color: "E50000",
  },
  {
    name: "Orange",
    color: "E59500",
  },
  {
    name: "Marron",
    color: "A06A42",
  },
  {
    name: "Jaune",
    color: "E5D900",
  },
  {
    name: "Vert Clair",
    color: "94E044",
  },
  {
    name: "Vert",
    color: "02BE01",
  },
  {
    name: "Turquoise",
    color: "00D3DD",
  },
  {
    name: "Bleu",
    color: "0083C7",
  },
  {
    name: "Bleu foncé",
    color: "0000EA",
  },
  {
    name: "Violet",
    color: "CF6EE4",
  },
  {
    name: "Violet foncé",
    color: "820080",
  },
];

const websocketUrl =
  process.env.NODE_ENV === "production"
    ? "https://placewebsocket.pierregueroult.dev"
    : "http://localhost:4000";

export default function Map({ initialMapData }: MapProps) {
  const [mapData, setMapData] = useState<MapDataType>(initialMapData);
  const [selectedPixel, setSelectedPixel] = useState<number[]>([-1, -1]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    const x = parseInt(target.dataset.x as string);
    const y = parseInt(target.dataset.y as string);
    setSelectedPixel([x, y]);
  };

  useEffect(() => {
    const socket = io(websocketUrl);

    socket.connect();

    socket.on("update", (data: RawDataType) => {
      const newData: MapDataType = data.map((map) => ({
        coords: [map.x, map.y],
        colorHex: map.colorHex,
      }));

      setMapData(newData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowUp" && selectedPixel[1] > 1)
        setSelectedPixel((prev) => [prev[0], prev[1] - 1]);
      if (e.key === "ArrowDown" && selectedPixel[1] < 80)
        setSelectedPixel((prev) => [prev[0], prev[1] + 1]);
      if (e.key === "ArrowLeft" && selectedPixel[0] > 1)
        setSelectedPixel((prev) => [prev[0] - 1, prev[1]]);
      if (e.key === "ArrowRight" && selectedPixel[0] < 80)
        setSelectedPixel((prev) => [prev[0] + 1, prev[1]]);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPixel]);

  return (
    <>
      <section
        className="grid grid-rows-80 gap-0 w-fit h-fit"
        style={{
          gridTemplateColumns: "repeat(80, 1fr)",
          gridTemplateRows: "repeat(80, 1fr)",
        }}
      >
        {mapData.map(({ coords, colorHex }, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#" + colorHex,
            }}
            className={`w-1 h-1 md:w-2 md:h-2 hover:opacity-50 transition-opacity duration-300 ${
              selectedPixel[0] === coords[0] && selectedPixel[1] === coords[1]
                ? "border md:border-2 border-black"
                : ""
            }`}
            data-number={i}
            data-x={coords[0]}
            data-y={coords[1]}
            onClick={handleClick}
          />
        ))}
      </section>
      <aside className="flex flex-row lg:flex-col gap-4 items-center lg:items-start">
        <section className="lg:w-[400px] flex flex-col items-center justify-center w-11/12 md:w-1/2">
          {selectedPixel[0] !== -1 && selectedPixel[1] !== -1 ? (
            <UpdatePixel
              colors={colors}
              coords={selectedPixel}
              setSelectedPixel={setSelectedPixel}
            />
          ) : (
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Modifier un pixel</CardTitle>
                <CardDescription>
                  Choisissez un pixel à modifier
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </section>
        <section className="lg:w-[400px] flex-grow">
          <DesktopOnly>
            <CguAccepted>
              <Chat />
            </CguAccepted>
          </DesktopOnly>
        </section>
      </aside>
    </>
  );
}
