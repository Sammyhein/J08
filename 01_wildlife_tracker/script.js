// Tu fais partie de l’équipe Eco-Rangers : tu dois suivre la faune d’une réserve, enregistrer des observations et 
// déclencher des alertes si certaines espèces deviennent rares.

// Contraintes :

// 1 fonctionnalité = 1 fonction.
// Utiliser : variables, conditions, boucles, tableaux, objets simples.

// Étape 1 – Données de base
// Déclare un tableau species (ex. ["lynx","otter","eagle"]).
// Déclare un tableau zones (ex. ["north","river","cliffs"]).
// Déclare une matrice pop (tableau de tableaux) où pop[i][j] = estimé d’individus de species[i] dans zones[j].
// Écris countOf(sp) → retourne le total de l’espèce sp toutes zones confondues (0 si inconnue).
// Écris totalAnimals() → somme de tous les individus, toutes espèces × zones.

let species = ["lynx","otter","eagle"]
let zones = ["north","river","cliffs"]
let pop = [[3,3,1],[2,2,3],[1,1,5]] // pop = population et pas "enlever du tableau"

//RAPPEL : pop[i][j] = estimé d’individus de species[i] dans zones[j]

function countOf(sp){
    let count = 0
    for (let i = 0; i < species.length ; i++){
        if(species[i]=== sp){
            for (let j = 0; j < pop[i].length ; j++){
                count += pop[i][j]
            }
        }
    }
    console.log(count)
}

countOf("otter")

function totalAnimals(){
    let count = 0
    for (let i = 0; i < pop.length ; i++){
        for (let j = 0; j < pop[i].length ; j++){
            count += pop[i][j]
        }
    }
    console.log(count)
}

totalAnimals()


// Exemples :
// countOf("otter"); 
// // Résultat attendu (ex.) : 7

// totalAnimals();
// // Résultat attendu (ex.) : 21





// Étape 2 – Enregistrer une observation
// Crée un tableau vide logs pour historiser les observations (chaque entrée : { sp, zone, qty }).
// Écris recordObservation(sp, zone, qty) qui :
// ajoute l’espèce et/ou la zone si elles n’existent pas encore (avec des compteurs initialisés à 0),
// ignore si qty ≤ 0,
// ajoute qty à pop[sp][zone],
// pousse un objet dans logs.


let logs = []

//let observation = {sp, zone, qty}
//console.log(species.includes("otter"))

function recordObservation (sp, zone, qty){
    if(qty <= 0){
        return
    } else if (!zones.includes(zone)){
        zones.push(zone)
        for (let indexZones = 0 ; indexZones < pop.length ; indexZones++){
            pop[indexZones].push(0)
        }
    } else if (!species.includes(sp)){
        species.push(sp)
        //console.log(species)

        let newSpecies = []

        for (let indexOneZone = 0; indexOneZone < zones.length ; indexOneZone++){
            newSpecies.push(0)
        }
        pop.push(newSpecies)
    }
    //console.log(pop)

    if(qty > 0){
        let indexAnimal = species.indexOf(sp)
        let indexZone = zones.indexOf(zone)
        pop[indexAnimal][indexZone] += qty
    }

    let objet = {sp, zone, qty}
    logs.push(objet)
}

recordObservation("lynx","north",2)
countOf("lynx")

recordObservation("fox","river",1)
countOf("fox")

// Exemples :
// recordObservation("lynx","north",2);
// countOf("lynx");
// // Résultat attendu (ex.) : ancienne valeur + 2

// recordObservation("fox","river",1);
// countOf("fox");
// // Résultat attendu (ex.) : 1 (créée à la volée)





// Étape 3 – Seuils et alertes
// Déclare un objet thresholds (ex. { lynx: 5, otter: 4 }) indiquant le seuil minimal souhaité par espèce (total toutes zones).
// Écris needsAlert(sp) → true si countOf(sp) est strictement inférieur au seuil défini, sinon false. Si pas de seuil défini pour sp, considère qu’il n’y a pas d’alerte.
// Écris zonePressure(zone) → retourne la pression de la zone parmi "low", "medium", "high" selon le ratio animaux/espèces distinctes présents dans cette zone (définis toi-même les bornes, ex. < 2 → "low", < 4 → "medium", sinon "high").

// Exemples :
// needsAlert("otter");
// // Résultat attendu (ex.) : true/false selon tes données
// zonePressure("river");
// // Résultat attendu (ex.) : "medium"




// Étape 4 – Requêtes & tris utiles
// Écris mostPopulousSpecies() → retourne le nom de l’espèce avec le plus grand total (en cas d’égalité, l’une d’elles suffit).
// Écris zonesByDiversity() → retourne un nouveau tableau des zones triées par diversité décroissante (nombre d’espèces présentes avec au moins 1 individu).
// Écris topRare(k) → retourne un tableau des k espèces les moins nombreuses (par total global croissant).

// Exemples :
// mostPopulousSpecies();
// // Résultat attendu (ex.) : "lynx"
// zonesByDiversity();
// // Résultat attendu (ex.) : ["river","north","cliffs"]
// topRare(2);
// // Résultat attendu (ex.) : ["eagle","otter"]





// Étape 5 – Simulation jour-par-jour
// Écris simulateDay(events) où events est un tableau d’objets { type, sp, zone, qty } :
// type: "sighting" → identique à recordObservation (on ajoute du comptage).
// type: "migration" → déplace qty individus d’une zone source vers une zone cible. Pour cela, l’objet contient { sp, from, to, qty }. Ne rien faire si quantité impossible (stock insuffisant dans from).
// La fonction retourne un objet récapitulatif, par ex. { updated: n, ignored: m } (nombre d’événements appliqués / ignorés).

// Exemples :
// simulateDay([
//   { type: "sighting", sp: "lynx", zone: "north", qty: 1 },
//   { type: "migration", sp: "otter", from: "river", to: "north", qty: 2 }
// ]);
// // Résultat attendu (ex.) : { updated: 2, ignored: 0 }






// Étape 6 – Rapport synthétique
// Écris summary() → retourne un objet avec :
// total : nombre total d’animaux,
// alerts : tableau des espèces en alerte,
// hotspots : les deux zones avec la pression la plus élevée (selon zonePressure),
// rare : les 3 espèces les plus rares.

// Exemple :
// summary();
// /* Résultat attendu (ex.) :
// {
//   total: 27,
//   alerts: ["otter"],
//   hotspots: ["river","north"],
//   rare: ["eagle","fox","beaver"]
// }
// */



// Étape finale – Versionner ton travail 🧩
// Une fois ton code testé et fonctionnel :

// Ouvre ton terminal dans le dossier du projet.
// Ajoute les dernières modifications modifications :
// git add .
// Crée ton dernier commit :
// git commit -m "[COMMENTAIRES]"
// Envoie ton travail sur GitHub :
// git push origin main
// ✅ Objectif : ton dépôt GitHub doit contenir le dossier J08/01_wildlife_tracker/ et ton fichier script.js bien versionné.