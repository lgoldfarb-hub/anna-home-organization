/* Page logic, translations (EN / RU / FR / PT) and contact settings.
   See config() for WhatsApp, Telegram, Instagram, email and the form endpoint. */
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { slide: 0, lang: null, menuOpen: false, langOpen: false, videoOpen: false, compact: false, tab: "org",
      form: { name: "", email: "", phone: "", loc: "", service: "", msg: "", consent: false, hp: "" },
      errors: {}, status: null };
  }

  /* ---- Fill these in to make the buttons and links live ---- */
  config() {
    return {
      whatsapp: "351911933417", whatsappDisplay: "+351 911 933 417", /* digits with country code, e.g. "351912345678" — the "Write me" buttons open WhatsApp */
      email: "anna.b.goldfarb@gmail.com", /* used for the "Write me" buttons if no WhatsApp number is set */
      instagram: "https://www.instagram.com/anna_bubel/", instagramHandle: "@anna_bubel", telegram: "annagoldfarb", telegramHandle: "@annagoldfarb", /* full profile URL — turns the Testimonials line into a link */
      formEndpoint: "https://formsubmit.co/ajax/anna.b.goldfarb@gmail.com" /* FormSubmit: delivers each inquiry to this inbox (first submission sends Anna an activation email) */
    };
  }

  i18n() {
    if (this._T) return this._T;
    this._T = {
      en: {
        nav: ["Services", "How it works", "Testimonials", "About me"], role: "Professional home organizer",
        h1l1: "Less mess.", h1l2: "Less mental load.", h1b: "More room", h1c: "for life.",
        subA: "Thoughtful ", subB: "home organization and storage solutions", subC: " in Portugal & worldwide.",
        cta: "Get a free consultation", watch: "Watch a quick video about me",
        whyTitleA: "You call a home organizer", whyTitleB: "if you want to",
        why1a: "finally have ", why1b: "a well organized, clutter-free,", why1c: " neat and aesthetically pleasing kitchen, kids' room, office, etc.",
        why2a: "", why2b: "save time and energy", why2c: " by relying on professional help rather than inventing a new system from scratch",
        why3a: "move to a new place and arrive ", why3b: "at a ready-to-live-in house,", why3c: " avoiding living out of boxes",
        svc: "Services", org: "Organizing", mov: "Moving",
        zones: ["Kitchen", "Wardrobes", "Kids' room", "Bathroom", "Storage room", "Office and documents", "Garage", "Fridge", "Etc."],
        price: "200€ per space", movPrice: "from 1,000€",
        priceNote: "Any storage containers are paid for separately.",
        extra: "Additionally, you can order a new smart wardrobe or kitchen layout if you are currently building your dream house.",
        how: "How it works", howCta: "Let's discuss your project",
        o1: "You get in touch with me.",
        o2: "We arrange a first 10 min visit, in order for me to learn:",
        o2list: ["How much stuff you have", "How much storage space is available", "What style of organizers and decor would aesthetically suit your space", "Take measurements", "Clarify our goals and objectives"],
        o2note: "(If you live abroad we can organize it online.)",
        o3: "We set a date when you can be present at home and I buy organizers if needed.",
        o4: "On the agreed date I get to work. The process happens in stages: assessment, decluttering, categorizing, reorganizing.",
        o5: "While I work my magic I will be asking questions about your preferences, practices and patterns. You don't need to do anything practical, but I need to interview and consult you from time to time.",
        o6: "We make up a system based on your habits and my professional knowledge. I put everything in place and label all organizers etc.",
        o7: "I finish with a tour of your new closet or kitchen and leave you with new hacks and recommendations on how to maintain the system from now on. (I bet it'll be way easier than before.)",
        o8: "Everyone is happy. I ask for a testimonial and make a reel.",
        o9: "Voilà.",
        mIntro: "With a Moving project we have a few more factors to consider. Ideally, it happens the following way:",
        mSteps: [
          "You write me about your moving dates.",
          "Either you or I buy a sufficient amount of boxes and stretch film.",
          { a: "I come over to pack in advance. It's best that all sorting and decluttering (the first three stages) happen at your old place. ", b: "So nothing unnecessary travels into your new life." },
          "The next time we meet is at your new place. I bring the organizers and plan a new layout for your belongings.",
          "The whole project may take several days. You arrive carefree, without having to live out of boxes and make hectic decisions where to put it all. Smartly, saving you time and energy."
        ],
        testi: "Testimonials",
        igLine: "View my Instagram for more pics and videos of how I do my job.",
        about: "About me",
        aboutP: [
          "My name is Anna. I was born in Moscow, Russia, and have lived in the USA, Canada, Israel, Brazil, Spain and Portugal.",
          "I used to work as a Russian-English simultaneous interpreter and an international theatre producer. After moving homes and countries many times, I decided to turn my passion for homes and organization into my new vocation.",
          "As a wife and a mother, my mission is to take the mental load off my clients' shoulders and help them invest in a more peaceful, aesthetic and clutter-free life at home."
        ],
        closing: "Get in touch with me now!",
        regards: "Best regards,"
      },
      ru: {
        nav: ["Услуги", "Как это работает", "Отзывы", "Обо мне"], role: "Профессиональный организатор пространства",
        h1l1: "Меньше беспорядка.", h1l2: "Меньше ментальной нагрузки.", h1b: "Больше места", h1c: "для жизни.",
        subA: "Продуманная ", subB: "организация дома и системы хранения", subC: " в Португалии и по всему миру.",
        cta: "Получить бесплатную консультацию", watch: "Посмотрите короткое видео обо мне",
        whyTitleA: "Организатора пространства приглашают,", whyTitleB: "когда хочется",
        why1a: "наконец-то получить ", why1b: "хорошо организованную, свободную от хлама,", why1c: " аккуратную и эстетичную кухню, детскую, кабинет и т. д.",
        why2a: "", why2b: "сэкономить время и силы", why2c: ", доверившись профессионалу, а не изобретая новую систему с нуля",
        why3a: "переехать на новое место и въехать ", why3b: "в дом, готовый к жизни,", why3c: " не живя среди коробок",
        svc: "Услуги", org: "Организация", mov: "Переезд",
        zones: ["Кухня", "Гардеробы", "Детская", "Ванная", "Кладовая", "Кабинет и документы", "Гараж", "Холодильник", "И т. д."],
        price: "200 € за зону", movPrice: "от 1 000 €",
        priceNote: "Все контейнеры для хранения оплачиваются отдельно.",
        extra: "Кроме того, если вы сейчас строите дом мечты, можно заказать проект нового умного гардероба или планировку кухни.",
        how: "Как это работает", howCta: "Давайте обсудим ваш проект",
        o1: "Вы связываетесь со мной.",
        o2: "Мы договариваемся о первом визите на 10 минут. За это время я:",
        o2list: ["узнаю, сколько у вас вещей", "смотрю, сколько есть места для хранения", "понимаю, какой стиль органайзеров и декора эстетически подойдёт вашему пространству", "делаю замеры", "вместе с вами проясняю цели и задачи"],
        o2note: "(Если вы живёте за границей, встречу можно провести онлайн.)",
        o3: "Мы назначаем дату, когда вы сможете быть дома, и при необходимости я покупаю органайзеры.",
        o4: "В назначенный день я приступаю к работе. Процесс идёт поэтапно: оценка, расхламление, сортировка по категориям, новая организация.",
        o5: "Пока я творю магию, я задаю вопросы о ваших предпочтениях, привычках и укладе жизни. Вам не нужно ничего делать руками, но время от времени мне нужно с вами советоваться.",
        o6: "Мы создаём систему, основанную на ваших привычках и моих профессиональных знаниях. Я раскладываю всё по местам и подписываю все органайзеры.",
        o7: "В конце я провожу для вас экскурсию по обновлённому гардеробу или кухне и делюсь лайфхаками и рекомендациями, как поддерживать систему. (Уверена, это будет намного проще, чем раньше.)",
        o8: "Все счастливы. Я прошу оставить отзыв и снимаю рилс.",
        o9: "Вуаля.",
        mIntro: "В проекте с переездом нужно учесть ещё несколько факторов. В идеале всё происходит так:",
        mSteps: [
          "Вы пишете мне о датах переезда.",
          "Вы или я покупаем достаточно коробок и стретч-плёнки.",
          { a: "Я заранее приезжаю, чтобы всё упаковать. Лучше всего, чтобы сортировка и расхламление (первые три этапа) прошли на старом месте — ", b: "тогда ничего лишнего не переедет в вашу новую жизнь." },
          "Следующая встреча — уже на новом месте. Я привожу органайзеры и планирую новое расположение ваших вещей.",
          "Весь проект может занять несколько дней. Вы приезжаете без забот: не нужно жить среди коробок и в спешке решать, куда всё положить. Разумно — и экономит ваши время и силы."
        ],
        testi: "Отзывы",
        igLine: "Загляните в мой Instagram — там больше фото и видео о том, как я работаю.",
        about: "Обо мне",
        aboutP: [
          "Меня зовут Анна. Я родилась в Москве и жила в США, Канаде, Израиле, Бразилии, Испании и Португалии.",
          "Раньше я работала синхронным переводчиком с русского и английского и международным театральным продюсером. После многих переездов — из дома в дом и из страны в страну — я решила превратить свою любовь к дому и порядку в новое призвание.",
          "Как жена и мама, я вижу свою миссию в том, чтобы снять ментальную нагрузку с плеч моих клиентов и помочь им вложиться в более спокойную, эстетичную и свободную от хлама жизнь дома."
        ],
        closing: "Свяжитесь со мной прямо сейчас!",
        regards: "С наилучшими пожеланиями,"
      },
      fr: {
        nav: ["Services", "Comment ça marche", "Témoignages", "À propos"], role: "Organisatrice d'intérieur professionnelle",
        h1l1: "Moins de désordre.", h1l2: "Moins de charge mentale.", h1b: "Plus de place", h1c: "pour la vie.",
        subA: "", subB: "Organisation d'intérieur et solutions de rangement", subC: " réfléchies, au Portugal et dans le monde entier.",
        cta: "Obtenir une consultation gratuite", watch: "Regardez une courte vidéo sur moi",
        whyTitleA: "On fait appel à une organisatrice d'intérieur", whyTitleB: "quand on veut",
        why1a: "enfin avoir une cuisine, une chambre d'enfant, un bureau, etc. ", why1b: "bien organisés, désencombrés,", why1c: " nets et esthétiques",
        why2a: "", why2b: "gagner du temps et de l'énergie", why2c: " grâce à une aide professionnelle, plutôt que d'inventer un nouveau système de zéro",
        why3a: "déménager et arriver ", why3b: "dans une maison prête à vivre,", why3c: " sans vivre dans les cartons",
        svc: "Services", org: "Organisation", mov: "Déménagement",
        zones: ["Cuisine", "Dressings", "Chambre d'enfant", "Salle de bain", "Débarras", "Bureau et papiers", "Garage", "Réfrigérateur", "Etc."],
        price: "200 € par espace", movPrice: "à partir de 1 000 €",
        priceNote: "Les contenants de rangement sont facturés séparément.",
        extra: "Vous pouvez aussi commander l'agencement d'un nouveau dressing intelligent ou d'une cuisine si vous construisez actuellement la maison de vos rêves.",
        how: "Comment ça marche", howCta: "Parlons de votre projet",
        o1: "Vous me contactez.",
        o2: "Nous organisons une première visite de 10 minutes, pendant laquelle je :",
        o2list: ["découvre la quantité d'affaires que vous avez", "évalue l'espace de rangement disponible", "vois quel style d'organisateurs et de déco conviendrait esthétiquement à votre espace", "prends les mesures", "clarifie avec vous nos buts et objectifs"],
        o2note: "(Si vous vivez à l'étranger, nous pouvons l'organiser en ligne.)",
        o3: "Nous fixons une date à laquelle vous pouvez être chez vous, et j'achète les organisateurs si nécessaire.",
        o4: "Le jour convenu, je me mets au travail. Le processus se fait par étapes : évaluation, désencombrement, catégorisation, réorganisation.",
        o5: "Pendant que j'opère ma magie, je vous pose des questions sur vos préférences, vos pratiques et vos habitudes. Vous n'avez rien à faire concrètement, mais j'ai besoin de vous consulter de temps en temps.",
        o6: "Nous créons un système fondé sur vos habitudes et mon savoir-faire. Je mets tout en place et j'étiquette tous les organisateurs.",
        o7: "Je termine par une visite de votre nouveau dressing ou de votre cuisine, et je vous laisse des astuces et des recommandations pour entretenir le système. (Je parie que ce sera bien plus facile qu'avant.)",
        o8: "Tout le monde est content. Je vous demande un témoignage et je fais un reel.",
        o9: "Voilà.",
        mIntro: "Un projet de déménagement implique quelques facteurs de plus. Idéalement, voici comment cela se passe :",
        mSteps: [
          "Vous m'écrivez pour m'indiquer vos dates de déménagement.",
          "Vous ou moi achetons suffisamment de cartons et de film étirable.",
          { a: "Je viens emballer à l'avance. L'idéal est que le tri et le désencombrement (les trois premières étapes) se fassent dans votre ancien logement, ", b: "pour que rien d'inutile ne voyage vers votre nouvelle vie." },
          "Nous nous retrouvons ensuite dans votre nouveau logement. J'apporte les organisateurs et je planifie une nouvelle disposition pour vos affaires.",
          "Le projet peut durer plusieurs jours. Vous arrivez l'esprit léger, sans vivre dans les cartons ni décider dans l'urgence où tout ranger. Malin, et vous gagnez du temps et de l'énergie."
        ],
        testi: "Témoignages",
        igLine: "Rendez-vous sur mon Instagram pour plus de photos et de vidéos de mon travail.",
        about: "À propos de moi",
        aboutP: [
          "Je m'appelle Anna. Je suis née à Moscou, en Russie, et j'ai vécu aux États-Unis, au Canada, en Israël, au Brésil, en Espagne et au Portugal.",
          "J'étais interprète simultanée russe-anglais et productrice de théâtre à l'international. Après avoir changé de maison et de pays de nombreuses fois, j'ai décidé de faire de ma passion pour la maison et l'organisation ma nouvelle vocation.",
          "Épouse et mère, ma mission est d'alléger la charge mentale de mes clients et de les aider à investir dans une vie à la maison plus sereine, plus esthétique et sans encombrement."
        ],
        closing: "Contactez-moi dès maintenant !",
        regards: "Bien à vous,"
      },
      pt: {
        nav: ["Serviços", "Como funciona", "Testemunhos", "Sobre mim"], role: "Organizadora profissional de casas",
        h1l1: "Menos confusão.", h1l2: "Menos carga mental.", h1b: "Mais espaço", h1c: "para a vida.",
        subA: "", subB: "Organização de casas e soluções de arrumação", subC: " pensadas ao pormenor, em Portugal e em todo o mundo.",
        cta: "Pedir uma consulta gratuita", watch: "Veja um pequeno vídeo sobre mim",
        whyTitleA: "Chama-se uma organizadora de casas", whyTitleB: "quando se quer",
        why1a: "ter finalmente uma cozinha, um quarto das crianças, um escritório, etc. ", why1b: "bem organizados, sem tralha,", why1c: " arrumados e esteticamente agradáveis",
        why2a: "", why2b: "poupar tempo e energia", why2c: " contando com ajuda profissional, em vez de inventar um sistema novo do zero",
        why3a: "mudar de casa e chegar ", why3b: "a um lar pronto a viver,", why3c: " sem ter de viver entre caixas",
        svc: "Serviços", org: "Organização", mov: "Mudanças",
        zones: ["Cozinha", "Roupeiros", "Quarto das crianças", "Casa de banho", "Arrecadação", "Escritório e documentos", "Garagem", "Frigorífico", "Etc."],
        price: "200 € por espaço", movPrice: "a partir de 1000 €",
        priceNote: "Os recipientes de arrumação são pagos à parte.",
        extra: "Além disso, se está a construir a casa dos seus sonhos, pode encomendar o projeto de um novo roupeiro inteligente ou da disposição da cozinha.",
        how: "Como funciona", howCta: "Vamos falar do seu projeto",
        o1: "Entra em contacto comigo.",
        o2: "Combinamos uma primeira visita de 10 minutos, em que eu:",
        o2list: ["fico a saber quantas coisas tem", "vejo quanto espaço de arrumação está disponível", "percebo que estilo de organizadores e decoração combina esteticamente com o seu espaço", "tiro medidas", "esclareço consigo os nossos objetivos"],
        o2note: "(Se vive no estrangeiro, podemos fazê-lo online.)",
        o3: "Marcamos uma data em que possa estar em casa e, se for preciso, compro os organizadores.",
        o4: "No dia combinado, ponho mãos à obra. O processo decorre por fases: avaliação, triagem, categorização, reorganização.",
        o5: "Enquanto faço a minha magia, vou fazendo perguntas sobre as suas preferências, hábitos e rotinas. Não precisa de fazer nada na prática, mas de vez em quando preciso da sua opinião.",
        o6: "Criamos um sistema com base nos seus hábitos e no meu conhecimento profissional. Coloco tudo no lugar e etiqueto todos os organizadores.",
        o7: "Termino com uma visita ao seu novo roupeiro ou cozinha e deixo-lhe truques e recomendações para manter o sistema daqui para a frente. (Aposto que vai ser muito mais fácil do que antes.)",
        o8: "Ficam todos felizes. Peço-lhe um testemunho e faço um reel.",
        o9: "Voilà.",
        mIntro: "Num projeto de mudança há mais alguns fatores a ter em conta. O ideal é que decorra assim:",
        mSteps: [
          "Envia-me as datas da mudança.",
          "Um de nós compra caixas e película estirável em quantidade suficiente.",
          { a: "Vou a sua casa embalar com antecedência. O ideal é que toda a triagem e destralhe (as três primeiras fases) aconteçam na casa antiga. ", b: "Assim, nada de desnecessário viaja para a sua nova vida." },
          "O encontro seguinte é já na casa nova. Levo os organizadores e planeio uma nova disposição para os seus pertences.",
          "O projeto pode demorar vários dias. Chega sem preocupações, sem ter de viver entre caixas nem decidir à pressa onde pôr tudo. De forma inteligente, poupando-lhe tempo e energia."
        ],
        testi: "Testemunhos",
        igLine: "Veja o meu Instagram para mais fotos e vídeos de como faço o meu trabalho.",
        about: "Sobre mim",
        aboutP: [
          "Chamo-me Anna. Nasci em Moscovo, na Rússia, e já vivi nos EUA, no Canadá, em Israel, no Brasil, em Espanha e em Portugal.",
          "Fui intérprete de simultânea russo-inglês e produtora internacional de teatro. Depois de mudar muitas vezes de casa e de país, decidi transformar a minha paixão por casas e organização na minha nova vocação.",
          "Como mulher e mãe, a minha missão é tirar a carga mental dos ombros dos meus clientes e ajudá-los a investir numa vida em casa mais tranquila, estética e sem tralha."
        ],
        closing: "Contacte-me já!",
        regards: "Com os melhores cumprimentos,"
      }
    };
    return this._T;
  }

  componentDidMount() {
    var self = this;
    this._onScroll = function () {
      var y = window.scrollY || (document.scrollingElement && document.scrollingElement.scrollTop) || 0;
      var c = y > 40;
      if (c !== self.state.compact) self.setState({ compact: c });
    };
    window.addEventListener("scroll", this._onScroll, { passive: true });
    this._onDocClick = function (e) {
      if (!self.state.langOpen) return;
      var t = e.target;
      if (t && t.closest && t.closest(".lsw")) return;
      self.setState({ langOpen: false });
    };
    document.addEventListener("click", this._onDocClick);
    try {
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce && "IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
          });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
        var vh = window.innerHeight || 800;
        document.querySelectorAll(".reveal").forEach(function (el) {
          if (el.getBoundingClientRect().top > vh) { el.classList.add("pre"); io.observe(el); }
        });
        this._io = io;
      }
    } catch (e) {}
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this._onScroll);
    document.removeEventListener("click", this._onDocClick);
    if (this._io) this._io.disconnect();
  }

  formI18n() { return {
 "en": {
  "contact": "Contact",
  "cTitle2": "Ready to make room for life?",
  "cSub": "Tell me a little about your home or upcoming move. I'd love to hear what you have in mind.",
  "lName": "Full Name",
  "lEmail": "Email",
  "lPhone": "WhatsApp / Phone number (optional)",
  "lLoc": "Location",
  "lService": "Service needed",
  "lChoose": "Choose…",
  "svcOpts": [
   "Home Organization",
   "Moving",
   "Storage Planning",
   "Not Sure Yet"
  ],
  "lMsg": "Tell me about your project",
  "consentA": "I agree that Anna may use my details to reply to my inquiry. See the",
  "consentLink": "Privacy Policy",
  "consentB": ".",
  "submit": "Send it over",
  "errReq": "Please fill this in.",
  "errEmail": "Please enter a valid email address.",
  "errConsent": "Please tick this box to continue.",
  "errBanner": "Please fill in all required fields marked with *.",
  "preview": "Everything looks good. Preview mode: no submission endpoint is connected yet, so nothing was sent.",
  "sending": "Sending…",
  "sent": "Thank you! Your message is on its way — I'll get back to you soon.",
  "failed": "Something went wrong and your message wasn't sent. Please try again in a moment.",
  "opts": {
   "wa": [
    "WhatsApp",
    "WhatsApp me",
    "[WhatsApp number to be added]"
   ],
   "ig": [
    "Instagram",
    "Follow me on Instagram",
    "[Instagram link to be added]"
   ],
   "em": [
    "Email",
    "Email me",
    "[Email address to be added]"
   ]
  },
  "privacy": "Privacy Policy",
  "privacyNote": "Privacy Policy — placeholder. The full policy text will be added before launch."
 },
 "ru": {
  "contact": "Контакты",
  "cTitle2": "Готовы освободить место для жизни?",
  "cSub": "Расскажите немного о своём доме или предстоящем переезде. Мне будет интересно узнать, что вы задумали.",
  "lName": "Имя и фамилия",
  "lEmail": "Email",
  "lPhone": "WhatsApp / номер телефона (необязательно)",
  "lLoc": "Город или страна",
  "lService": "Какая услуга нужна",
  "lChoose": "Выберите…",
  "svcOpts": [
   "Организация дома",
   "Переезд",
   "Планирование хранения",
   "Пока не знаю"
  ],
  "lMsg": "Расскажите о вашем проекте",
  "consentA": "Я согласен(-на), чтобы Анна использовала мои данные для ответа на обращение. См.",
  "consentLink": "политику конфиденциальности",
  "consentB": ".",
  "submit": "Отправить",
  "errReq": "Пожалуйста, заполните это поле.",
  "errEmail": "Введите корректный адрес email.",
  "errConsent": "Отметьте согласие, чтобы продолжить.",
  "errBanner": "Пожалуйста, заполните все обязательные поля, отмеченные *.",
  "preview": "Всё заполнено верно. Режим предпросмотра: отправка формы ещё не подключена, поэтому ничего не отправлено.",
  "sending": "Отправляем…",
  "sent": "Спасибо! Сообщение отправлено — я скоро с вами свяжусь.",
  "failed": "Что-то пошло не так, и сообщение не отправилось. Попробуйте ещё раз чуть позже.",
  "opts": {
   "wa": [
    "WhatsApp",
    "Напишите мне в WhatsApp",
    "[Номер WhatsApp будет добавлен]"
   ],
   "ig": [
    "Instagram",
    "Подписывайтесь на меня в Instagram",
    "[Ссылка на Instagram будет добавлена]"
   ],
   "em": [
    "Email",
    "Напишите мне на почту",
    "[Адрес email будет добавлен]"
   ]
  },
  "privacy": "Политика конфиденциальности",
  "privacyNote": "Политика конфиденциальности — временный текст. Полная версия будет добавлена перед запуском сайта."
 },
 "fr": {
  "contact": "Contact",
  "cTitle2": "Prêts à faire de la place pour la vie ?",
  "cSub": "Parlez-moi un peu de votre maison ou de votre futur déménagement. J'ai hâte de découvrir ce que vous avez en tête.",
  "lName": "Nom complet",
  "lEmail": "E-mail",
  "lPhone": "WhatsApp / numéro de téléphone (facultatif)",
  "lLoc": "Ville ou pays",
  "lService": "Service souhaité",
  "lChoose": "Choisir…",
  "svcOpts": [
   "Organisation d'intérieur",
   "Déménagement",
   "Conception des rangements",
   "Je ne sais pas encore"
  ],
  "lMsg": "Parlez-moi de votre projet",
  "consentA": "J'accepte qu'Anna utilise mes coordonnées pour répondre à ma demande. Voir la",
  "consentLink": "politique de confidentialité",
  "consentB": ".",
  "submit": "Envoyer",
  "errReq": "Merci de remplir ce champ.",
  "errEmail": "Merci de saisir une adresse e-mail valide.",
  "errConsent": "Merci de cocher cette case pour continuer.",
  "errBanner": "Merci de remplir tous les champs obligatoires marqués d'un *.",
  "preview": "Tout est en ordre. Mode aperçu : aucun envoi n'est encore connecté, rien n'a donc été envoyé.",
  "sending": "Envoi…",
  "sent": "Merci ! Votre message est bien parti — je vous réponds très vite.",
  "failed": "Un problème est survenu et votre message n'a pas été envoyé. Merci de réessayer dans un instant.",
  "opts": {
   "wa": [
    "WhatsApp",
    "Écrivez-moi sur WhatsApp",
    "[Numéro WhatsApp à ajouter]"
   ],
   "ig": [
    "Instagram",
    "Suivez-moi sur Instagram",
    "[Lien Instagram à ajouter]"
   ],
   "em": [
    "E-mail",
    "Écrivez-moi par e-mail",
    "[Adresse e-mail à ajouter]"
   ]
  },
  "privacy": "Politique de confidentialité",
  "privacyNote": "Politique de confidentialité — texte provisoire. La version complète sera ajoutée avant le lancement."
 },
 "pt": {
  "contact": "Contacto",
  "cTitle2": "Pronto para abrir espaço para a vida?",
  "cSub": "Conte-me um pouco sobre a sua casa ou a mudança que se aproxima. Gostava muito de saber o que tem em mente.",
  "lName": "Nome completo",
  "lEmail": "E-mail",
  "lPhone": "WhatsApp / número de telefone (opcional)",
  "lLoc": "Localidade",
  "lService": "Serviço pretendido",
  "lChoose": "Escolher…",
  "svcOpts": [
   "Organização de casas",
   "Mudanças",
   "Planeamento de arrumação",
   "Ainda não sei"
  ],
  "lMsg": "Fale-me do seu projeto",
  "consentA": "Aceito que a Anna utilize os meus dados para responder ao meu pedido. Consulte a",
  "consentLink": "Política de Privacidade",
  "consentB": ".",
  "submit": "Enviar",
  "errReq": "Preencha este campo, por favor.",
  "errEmail": "Introduza um endereço de e-mail válido.",
  "errConsent": "Assinale esta opção para continuar.",
  "errBanner": "Preencha todos os campos obrigatórios assinalados com *.",
  "preview": "Está tudo certo. Modo de pré-visualização: ainda não há envio ligado, por isso nada foi enviado.",
  "sending": "A enviar…",
  "sent": "Obrigada! A sua mensagem foi enviada — respondo-lhe em breve.",
  "failed": "Algo correu mal e a mensagem não foi enviada. Tente novamente daqui a pouco.",
  "opts": {
   "wa": [
    "WhatsApp",
    "Fale comigo no WhatsApp",
    "[Número de WhatsApp a acrescentar]"
   ],
   "ig": [
    "Instagram",
    "Siga-me no Instagram",
    "[Ligação do Instagram a acrescentar]"
   ],
   "em": [
    "E-mail",
    "Envie-me um e-mail",
    "[Endereço de e-mail a acrescentar]"
   ]
  },
  "privacy": "Política de Privacidade",
  "privacyNote": "Política de Privacidade — texto provisório. A versão completa será acrescentada antes do lançamento."
 }
}; }

  setField(key, e) {
    var f = Object.assign({}, this.state.form);
    f[key] = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    var errs = Object.assign({}, this.state.errors);
    delete errs[key];
    this.setState({ form: f, errors: errs });
  }

  submit(e) {
    if (e && e.preventDefault) e.preventDefault();
    var f = this.state.form;
    if (f.hp) return; /* honeypot: silently ignore bots */
    var errs = {};
    if (!f.name.trim()) errs.name = "req";
    if (!f.email.trim()) errs.email = "req";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) errs.email = "email";
    if (!f.loc.trim()) errs.loc = "req";
    if (!f.consent) errs.consent = "consent";
    if (Object.keys(errs).length) {
      this.setState({ errors: errs, status: "invalid" });
      var ids = { name: "f-name", email: "f-email", loc: "f-loc", service: "f-service", consent: "f-consent" };
      var first = ["name", "email", "loc", "consent"].filter(function (k) { return errs[k]; })[0];
      setTimeout(function () { try { var el = document.getElementById(ids[first]); if (el) { el.focus({ preventScroll: true }); el.scrollIntoView({ behavior: "smooth", block: "center" }); } } catch (x) {} }, 30);
      return;
    }
    var cfg = this.config();
    var svcEn = { organization: "Home Organization", moving: "Moving", storage: "Storage Planning", unsure: "Not Sure Yet" }[f.service] || "Not specified";
    var subject = "New home org request: " + f.name.trim() + " / " + svcEn;
    var rows = [
      ["Full Name", f.name.trim()], ["Email", f.email.trim()], ["WhatsApp / Phone number", f.phone.trim() || "—"],
      ["Location", f.loc.trim()], ["Service needed", svcEn], ["Project details", f.msg.trim() || "—"],
      ["Site language", this.lang().toUpperCase()], ["Privacy consent", "Yes"]
    ];
    var body = rows.map(function (r) { return r[0] + ": " + r[1]; }).join("\n");
    this._mailto = "mailto:" + cfg.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    var payload = { _subject: subject, _template: "table", _captcha: "false", _replyto: f.email.trim() };
    rows.forEach(function (r) { payload[r[0]] = r[1]; });
    var self = this;
    this.setState({ errors: {}, status: "sending" });
    fetch(cfg.formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (!res.ok || String(res.d.success) !== "true") throw new Error("bad");
        self.setState({ status: "sent", form: { name: "", email: "", phone: "", loc: "", service: "", msg: "", consent: false, hp: "" } });
      })
      .catch(function () { self.setState({ status: "fallback" }); });
  }

  lang() { return this.state.lang || this.props.startLang || "en"; }

  renderVals() {
    var self = this, s = this.state;
    var code = s.lang || this.props.startLang || "en";
    var T = this.i18n();
    var t = Object.assign({}, T[code] || T.en, this.formI18n()[code] || this.formI18n().en);
    var reqTip = { en: "Required field", ru: "Обязательное поле", fr: "Champ obligatoire", pt: "Campo obrigatório" }[code] || "Required field";
    var cfg = this.config();

    var langs = ["en", "ru", "fr", "pt"].map(function (c) {
      return { code: c.toUpperCase(), lc: c === "pt" ? "pt-PT" : c, pressed: c === code ? "true" : "false",
        name: { en: "English", ru: "Русский", fr: "Français", pt: "Português" }[c],
        pick: function () { self.setState({ lang: c, menuOpen: false, langOpen: false }); } };
    });
    var BA = { en: ["Before & after", "Before", "After", "Previous", "Next", "Slide"], ru: ["До и после", "До", "После", "Назад", "Далее", "Слайд"],
      fr: ["Avant / après", "Avant", "Après", "Précédent", "Suivant", "Diapositive"], pt: ["Antes e depois", "Antes", "Depois", "Anterior", "Seguinte", "Diapositivo"] }[code];
    var ids = ["services", "process", "results", "testimonials", "about", "contact"];
    var navL = [t.nav[0], t.nav[1], BA[0], t.nav[2], t.nav[3], t.contact];
    var slides = [
      { b: "assets/images/before-after/01-kids-wardrobe-before.jpg", a: "assets/images/before-after/01-kids-wardrobe-after.jpg", z: 1 },
      { b: "assets/images/before-after/02-shoe-closet-before.jpg", a: "assets/images/before-after/02-shoe-closet-after.jpg", z: 1 },
      { b: "assets/images/before-after/04-coffee-corner-before.jpg", a: "assets/images/before-after/04-coffee-corner-after.jpg", z: 0 },
      { b: "assets/images/before-after/05-medicine-drawer-before.jpg", a: "assets/images/before-after/05-medicine-drawer-after.jpg", custom: { en: "Medicine drawer", ru: "Аптечка", fr: "Tiroir à pharmacie", pt: "Gaveta de medicamentos" } },
      { b: "assets/images/before-after/06-bookshelf-closeup-before.jpg", a: "assets/images/before-after/06-bookshelf-closeup-after.jpg", z: 2 },
      { b: "assets/images/before-after/07-organized-wardrobe-1.jpg", a: "assets/images/before-after/07-organized-wardrobe-2.jpg", ready: true,
        custom: { en: "Move into this. Not boxes.", ru: "Въезжайте в это. Не в коробки.", fr: "Emménagez ici. Pas dans des cartons.", pt: "Mude-se para isto. Não para caixas." } },
      { b: "assets/images/before-after/08-pollock-to-mondrian.jpg", single: true, noLabel: true,
        custom: { en: "Turn your Jackson Pollock into Piet Mondrian.", ru: "Превратите своего Джексона Поллока в Пита Мондриана.", fr: "Transformez votre Jackson Pollock en Piet Mondrian.", pt: "Transforme o seu Jackson Pollock num Piet Mondrian." } }
    ];
    var ORG = { en: "Already organized by Anna", ru: "Уже организовано Анной", fr: "Déjà organisé par Anna", pt: "Já organizado pela Anna" }[code];
    var si = ((s.slide % slides.length) + slides.length) % slides.length;
    var sl = slides[si];
    var cur = { b: sl.b, a: sl.a || sl.b, n: si + 1, single: !!sl.single, pair: !sl.single,
      label: sl.noLabel ? "" : (sl.custom ? sl.custom[code] : t.zones[sl.z]), alt: sl.custom ? sl.custom[code] : t.zones[sl.z],
      bl: sl.ready ? ORG : BA[1], al: sl.ready ? ORG : BA[2],
      bCls: sl.ready ? "ba-lbl ba-lbl-a" : "ba-lbl" };
    var baDots = slides.map(function (x, i) { return { label: BA[5] + " " + (i + 1), on: i === si ? "true" : "false", go: function () { self.setState({ slide: i }); } }; });
    var nav = ids.map(function (id, i) { return { href: "#" + id, label: navL[i] }; });
    var tones = ["#F4F1EC", "#D6DBD0", "#E8D8CD", "#D6DBD0", "#E8D8CD", "#F4F1EC", "#E8D8CD", "#F4F1EC", "#D6DBD0"];
    var icons = ["M4.5 11h15v5.5A3.5 3.5 0 0 1 16 20H8a3.5 3.5 0 0 1-3.5-3.5z M2.5 12.5h2 M19.5 12.5h2 M5.5 11c0-2 2.9-3.5 6.5-3.5s6.5 1.5 6.5 3.5 M12 7.5V6", "M10 5a2 2 0 1 1 2 2v1.5 M12 8.5l-8.3 6.1c-.8.6-.4 1.9.6 1.9h15.4c1 0 1.4-1.3.6-1.9z", "M4.5 13h6v7h-6z M13.5 13h6v7h-6z M12 3.5l4 6.5H8z", "M3 12h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z M6 12V6.5a2.5 2.5 0 0 1 5 0 M7 19l-1 2 M17 19l1 2", "M4 3.5v17 M20 3.5v17 M4 9h16 M4 15h16 M4 20.5h16 M6.5 5h4v4h-4z M12 11h5v4h-5z M7 17h3.5v3.5H7z", "M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z M3.5 10.5h17", "M3 10l9-6 9 6v10H3z M7 20v-7h10v7 M7 15.5h10 M7 18h10", "M8 2.5h8a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2z M6 9.5h12 M9 5.5v2 M9 12v3", "M12 3.5l1.6 4.9 4.9 1.6-4.9 1.6L12 16.5l-1.6-4.9L5.5 10l4.9-1.6z M18.5 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"];
    var zones = t.zones.map(function (z, i) { return { label: z, tone: tones[i % tones.length], d: icons[i % icons.length] }; });
    var movSteps = t.mSteps.map(function (m, i) {
      return typeof m === "string" ? { n: String(i + 1), text: m, bold: "" } : { n: String(i + 1), text: m.a, bold: m.b };
    });

    var waHref = cfg.whatsapp ? "https://wa.me/" + cfg.whatsapp.replace(/\D/g, "") : "";
    var ctaHref = waHref || (cfg.email ? "mailto:" + cfg.email : "");
    var opts = [
      { k: "ig", href: cfg.instagram, target: "_blank" },
      { k: "wa", href: waHref, target: "_blank" },
      { k: "tg", href: cfg.telegram ? "https://t.me/" + cfg.telegram : "", target: "_blank" },
      { k: "em", href: cfg.email ? "mailto:" + cfg.email : "", target: "_blank" }
    ].map(function (o) {
      var tgT = { en: "Telegram me", ru: "Напишите мне в Telegram", fr: "Écrivez-moi sur Telegram", pt: "Fale comigo no Telegram" };
      var tx = o.k === "tg" ? ["Telegram", tgT[code] || tgT.en, ""] : t.opts[o.k];
      return { name: tx[0], t: tx[1], ph: tx[2], d: o.k === "em" ? cfg.email : o.k === "wa" ? cfg.whatsappDisplay : o.k === "tg" ? cfg.telegramHandle : cfg.instagramHandle,
        href: o.href || "#contact", target: o.target, ready: !!o.href, pending: !o.href,
        isWa: o.k === "wa", isTg: o.k === "tg", isIg: o.k === "ig", isEm: o.k === "em" };
    });

    var er = s.errors, msg = function (k) {
      var v = er[k]; if (!v) return "";
      return v === "email" ? t.errEmail : v === "consent" ? t.errConsent : t.errReq;
    };
    var err = { name: msg("name"), email: msg("email"), loc: msg("loc"), service: msg("service"), msg: msg("msg"), consent: msg("consent") };
    var inv = {};
    Object.keys(err).forEach(function (k) { inv[k] = err[k] ? "true" : "false"; });
    var on = {};
    ["name", "email", "phone", "loc", "service", "msg", "consent", "hp"].forEach(function (k) { on[k] = function (e) { self.setField(k, e); }; });
    var svcVals = ["organization", "moving", "storage", "unsure"];
    var svcOpts = t.svcOpts.map(function (l, i) { return { v: svcVals[i], label: l }; });

    var st = s.status;
    var fb = { en: ["The form couldn't be sent automatically.", "Send it by email instead →"],
      ru: ["Не удалось отправить форму автоматически.", "Отправить по email →"],
      fr: ["Le formulaire n'a pas pu être envoyé automatiquement.", "L'envoyer par e-mail →"],
      pt: ["Não foi possível enviar o formulário automaticamente.", "Enviar por e-mail →"] }[code] || [];
    return {
      t: t, reqTip: reqTip, langs: langs,
      ba: { title: BA[0], before: BA[1], after: BA[2], prev: BA[3], next: BA[4] }, cur: cur, baDots: baDots, baTotal: slides.length,
      baPrev: function () { self.setState({ slide: si - 1 }); }, baNext: function () { self.setState({ slide: si + 1 }); },
      langOpen: s.langOpen, langExp: s.langOpen ? "true" : "false",
      curCode: code.toUpperCase(), curName: { en: "English", ru: "Русский", fr: "Français", pt: "Português" }[code],
      videoOpen: s.videoOpen,
      openVideo: function () { self.setState({ videoOpen: true }); },
      closeVideo: function () { self.setState({ videoOpen: false }); },
      closeLbl: { en: "Close", ru: "Закрыть", fr: "Fermer", pt: "Fechar" }[code],
      toggleLang: function () { self.setState({ langOpen: !self.state.langOpen }); }, nav: nav, zones: zones, movSteps: movSteps,
      hdrCls: s.compact ? "compact" : "",
      menuOpen: s.menuOpen, menuClosed: !s.menuOpen, menuExp: s.menuOpen ? "true" : "false",
      toggleMenu: function () { self.setState({ menuOpen: !self.state.menuOpen }); },
      closeMenu: function () { self.setState({ menuOpen: false }); },
      isOrg: s.tab === "org", isMov: s.tab === "mov",
      tabOrg: { sel: s.tab === "org" ? "true" : "false", pick: function () { self.setState({ tab: "org" }); } },
      tabMov: { sel: s.tab === "mov" ? "true" : "false", pick: function () { self.setState({ tab: "mov" }); } },
      toMoving: function () { self.setState({ tab: "mov" }); },
      toOrg: function () { self.setState({ tab: "org" }); },
      orgArrowLabel: t.how + " — " + t.org,
      ctaHref: ctaHref || "#contact", ctaTarget: waHref ? "_blank" : "_self",
      igReady: !!cfg.instagram, igPending: !cfg.instagram, igHref: cfg.instagram || "#testimonials",
      waReady: !!waHref, waHref: waHref || "#contact",
      opts: opts, form: s.form, err: err, inv: inv, on: on, svcOpts: svcOpts,
      submit: function (e) { self.submit(e); },
      stInvalid: st === "invalid",
      stOk: st === "sent" || st === "sending",
      stFallback: st === "fallback",
      isSending: st === "sending", btnOpacity: st === "sending" ? "0.6" : "1",
      mailtoHref: this._mailto || ("mailto:" + cfg.email),
      fbText: fb[0], fbLink: fb[1],
      errText: t.errBanner,
      okText: st === "sent" ? t.sent : t.sending
    };
  }
}
