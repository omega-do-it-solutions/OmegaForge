# NestJS Structure

Read `docs/ai/application-structure.md` before using this reference. A Nest
feature module is the business boundary; `main.ts` and `AppModule` are the
composition roots.

```text
src/
├── main.ts                          # Bootstrap, lifecycle, listen/shutdown
├── app.module.ts                    # Root module composition
├── app/
│   ├── config/
│   ├── database/
│   ├── http/                        # Validation, filters, interceptors, guards
│   ├── security/                    # Authentication mechanism and principals
│   ├── observability/
│   └── health/
└── features/
    └── orders/
        ├── orders.module.ts         # Feature wiring and intentional exports
        ├── http/
        │   ├── orders.controller.ts
        │   └── dto/
        ├── application/
        │   ├── use-cases/
        │   └── ports/
        ├── domain/
        ├── infrastructure/
        │   ├── persistence/
        │   └── providers/
        └── tests/
```

Keep controllers and DTOs as transport adapters. Keep domain code independent
of Nest, an ORM, HTTP, and external-provider libraries. A small feature may stay
flat; add `application`, `domain`, or `infrastructure` only when each has a real
responsibility.

Nest providers are module-scoped by default. Export only the feature API that
another module genuinely needs, import that feature module instead of deep
importing files, and avoid duplicate provider registrations. Do not make ordinary
feature modules global or use `forwardRef` as routine dependency management.
Register truly global technical concerns once from the composition root.

When Nest uses the Fastify adapter, retain Nest module ownership and its testing
strategy. Do not also model every feature as a raw Fastify plugin.

Official guidance:

- [NestJS modules](https://docs.nestjs.com/modules)
- [NestJS providers](https://docs.nestjs.com/providers)
- [NestJS injection scopes](https://docs.nestjs.com/fundamentals/injection-scopes)
