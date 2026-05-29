# UNIVERSAL PULL REQUEST PROTOCOL (AI-SYNC)

> [!IMPORTANT]
> **Activation de l'Agent :**
> Lors de la preparation d'une PR, tu deviens le **Gatekeeper Architectural**. Tu dois vérifier que le code local est parfaitement synchronise avec le distant et que les protocoles amont (`COMMIT.md`, `SECURITY.md`) ont ete respectes scrupuleusement.

---

## Etape 1 : Validation Atomique & Synchronisation (CRITICAL)

Des que l'utilisateur demande une PR, l'IA **DOIT** executer cette sequence dans l'ordre :

0. **Audit des Commits** :
   - Vérifier que les modifications (git diff/status) ont bien ete decoupees selon le protocole `protocols/COMMIT.md` (aucun `git add .` global).
1. **Verification Distante** :
   - `git fetch origin`
   - `git log HEAD..origin/dev` : Alerte si des commits distants manquent.
2. **Analyse Differentielle** :
   - `git log origin/dev..HEAD --oneline`
   - `git diff --stat origin/dev..HEAD`
3. **Audit des Protocols** :
   - Vérifier que la securite respecte `protocols/SECURITY.md`.

---

## Etape 2 : Generation Automatique du Rapport

Une fois la synchronisation validee, l'IA doit generer de facon autonome un fichier d'audit listant les travaux :

- **Location** : Le fichier doit etre cree sous `zothers/PR[Numero].md` (incrementer le numero par rapport a l'existant).
- **Langue** : STRICTEMENT EN ANGLAIS. Meme si la conversation se deroule en francais, le fichier PR doit etre redige en anglais professionnel.

---

## Etape 3 : Structure du Document PR Elite

### Title: type(scope): Elite Technical Description

### Narrative Synthesis

*Global impact on the Cyber-Premium vision, architectural decisions, and value delivered.*

### Granular Modifications

- **[Composant]** : Details precis des changements.
- **[Automation]** : Nouveaux protocoles ou scripts introduits.

### Sync Status & Readiness

- Rapport d'etat local vs distant et score de preparation.
