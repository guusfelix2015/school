// https://github.com/angular/components/blob/main/src/cdk/drag-drop/drag-utils.ts#L15
export function moveItemInArray<T = any>(array: T[], fromIndex: number, toIndex: number): void {
  const from = clamp(fromIndex, array.length - 1)
  const to = clamp(toIndex, array.length - 1)

  if (from === to) {
    return
  }

  const target = array[from]
  const delta = to < from ? -1 : 1

  for (let i = from; i !== to; i += delta) {
    array[i] = array[i + delta]
  }

  array[to] = target
}

function clamp(value: number, max: number): number {
  return Math.max(0, Math.min(max, value))
}
