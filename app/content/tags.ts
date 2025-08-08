export const projectTags = [
  'Unity',
  'Godot',
  'Unreal',
  'Web',
  'Solo',
  'Construct',
  'Gamejam',
  'Favorite',
  'Scolaire',
  'Personnel',
  'Commercial'
] as const;

export type ProjectTag = typeof projectTags[number];