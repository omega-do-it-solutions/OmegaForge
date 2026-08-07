import { describe, expect, it, vi } from 'vitest'
import { copyText } from './clipboard.ts'

describe('copyText', () => {
  it('reports success after the browser clipboard accepts the prompt', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)

    await expect(copyText('یک prompt آماده', writeText)).resolves.toBe(true)
    expect(writeText).toHaveBeenCalledWith('یک prompt آماده')
  })

  it('reports failure when the clipboard is unavailable or rejects the request', async () => {
    await expect(copyText('prompt', undefined)).resolves.toBe(false)

    const writeText = vi.fn().mockRejectedValue(new Error('clipboard denied'))
    await expect(copyText('prompt', writeText)).resolves.toBe(false)
  })
})
