---
name: object-storage
description: Implement self-hosted S3-compatible storage for user uploads, generated assets, attachments, media, imports, exports, presigned access, retention, and deletion. Use whenever binary files enter, leave, or are managed by the product, including SeaweedFS and other self-hosted compatible deployments.
---

# Object Storage

## Use An Application-Owned Contract

Target S3 semantics through a narrow adapter instead of importing a provider SDK
throughout the codebase. Support configuration for endpoint, region, bucket,
credentials, path-style access, and optional public base URL.

Expose only operations the product needs, such as:

- Create a short-lived upload instruction
- Confirm an uploaded object through metadata lookup
- Create a short-lived download URL
- Read metadata or a server-side stream
- Copy or delete an object

Keep provider-specific behavior inside the adapter. Application services should
work with object keys and file records, not provider URLs.

## Separate Bytes From Metadata

Store bytes in object storage. Store an application-owned record containing the
object key, bucket or storage class when needed, original display name, media
type, byte size, checksum, owner, purpose, lifecycle state, and timestamps.

Generate opaque object keys. Do not use unsanitized user filenames as paths.
Scope keys by environment and tenant or owner where useful, without treating key
prefixes as authorization.

## Upload Safely

Prefer direct presigned uploads for large files:

1. Authenticate and authorize the upload request.
2. Validate declared type, size, purpose, and ownership.
3. Create a pending file record and server-generated object key.
4. Issue a short-lived, operation-specific presigned instruction.
5. Confirm the object using trusted storage metadata before marking it ready.
6. Scan or process risky content asynchronously when required.
7. Clean up abandoned pending objects through a scheduled lifecycle.

Use multipart upload for large objects. Abort abandoned multipart sessions.
Never send permanent storage credentials to a browser or mobile application.

Treat client filenames and media types as untrusted display metadata. Enforce
size and type policy on the trusted side and inspect content when risk requires
it.

## Download And Publication

Keep objects private by default. Authorize each access and issue a short-lived
download URL or stream through the server. Use a public bucket or CDN only for
content explicitly classified as public and safe to cache.

Do not persist presigned URLs; persist object keys and generate URLs when needed.
Avoid revealing internal bucket names or keys when a stable application URL is
required.

## Lifecycle And Deletion

Define ownership, retention, replacement, and deletion behavior with the product
workflow. Make deletion idempotent. When consistency across the database and
storage cannot be atomic, persist lifecycle state and finish deletion through a
retryable job. Monitor and reconcile orphaned database records and objects.

Use provider lifecycle policies for temporary uploads, incomplete multipart
uploads, generated intermediates, and retention tiers where appropriate.

## SeaweedFS Deployment

Use the included SeaweedFS Compose service for local development and integration
testing:

```sh
pnpm storage:up
pnpm storage:logs
pnpm storage:down
```

The default endpoint is `http://localhost:18333` with path-style access enabled.
Read credentials and the bucket from `.env`; never reuse local defaults in a
deployed environment.

Treat the single-node `weed mini` service as local infrastructure. Deployed
environments use a self-hosted SeaweedFS topology by default. That topology
requires separate capacity, replication, backup, monitoring, upgrade, security,
and recovery decisions. Do not substitute a managed cloud object-storage
provider unless the technical owner explicitly changes the storage policy.

## Verify

Cover authorization, rejected type and size, upload confirmation, expired URLs,
missing objects, duplicate completion, deletion retries, and orphan cleanup.
Run at least one integration path against the selected S3-compatible service;
mock only tests that do not need to verify SDK or provider semantics.
