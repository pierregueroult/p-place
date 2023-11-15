import prisma from "./prisma";

export default async function resetMap() {
  for (let i = 1; i <= 80; i++) {
    for (let j = 1; j <= 80; j++) {
      await prisma.map.create({
        data: {
          y: i,
          x: j,
        },
      });
    }
  }
}
