/**
 * @param  {string} colour
 * @returns {number}
 */
const calcLuminance = (colour: string): number => {
  const [r, g, b] = colour.replace(/[^\d,]/g, "").split(",");
  const luminance =
    (Number(r) * 0.299 + Number(g) * 0.587 + Number(b) * 0.114) / 255;
  return luminance;
};

export default calcLuminance;
