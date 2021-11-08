# Kanap #

Il s'agit du Projet 5 de la formation developpeur web d'Open Classrooms
### Idée générale ###

Ecrire le javascript front-end pour un site de e-comerce
### Architecture et foncionnement ###

Le Back-end du site est fourni, ainsi que l'HTML et le CSS du front-end.

Le but est d'écrire un code javascript pour exploiter l'architecture fournie et de respecter le cahier des charges (voir : [plan de tests d'accepation]).

Le site est constitué de 4 pages.

- Une page index.html qui doit comporter la liste des produits retournée par l'api.
    Cette page affiche la totalité des produits retournés ainsi que leurs informations relatives.
    Sont utilisées l'URL de l'image, le texte alternatif pour la balise img, le nom et la description de chaque produit.

- Une page product.html qui affiche un produit selon son id .L'api est interrogée pour recupérer un seul produit.
    Cette page affiche le produit selectionné. sont utilisés l'URL de l'image, le texte alternatif, le nom, la description, le prix du produit ainsi que les options de couleurs.

    Elle donne la possibilité à l'utilisateur de choisir la ou les options de couleurs souhaitées ainsi que la quantité à commander.

    les informations enregistrées dans le localStorage sont :   - id
                                                                - options de couleurs
                                                                - quantité

- une page cart.html qui affiche le panier trié par id de produit.

    Elle offre la possibilité de modifier la quantité de chaque produit.
    Elle offre la possibilité de supprimer un ou des produits du panier.

    Elle comporte un formulaire de contact dans lequel les informations saisies sont validées grace à l'utilisation d'expressions regulières.

    Le bouton "commander !" doit envoyer les informations de contact ainsi que les id des produits dans le panier et renvoyer vers la page de confirmation de commande.

- Une page confirmation.html s'affiche avec le numéro de commande lorsque la requète précédemment faite est correcte.

### spécificités ###

L'utilisation de framework ou de librairies est proscrite, seule Javascript "vanilla" est autorisé.



### Prérequis pour le Back end ###

Node et `npm` sont requis.

### Installation du Back end ###

Clonez ce dépôt. Depuis le dossier "back" du projet, exécutez `npm install`.
Vous pouvez alors lancer le serveur avec `Node server`.
Le serveur doit fonctionner sur `localhost` avec le port par défaut `3000`.
Si le serveur s'exécute sur un autre port pour une raison quelconque, celui-ci est indiqué dans la
console au démarrage du serveur, par ex. `Listening on port 3001`.
