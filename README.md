# 📚 Interface du modèle prédictif pour le Centre de Réception et de Régulation des Appels des Bouches-du-Rhône

## Installation et lancement

1. Créez un environnement virtuel :

   ```sh
   python -m venv .venv
   ```

2. Activez l'environnement virtuel :

   ```sh
   source .venv/bin/activate
   ```

3. Installez les dépendances Python et NPM:

   ```sh
   pip install -r requirements.txt
   npm i
   ```

4. Lancement du projet

   ```sh
   npm run dev
   ```

## Introduction

La régulation médicale est un dispositif téléphonique du Service d’Aide Médicale Urgente (SAMU) qui joue un rôle clé dans la gestion des urgences et des flux de patients vers les établissements de santé. Au sein des Centres de réception et de régulation des appels (CRRA), elle met en place des stratégies adaptées face à des situations variées :

- **Urgences vitales**
- **Organisation de transports sanitaires urgents**
- **Gestion des parcours de soins**
- **Coordination en cas de situations sanitaires exceptionnelles**

Le dispositif, accessible gratuitement 24/7 via le **15** ou le **112**, s’appuie sur des moyens logistiques tels que :

- Véhicules de secours et d’aide aux victimes (VSAV)
- Structures mobiles d’urgence et de réanimation (SMUR)
- Transports héliportés

Elle interagit également avec d’autres services d’urgences comme les pompiers et les forces de l’ordre.

---

## 🚀 Objectifs de l'interface

- **Visualisation des données** : Offrir une interface intuitive pour explorer les données historiques et prévisionnel des appels.
- **Prédiction des flux d'appels** : Utiliser des modèles de machine learning (LSTM) pour anticiper le nombre d'appels au CRRA.

---

## 💡 Fonctionnalités

- **Visualisation des données** : Graphiques interactifs pour explorer les tendances des appels.
- **Ajouts des données réelles** : Intégrer des données en temps réel pour comparer avec les prédictions
- **Suppression des données** : Supprimer des données
