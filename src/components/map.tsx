"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import UpdatePixel from "./update-pixel";

type MapDataType = {
  coords: number[];
  colorHex: string;
}[];

interface MapProps {
  initialMapData: MapDataType;
}

const colors = [
  "FF0000", // red
  "FFA500", // orange
  "FFFF00", // yellow
  "008000", // green
  "0000FF", // blue
  "4B0082", // indigo
  "EE82EE", // violet
  "000000", // black
  "808080", // gray
  "FFFFFF", // white
];

const websocketUrl =
  process.env.NODE_ENV === "production"
    ? "https://placewebsocket.pierregueroult.dev"
    : "http://localhost:4000";

export default function Map({ initialMapData }: MapProps) {
  const [mapData, setMapData] = useState<MapDataType>(initialMapData);
  const [selectedPixel, setSelectedPixel] = useState<number[]>([-1, -1]);

  function updateMapData(newMapData: MapDataType) {
    setMapData(newMapData);
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    const x = parseInt(target.dataset.x as string);
    const y = parseInt(target.dataset.y as string);
    setSelectedPixel([x, y]);
  };

  useEffect(() => {
    const socket = io(websocketUrl, { autoConnect: false });

    socket.connect();

    socket.on("update", (data: MapDataType) => {
      updateMapData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
            className={`w-2 h-2 hover:opacity-50 transition-opacity duration-300 ${
              selectedPixel[0] === coords[0] && selectedPixel[1] === coords[1]
                ? "border-2 border-black"
                : ""
            }`}
            data-number={i}
            data-x={coords[0]}
            data-y={coords[1]}
            onClick={handleClick}
          />
        ))}
      </section>
      <section className="w-[400px] flex flex-col items-center justify-center">
        {selectedPixel[0] !== -1 && selectedPixel[1] !== -1 ? (
          <>
            <UpdatePixel colors={colors} coords={selectedPixel} />
          </>
        ) : (
          <p className="w-[300px] text-center text-white text-xl">
            Cliquez sur un pixel pour le selectionner
          </p>
        )}
      </section>
    </>
  );
}
