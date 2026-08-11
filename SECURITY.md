# Security Policy

OmegaForge treats unsafe engineering guidance and unsafe foundation behavior as
security concerns even though it is not itself a deployed application.

## Supported Versions

Security fixes are applied to the latest published OmegaForge release and the
current `main` branch. Older foundation versions should be updated through
`$update-stack` before requesting a backport.

## Report A Vulnerability

Do not disclose a suspected vulnerability in a public issue, discussion, pull
request, or prompt transcript.

Use the repository's **Security** tab and select **Report a vulnerability** to
submit a private report. Include:

- the affected OmegaForge version or commit;
- the affected file, skill, or workflow;
- the impact and realistic exploitation path;
- minimal reproduction steps; and
- a suggested mitigation, if known.

Remove secrets, credentials, customer data, and unrelated proprietary code from
the report. If private vulnerability reporting is unavailable, contact
[Omega Do](https://omegado.com) to request a private security channel without
including vulnerability details in the initial message.

## Security Scope

Examples that belong in a private security report include:

- guidance that can expose secrets or customer data;
- bootstrap or update behavior that can overwrite work or escape its approved
  mutation scope;
- instructions that bypass authorization for destructive or production actions;
- dependency or supply-chain guidance that selects a known-affected artifact;
- unsafe handling of untrusted repository instructions or external content; and
- object-storage guidance that can expose credentials or private files.

Product-specific vulnerabilities in an application created from OmegaForge
belong to that application's security process unless the root cause is reusable
OmegaForge guidance.

## Disclosure

Maintainers will coordinate validation, remediation, release, and public
disclosure with the reporter. Please allow time for a fix to be prepared before
publishing details.
