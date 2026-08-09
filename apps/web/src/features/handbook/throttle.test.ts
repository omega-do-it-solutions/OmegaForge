import { afterEach, describe, expect, it, vi } from 'vitest'
import { throttle } from './throttle.ts'

afterEach(() => {
  vi.useRealTimers()
})

describe('throttle', () => {
  it('runs immediately and limits rapid calls to one trailing update per interval', () => {
    vi.useFakeTimers()
    vi.setSystemTime(1_000)
    const callback = vi.fn()
    const throttled = throttle(callback, 100)

    throttled()
    throttled()
    throttled()

    expect(callback).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(99)
    expect(callback).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(1)
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('cancels a queued trailing update', () => {
    vi.useFakeTimers()
    vi.setSystemTime(1_000)
    const callback = vi.fn()
    const throttled = throttle(callback, 100)

    throttled()
    throttled()
    throttled.cancel()
    vi.advanceTimersByTime(100)

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
