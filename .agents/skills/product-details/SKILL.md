---
name: product-details
description: Guide a non-technical product owner through creating or improving docs/product.md, including users, audience surfaces, product category, interface identity, workflows, rules, risks, and release boundaries, with a short business-language conversation. Use when the owner asks to describe a new product, fill in the product template, refine product requirements, or prepare product details before using $bootstrap-project.
---

# Product Details

Build a complete, useful product brief one small conversation step at a time.
This is a product-discovery skill, not a technical-planning or scaffolding
skill. It prepares `docs/product.md` for `$bootstrap-project`.

## Required Context

Before editing, read:

1. `AGENTS.md`
2. `docs/product.md`
3. `docs/ai/interface-design.md`

Edit only `docs/product.md`. Preserve its required headings and any accurate
existing details. Do not select a technical stack, alter configuration, or
scaffold applications.

## Guided Conversation

1. Inspect the current document, show the progress card, and briefly say what
   is already known and what the next small topic is. Explain that the owner
   can answer in ordinary language, say "I don't know", skip a topic, or
   correct an earlier answer.
2. Ask one short, focused business question at a time using the required
   question card below. Do not bundle a full questionnaire into one message.
3. After each answer, write the relevant section of `docs/product.md` using a
   targeted edit. Preserve the owner's words and convert them into clear,
   concise business statements.
4. Give a one- or two-sentence confirmation of what was recorded, show the
   updated progress card, then ask the next highest-value unanswered question.
5. Continue until every required heading has a product-specific entry or an
   explicit first-release boundary such as "No current requirement." Do not
   invent behavior to fill a blank.

Use this exact structure for every new question:

```text
Question:
Why I am asking:
Example answer:
Suggestion:
```

- **Question:** Ask only the next business question in clear, everyday words.
- **Why I am asking:** Explain the product decision it helps clarify, without
  mentioning architecture or implementation.
- **Example answer:** Give one short, fictional answer tailored to the product;
  make clear that it is only an example, not a required answer.
- **Suggestion:** Give a ready-to-use suggested answer in the owner's voice,
  based on what they have already said. Write it as their possible choice—for
  example, "For the first release, I want shop managers to approve refunds"—not
  as agent advice such as "I suggest you..." Mark it as an editable starting
  point, never as an assumed decision.

## Progress Card

Show a progress card before every question, including the first question. Use
the owner's conversation language. Base it on the 14 required `docs/product.md`
sections, and use this structure:

```text
Progress:
- Completed: <number> of 14 sections — <completed section names>
- In progress: <section name and concise status, if applicable>
- Current question: <section name>
- Remaining: <remaining section names, or “None — ready for review”>
```

- Count a section as complete only when it has product-specific content or an
  explicit first-release boundary.
- Keep the completed and remaining names short. For example, say `Purpose` or
  `Data and Files`, not a long summary of their contents.
- For a multi-part section such as `Main Workflows`, state the useful local
  status, for example `2 workflows recorded; checking for more`. Do not pretend
  there is a fixed number of workflows before the owner has described them.
- Show `0 of 14` at the beginning so the owner always knows the interview's
  size. When all sections are complete, show `14 of 14` and replace the next
  question with the completion and handoff summary.

## Conversation Language

Use the language the owner uses. When the owner writes in Farsi, conduct the
entire guided conversation—including the question card, confirmations, examples,
and suggestions—in Farsi. Keep the required Markdown headings in
`docs/product.md` unchanged so the template remains machine-readable, but write
the product-specific content in Farsi. Preserve hex color values, provider
names, and other exact identifiers unchanged. Translate the content only when
the owner asks for a different document language.

Use this natural order, skipping a topic already covered:

- Purpose: who has the problem and what outcome they need.
- Platforms: ask which people need to use the product in a browser, on an
  iPhone, or on Android in the first release. When mobile is needed, ask what
  they must do from a phone, such as receive a notification, use the camera,
  scan a code, share their location, or work without a connection. Do not ask
  the owner to choose a mobile framework or distinguish native from
  cross-platform development.
- Users and roles: who uses it and what each person may do.
- Interface identity: ask what kind of product experience this is and who can
  enter each distinct area—for example, staff-only operations, a customer
  account, public content, a storefront, checkout, or a mix. Derive a concise
  category and surface list from the owner's business description and ask for
  confirmation. Do not ask them to choose a sidebar, header, breakpoint, or
  visual template. For a mixed product, record each first-release surface and
  its audience instead of forcing one category onto the whole product.
- Main workflows: ask about one user journey at a time, including the expected
  result and important exceptions.
- Business rules: permissions, approvals, money, deadlines, ownership, or
  other rules that must always hold.
- Risks: ask about understandable things that could harm customers or the
  business, such as people not adopting the product, misuse or fraud, incorrect
  information, legal obligations, loss of trust, or an essential provider being
  unavailable. Ask what outcome they want to avoid and what the product should
  do to reduce the harm. A response of "No current concern" is valid.
- Data and files: information the product keeps, documents or media involved,
  and any business privacy or deletion expectation.
- External systems: services the product must connect to and what should happen
  if each is unavailable.
- Future direction: a known business outcome or later capability that should
  shape the foundation now. Do not turn this into a technical design discussion.
- Brand identity: request the primary and secondary colors. If the owner names
  colors rather than providing hex values, propose accessible six-digit hex
  values for confirmation and record only confirmed values.
- Scale and freshness: ask in business terms about expected growth, busy
  periods, history, reports, and information people need to see while they are
  working. Never request event rates, latency targets, infrastructure, or
  architecture.
- Success and out of scope: define the first-release outcome and what it will
  intentionally not do.

## Question Boundaries

- Ask only about product behavior and business priorities. Never ask the owner
  to choose frameworks, databases, hosting, regions, uptime, recovery targets,
  architecture, or capacity numbers.
- Ask a follow-up only when the previous answer leaves a material business rule
  unclear. Explain the choice in plain language.
- Treat "I don't know" as valid. Record an explicit first-release boundary if
  the owner says there is no current requirement; do not make a technical
  assumption or prolong the interview for it.
- When an existing statement conflicts with a new answer, point out the
  conflict and ask which business behavior should win before changing it.
- Do not ask for technical approval. This skill has no scaffold or stack gate.

## Completion And Handoff

When the document is complete, show a concise business summary and identify any
explicit first-release boundaries. State that `docs/product.md` is ready for the
next step. Offer this prompt, without starting it automatically:

```text
Use $bootstrap-project to read docs/product.md and propose the technical profile.
```
