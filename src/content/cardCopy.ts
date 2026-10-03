import type { Language } from '../context/LanguageContext'
import type { AndeanCard } from '../types'

export type CardLocale = {
  keywords: string[]
  meaning: string
  reversedMeaning: string
  andeanMessage: string
  advice: string
}

const en: Record<number, CardLocale> = {
  0: {
    keywords: ['beginning', 'news', 'dare'],
    meaning: 'Something new wants to start. A message, an invitation, or simply the urge to leap before everything is settled. This is the moment to dare what you already feel.',
    reversedMeaning: 'You are circling or still missing facts. Clarify before you leap, and do not promise what you cannot yet keep.',
    andeanMessage: 'The chaski runs from mountain to mountain with the message. His work is to move.',
    advice: 'Take one small, concrete first step today, even without the full plan.',
  },
  1: {
    keywords: ['intention', 'resources', 'focus'],
    meaning: 'You already have what you need: skill, contacts, time. What is missing is deciding what they are for. When intention is clear, the rest begins to order itself.',
    reversedMeaning: 'Energy is scattered, or words and deeds do not match. Return to what matters and be honest with yourself before going on.',
    andeanMessage: 'The paqo prepares the offering with care: each piece has a reason to be there.',
    advice: 'Write your intention in one sentence and check that this week’s actions hold it.',
  },
  2: {
    keywords: ['intuition', 'rhythms', 'waiting'],
    meaning: 'You feel something before you can explain it, and that signal deserves attention. It is also time to respect your rhythms: not everything is won by pushing.',
    reversedMeaning: 'Emotions are mixed and it is hard to tell the real from the feared. Wait until you are calmer before a major decision.',
    andeanMessage: 'Mama Quilla marks the cycles of water and rest. Each thing has its phase.',
    advice: 'Before you settle it, let one night pass and write what you feel on waking.',
  },
  3: {
    keywords: ['care', 'abundance', 'constancy'],
    meaning: 'What you have been tending is bearing fruit, or is about to. A good time for home, body, money and projects that need constancy more than haste.',
    reversedMeaning: 'Health, home or finances are being neglected for other demands. Return to the basics before asking for more results.',
    andeanMessage: 'The earth returns to those who work her with respect and without hurry.',
    advice: 'Choose one concrete thing that sustains you — rest, food, saving — and set it in order this week.',
  },
  4: {
    keywords: ['order', 'limits', 'authority'],
    meaning: 'Structure is needed: clear priorities, times, rules of the game. An authority may appear, or you may need to take the lead yourself.',
    reversedMeaning: 'Either too much is being imposed, or no one is holding order and everything scatters. See who decides what, and take back your part.',
    andeanMessage: 'The apu holds the valley without moving. His strength is quiet firmness.',
    advice: 'Set one concrete limit — of time, money or availability — and say it out loud.',
  },
  5: {
    keywords: ['counsel', 'study', 'experience'],
    meaning: 'Time to study, ask advice, or let someone who has walked this path guide you. You may also be the one with something to teach.',
    reversedMeaning: 'Pride is refusing help, or you are following someone without question. Seek reliable sources and keep your own mind.',
    andeanMessage: 'The amauta keeps what generations learned and offers it without haste.',
    advice: 'Ask someone with real experience in the matter, and listen without going on the defensive.',
  },
  6: {
    keywords: ['bond', 'choice', 'agreement'],
    meaning: 'An important relationship appears, or a choice between two paths. What works is not sameness, but complement.',
    reversedMeaning: 'One side is giving or deciding more than the other. Speak before wear does the talking.',
    andeanMessage: 'Yanantin: two different things that, together, hold the world.',
    advice: 'Say clearly what you offer and what you need, and ask the same of the other.',
  },
  7: {
    keywords: ['progress', 'direction', 'constancy'],
    meaning: 'You are in motion and there is real progress. It may be a journey, a change of place, or a project that finally starts. Hold the course.',
    reversedMeaning: 'You are scattering, or moving fast in a direction that does not convince you. Stop and check the destination, not only the speed.',
    andeanMessage: 'The great road joins distant towns, and it is walked stretch by stretch.',
    advice: 'Set a goal for the next seven days and remove one distraction that pulls you off the path.',
  },
  8: {
    keywords: ['calm', 'courage', 'self-control'],
    meaning: 'You have more power than you think, and it works better in calm. You need not raise your voice to be taken seriously.',
    reversedMeaning: 'You are answering from anger or fear. Haste costs you authority: breathe before you reply.',
    andeanMessage: 'The puma walks in silence and still arrives.',
    advice: 'When something shakes you, wait a day before you answer.',
  },
  9: {
    keywords: ['pause', 'silence', 'clarity'],
    meaning: 'You need silence and a little distance from the noise to see clearly. This is not escape: it is space to hear yourself.',
    reversedMeaning: 'Isolation has gone too far and feeds confusion. Speak again with someone you trust.',
    andeanMessage: 'At height the air is clean and thoughts settle on their own.',
    advice: 'Keep a stretch without screens to walk or write what is circling you.',
  },
  10: {
    keywords: ['change', 'cycle', 'adaptation'],
    meaning: 'Things are turning. Something ends and something else begins, often without your choosing. Adapting will cost less than resisting.',
    reversedMeaning: 'You cling to what has already changed. The longer you delay acceptance, the sharper the turn.',
    andeanMessage: 'Pachakuti turns the world so it can bloom again.',
    advice: 'Write what is ending and what free space it leaves; decide what you place there.',
  },
  11: {
    keywords: ['balance', 'exchange', 'clear accounts'],
    meaning: 'Time to settle accounts — not only of money, but of time, favors and affection. What is fair here is an even exchange.',
    reversedMeaning: 'You give far more than you receive, or the reverse. That wears the bond even if no one says it aloud.',
    andeanMessage: 'Ayni: today for you, tomorrow for me. That is how community holds.',
    advice: 'Return something you owe, or clearly ask for the help you need.',
  },
  12: {
    keywords: ['perspective', 'waiting', 'review'],
    meaning: 'Stop and look at the matter from another angle. What seems a problem today may look different if you stop pushing.',
    reversedMeaning: 'You have thought too long without acting. You have seen enough: now move one piece.',
    andeanMessage: 'Under the earth the roots work even when no one sees them.',
    advice: 'Put the decision off one day and note what changed in how you see it.',
  },
  13: {
    keywords: ['ending', 'grief', 'rebirth'],
    meaning: 'Something ends: a stage, a bond, a way of being. It hurts, but it opens space. What you release feeds what comes after.',
    reversedMeaning: 'You are holding something already finished, for fear of the empty space. Allow a true close.',
    andeanMessage: 'Ancestor and seed are the same root: what dies feeds what is born.',
    advice: 'Say goodbye in a concrete way: keep, give away or delete what has finished its cycle.',
  },
  14: {
    keywords: ['calm', 'midpoint', 'healing'],
    meaning: 'Time to lower the intensity and find balance. Mix instead of choosing an extreme: neither all nor nothing.',
    reversedMeaning: 'You overflow or you shut down completely. Find a channel: speaking in time prevents the flood.',
    andeanMessage: 'The lake’s water moves slowly and still reaches everywhere.',
    advice: 'In the conflict you have now, name what you can yield without betraying yourself.',
  },
  15: {
    keywords: ['bondage', 'habit', 'fear'],
    meaning: 'A habit, a fear or a relationship has you caught. It is not a punishment: it is a pattern that repeats because it has not been named.',
    reversedMeaning: 'You are already seeing the trap, and that alone weakens it. A good moment to cut and not go back.',
    andeanMessage: 'Supay waits at the threshold: looking at him takes his power.',
    advice: 'Name out loud what holds you, and choose one small action today to loosen it.',
  },
  16: {
    keywords: ['rupture', 'truth', 'shock'],
    meaning: 'Something falls at once: a plan, an idea, a certainty. It is uncomfortable, but it shows what was truly held and what was not.',
    reversedMeaning: 'You are postponing a break you already know is needed. The sooner you face it, the less thunder it will make.',
    andeanMessage: 'Lightning splits the sky, and afterwards the air is clean.',
    advice: 'Attend first to what is urgent and to your safety; rebuilding comes later, in calm.',
  },
  17: {
    keywords: ['hope', 'guide', 'desire'],
    meaning: 'Trust returns. Something orients you: a wish, a gift, a goal. Follow it with patience; there is no need to run.',
    reversedMeaning: 'You are chasing a shine that leads nowhere. Check whether that wish is still yours or belongs to others.',
    andeanMessage: 'In the Andean night, the stars are the map.',
    advice: 'Remember what you wanted before the urgencies, and give it a real place in your week.',
  },
  18: {
    keywords: ['transformation', 'intuition', 'caution'],
    meaning: 'You are changing skin. Not everything is clear yet, and that is normal: in these stages you move more by intuition than by certainties.',
    reversedMeaning: 'You want to change without releasing anything. Something may also be withheld from you: verify before you trust.',
    andeanMessage: 'Amaru sheds its skin without ceasing to be the same serpent.',
    advice: 'Test what you sense against one concrete fact before you decide.',
  },
  19: {
    keywords: ['clarity', 'energy', 'recognition'],
    meaning: 'A good moment: there is clarity, spirit, and results that show. Time to be seen and to enjoy what you have done without shrinking it.',
    reversedMeaning: 'You are forcing the shine or exhausting yourself to hold an image. Slow the pace before you burn.',
    andeanMessage: 'Inti rises each morning without asking permission.',
    advice: 'Name or celebrate a recent achievement, even if it seems small.',
  },
  20: {
    keywords: ['decision', 'perspective', 'reckoning'],
    meaning: 'Something closes a whole stage and waits for your answer. Look from height: what of this will matter in a year?',
    reversedMeaning: 'You are caught in details or old guilt. Forgive what you can no longer change, and decide at last.',
    andeanMessage: 'The condor rises high to see the whole valley.',
    advice: 'Take the pending decision as you will see it a year from now.',
  },
  21: {
    keywords: ['closure', 'fullness', 'balance'],
    meaning: 'A cycle closes with a sense of completion. What you did has meaning, and the areas of your life find their place.',
    reversedMeaning: 'Something was left half-done, or one area — work, body, affection — is neglected and unbalances the rest.',
    andeanMessage: 'The chakana joins the three worlds and keeps each in its place.',
    advice: 'Close formally what you have finished, and see which area of your life is asking for care.',
  },
}

const fr: Record<number, CardLocale> = {
  0: {
    keywords: ['commencement', 'nouvelle', 'oser'],
    meaning: 'Quelque chose de neuf veut commencer. Un message, une invitation, ou simplement l’envie de vous lancer sans tout avoir réglé. C’est le moment d’oser ce que vous sentez déjà.',
    reversedMeaning: 'Vous tournez en rond ou il vous manque des faits. Clarifiez avant de sauter, et ne promettez pas ce que vous ne pouvez pas encore tenir.',
    andeanMessage: 'Le chaski court de montagne en montagne avec le message. Son œuvre est de se mettre en mouvement.',
    advice: 'Faites aujourd’hui un premier pas petit et concret, même sans le plan entier.',
  },
  1: {
    keywords: ['intention', 'ressources', 'focus'],
    meaning: 'Vous avez déjà ce qu’il faut : capacité, contacts, temps. Il reste à décider à quoi vous les employez. Quand l’intention est claire, le reste commence à s’ordonner.',
    reversedMeaning: 'L’énergie se disperse, ou les mots et les actes ne disent pas la même chose. Revenez à l’essentiel et soyez honnête avec vous avant de continuer.',
    andeanMessage: 'Le paqo prépare l’offrande avec soin : chaque élément a une raison d’être là.',
    advice: 'Écrivez votre intention en une phrase et vérifiez que vos actes de la semaine la soutiennent.',
  },
  2: {
    keywords: ['intuition', 'rythmes', 'attente'],
    meaning: 'Vous sentez quelque chose avant de pouvoir l’expliquer, et ce signal mérite attention. C’est aussi le temps de respecter vos rythmes : tout ne s’obtient pas en poussant.',
    reversedMeaning: 'Les émotions sont mêlées et l’on peine à séparer le réel de la crainte. Attendez d’être plus calme avant une décision importante.',
    andeanMessage: 'Mama Quilla marque les cycles de l’eau et du repos. Chaque chose a sa phase.',
    advice: 'Avant de résoudre, laissez passer une nuit et notez ce que vous sentez au réveil.',
  },
  3: {
    keywords: ['soin', 'abondance', 'constance'],
    meaning: 'Ce que vous soignez porte fruit, ou s’apprête à le faire. Bon moment pour le foyer, le corps, l’argent et les projets qui demandent de la constance plus que de la hâte.',
    reversedMeaning: 'Santé, maison ou finances sont négligées pour d’autres exigences. Revenez à l’essentiel avant de demander plus de résultats.',
    andeanMessage: 'La terre rend à qui la travaille avec respect et sans précipitation.',
    advice: 'Choisissez une chose concrète qui vous soutient — repos, nourriture, épargne — et mettez-la en ordre cette semaine.',
  },
  4: {
    keywords: ['ordre', 'limites', 'autorité'],
    meaning: 'Il faut une structure : priorités claires, horaires, règles du jeu. Une figure d’autorité peut apparaître, ou c’est à vous de prendre le commandement.',
    reversedMeaning: 'On vous impose trop, ou personne ne met d’ordre et tout se disperse. Voyez qui décide quoi, et reprenez votre part.',
    andeanMessage: 'L’apu soutient la vallée sans bouger. Sa force est une fermeté tranquille.',
    advice: 'Fixez une limite concrète — de temps, d’argent ou de disponibilité — et dites-la.',
  },
  5: {
    keywords: ['conseil', 'étude', 'expérience'],
    meaning: 'Temps d’étudier, de demander conseil, ou de vous laisser guider par quelqu’un qui a déjà marché là. Vous pouvez aussi être celle qui a quelque chose à enseigner.',
    reversedMeaning: 'Vous refusez l’aide par orgueil, ou vous suivez quelqu’un sans question. Cherchez des sources fiables et gardez votre propre tête.',
    andeanMessage: 'L’amauta garde ce que les générations ont appris et le transmet sans hâte.',
    advice: 'Consultez quelqu’un qui a une vraie expérience du sujet, et écoutez sans vous défendre.',
  },
  6: {
    keywords: ['lien', 'choix', 'accord'],
    meaning: 'Une relation importante apparaît, ou un choix entre deux chemins. Ce qui fonctionne n’est pas d’être pareils, mais de se compléter.',
    reversedMeaning: 'L’un des deux côtés donne ou décide plus que l’autre. Parlez-en avant que l’usure ne le fasse.',
    andeanMessage: 'Yanantin : deux choses distinctes qui, ensemble, tiennent le monde.',
    advice: 'Dites clairement ce que vous offrez et ce dont vous avez besoin, et demandez la même chose à l’autre.',
  },
  7: {
    keywords: ['avance', 'cap', 'constance'],
    meaning: 'Vous êtes en mouvement et il y a un progrès concret. Voyage, changement de lieu, ou projet qui démarre enfin. Tenez le cap.',
    reversedMeaning: 'Vous vous dispersez, ou vous avancez vite dans une direction qui ne vous convainc pas. Arrêtez-vous et revoyez la destination, pas seulement la vitesse.',
    andeanMessage: 'Le grand chemin unit des peuples lointains, et se parcourt étape par étape.',
    advice: 'Fixez un but pour les sept prochains jours et ôtez une distraction qui vous dévie.',
  },
  8: {
    keywords: ['calme', 'courage', 'maîtrise'],
    meaning: 'Vous avez plus de force que vous ne croyez, et elle agit mieux dans le calme. Nul besoin d’élever la voix pour être pris au sérieux.',
    reversedMeaning: 'Vous répondez depuis la colère ou la peur. La hâte vous ôte de l’autorité : respirez avant de répondre.',
    andeanMessage: 'Le puma marche en silence et arrive tout de même.',
    advice: 'Quand quelque chose vous agite, laissez passer un jour avant de répondre.',
  },
  9: {
    keywords: ['pause', 'silence', 'clarté'],
    meaning: 'Vous avez besoin de silence et d’un peu de distance au bruit pour y voir clair. Ce n’est pas fuir : c’est vous donner l’espace de vous écouter.',
    reversedMeaning: 'Vous vous isolez trop et cela nourrit la confusion. Reprenez la parole avec quelqu’un de confiance.',
    andeanMessage: 'Dans les hauteurs l’air est net et les pensées se rangent d’elles-mêmes.',
    advice: 'Gardez un moment sans écrans pour marcher ou écrire ce qui vous habite.',
  },
  10: {
    keywords: ['changement', 'cycle', 'adaptation'],
    meaning: 'Les choses tournent. Quelque chose finit et autre chose commence, souvent sans que vous l’ayez choisi. Vous adapter coûtera moins que résister.',
    reversedMeaning: 'Vous vous accrochez à ce qui a déjà changé. Plus vous tardez à l’accepter, plus le tournant sera brusque.',
    andeanMessage: 'Pachakuti retourne le monde pour qu’il puisse refleurir.',
    advice: 'Écrivez ce qui se termine et l’espace libre que cela laisse ; décidez ce que vous y placez.',
  },
  11: {
    keywords: ['équilibre', 'échange', 'comptes clairs'],
    meaning: 'Temps de régler les comptes — pas seulement d’argent, aussi de temps, de faveurs et d’affection. Ici le juste est un échange pair.',
    reversedMeaning: 'Vous donnez bien plus que vous ne recevez, ou l’inverse. Cela use le lien même si personne ne le dit.',
    andeanMessage: 'Ayni : aujourd’hui pour toi, demain pour moi. Ainsi tient la communauté.',
    advice: 'Rendez quelque chose de dû, ou demandez clairement l’aide dont vous avez besoin.',
  },
  12: {
    keywords: ['perspective', 'attente', 'relecture'],
    meaning: 'Arrêtez-vous et regardez l’affaire sous un autre angle. Ce qui paraît un problème aujourd’hui peut se voir autrement si vous cessez de pousser.',
    reversedMeaning: 'Vous pensez trop longtemps sans agir. Vous avez assez vu : maintenant déplacez une pièce.',
    andeanMessage: 'Sous la terre les racines travaillent même si personne ne les voit.',
    advice: 'Remettez la décision d’un jour et notez ce qui a changé dans votre regard.',
  },
  13: {
    keywords: ['clôture', 'deuil', 'renaissance'],
    meaning: 'Quelque chose se termine : une étape, un lien, une façon d’être. Cela fait mal, mais ouvre un espace. Ce que vous lâchez nourrit ce qui vient.',
    reversedMeaning: 'Vous tenez encore ce qui est déjà fini, par peur du vide. Permettez une vraie clôture.',
    andeanMessage: 'L’ancêtre et la graine sont la même racine : ce qui meurt nourrit ce qui naît.',
    advice: 'Dites adieu de façon concrète : gardez, donnez ou effacez ce qui a accompli son cycle.',
  },
  14: {
    keywords: ['calme', 'juste milieu', 'guérison'],
    meaning: 'Temps de baisser l’intensité et de chercher l’équilibre. Mélanger plutôt que choisir un extrême : ni tout ni rien.',
    reversedMeaning: 'Vous débordez ou vous vous fermez tout à fait. Trouvez un lit : parler à temps évite l’inondation.',
    andeanMessage: 'L’eau du lac se meut lentement et atteint pourtant partout.',
    advice: 'Dans le conflit présent, dites ce que vous pouvez céder sans vous trahir.',
  },
  15: {
    keywords: ['attache', 'habitude', 'peur'],
    meaning: 'Une habitude, une peur ou une relation vous tient. Ce n’est pas un châtiment : c’est un schéma qui se répète parce qu’il n’a pas encore été nommé.',
    reversedMeaning: 'Vous voyez déjà le piège, et cela seul l’affaiblit. Bon moment pour couper et ne pas revenir.',
    andeanMessage: 'Supay attend au seuil : le regarder en face lui ôte du pouvoir.',
    advice: 'Nommez à voix haute ce qui vous attache, et choisissez aujourd’hui un petit geste pour le desserrer.',
  },
  16: {
    keywords: ['rupture', 'vérité', 'secousse'],
    meaning: 'Quelque chose tombe d’un coup : un plan, une idée, une certitude. C’est inconfortable, mais montre ce qui tenait vraiment et ce qui ne tenait pas.',
    reversedMeaning: 'Vous remettez une rupture que vous savez déjà nécessaire. Plus tôt vous l’affrontez, moins elle fera de bruit.',
    andeanMessage: 'L’éclair fend le ciel, et ensuite l’air est net.',
    advice: 'Occupez-vous d’abord de l’urgent et de votre sécurité ; la reconstruction vient après, dans le calme.',
  },
  17: {
    keywords: ['espoir', 'guide', 'désir'],
    meaning: 'La confiance revient. Quelque chose vous oriente : un désir, un don, un but. Suivez-le avec patience ; il n’est pas besoin de courir.',
    reversedMeaning: 'Vous poursuivez un éclat qui ne mène nulle part. Voyez si ce désir est encore le vôtre ou celui des autres.',
    andeanMessage: 'Dans la nuit andine, les étoiles sont la carte.',
    advice: 'Rappelez-vous ce que vous vouliez avant les urgences, et donnez-lui une vraie place dans votre semaine.',
  },
  18: {
    keywords: ['transformation', 'intuition', 'prudence'],
    meaning: 'Vous changez de peau. Tout n’est pas encore clair, et c’est normal : à ces étapes l’on avance plus par intuition que par certitudes.',
    reversedMeaning: 'Vous voulez changer sans rien lâcher. Il se peut aussi que l’on ne vous dise pas tout : vérifiez avant de faire confiance.',
    andeanMessage: 'Amaru change de peau sans cesser d’être le même serpent.',
    advice: 'Confrontez ce que vous pressentez à un fait concret avant de décider.',
  },
  19: {
    keywords: ['clarté', 'énergie', 'reconnaissance'],
    meaning: 'Bon moment : il y a de la clarté, de l’élan, et des résultats qui se voient. Temps de vous montrer et de goûter ce qui est fait sans le minimiser.',
    reversedMeaning: 'Vous forcez l’éclat ou vous vous épuisez à tenir une image. Ralentissez avant de brûler.',
    andeanMessage: 'Inti se lève chaque matin sans demander permission.',
    advice: 'Nommez ou célébrez un accomplissement récent, même s’il vous semble petit.',
  },
  20: {
    keywords: ['décision', 'perspective', 'bilan'],
    meaning: 'Quelque chose clôt toute une étape et attend votre réponse. Regardez de haut : qu’est-ce qui importera dans un an ?',
    reversedMeaning: 'Vous êtes prise dans les détails ou de vieilles fautes. Pardonnez ce que vous ne pouvez plus changer, et décidez enfin.',
    andeanMessage: 'Le condor monte haut pour voir toute la vallée.',
    advice: 'Prenez la décision en attente comme vous la verrez dans un an.',
  },
  21: {
    keywords: ['clôture', 'plénitude', 'équilibre'],
    meaning: 'Un cycle se ferme avec un sentiment d’achèvement. Ce que vous avez fait a du sens, et les domaines de votre vie trouvent leur place.',
    reversedMeaning: 'Quelque chose est resté à mi-chemin, ou un domaine — travail, corps, affects — est négligé et déséquilibre le reste.',
    andeanMessage: 'La chakana unit les trois mondes et tient chacun à sa place.',
    advice: 'Fermez formellement ce qui est fini, et voyez quel domaine de votre vie demande soin.',
  },
}

export function getCardLocale(id: number, language: Language): CardLocale | null {
  if (language === 'en') return en[id] ?? null
  if (language === 'fr') return fr[id] ?? null
  return null
}

export function localizedCardFields(card: AndeanCard, language: Language) {
  const locale = getCardLocale(card.id, language)
  return {
    keywords: locale?.keywords ?? card.keywords,
    meaning: locale?.meaning ?? card.meaning,
    reversedMeaning: locale?.reversedMeaning ?? card.reversedMeaning,
    andeanMessage: locale?.andeanMessage ?? card.andeanMessage,
    advice: locale?.advice ?? card.advice,
  }
}
