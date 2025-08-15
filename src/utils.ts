export const formatClassName = (
  ...className: (string | false | undefined | null)[]
) => className.filter(Boolean).join(" ");

export const possessify = (name: string) =>
  `${name}${name.endsWith("s") ? `'` : `'s`}`;
