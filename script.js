//Faire un script qui permet de se calculer, ce qu'on gagne, en tant que freelance. Salaire brut, avec taxe, et salaire net.

function CalculGain () {
    /**
     * On récupère le formulaire dans le HTML =>
     * On récupère l'id dans la balise form.
     */ 
    let myForm = document.getElementById("formCalculGain");

    //On le transforme en objet FormData
    let formObj = new FormData(myForm);
    

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
    document.getElementById("resultatBrut").innerText = totalBrut + " €"
    //Et on lui change son texte, pour afficher le résultat de totalBrut, avec innerText = le total Brut + le sigle euro en caractère
    

    //Faire le calcul des charges 
    //totalBrut - charges%
    //chargeADeduire - (totalBrut * (charges/100))
    let chargeADeduire = (totalBrut * (charges/100));
    
    //Calculer le brut - charges, pour obtenir le résultat NET
    let totalNet = totalBrut - chargeADeduire;
    
    //Résultat charges à déduire
    document.getElementById("resultatDifference").innerText = chargeADeduire + " €"

    //Résultat Net 
    document.getElementById("resultatNet").innerText = totalNet + " €"


}

/** Fonctionnalités supplémentaires, à faire si possible. 
 * Arrondir le résultat, pour ne pas avoir de résultat trop long, dans taxes, deux décimals max. 
 * Raffraichir le résultat au changement d'input (unchange et keyup)
 * Vérifier les données (si <0)
 * Stocker en cookie le formulaire, pour le remplir avec notre dernier calcul
 * - Potentiellement, mais optionel - 
 * Historique de calcul ? (seulement si clic pour calculer)
 * Imprimer la page ? 
 * Convertir en PDF/Excel ? 
 * Animation ?
 * Envoyer Mail ?
 */


