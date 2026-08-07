export type ClipboardWriter = (text: string) => Promise<void>

function getClipboardWriter(): ClipboardWriter | undefined {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    return undefined
  }

  return navigator.clipboard.writeText.bind(navigator.clipboard)
}

export async function copyText(
  text: string,
  writeText: ClipboardWriter | undefined = getClipboardWriter(),
): Promise<boolean> {
  if (!writeText) {
    return false
  }

  try {
    await writeText(text)
    return true
  } catch {
    return false
  }
}
