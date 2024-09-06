export function renderCorrectBorder(
  column: 'place' | 'name' | 'votes' | 'power' | 'badge',
  position: 'left' | 'right' | 'bottom',
  period: string | undefined,
  isSelected: boolean
) {
  if (column === 'place') {
    if (position === 'left') {
      return isSelected ? '1px solid' : '';
    } else if (position === 'bottom') {
      return isSelected ? '1px solid' : '';
    }
  } else if (column === 'name') {
    if (position === 'left') {
      if (period === '2') {
        return '';
      }
      if (period === '0') {
        return '';
      }
      return isSelected ? '1px solid' : '';
    } else if (position === 'bottom') {
      return isSelected ? '1px solid' : '';
    }
  } else if (column === 'votes') {
    if (position === 'bottom') return isSelected ? '1px solid' : '';
  } else if (column === 'power') {
    if (position === 'bottom') return isSelected ? '1px solid' : '';
  } else if (column === 'badge') {
    if (position === 'bottom') return isSelected ? '1px solid' : '';
    if (position === 'right') return isSelected ? '1px solid' : '';
  }
}
