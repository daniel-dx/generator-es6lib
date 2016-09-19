export function sayHi(name) {
  if (name && typeof name != 'string') throw new Error('parameter name type error, must be a string');
  return `Hello ${name || ''}`;
}

// don't touch me - function

export default {
  sayHi,
  // don't touch me - export
};
