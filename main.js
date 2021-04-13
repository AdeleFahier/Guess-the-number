// ETAPE 1: Définir les variables pour stocker les données

// Etape 1a : Générer un random number. Math.random = génére un chiffre random entre 0 et 1. On le multiplie par 100 et lui on ajoute 1 pour que ce chiffre random soit entre 1 et 100. On passe le tout à la méthode Math.floor qui permet de renvoyer le chiffre entier inférieur au résultat random.
let randomNumber = Math.floor(Math.random()*200) + 1;


// Etape 1b : Déclarer trois variables pour stocker une réfrence aux trois paragraphes que l'on utilisera pour insérer des informations.
// Ici on utilise la méthode querySelector('.nomDeLaClasse')
let guesses = document.querySelector('.guesses');
let dernierResultat = document.querySelector('.dernierResultat');
let plusOuMoins = document.querySelector('.plusOuMoins');


// Etape 1c : Créer deux variables qui stockent des réfèrences, une pour l'input de saisie et une pour le bouton submit. Elles nous permettront de récupérer et d'analyser les propositions du joueur.
let guessField = document.querySelector('.guessField');
let buttonSubmit = document.querySelector('.buttonSubmit');

// Etape 1d : Deux dernières variables. La première pour stocker le nombre de tentative. Cette première variable vaut initialement 1. La deuxième variable est une réfèrence pour le bouton de réinitialisation. 
let guessCount = 1;
let resetButton;


// ETAPE 2 : Définir la fonction principale. Nous voulons que cette fonction nous permette de vérifier si la proposition du joueur est correcte ou non et l'on veut que soit renvoyé une réponse appropriée

// Etape 2a : Déclarer une variable pour stocker le nombre proposé par le joueur. Nous faisons passer cette valeur par la méthode Number() pour s'assurer que la valeur stockée est bien un nombre.

// Etape 2b : La première condition --> Si le nombre de tentative c'est à dire que le guessCount est égale à 1, alors on intègre au document dans le 1er paragraphe une information. Cette étape n'aura lieu qu'une seule fois par partie, après la première proposition. Après comme la condition ne sera plus remplie, la fonction l'ignorera et passera à l'étape suivante.

// Etape 2c : On change la valeur de guesses.textContent en y ajoutant la valeur de la dernière playerGuess

// Etape 2d : Condition si le joueur trouve la bonne réponse (on luit dit en vert) + avec une fonction setGameOver()

// Etape 2e : Condition i le joueur a épuisé ses 10 tentatives + avec une fonction setGameOver()

// Etape 2f : Si ce n'est pas gagné et pas encore complétement perdu c'est que le playerGuess est faux. Donc on va lui dire (en couleur rouge) ! Et on va rajouter des petites indications pour l'aider. Si le chiffre est plus ou bien Si il est plus petit.

// Etape 2g : Enfin après toutes ces cas de figures étudiés. Nous rajoutons trois dernières lignes dans la fonction qui préparent le terrain pour une nouvelle proposition. Nous incrémentons guessCount de 1. Au prochain tour guessCount sera de deux et la condition 2b sera false donc ignorée.
// Nous redonnons à guessField une valeur de empty string (c'est à dire qu'on efface le champ texte du formulaire) et on lui redonne le focus, pour être prêt pour la saisie suivante.

function checkProposition(){
    let playerGuess = Number(guessField.value);

    if (guessCount === 1){
        guesses.textContent = 'Propositions précédentes : ';
    }

    guesses.textContent += playerGuess + ' ';

    if (playerGuess === randomNumber){
        dernierResultat.textContent = "Bravo, vous avez trouvé la bonne réponse !";
        dernierResultat.style.backgroundColor= '#426b42';
        plusOuMoins.textContent = '';
        setGameOver();
    } else if (guessCount === 7){
        dernierResultat.textContent = "C'est perdu !";
        setGameOver();
    } else {
        dernierResultat.textContent = "C'est faux...try again"
        dernierResultat.style.backgroundColor = '#ac6060';
        if (playerGuess < randomNumber){
            plusOuMoins.textContent = 'Indice : Le nombre saisi est trop petit...';
        } else if(playerGuess > randomNumber){
            plusOuMoins.textContent = 'Indice : Le nombre saisi est trop grand...'
        }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
}

// ETAPE 3: appeler la fonction checkProposition grâce à un évènement. Cette méthode prend deux arguments : le type d'argument que nous écoutons (dans ce cas 'click') et ensuite le code que nous voulons exécuter quand l'event se produit (dans notre cas c'est ma fonction checkGuess())

buttonSubmit.addEventListener('click', checkProposition);


// ETAPE 4: A présent notre jeu fonctionne, seulement lordque l'on devinera la bonne réponse ou que l'on aura épuiser nos possibilités, le jeu va se casser. Nous devons implémenter la fonction setGameOver() dont le rôle sera de terminer proprement le jeu.
// Pour Rappel cette fonction est appelée dans la fonction checkProposition en cas de victoire ou de défaite. 

// Etape 4a : Desactivé les entrée de l'input de proposition et du bouton pour le joueur ne puisse plus soumettre de nombre après la fin du jeu. Pour cela on déinfit leurs propriétés à true.

// Etape 4b : On va générer un nouveau boutton pour démarrer une nouvelle partie. On crée  le boutton avec la méthode createElement ('le style d'element'), ensuite on lui rajoute un textContent pour lui donner un libellé, puis on l'ajoute à la fin du document HTML. La methode document.body.appendChild (resetButton) --> Permet d'ajouter cet élément boutton comme étant un enfant du <body> 

// Etape 4c : Ensuite on ajoute un évenement 'click' pour stipuler à ce boutton que l'on veut que le jeu soit reset. Methde addEventListener --> au click on appelle la fonction resetGame

function setGameOver(){
    guessField.disabled = true;
    buttonSubmit.disabled = true;

    let resetField = document.querySelector('.resetField');
    resetButton = document.createElement ('button');
    resetButton.textContent = 'Commencer une nouvelle partie';
    resetButton.classList.add('resetButtonStyle');
    resetField.append(resetButton);

    
    // document.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}


// ETAPE 5 : A présent nous devons définir la fonction resetGame qui nous permettra de commencer une nouvelle partie, sans avoir à reloader la page. Nous allons donc réinitionaliser les paramètres du jeu. Nous devons : 

// Etape 5a : Remettre le compteur de guessCount à 1

// Etape 5b : On va utiliser une boucle pour effacer les trois paragraphes d'information. Tout d'abord on va déclarer une variable qui sera un tableau dans lequel on aura 3 les trois paragraphes. On tuilise le querySelectorAll('en ciblant d'abord la class du parent puis le type de l'élement des enfants de ce parent). Ensuite pour tout effacer, on va utiliser une boucle qui se répétera 3 fois. la methode for où let i = 0 (fait réfèrence au premier élement de notre list, donc notre premier p), ensuite une condition (si i est inférieur à la lenght de resetP, ici c'est 3), et si cette condition est validée, alors i est incrémenté de 1 et la fonction s'effectue : ici on cible les élements p de notre liste en ciblant la variable et entre crocher l'enfant : resetP[i]. Et on cible son textContent qu'on set à empty string. L'action d'effacer le textContent sea répétée jusqu'a ce que la condition soit remploie, c'est à dire jusqu'a ce que i < 3 (resetP.lenght).

// Etape 5c : Supprimer le bouton de réinitialisation de notre code avec la méthode removeChild, sans oublier de préciser le parent direct avant : node.parentNode.removeChild(node); --> le noeud(resetButton).le parent du noeud(parentNode).ce qu'on veut lui faire, ici removeChild(le noeud). 

// Etape 5d : Activier les éléments de formulaire l'input et le button submit, avec un focus sur le champ de texte. Rappel : avec le setGameOver, on avait rendu le guessField et le buttonSubtim disabled. Nous allons inverser cela et les rendre able.

// Etape 5e : Penser a supprimer la couleur d'arrière plan du paragraphe dernierResultat, qui selon l'issue de la partie est rouge ou vert. On la va lui redonner un backgroundColor blanc.

// ETape 5f : ET enfin on génère un nouveau random number, pour de pas avoir à devenir le même nombre.

function resetGame(){
    guessCount = 1;

    let resetP = document.querySelectorAll('.resultParagraphes p');
    console.log(resetP);
    for (let i = 0 ; i < resetP.length ; i++){
        resetP[i].textContent = ' ' ;
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    buttonSubmit.disabled = false;
    guessField.value = ' ';
    guessField.focus();

    dernierResultat.style.backgroundColor = '#333333';

    randomNumber = Math.floor(Math.random() * 100) + 1;
}




/*La première chose à faire c'est de le décomposer en tâches simples et codables comme le ferait un programmeur :

Générer un nombre aléatoire entre 1 et 100.
Stocker le nombre de tours déjà joués. Commencer par 1.
Fournir au joueur le moyen de saisir un nombre.
Stocker l'ensemble des propositions de nombres pour que le joueur puisse les consulter.
Vérifier si le nombre saisi par le joueur est correct.
S'il est correct :
    Afficher un message de félicitations.
    Empêcher que le joueur saisisse de nouveau un nombre.
    Afficher un contrôle pour que le joueur puisse rejouer.
S'il est faux et que le joueur a encore des tours à jouer :
    Informer le joueur que sa proposition de nombre est fausse.
    Lui permettre d'entrer une nouvelle proposition de nombre.
    Incrémenter le nombre de tours de 1.
S'il est faux et que le joueur n'a plus de tours à jouer :
    Informer le joueur qu'il a perdu et que la partie est finie.
    Empêcher que le joueur saisisse de nouveau un nombre.
    Afficher un contrôle pour que le joueur puisse rejouer.
Une fois le jeu redémarré, s'assurer que la logique du jeu et l'interface utilisateur sont complètement réinitialisées, puis revenir à l'étape 1.*/
