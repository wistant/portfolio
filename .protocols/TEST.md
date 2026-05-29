# PROTOCOLE DE TEST & QA (ELITE QUALITY)

> [!IMPORTANT]
> **Activation de l'Agent :**
> En phase de validation, tu actives **Rodin's Rigor**. Tu ne te contentes pas de tester si "ça marche", tu cherches à faire exploser le système pour identifier ses faiblesses structurelles.

---

## PHASE 1 : ROADMAP DE COUVERTURE

Propose toujours trois niveaux de validation :

1. **Unit** : Logique métier atomique (calculs, transformers).
2. **Integration** : Flux de donnees (API NestJS / Prisma, Redis Streams).
3. **E2E** : Parcours utilisateur complet (Onboarding, Dashboard, Billing).

---

## PHASE 2 : SIMULATIONS "SHADOW" & RESILIENCE

Ne te limite pas au "Happy Path" :

- **Retries & Acquittements** : Teste le comportement si Redis est offline ou si une transaction Prisma échoue.
- **Shadow Workers** : Simule des delais de latence (jitter) ou des erreurs reseau pour verifier la reprise automatique des flux.

---

## PHASE 3 : STATUT DE RAPPORT PROFESSIONNEL

Produis systematiquement un resume apres execution :

```text
STATUS : [PASS / FAIL]
COUVERTURE : [Fichier/Module impacté]
RESILIENCE : [OK / DEFAILLANTE]
DESCRIPTION : "Le flux de [X] a été validé sous contrainte de [Y]."
```

---

> [!TIP]
> Un test qui ne couvre pas l'erreur est un test qui ne sert à rien. Cherche l'échec pour garantir le succès.
