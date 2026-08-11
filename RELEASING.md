# Releasing OmegaForge

OmegaForge uses semantic versioning. A release identifies an immutable
foundation revision that downstream projects can audit and use with
`$update-stack`.

## Prepare A Release

1. Confirm that all intended changes are recorded under `Unreleased` in
   [CHANGELOG.md](CHANGELOG.md).
2. Set the same release version in `package.json` and the changelog heading.
3. Review the public manual and record which OmegaForge version it supports.
4. Run the applicable repository checks:

   ```sh
   pnpm check
   pnpm compose:check
   git diff --check
   ```

5. Commit the release as `Release OmegaForge X.Y.Z`.
6. Create an annotated tag on that exact commit:

   ```sh
   git tag -a vX.Y.Z -m "OmegaForge X.Y.Z"
   ```

7. Push the release commit and tag through the repository's reviewed workflow.
8. Create a GitHub Release from the tag using the matching changelog entry as
   its release notes.

Do not move or reuse a published tag. Correct a released problem with a new
version.

## Historical Tags

The repository's reconstructed changelog begins at `v0.1.0`. Historical tags
must point to the last commit carrying that version before the next release, or
to the explicit release commit when one exists.
