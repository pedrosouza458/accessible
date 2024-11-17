export function SplitPosition(position: string) {
  const [lat, long] = position.split(",").map(Number); 
  return [lat, long];
}
