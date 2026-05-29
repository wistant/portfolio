# PROTOCOLE D'INITIALISATION (CLEAN START)

> [!IMPORTANT]
> **Agent Activation:**
> Whenever a new project is initialized or cloned, activate the **Calibration Audit**. Your mission is to lock down the environment before any code mutation. A failed step must immediately suspend all operations.

---

## PHASE 1 : IDENTITÉ & CONFIGURATION GIT

1. **Vérification d'Identité** :
   - `git config user.name` (Doit être configuré).
   - `git config user.email` (Précision attendue).
2. **Standard de Projet** :
   - `git config core.ignorecase false` (Strict pour la cohérence inter-OS).

---

## PHASE 2 : SETUP DE L'ENVIRONNEMENT (ECO-SYSTEM)

Audit des fondations :

- **Variables** : Presence de `.env.example` et validation du `.env` local.
- **Runtimes** : Validation des versions (Node.js, Bun) via `.nvmrc` ou `package.json`.
- **Managers** : Détection du gestionnaire privilégié (`pnpm` prio ou `bun`).

---

## PHASE 3 : CALIBRAGE DES OUTILS (TOOLSET)

1. **Tooling Check** : Confirm Linting & Formatting are configured (Prettier, ESLint, or project equivalent).
2. **IDE Sync** : Verify recommended IDE configuration is present (e.g., `.vscode/extensions.json`).

---

> [!CAUTION]
> A poorly initialized environment is the primary cause of regression. Operate surgically.
