# Kanap #

Il s'agit du Projet 5 de la formation developpeur web d'Open Classrooms
### idée générale ###

écrire le javascript front-end pour un site de e-comerce
### architecture et foncionnement ###

Le Back-end du site est fourni, ainsi que l'HTML et le CSS du front-end.

Le but est d'écrire un code javascript pour exploiter l'architecture fournie et de respecter le cahier des charges (voir : plan de tests d'accepation).

le site est constitué de 4 pages.

- Une page index.html qui doit comporter la liste des produits retourné par l'api.
    cette page affiche la totalité des produits retournés ainsi que leurs informations relatives sont utilisées l'URL de l'image, le texte altenatif pour la balise img, le nom et la description de chaque produit.

- une page product.html qui affiche un produit selon son id l'api est interrogée pour recupérer un seul produit.
    cette page affiche le produit selectionné. sont utilisés l'URL de l'image, le texte alternatif, le nom, la description, le prix du produit ainsi que les options de couleurs.

    elle donne la possibilité à l'utilisateur de choisir la ou les options de couleurs souhaitées ainsi que la quantité à commander.

    les informations enregistrées dans le localStorage sont :   - id
                                                                - options de couleurs
                                                                - quantité

- une page cart.html qui affiche le panier trié par id de produits.

    elle ofre la possibilité de modifier la quantité de chaque produit.
    elle offre la possibilité de supprimer un ou des produits du panier.

    elle comporte un formulaire de contact dans lequel les information saisies sont validées grace à l'utilisation d'expressions regulières.

    Le bouton "commander !" doit envoyer les informations de contact ainsi que les id des produits dans le panier et renvoyer vers la page de confirmation de commande.

- une page confirmation.html s'affiche avec le numéro de commande lorsque la requète précedemment faite est correcte.

### spécificités ###

L'utilastion de framework ou de librairies est proscrite, seule Javascript "vanilla" est autorisé.