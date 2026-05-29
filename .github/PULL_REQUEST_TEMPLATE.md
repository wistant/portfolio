## Description

<!-- Write a brief description of the changes introduced by this PR. Include motivation for the change. -->

## Related Issue

<!-- Link to the related issue here, e.g., "Fixes #123" -->

## Release Track Target

<!-- Which release track should this land on? Check one. -->

- [ ] `alpha` (High risk, core rewriting)
- [ ] `beta` (Moderate risk, new features/plugins)
- [ ] `rc` (Low risk, stabilization before release)
- [ ] `stable` (Patch fixes only)

## Contributor Checklist

- [ ] I have read the [Contributing Guidelines](docs/CONTRIBUTING_RELEASES.md).
- [ ] My commits follow the Conventional Commits format (`feat:`, `fix:`, etc.).
- [ ] I have run `pnpm test` and `pnpm lint` successfully.
- [ ] **I have NOT run `pnpm CHANGESET commands`** manually (if this is a community PR). The maintainer will handle release intents.

---

_For Maintainers:_
Run `pnpm push` on the `dev` branch to handle versioning after merge.
