//Faire un script qui permet de se calculer, ce qu'on gagne, en tant que freelance. Salaire brut, avec taxe, et salaire net.

function CalculGain () {

    //On vérifie les inputs
    verifierInputs();

    /**
     * On récupère le formulaire dans le HTML =>
     * On récupère l'id dans la balise form.
     */ 
    let myForm = document.getElementById("formCalculGain");

    //On le transforme en objet FormData
    let formObj = new FormData(myForm);
    //Récupérer les cookies (données stocker
    saveElementInCookies(formObj)

    //On récupère les inputs de notre formulaire par leur noms 

    //On récupère les éléments du formulaire Tarif
    let tauxHoraire = formObj.get('TH');
    let tauxJournalier = formObj.get('TJM');
    let extras = formObj.get('Extras');

    //On récupère les éléments du forumulaire Quantité 
    let qteTauxHoraire = formObj.get('QteTH');
    let qteTauxJournalier = formObj.get('QteTJM');
    let qteExtras = formObj.get('QteExtras');

    //On récupère les charges 
    let charges = formObj.get("Charges");

    //On commence le calcul
    let gainHeure = tauxHoraire * qteTauxHoraire;
    // alert(gainHeure);

    let gainJour = tauxJournalier * qteTauxJournalier;
    // alert(gainJour);

    let gainExtras = extras * qteExtras;
    // alert(gainExtras);
    
    //Montant brut, sans calcul de taxe.
    let totalBrut = gainHeure + gainJour + gainExtras;  
    
    //Mettre le résultat de totalBrut dans le boutton BRUT
    //Pour se faire, on récupère l'id du boutton rouge BRUT
    // document.getElementById("resultatBrut").innerText = totalBrut.toFixed(2) + " €"
    //Et on lui change son texte, pour afficher le résultat de totalBrut, avec innerText = le total Brut + le sigle euro en caractère
    



    //Faire le calcul des charges 
    //totalBrut - charges%
    //chargeADeduire - (totalBrut * (charges/100))
    let chargeADeduire = (totalBrut * (charges/100));
    
    //Calculer le brut - charges, pour obtenir le résultat NET
    let totalNet = totalBrut - chargeADeduire;
    
    //Résultat charges à déduire
    // document.getElementById("resultatDifference").innerText = chargeADeduire.toFixed(2) + " €"

    //Résultat Net 
    // document.getElementById("resultatNet").innerText = totalNet.toFixed(2) + " €"

    //Animer le résultat 
    animateCompteur("resultatBrut", totalBrut)

    // let intervalBrut = setInterval(animateCompteur, 1000 / totalBrut, "resultatBrut", totalBrut);

    animateCompteur("resultatDifference", chargeADeduire)

    

    animateCompteur("resultatNet", totalNet)


}

//Fonction d'animation
async function animateCompteur(idARemplacer, total) {
    let cpt = 0; 
    let animationDuration = 70;
    let monElementHtmlDeResultat = document.getElementById(idARemplacer); 
    //Total c'est 140
    //Compter 140 en 1000seconde, 1000ms

    // let increment = total / 10 
    // if (total >= 100){
    //     increment = 10
    // }
    // else if (total >= 1000){
    //     increment = 100
    // }
    //Si mon résultat est different, alors il sera remplacer, on peut ajouter les taxes, sans que le résultat brut soit réinitialiser
    if (monElementHtmlDeResultat.innerText != total.toFixed(2) + " €") {
        let increment = Math.round(total / 10 );
        if(increment==0)
        increment=1;
        //tant que cpt (compteur) est plus petit ou égale au total, alors
        while (cpt <= total) {
            monElementHtmlDeResultat.innerText = cpt.toFixed(2) + " €"
            //Attendre un petit peu, pour voir l'animation
            await timer(animationDuration);
            cpt += increment;
        }
        
        monElementHtmlDeResultat.innerText = total.toFixed(2) + " €"
    }
}

//Fonction pour le timer
function timer(ms){
    return new Promise(res => setTimeout(res, ms));
}

//Fonction pour sauve ses derniers calculs, dans des cookies.

function saveElementInCookies(input) {
    document.cookie = input.name + '=' + input.value;
}

//Récupérer les cookies, et mettre les valeurs, dans les inputs
function getCookie(input){
    let mesCookies = document.cookie;
    // TH = 1; TJM = 2; extras = 3; QteTH= 4; QteTJM = 5; QteExtra = 6; charges = 7.

    const name = input.name + '='; 
    const tableauCookies = mesCookies.split('; ');
    let valeurCookie = null;
    tableauCookies.forEach(cookie => {
        if (cookie.indexOf(name) === 0) {
            //On a le bon cookie
            valeurCookie = cookie.substring(name.length);
            console.log(valeurCookie);
        }
    });
    return valeurCookie;
}

//Ne plus déclencher l'event via un onclick en html, mais directement depuis un event JS, ajout d'évent
let btn = document.getElementById("buttonValidation")
btn.addEventListener("click", CalculGain);

//Raffraichir le résultat au changement de valeur via l'input
let mesInputs = document.querySelectorAll("#formCalculGain input.form-control");

//Parcourir mes éléments, via un tableau, et rajouter onchange
mesInputs.forEach(monInput => {

    //Si il a une valeur en cookie, lui donner
    let cookie = getCookie(monInput);

        if (cookie != undefined && cookie != null ){
            monInput.value = cookie;
            
        }



    monInput.addEventListener('keyup', CalculGain);
    monInput.addEventListener('change', CalculGain);

});

CalculGain();

function verifierInputs() {
    //Raffraichir le résultat au changement de valeur via l'input
    let mesInputs = document.querySelectorAll("#formCalculGain input.form-control");

    mesInputs.forEach(monInput => {
            //Vérifier s'il vaut 0 ou plus
            //Si il est inférieur à zéro
        if (monInput.value < 0 ){
                //Alors on lui met zéro
                monInput.value = 0;

            }
        saveElementInCookies(monInput);
    });
}



/** Fonctionnalités supplémentaires, à faire si possible. 


 * - Potentiellement, mais optionel - 
 * Historique de calcul ? (seulement si clic pour calculer)
 * Imprimer la page ? 
 * Convertir en PDF/Excel ? 
 * Animation ?
 * Envoyer Mail ?
 */

/** Fonctionnalité supplémentaire, faites.
 * Arrondir le résultat, pour ne pas avoir de résultat trop long, dans taxes, deux décimals max. = ajout après la valeur du résultat final : .toFixed(2) 
 * Raffraichir le résultat au changement d'input (unchange et keyup) : .forEach (tableau avec un foreach)
 * Vérifier les données (si < 0), via la fonction : verifierInputs()
 * Stocker en cookie le formulaire, pour le remplir avec notre dernier calcul : getCookie() & saveElementInCookies ()
 * 
 * 
 */

    //Animation
    // document.getElementById("resultatBrut").animate([
    //     //étapes Keyframes
    //     { transform: 'translateY(0px)' },
    //     { transform: 'translateY(300px)' },
    // ], {
    //     //Temporisation
    //     duration: 1000,
    //     interation: Infinity

    // });
