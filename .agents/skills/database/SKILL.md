---
name: database
description: Design and change relational database models, constraints, indexes, queries, transactions, repositories, and migrations safely. Use for schema changes, persistence behavior, data migrations, query performance, transactional invariants, or database-backed tests.
---

# Database

## Model Business Invariants

- Use explicit types, nullability, defaults, foreign keys, and unique constraints.
- Enforce important invariants in the database as well as application logic when
  the database can express them safely.
- Add indexes from demonstrated access patterns, not speculation.
- Keep persistence models from leaking directly into public contracts when their
  evolution requirements differ.
- Store timestamps consistently and convert locale-specific representations at
  system edges.

Store file metadata and object keys in the database, never binary or base64 file
content. Load `$object-storage` when a record owns uploaded or generated files.

## Change Schemas Safely

Use migrations for every shared or production schema change. Do not depend on
automatic schema synchronization outside disposable local development.

Prefer an expand-migrate-contract sequence for breaking changes:

1. Add backward-compatible schema.
2. Deploy code that can read and write during transition.
3. Backfill in bounded, observable batches.
4. Verify data and application behavior.
5. Remove legacy schema in a later change.

Avoid long table locks, unbounded rewrites, and irreversible destructive changes.
Require explicit authorization for dropping or permanently transforming data.

## Transactions And Queries

Keep transactions short and include every write required by the invariant. Do
not hold transactions open across network calls. Design retry behavior for
serialization conflicts or deadlocks when the workload can encounter them.

Select only required data, bound list queries, avoid query-per-row patterns, and
inspect query plans before claiming a performance improvement.

## Verify

Test migrations against a realistic schema, including rollback when supported.
Cover constraints, transaction failure, concurrency-sensitive behavior, and the
queries most important to the changed workflow.
