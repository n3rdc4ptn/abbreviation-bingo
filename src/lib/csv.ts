/***
 * This method takes a csv formatted text and returns an array of objects
 */
export function parseText<T>(text: string): Array<T> {
  let lines = text.split("\n");
  let headers = lines[0].split(",");
  let data = lines
    .slice(1)
    .map((line) => line.split(","))
    .filter((lines) => lines.length == headers.length)
    .map((values) => {
      let obj: any = {};

      for (let i = 0; i < headers.length; i++) {
        obj[headers[i]] = values[i];
      }
      return obj;
    });

  console.log(data);

  return data;
}
