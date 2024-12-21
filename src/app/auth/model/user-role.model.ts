export interface Role {
    id: number;
    name: string;
}

export function toString(role: Role): string {
    const formattedName = role.name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  
    return formattedName;
}