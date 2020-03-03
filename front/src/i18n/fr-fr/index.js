// This is just an example,
// so you can safely delete all default props below

export default {
  global_page: {
    title: 'Cours de l\'argent',
    choose_language: 'Selectionnez une langue',
    languages: {
      french: 'Français',
      english: 'Anglais'
    },
    drawer: {
      tool_list_title: 'Liste des outils',
      tools: {
        search: 'Rechercher',
        search_title: 'Rechercher une crypto monnaie',
        fav_title: 'Mes favoris'
      }
    },
    label: {
      crypto_monnaie: 'CryptoMonnaie',
      account: 'Mon compte',
      admin_panel: 'Panneau de configuration',
      load_data: 'Rafraichir les données',
      users: 'Utilisateurs',
      actions: 'Actions',
      warning: 'Attention !'
    },
    confirm_dialog: {
      delete_user: 'Êtes vous vraiment sur de vouloir supprimer cet utilisateur ?'
    }
  },
  errors: {
    title: 'Attention',
    no_search: 'Vous n\'avez pas renseignés de critères de recherche',
    enter_mail: 'Vous devez entrer votre adresse mail au bon format',
    password_different: 'Les deux mots de passe doivent être identiques',
    mail_already_use: 'Cette address mail correspond déjà à un compte',
    unauthorized: 'Attention, vous n\'êtes pas autorisé à accéder à cette fonctionnalité',
    invalid_token: 'Votre session à expiré, veuillez vous reconnecter',
    invalid_credential: 'Mauvais login / mot de passe',
    unidentified: 'Vous n\'êtes pas connectés'
  },
  labels: {
    update_my_info: 'Mise à jour de mes informations',
    edit_my_infos: 'Modifier mes informations',
    actions: 'Actions',
    close: 'Fermer',
    see: 'Voir',
    log_in: 'Se connecter',
    login: 'Connexion',
    log_out: 'Se déconnecter',
    mail_address: 'Adresse mail',
    password: 'Mot de passe',
    cancel: 'Annuler',
    sign_in: 'S\'inscire',
    password_length: 'Longueur du mot de passe supérieure à 8 caractère',
    password_uppercase: 'Le mot de passe contient au moins une majuscule',
    password_number: 'Le mot de passe contient au moins un chiffre',
    password_special: 'Le mot de passe contient au moins un caractère spécial',
    validate: 'Valider',
    crypto_list: 'Liste des monnaies',
    user_list: 'Liste des utilisateurs',
    price_evolution: 'Evolution du prix (en €)',
    hide_diagrams: 'Cacher les diagrammes',
    show_diagrams: 'Montrer les diagrammes',
    price_chart: 'Évolution du court de cette crypto monnaie',
    crypto_object: {
      name: 'Nom',
      symbol: 'Symbole',
      actual_price: 'Prix actuel (en €)',
      show_in_list: 'Afficher dans la liste',
      percent_change_1H: 'Changement durant l\'heure (%)',
      percent_change_24H: 'Changement durant la journée (%)',
      percent_change_7D: 'Changement durant la semaine (%)',
      market_cap: 'Market cap'
    },
    add_fav: 'Ajouter aux favoris',
    remove_fav: 'Retirer des favoris',
    my_account: 'Mon compte',
    my_account_information: 'Informations générales de mon compte',
    user_object: {
      email: 'E-mail',
      is_admin: 'Est administrateur'
    },
    no_favs: 'Vous n\'avez pas de favoris',
    account_created: 'Votre compte à bien été créée',
    crypto_added_to_favs: 'Crypto bien ajoutée à vos favoris',
    crypto_removed_from_favs: 'Crypto supprimée des favoris',
    data_uploaded: 'Les données ont bien été mises à jour',
    account_identity: 'Identité liée au compte'
  },
  hints: {
    enter_mail_address: 'Entrez votre adresse mail',
    enter_password: 'Entrez votre mot de passe',
    password_confirm: 'Confirmez votre mot de passe'
  },
  messages: {
    have_to_login_to_fav: 'Vous devez être connectés pour avoir une liste de favoris'
  }
}
