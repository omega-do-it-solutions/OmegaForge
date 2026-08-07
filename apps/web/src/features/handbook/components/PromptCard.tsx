import { Check, Copy, WarningCircle } from '@phosphor-icons/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { copyText } from '../clipboard.ts'
import { renderPrompt, type HandbookPrompt, type PromptValues } from '../content.ts'

type CopyStatus = 'idle' | 'copied' | 'failed'

type PromptCardProps = {
  icon: ReactNode
  prompt: HandbookPrompt
}

export function PromptCard({ icon, prompt }: PromptCardProps) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle')
  const [fieldValues, setFieldValues] = useState<PromptValues>(() =>
    Object.fromEntries((prompt.fields ?? []).map((field) => [field.id, ''])),
  )
  const resetTimer = useRef<number | undefined>(undefined)
  const promptFields = prompt.fields ?? []
  const missingFields = promptFields.filter((field) => !fieldValues[field.id]?.trim())
  const isPromptReady = missingFields.length === 0
  const preparedPrompt = renderPrompt(prompt, fieldValues)

  useEffect(() => {
    return () => window.clearTimeout(resetTimer.current)
  }, [])

  async function handleCopy() {
    const copied = await copyText(preparedPrompt)
    setCopyStatus(copied ? 'copied' : 'failed')

    window.clearTimeout(resetTimer.current)
    resetTimer.current = window.setTimeout(() => setCopyStatus('idle'), 3500)
  }

  const wasCopied = copyStatus === 'copied'
  const copyFailed = copyStatus === 'failed'

  function updateFieldValue(fieldId: string, value: string) {
    setFieldValues((currentValues) => ({ ...currentValues, [fieldId]: value }))
    setCopyStatus('idle')
  }

  return (
    <article className="glass-panel card overflow-hidden rounded-box">
      <div className="card-body p-5 sm:p-7">
        <div className="grid gap-6 xl:grid-cols-[minmax(20rem,0.8fr)_minmax(0,1.2fr)] xl:gap-8">
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="grid size-12 place-items-center rounded-box bg-primary text-primary-content shadow-lg shadow-primary/20">
                {icon}
              </div>
              <span className="font-mono text-sm tracking-[0.2em] text-base-content/45">
                {prompt.number}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-primary">{prompt.label}</p>
              <h2 className="text-2xl font-bold tracking-tight text-base-content sm:text-3xl">
                {prompt.title}
              </h2>
              <p className="max-w-xl leading-8 text-base-content/70">{prompt.description}</p>
            </div>

            {promptFields.length > 0 && (
              <fieldset className="rounded-box border border-primary/20 bg-primary/5 p-4">
                <legend className="sr-only">اطلاعات لازم برای آماده‌سازی prompt</legend>
                <p className="text-sm font-bold text-base-content">اطلاعات پروژه را وارد کنید</p>
                <p className="mt-1 text-sm leading-6 text-base-content/65">
                  این اطلاعات فقط در همین prompt استفاده می‌شود و جایی ذخیره نمی‌شود.
                </p>
                <div className="mt-4 grid gap-3">
                  {promptFields.map((field) => (
                    <div key={field.id}>
                      <label htmlFor={`${prompt.id}-${field.id}`} className="mb-2 block text-sm font-medium">
                        {field.label}
                      </label>
                      <input
                        id={`${prompt.id}-${field.id}`}
                        type="text"
                        className="input input-bordered w-full bg-base-100 text-base-content"
                        value={fieldValues[field.id] ?? ''}
                        placeholder={field.placeholder}
                        dir={field.direction ?? 'auto'}
                        autoComplete="off"
                        spellCheck="false"
                        onChange={(event) => updateFieldValue(field.id, event.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="rounded-box border border-base-content/10 bg-base-200/60 p-4">
              <p className="mb-2 text-xs font-medium tracking-wide text-base-content/55">
                SKILLهای مورد استفاده
              </p>
              <p className="font-mono text-sm text-base-content/80" dir="ltr">
                {prompt.skills}
              </p>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-4">
            <div className="rounded-box border border-base-content/10 bg-base-200/70 p-4 sm:p-5">
              <pre className="m-0 whitespace-pre-wrap font-sans text-[0.95rem] leading-8 text-base-content/80">
                {preparedPrompt}
              </pre>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                className={`btn w-full sm:w-auto ${wasCopied ? 'btn-success' : 'btn-primary'}`}
                onClick={handleCopy}
                disabled={!isPromptReady}
              >
                {wasCopied ? <Check size={20} weight="bold" /> : <Copy size={20} weight="bold" />}
                {wasCopied ? 'کپی شد' : 'کپی کردن prompt'}
              </button>
              <p aria-live="polite" className="min-h-5 text-sm text-base-content/65">
                {!isPromptReady ? (
                  <>برای آماده شدن prompt، {missingFields.map((field) => field.label).join(' و ')} را وارد کنید.</>
                ) : copyFailed ? (
                  <span className="inline-flex items-center gap-1 text-warning">
                    <WarningCircle size={18} weight="fill" />
                    کپی خودکار انجام نشد؛ متن را انتخاب و کپی کنید.
                  </span>
                ) : null}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
