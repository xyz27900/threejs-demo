/* Class name merger */
export const classname = (...args: (string | boolean | undefined | null)[]): string => {
  return args.filter(Boolean).join(' ');
};
