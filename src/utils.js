export const formatClassName = (...className) =>
  className.filter(Boolean).join(' ');

export const possessify = (name) => (name + name.endsWith('s') ? `'` : `'s`);
