export const boundingBox15Miles = (lat: number, lon: number ) => {
  const milesPerDegreeLat = 69;
  const milesPerDegreeLon = 69 * Math.cos(lat * Math.PI / 180);

  const deltaLat = 15 / milesPerDegreeLat;
  const deltaLon = 15 / milesPerDegreeLon;

  return {
    northLat: lat + deltaLat,
    southLat: lat - deltaLat,
    eastLon:  lon + deltaLon,
    westLon:  lon - deltaLon
  };
}