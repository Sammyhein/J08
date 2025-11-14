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
console.log("-------------------ETAPE 1-------------------")
console.log("")

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
    console.log(`Nous avons ${count} ${sp}`)
    console.log("")
}

countOf("otter")
countOf("lynx")
countOf("eagle")

function totalAnimals(){
    let count = 0
    for (let i = 0; i < pop.length ; i++){
        for (let j = 0; j < pop[i].length ; j++){
            count += pop[i][j]
        }
    }
    console.log(`Actuellement, ${count} animaux au total`)
    console.log("")
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

console.log("-------------------ETAPE 2-------------------")
console.log("")


let logs = []

//let observation = {sp, zone, qty}
//console.log(species.includes("otter"))

function recordObservation (sp, zone, qty){
    console.log("Actualisation de nombre total d'une espèce :")
    if(qty <= 0){
        return
    } else if (!zones.includes(zone)){
        zones.push(zone)
        for (let indexZones = 0 ; indexZones < pop.length ; indexZones++){
            pop[indexZones].push(0)
        }
    } else if (!species.includes(sp)){
        console.log("Une nouvelle espèce a été aperçue !")
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

totalAnimals()

// Étape 3 – Seuils et alertes
// Déclare un objet thresholds (ex. { lynx: 5, otter: 4 }) indiquant le seuil minimal souhaité par espèce (total toutes zones).
// Écris needsAlert(sp) → true si countOf(sp) est strictement inférieur au seuil défini, sinon false. 
// Si pas de seuil défini pour sp, considère qu’il n’y a pas d’alerte.

console.log("-------------------ETAPE 3-------------------")
console.log("")

let thresholds = {
    lynx: 5,
    otter: 4
}
// console.log(thresholds.lynx)
// console.log(thresholds["lynx"])

function needsAlert(sp){
    if(!thresholds[sp]){
        return
    }

    if(countOfV2(sp) < thresholds[sp]){ // J'ai mis la fonction V2 que l'on retrouve dans la dernière étape
        console.log(`Le seuil minimal du ${sp} est de ${thresholds[sp]}`)
        console.log("Le resulat est dont 'true', besoin d'une alerte !!!")
        return true
    }else {
        console.log(`Le seuil minimal du ${sp} est de ${thresholds[sp]}`)
        console.log("Le resulat est dont 'false', pas besoin d'alerte.")
        return false
    }
}

needsAlert("otter")

// Exemples :
// needsAlert("otter");
// // Résultat attendu (ex.) : true/false selon tes données

// Écris zonePressure(zone) → retourne la pression de la zone parmi "low", "medium", "high" 
// selon le ratio animaux/espèces distinctes présents dans cette zone (définis toi-même les bornes, 
// ex. < 2 → "low", < 4 → "medium", sinon "high").

// console.log(zones)
// console.log(zones.includes("cliffs"))
// console.log(pop)
// console.log(pop[1][2])

function zonePressure(zone){
    console.log("")
    let countEspeces = 0    // Compter les espèces
    let countAnimaux = 0    // Compter le nombre d'animaux
    let messagePression = " coucou"      // Ce message me sert à verifier la pression selon le nombre d'animaux de cette espèce

    if(zones.includes(zone)){
        let index = zones.indexOf(zone)
        console.log(`Dans la zone ${zone} nous avons : `)
        for(let i = 0 ; i < pop.length ; i++){

            // CONDITIONS POUR LE MESSAGE ET POUR LE COMPTE D'ESPÈCES EN MEME TEMPS
            if (pop[i][index] <= 0){
                messagePression = "la pression de cette espèce est donc considéré comme 'low'"
            }else if (pop[i][index] < 2 && pop[i][index] > 0){ // j'ai du mettre le countEspece et le message ensemble car sinon il n'arrivait à bien compter ou bien modifier le message
                countEspeces += 1
                messagePression = "la pression de cette espèce est considéré comme 'low'"
            }else if (pop[i][index] < 4 && pop[i][index] > 0){
                countEspeces += 1
                messagePression = "la pression de cette espèce est considéré comme 'medium'"
            }else if (pop[i][index] > 4 && pop[i][index] > 0){
                countEspeces += 1
                messagePression = "la pression de cette espèce est considéré comme 'high'"
            }

            console.log(`${pop[i][index]} ${species[i]}, ${messagePression}`)
            countAnimaux += pop[i][index]
            
        }
    } else {
        console.log("Nous n'avons pas d'animaux dans cette zone ou nous n'avons pas cette zone d'enregistré")
    }
    console.log(`\nCe qui nous fait un total de ${countEspeces} espèces dans cette zone !`)
    console.log(`Le nombre total d'animaux dans cette zone est de ${countAnimaux} !`)
    console.log("")

    // Pression selon le nombre d'espèces
    if(countEspeces < 2){
        console.log("La pression du total d'espèces est donc considéré comme 'low',")

    } else if (countEspeces < 4){
        console.log("La pression du total d'espèces est donc considéré comme 'medium',")

    }else {
        console.log("La pression du total d'espèces est donc considéré comme 'high',")
    }

    // Pression selon le nombre total d'animaux
    if(countAnimaux < 2){
        console.log("Pour le total d'animaux, nous sommes sur 'low'.")

    } else if (countAnimaux < 4){
        console.log("Pour le total d'animaux, nous sommes sur 'medium'.")

    }else {
        console.log("Pour le total d'animaux, nous sommes sur 'high'.")
    }
    console.log("")
}

zonePressure("river")

// zonePressure("river");
// // Résultat attendu (ex.) : "medium"




// Étape 4 – Requêtes & tris utiles
// Écris mostPopulousSpecies() → retourne le nom de l’espèce avec le plus grand total (en cas d’égalité, l’une d’elles suffit).

console.log("-------------------ETAPE 4-------------------")
console.log("")

function mostPopulousSpecies(){
    console.log("")

    let nombreTotalChaqueEspece =[]

    let animal = ""
    let plusGrandTotal = 0


    for( let i = 0 ; i < pop.length ; i++){
        let nombreTotalEspece = 0
        for (let j = 0 ; j < pop[i].length ; j++){
            nombreTotalEspece += pop[i][j]
        }
        nombreTotalChaqueEspece.push(nombreTotalEspece)
    }

    //console.log(nombreTotalChaqueEspece)
    //console.log(nombreTotalChaqueEspece[1+1])

    for( let k = 0 ; k < nombreTotalChaqueEspece.length ; k++){
        
        //Mettre une base à comparer
        if (k === 0) {
            animal = species[k]
            plusGrandTotal = nombreTotalChaqueEspece[k]
        }

        //Commencer la comparaison
        if(nombreTotalChaqueEspece[k] < nombreTotalChaqueEspece[k+1]){
            animal = species[k + 1]
            plusGrandTotal = nombreTotalChaqueEspece[k + 1]
        }
    }
    console.log(`L'animal nommé "${animal}" est l'espèce avec le plus grand total`)
    console.log("")
}

mostPopulousSpecies()
// Exemples :
// mostPopulousSpecies();
// // Résultat attendu (ex.) : "lynx"

// Écris zonesByDiversity() → retourne un nouveau tableau des zones triées par diversité décroissante (nombre d’espèces présentes avec au moins 1 individu).

// console.log(zones)
// console.log(zones.includes("cliffs"))
// console.log(pop)
// console.log(pop[1][2])

function zonesByDiversity(){
    let tableauZoneDiversite = []
    let tableauZoneDecroissantDiversite = []
    let tableauZoneDecroissantTotalAnimal = []

    for(let indexZone = 0 ; indexZone < zones.length ; indexZone++){ //Je commence à créer mon tableau selon le nombre de zones
        tableauZoneDiversite.push(0)
        tableauZoneDecroissantTotalAnimal.push(0)
    }
    //console.log(tableauZoneDiversite)
    //console.log(tableauZoneDecroissantTotalAnimal)

    for(let i = 0 ; i < pop.length ; i++){ // J'additionne les animaux dans chaque zone si jamais j'en ai besoin pour plus tard
        for( let j = 0 ; j < pop[i].length; j++){ // Ou si jamais on doit faire un classement par nombre d'animaux au total
            tableauZoneDecroissantTotalAnimal[j] += pop[i][j]
            
        }   
    }
    //console.log(tableauZoneDecroissantTotalAnimal)

    for(let location = 0 ; location < pop.length ; location++){ // Maintenant je regarde le nombre d'espèces par zone
        for (let race = 0 ; race < pop[location].length ; race++){ 
            if (pop[location][race] > 0){
                tableauZoneDiversite[race] += 1
            }
        }
    }
    //console.log(tableauZoneDiversite)

    for ( let classement = 0 ; classement < tableauZoneDiversite.length ; classement++){
        let nb = tableauZoneDiversite[classement]
        tableauZoneDecroissantDiversite.push({zone : zones[classement], nbEspeces : nb})
        tableauZoneDecroissantDiversite.sort((a, b) => b.nbEspeces - a.nbEspeces)
    }
    console.log(`Voici le classement de diversité des zones :`)
    console.log(tableauZoneDecroissantDiversite)
    console.log("")
}

zonesByDiversity()
// zonesByDiversity();
// // Résultat attendu (ex.) : ["river","north","cliffs"]

// Écris topRare(k) → retourne un tableau des k espèces les moins nombreuses (par total global croissant).

function topRare(k){
    let nombreTotalChaqueEspece =[]
    let ordreCroissant = []
    let moinsNombreux = []

    for( let i = 0 ; i < pop.length ; i++){
        let nombreTotalEspece = 0
        for (let j = 0 ; j < pop[i].length ; j++){
            nombreTotalEspece += pop[i][j]
        }
        nombreTotalChaqueEspece.push(nombreTotalEspece)
    }
    //console.log(nombreTotalChaqueEspece)

    for (let ordre = 0 ; ordre < nombreTotalChaqueEspece.length ; ordre++){
        ordreCroissant.push({ animal : species[ordre], nombre : nombreTotalChaqueEspece[ordre]})
        ordreCroissant.sort((a, b) => a.nombre - b.nombre)
    }
    // console.log(ordreCroissant)
    // console.log(ordreCroissant[0].animal)

    for(let race = 0 ; race < k ; race++){
        moinsNombreux.push(ordreCroissant[race].animal)
    }
    console.log(`Le tableau d'animaux les moins nombreux selon le nombre demandé (ici ${k}) est le suivant :`)
    console.log(moinsNombreux)
    console.log("")

}

topRare(2)

// topRare(2);
// // Résultat attendu (ex.) : ["eagle","otter"]





// Étape 5 – Simulation jour-par-jour
// Écris simulateDay(events) où events est un tableau d’objets { type, sp, zone, qty } :
// type: "sighting" → identique à recordObservation (on ajoute du comptage).
// type: "migration" → déplace qty individus d’une zone source vers une zone cible. Pour cela, l’objet contient { sp, from, to, qty }. 
// Ne rien faire si quantité impossible (stock insuffisant dans from).
// La fonction retourne un objet récapitulatif, par ex. { updated: n, ignored: m } (nombre d’événements appliqués / ignorés).

console.log("-------------------ETAPE 5-------------------")
console.log("")


function simulateDay(events){
    let recapitulatif = { updated : 0, ignored : 0}
    //console.log(events[0].type)
    for (let i = 0 ; i < events.length; i++){

        let indexAnimal = species.indexOf(events[i].sp) //je retrouve l'index de l'animal pour mieux le manipuler dans le tableau par la suite
        //console.log(indexAnimal)
        let indexFrom = zones.indexOf(events[i].from)
        let indexTo = zones.indexOf(events[i].to)

        if(events[i].type === "sighting"){
            //Rappel : recordObservation (sp, zone, qty)
            // Exemple : recordObservation("lynx","north",2)
            // countOf("lynx")
            //console.log(`${events[i].sp}`, `${events[i].zone}`, events[i].qty)

            console.log(`Nous avons un sighting du ${events[i].sp} !`)
            recordObservation(`${events[i].sp}`, `${events[i].zone}`, events[i].qty)
            countOf(`${events[i].sp}`)
            recapitulatif.updated += 1

        } else if (events[i].type === "migration"){
            //Rappel : 
            // species = [ 'lynx', 'otter', 'eagle', 'fox' ]
            // zones = ["north","river","cliffs"]
            // pop = [ [ 6, 3, 1 ], [ 2, 2, 3 ], [ 1, 1, 5 ], [ 0, 1, 0 ] ]
            //console.log(indexFrom, indexTo)
            if(pop[indexAnimal][indexFrom] > 0){
                console.log(`La migration du ${events[i].sp} a bien été possible et effectué !`)
                pop[indexAnimal][indexFrom] -= events[i].qty
                pop[indexAnimal][indexTo] += events[i].qty
                recapitulatif.updated += 1
                //console.log(pop)
            } else{
                console.log(`Attention : migration du ${events[i].sp} impossible !`)
                recapitulatif.ignored += 1
            }

        }
    }
    console.log("")
    console.log(recapitulatif)
    console.log("")
}

simulateDay([
    { type: "sighting", sp: "lynx", zone: "north", qty: 1 },
    { type: "migration", sp: "otter", from: "river", to: "north", qty: 2 }
 ])

 

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

console.log("-------------------ETAPE 6-------------------")
console.log("")

//JE FAIS UNE 2ème VERSION DES FONCTIONS POUR PAS CHANGER MES CODES PRÉCÉDENTS


function totalAnimalsV2(){
    let count = 0
    for (let i = 0; i < pop.length ; i++){
        for (let j = 0; j < pop[i].length ; j++){
            count += pop[i][j]
        }
    }
    return count
}

function countOfV2(sp){
    let count = 0
    for (let i = 0; i < species.length ; i++){
        if(species[i]=== sp){
            for (let j = 0; j < pop[i].length ; j++){
                count += pop[i][j]
            }
        }
    }
    return count
}

function needsAlertV2(){
    let tableauAlert = []
    for (let cle in thresholds){
        //RAPPEL : let thresholds = {
//                  lynx: 5,
//                  otter: 4
//                  }
//       console.log(cle)
//       console.log(thresholds[cle])

        if(countOfV2(cle) < thresholds[cle]){
            tableauAlert += cle
        }
    }
    //console.log(tableauAlert.length)
    if(tableauAlert.length === 0){
        tableauAlert = ["Pas d'alertes pour le moment"]
        }
    return tableauAlert
}

function zonePressureV2(nb){ // On va faire sur le nombre total d'espèces par zone
    let nbEspecesParZone = []
    let hotspotsCroissant =[]
    let nbHotspotsCroissant = []

    for(let indexZone = 0 ; indexZone < zones.length ; indexZone++){ //Je commence à créer mon tableau selon le nombre de zones
        nbEspecesParZone.push(0)
    }

    for (let zone = 0 ; zone < zones.length; zone ++){
        for(let i = 0 ; i < pop.length ; i++){
            if(pop[i][zone] > 0){
                nbEspecesParZone[zone] += 1
            }
        }
    }

    // nbEspecesParZone[1] += 56 //verifier si le classement marche si chaque zone a le même nombre d'espèces

    for (ordre = 0 ; ordre < nbEspecesParZone.length ; ordre++){
        hotspotsCroissant.push({ zone : zones[ordre], nbEspece : nbEspecesParZone[ordre]})
        hotspotsCroissant.sort((a, b) => b.nbEspece - a.nbEspece)
    }
    //console.log(hotspotsCroissant)
    //console.log(hotspotsCroissant[0].zone)

    for (nbDemandé = 0 ; nbDemandé < nb ; nbDemandé++){
        nbHotspotsCroissant.push(hotspotsCroissant[nbDemandé].zone)
    }
    //console.log(nbHotspotsCroissant)
    return nbHotspotsCroissant
    
}

function topRareV2(k){
    let nombreTotalChaqueEspece =[]
    let ordreCroissant = []
    let moinsNombreux = []

    for( let i = 0 ; i < pop.length ; i++){
        let nombreTotalEspece = 0
        for (let j = 0 ; j < pop[i].length ; j++){
            nombreTotalEspece += pop[i][j]
        }
        nombreTotalChaqueEspece.push(nombreTotalEspece)
    }
    //console.log(nombreTotalChaqueEspece)

    for (let ordre = 0 ; ordre < nombreTotalChaqueEspece.length ; ordre++){
        ordreCroissant.push({ animal : species[ordre], nombre : nombreTotalChaqueEspece[ordre]})
        ordreCroissant.sort((a, b) => a.nombre - b.nombre)
    }
    // console.log(ordreCroissant)
    // console.log(ordreCroissant[0].animal)

    for(let race = 0 ; race < k ; race++){
        moinsNombreux.push(ordreCroissant[race].animal)
    }

    return moinsNombreux

}

function summary(){
    const resultat = {
        total : totalAnimalsV2(),
        alerts : needsAlertV2(),
        hotspots : zonePressureV2(2),
        rare : topRareV2(3)
    }
    console.log("Voici le Rapport Synthétique")
    console.log(resultat)
}
summary()

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