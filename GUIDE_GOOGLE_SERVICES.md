# 📊 Guide Complet : Configuration Google Services

## Vue d'Ensemble

Ce guide vous accompagne étape par étape pour configurer tous les services Google nécessaires au site S'Connect.

---

## 1. Google Analytics 4 (GA4)

### Pourquoi ?
Mesurer l'audience, comprendre le comportement des visiteurs, optimiser le site.

### Étapes de Configuration

1. **Créer un compte Google Analytics**
   - Aller sur : https://analytics.google.com
   - Cliquer sur "Commencer la mesure"
   - Nom du compte : "S'Connect" (ou votre choix)

2. **Créer une propriété**
   - Nom de la propriété : "Site Web S'Connect France"
   - Fuseau horaire : "France"
   - Devise : "EUR"

3. **Configurer un flux de données**
   - Type : "Web"
   - URL du site : `https://sconnectfrance.fr`
   - Nom du flux : "Site Principal"

4. **Récupérer l'ID de mesure**
   - Format : `G-XXXXXXXXXX`
   - **➡️ Copier cet ID dans `.env.local` comme `NEXT_PUBLIC_GA_ID`**

5. **Paramètres Recommandés**
   - Activer "Mesure améliorée"
   - Activer "Google Signals" (pour remarketing)
   - Paramétrer la durée de conservation : 14 mois

6. **Créer des Objectifs de Conversion**
   - Formulaire Contact : `form_submit` + `contact_submit`
   - Demande Devis : `quote_request`
   - Intervention Urgente : `emergency_request`
   - Clics Téléphone : `phone_click`

---

## 2. Google Tag Manager (GTM)

### Pourquoi ?
Gérer tous les tags (GA, Ads, Facebook Pixel) depuis une interface unique.

### Étapes de Configuration

1. **Créer un compte**
   - Aller sur : https://tagmanager.google.com
   - Cliquer sur "Créer un compte"
   - Nom du compte : "S'Connect"
   - Pays : France

2. **Créer un conteneur**
   - Nom : "Site Web S'Connect"
   - Plateforme : "Web"

3. **Récupérer l'ID du conteneur**
   - Format : `GTM-XXXXXXX`
   - **➡️ Copier cet ID dans `.env.local` comme `NEXT_PUBLIC_GTM_ID`**

4. **Installer le code**
   - ✅ Déjà fait automatiquement par le composant `GoogleAnalytics`
   - Le code se charge uniquement si l'utilisateur accepte les cookies

5. **Configurer les Tags Recommandés**
   
   **Tag Google Analytics 4**
   - Type : Google Analytics: Configuration GA4
   - ID de mesure : Votre `G-XXXXXXXXXX`
   - Déclencheur : All Pages

   **Tag Google Ads (si campagnes prévues)**
   - Type : Google Ads Conversion Tracking
   - ID de conversion : `AW-XXXXXXXXXX`
   - Déclencheur : Sur événements spécifiques

6. **Variables Recommandées**
   - Page Path
   - Click URL
   - Form ID
   - Scroll Depth

7. **Déclencheurs Recommandés**
   - Page View
   - Form Submission
   - Click - Just Links
   - Scroll Depth (25%, 50%, 75%, 100%)

8. **Tester et Publier**
   - Mode Aperçu pour tester
   - Publier le conteneur

---

## 3. Google Search Console

### Pourquoi ?
Surveiller l'indexation, détecter les erreurs, suivre les performances SEO.

### Étapes de Configuration

1. **Ajouter la propriété**
   - Aller sur : https://search.google.com/search-console
   - Cliquer sur "Ajouter une propriété"
   - Choisir "Préfixe d'URL"
   - Entrer : `https://sconnectfrance.fr`

2. **Vérifier la propriété**
   
   **Méthode 1 : Balise HTML (Recommandé)**
   - Copier la balise meta fournie
   - ➡️ L'ajouter dans `src/app/layout.tsx` dans la section `<head>`

   **Méthode 2 : Fichier HTML**
   - Télécharger le fichier
   - ➡️ Le placer dans `/public/`

   **Méthode 3 : Enregistrement DNS**
   - Ajouter un enregistrement TXT chez votre registrar
   - Valeur fournie par Google

3. **Soumettre le Sitemap**
   - URL du sitemap : `https://sconnectfrance.fr/sitemap.xml`
   - ✅ Le sitemap est déjà généré automatiquement par Next.js

4. **Paramètres Recommandés**
   - Définir le domaine préféré (www ou non-www)
   - Configurer la zone géographique : France
   - Lier à Google Analytics

5. **Surveiller Régulièrement**
   - Couverture de l'index
   - Expérience sur la page
   - Liens
   - Core Web Vitals

---

## 4. Google My Business (Critique pour SEO Local)

### Pourquoi ?
Apparaître dans Google Maps et les recherches locales. Essentiel pour une entreprise locale.

### Étapes de Configuration

1. **Créer/Revendiquer la Fiche**
   - Aller sur : https://www.google.com/business
   - Cliquer sur "Gérer maintenant"
   - Rechercher "S'Connect" à votre adresse

2. **Informations Essentielles**
   - **Nom** : S'Connect
   - **Catégorie principale** : "Électricien"
   - **Catégories secondaires** :
     - Serrurier
     - Service de contrôle d'accès
     - Métallerie
   - **Adresse exacte** : [Votre adresse]
   - **Zone de service** : Île-de-France (spécifier les départements)
   - **Téléphone** : [Votre numéro]
   - **Site web** : https://sconnectfrance.fr

3. **Horaires d'Ouverture**
   - Lundi-Vendredi : 8h-19h
   - Samedi : 9h-17h
   - Dimanche : Fermé (ou selon votre config)
   - **Important** : Cocher "Disponible 24h/24" si urgences

4. **Description**
   ```
   Expert en électricité, contrôle d'accès et serrurerie en Île-de-France.
   Installation, rénovation, dépannage 24h/24. Intervention rapide,
   devis gratuit. Particuliers et professionnels.
   
   Services : Installation électrique, mise aux normes NF C 15-100,
   interphonie, vidéophonie, badges d'accès, ouverture de porte,
   blindage, portails métalliques.
   ```

5. **Ajouter des Photos (Minimum 10)**
   - Logo (profil et couverture)
   - Façade/local
   - Équipe
   - Véhicules
   - Projets réalisés
   - Équipements

6. **Fonctionnalités à Activer**
   - ✅ Messages (répondre rapidement)
   - ✅ Questions et réponses
   - ✅ Avis (solliciter les clients)
   - ✅ Posts réguliers (actualités, promotions)
   - ✅ Rendez-vous en ligne (optionnel)

7. **Vérification**
   - Google enverra une carte postale à votre adresse
   - Code de vérification à entrer (sous 5-14 jours)

8. **Optimisation Continue**
   - Publier 1-2 posts par semaine
   - Répondre à TOUS les avis (positifs et négatifs)
   - Maintenir les informations à jour
   - Ajouter régulièrement des photos

---

## 5. Google Ads (Optionnel - Si Campagnes Publicitaires)

### Étapes de Configuration

1. **Créer un compte**
   - Aller sur : https://ads.google.com
   - Créer un compte

2. **Configurer le Suivi des Conversions**
   - Outils → Mesures → Conversions
   - Créer une conversion pour chaque objectif :
     - Demande de devis (Valeur : importante)
     - Clic téléphone (Valeur : élevée)
     - Intervention urgente (Valeur : très élevée)

3. **Récupérer l'ID**
   - Format : `AW-XXXXXXXXXX`
   - **➡️ Ajouter dans `.env.local` comme `NEXT_PUBLIC_GOOGLE_ADS_ID`**

4. **Tag de Remarketing**
   - Installer via GTM (recommandé)
   - Créer des audiences :
     - Visiteurs du site
     - Visiteurs pages services
     - Abandons formulaires

5. **Extensions d'Annonces Recommandées**
   - Extensions d'appel : téléphone cliquable
   - Extensions de lieu : lien GMB
   - Extensions d'accroche : USPs
   - Extensions de liens annexes : pages services

---

## 6. Configuration dans le Projet

Une fois tous les IDs récupérés, créer/modifier `.env.local` :

```bash
# Google Services
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX           # Google Analytics 4
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX           # Google Tag Manager
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX  # Google Ads (optionnel)
```

**Important** : Ces variables doivent aussi être configurées sur Vercel lors du déploiement.

---

## 7. Tests de Bon Fonctionnement

### Google Analytics
1. Activer le mode "Debug" dans GA4
2. Visiter le site
3. Vérifier que les événements apparaissent en temps réel

### Google Tag Manager
1. Activer le mode "Aperçu"
2. Naviguer sur le site
3. Vérifier que les tags se déclenchent correctement

### Search Console
1. Demander une indexation
2. Vérifier que le sitemap est bien lu
3. Surveiller les erreurs

### Google My Business
1. Rechercher votre entreprise sur Google
2. Vérifier que toutes les infos sont correctes
3. Tester le bouton "Appeler"

---

## 8. Tableau Récapitulatif

| Service | URL Configuration | ID à Récupérer | Variable .env |
|---------|------------------|----------------|---------------|
| **Google Analytics 4** | https://analytics.google.com | `G-XXXXXXXXXX` | `NEXT_PUBLIC_GA_ID` |
| **Google Tag Manager** | https://tagmanager.google.com | `GTM-XXXXXXX` | `NEXT_PUBLIC_GTM_ID` |
| **Search Console** | https://search.google.com/search-console | - | - |
| **My Business** | https://www.google.com/business | - | - |
| **Google Ads** | https://ads.google.com | `AW-XXXXXXXXXX` | `NEXT_PUBLIC_GOOGLE_ADS_ID` |

---

## 9. Timeline Recommandée

**Jour 1** : Google Analytics + Tag Manager (30 min)
**Jour 2** : Search Console + Sitemap (15 min)
**Jour 3** : Google My Business (45 min + attente vérification)
**Jour 7-14** : Réception carte postale GMB
**Jour 14+** : Google Ads (si campagnes)

---

## 10. Support & Ressources

- **Google Analytics** : https://support.google.com/analytics
- **Google Tag Manager** : https://support.google.com/tagmanager
- **Search Console** : https://support.google.com/webmasters
- **My Business** : https://support.google.com/business
- **Google Ads** : https://support.google.com/google-ads

---

## ✅ Checklist Finale

- [ ] Google Analytics 4 créé et configuré
- [ ] ID `G-XXXXXXXXXX` ajouté dans `.env.local`
- [ ] Google Tag Manager créé
- [ ] ID `GTM-XXXXXXX` ajouté dans `.env.local`
- [ ] Search Console configurée
- [ ] Sitemap soumis
- [ ] Google My Business créé/revendiqué
- [ ] Fiche GMB complétée à 100%
- [ ] Photos ajoutées sur GMB
- [ ] Vérification GMB en cours
- [ ] (Optionnel) Google Ads configuré
- [ ] Tests réalisés sur tous les services

Une fois cette checklist complète, les services Google seront opérationnels !
