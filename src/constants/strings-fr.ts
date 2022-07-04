export const GAME_TITLE = process.env.REACT_APP_GAME_NAME!

export const WIN_MESSAGES = ['Bon travail!', 'Pas mal!', 'Formidable!']
export const GAME_COPIED_MESSAGE = 'Jeu copié dans le presse-papiers'
export const NOT_ENOUGH_LETTERS_MESSAGE = 'Pas assez de lettres'
export const WORD_NOT_FOUND_MESSAGE = 'Mot introuvable'
export const HARD_MODE_ALERT_MESSAGE =
  "Le Mode Difficile ne peut être activé qu'au début!"
export const CORRECT_WORD_MESSAGE = (solution: string) =>
  `Le randle était ${solution}`
export const WRONG_SPOT_MESSAGE = (guess: string, position: number) =>
  `Doit utiliser ${guess} en position ${position}`
export const NOT_CONTAINED_MESSAGE = (letter: string) =>
  `Supposition doit contenir ${letter}`
export const SETTINGS_TEXT = 'Paramètres'
export const HARD_MODE_TEXT = 'Mode Difficile'
export const HARD_MODE_DESCRIPTION =
  'Tous les indices révélés doivent être utilisés pour les devinettes suivantes'
export const DARK_MODE_TEXT = 'Mode Sombre'
export const CONTRAST_MODE_TEXT = 'Mode de Contraste Élevé'
export const CONTRAST_MODE_DESCRIPTION =
  'Pour une meilleure vision des couleurs'
export const ENTER_TEXT = 'Entrée'
export const DELETE_TEXT = 'Supprimé'
export const STATISTICS_TITLE = 'Statistiques'
export const GUESS_DISTRIBUTION_TEXT = 'Distribution des essais'
export const NEW_WORD_TEXT = 'Nouveau mot en'
export const NEXT_WORD_TEXT = 'Prochain Mot'
export const SHARE_TEXT = 'Partager'
export const WITH_LINK_TEXT = 'Avec Lien'
export const TOTAL_TRIES_TEXT = "Nombre total d'essais"
export const SUCCESS_RATE_TEXT = 'Taux de réussite'
export const CURRENT_STREAK_TEXT = 'Traînée actuelle'
export const BEST_STREAK_TEXT = 'Meilleure série'
export const MIGRATE_BUTTON_TEXT = 'Transférer'
export const MIGRATE_DESCRIPTION_TEXT =
  'Cliquez ici pour transférer vos statistiques vers un nouvel appareil.'
export const MIGRATE_WARNING_TEXT = `Êtes-vous sûr de vouloir annuler les statistiques de ce dispositif ? Cette action n'est pas réversible.`
export const RELOAD_TEXT = 'Le site va maintenant se recharger.'
export const DISCOURAGE_INAPP_BROWSER_TEXT =
  'Vous utilisez un navigateur intégré et pouvez rencontrer des problèmes pour partager ou enregistrer vos résultats. Nous vous encourageons plutôt à utiliser le navigateur par défaut de votre appareil.'

export const HOW_TO0_TEXT = 'Comment Jouer'
export const HOW_TO1_TEXT =
  'Devinez le mot en 8 essais. Après chaque essai, la couleur des tuiles changera pour montrer à quel point votre essai était proche du mot.'
export const HOW_TO2_TEXT = 'La lettre M est dans le mot et au bon endroit.'
export const HOW_TO3_TEXT =
  'La lettre C est dans le mot mais au mauvais endroit.'
export const HOW_TO4_TEXT = "La lettre N n'est dans le mot à aucun endroit."

export const HOW_TO5_TEXT = `Il s'agit d'un Wordle utilisant des mots liés à Smash et à sa scène compétitive : joueurs, tournois majeurs, techniques, scènes, personnages, etc.`
export const HOW_TO6_TEXT = 'contactez-moi'
export const HOW_TO7_TEXT = 'code source'
export const HOW_TO8_TEXT = 'bifurqué de Reactle'
