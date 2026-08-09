export type ThrottledCallback = (() => void) & {
  cancel: () => void
}

export function throttle(callback: () => void, interval: number): ThrottledCallback {
  let lastExecution = 0
  let trailingTimer: ReturnType<typeof setTimeout> | undefined

  function execute() {
    lastExecution = Date.now()
    trailingTimer = undefined
    callback()
  }

  const throttled = (() => {
    const remaining = interval - (Date.now() - lastExecution)

    if (remaining <= 0) {
      if (trailingTimer !== undefined) clearTimeout(trailingTimer)
      execute()
      return
    }

    if (trailingTimer === undefined) trailingTimer = setTimeout(execute, remaining)
  }) as ThrottledCallback

  throttled.cancel = () => {
    if (trailingTimer !== undefined) clearTimeout(trailingTimer)
    trailingTimer = undefined
  }

  return throttled
}
