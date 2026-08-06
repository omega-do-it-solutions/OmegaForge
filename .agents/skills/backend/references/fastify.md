# Fastify Structure

Read `docs/ai/application-structure.md` before using this reference. A registered
feature plugin is the business boundary; Fastify encapsulation is meaningful and
must not be bypassed casually.

```text
src/
├── main.ts                          # Read config; start and stop the process
├── server.ts                        # buildServer() and explicit registration
├── app/
│   ├── config/
│   ├── plugins/                     # DB, auth, logging, metrics
│   ├── http/                        # Global errors, hooks, health
│   └── types/
│       └── fastify.d.ts             # Intentional app-wide decorator typing
└── features/
    └── orders/
        ├── orders.plugin.ts         # Feature entry and route-prefix boundary
        ├── http/
        │   ├── routes.ts
        │   ├── handlers/
        │   └── schemas/
        ├── application/
        ├── domain/
        ├── infrastructure/
        └── tests/
```

Register application infrastructure before named feature plugins. Keep a
feature's routes, hooks, decorators, schemas, use cases, and adapters inside
its plugin boundary. Use `fastify-plugin` only to expose deliberate shared
technical infrastructure such as a database or observability decorator; do not
decorate the instance with feature services or use cases.

Attach a feature's route prefix when registering its plugin. Route handlers
validate and map input/output, while explicit use cases or factories own
business decisions. Avoid filesystem-autoload magic as the architectural source
of truth when an explicit registration list keeps dependency order visible.

Make `buildServer()` independently testable through `fastify.inject()` and keep
`listen()` in `main.ts` only. Put global error mapping and health behavior in
`app/http`; feature-specific hooks stay in their feature plugin.

Official guidance:

- [Fastify plugins](https://fastify.dev/docs/latest/Reference/Plugins/)
- [Fastify encapsulation](https://fastify.dev/docs/latest/Reference/Encapsulation/)
- [Fastify testing](https://fastify.dev/docs/latest/Guides/Testing/)
