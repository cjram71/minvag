# Pending CI workflow

`ci.yml` here is the intended GitHub Actions workflow for this repository.

It could not be pushed to `.github/workflows/ci.yml` because the authenticated
Arena GitHub App installation does not hold the `workflows` permission for
`cjram71/minvag`. GitHub rejects such pushes with:

> refusing to allow a GitHub App to create or update workflow
> `.github/workflows/ci.yml` without `workflows` permission

To enable CI, either:

1. Grant the Arena GitHub App the **Workflows: Read and write** permission on
   this repository, then move the file:
   `git mv .ci-pending/ci.yml .github/workflows/ci.yml`
2. Or copy the file into `.github/workflows/ci.yml` manually via the GitHub web
   UI or a personal git client.
