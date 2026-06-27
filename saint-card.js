/**
 * Saint of the Day Card
 *
 * Primary source: catholic.org Saint of the Day RSS feed
 * Fallback:       embedded dataset for major feasts / offline use
 */

// ── Embedded fallback data (used when RSS is unreachable) ────────────────────
const SAINTS = {
  '01-01': {
    name: 'Mary, Mother of God', feast: 'Solemnity',
    tags: ['Solemnity', 'Blessed Virgin Mary', 'Holy Day of Obligation'],
    bio: 'January 1st honors Mary as the Mother of God (Theotokos), proclaimed at the Council of Ephesus in 431 AD. This is the oldest Marian feast in the Western Church, celebrating her unique role in salvation history as the mother of Jesus Christ.',
    quote: 'My soul magnifies the Lord, and my spirit rejoices in God my Savior.', quoteSource: 'Luke 1:46–47',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Sassoferrato_-_Jungfrau_im_Gebet.jpg/400px-Sassoferrato_-_Jungfrau_im_Gebet.jpg',
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Mary,_mother_of_Jesus',
  },
  '01-17': {
    name: 'Saint Anthony the Great', feast: 'Memorial',
    tags: ['Desert Father', 'Monk', 'Abbot'],
    bio: 'Anthony (251–356 AD) was an Egyptian Christian monk, the "Father of Monasticism." He withdrew into the desert and is said to have lived to 105, spending decades in prayer and battle against spiritual temptations.',
    quote: 'Humility is the foundation of all the other virtues.', quoteSource: 'St. Anthony the Great',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Hieronymus_Bosch_-_The_Temptation_of_St._Anthony_-_Google_Art_Project.jpg/400px-Hieronymus_Bosch_-_The_Temptation_of_St._Anthony_-_Google_Art_Project.jpg',
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Anthony_the_Great',
  },
  '01-28': {
    name: 'Saint Thomas Aquinas', feast: 'Memorial',
    tags: ['Doctor of the Church', 'Friar', 'Theologian'],
    bio: 'Thomas Aquinas (1225–1274) was an Italian Dominican friar whose "Summa Theologiae" synthesized Christian theology with Aristotelian philosophy. Patron of students and universities.',
    quote: 'The things that we love tell us what we are.', quoteSource: 'St. Thomas Aquinas',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Gentile_da_Fabriano_-_St_Thomas_Aquinas_-_WGA8490.jpg/400px-Gentile_da_Fabriano_-_St_Thomas_Aquinas_-_WGA8490.jpg',
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Thomas_Aquinas',
  },
  '02-14': {
    name: 'Saints Cyril and Methodius', feast: 'Feast Day',
    tags: ['Apostles to the Slavs', 'Missionaries', 'Doctors of the Church'],
    bio: 'Cyril (826–869) and Methodius (815–885) were Greek brothers who evangelized the Slavic peoples. Cyril created the Glagolitic alphabet for scripture translation. Co-patrons of Europe.',
    quote: 'Among peoples there is only one God, one faith, one baptism.', quoteSource: 'St. Cyril',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Cyril_and_Methodius2.jpg/400px-Cyril_and_Methodius2.jpg',
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Saints_Cyril_and_Methodius',
  },
  '03-17': {
    name: 'Saint Patrick', feast: 'Feast Day',
    tags: ['Bishop', 'Patron of Ireland', 'Missionary'],
    bio: 'Patrick (385–461 AD) was kidnapped into Irish slavery at 16. After escaping, he returned as a missionary, converting thousands and establishing the Church throughout Ireland.',
    quote: 'Christ with me, Christ before me, Christ behind me, Christ in me.', quoteSource: "St. Patrick's Breastplate",
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Saint_Patrick_-_Caravaggio_%28Mattia_Preti%29.jpg/400px-Saint_Patrick_-_Caravaggio_%28Mattia_Preti%29.jpg',
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Saint_Patrick',
  },
  '03-19': {
    name: 'Saint Joseph', feast: 'Solemnity',
    tags: ['Solemnity', 'Patron of the Universal Church', 'Worker'],
    bio: 'Joseph was husband of the Virgin Mary and foster father of Jesus. A carpenter from Nazareth, he protected the Holy Family. Patron of the Universal Church, workers, and fathers.',
    quote: 'Joseph did as the angel of the Lord commanded him, and took Mary as his wife.', quoteSource: 'Matthew 1:24',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Guido_Reni_-_St_Joseph_with_the_Infant_Jesus_-_WGA19304.jpg/400px-Guido_Reni_-_St_Joseph_with_the_Infant_Jesus_-_WGA19304.jpg',
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Saint_Joseph',
  },
  '04-29': {
    name: 'Saint Catherine of Siena', feast: 'Feast Day',
    tags: ['Doctor of the Church', 'Dominican', 'Mystic', 'Patron of Europe'],
    bio: 'Catherine of Siena (1347–1380) was a Dominican mystic and Doctor of the Church. Her letters urging Pope Gregory XI to return from Avignon to Rome were instrumental in ending the Avignon papacy.',
    quote: 'Be who God meant you to be and you will set the world on fire.', quoteSource: 'St. Catherine of Siena',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Giovanni_Battista_Tiepolo_-_The_Virgin_Appearing_to_St_Catherine_of_Siena_-_WGA22337.jpg/400px-Giovanni_Battista_Tiepolo_-_The_Virgin_Appearing_to_St_Catherine_of_Siena_-_WGA22337.jpg',
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Catherine_of_Siena',
  },
  '06-13': {
    name: 'Saint Anthony of Padua', feast: 'Memorial',
    tags: ['Doctor of the Church', 'Friar', 'Patron of Lost Things'],
    bio: 'Anthony of Padua (1195–1231) was a Portuguese Franciscan friar renowned for preaching. Patron of lost things and the poor, he was proclaimed a Doctor of the Church.',
    quote: 'Actions speak louder than words; let your words teach and your actions speak.', quoteSource: 'St. Anthony of Padua',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Sant%27Antonio_di_Padova_con_il_Bambino%2C_by_Bartolom%C3%A9_Esteban_Murillo.jpg/400px-Sant%27Antonio_di_Padova_con_il_Bambino%2C_by_Bartolom%C3%A9_Esteban_Murillo.jpg',
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Anthony_of_Padua',
  },
  '06-24': {
    name: 'Birth of Saint John the Baptist', feast: 'Solemnity',
    tags: ['Solemnity', 'Prophet', 'Forerunner of Christ'],
    bio: 'John the Baptist was the forerunner of Jesus Christ. He called Israel to repentance and baptized Jesus in the Jordan. The only saint besides Mary whose birth is celebrated as a solemnity.',
    quote: 'He must increase, but I must decrease.', quoteSource: 'John 3:30',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Leonardo_da_Vinci_-_Saint_John_the_Baptist_C2RMF_retouched.jpg/400px-Leonardo_da_Vinci_-_Saint_John_the_Baptist_C2RMF_retouched.jpg',
    learnMoreUrl: 'https://en.wikipedia.org/wiki/John_the_Baptist',
  },
  '06-27': {
    name: 'Saint Cyril of Alexandria', feast: 'Memorial',
    tags: ['Bishop', 'Doctor of the Church', 'Theologian'],
    bio: 'Cyril of Alexandria (376–444 AD) was Archbishop of Alexandria and a towering theologian. He championed the title "Theotokos" for Mary at the Council of Ephesus in 431, defending the full divinity of Christ.',
    quote: 'We confess our Lord Jesus Christ, the only begotten Son of God, perfect God and perfect man.', quoteSource: 'St. Cyril of Alexandria',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Cyril_of_Alexandria.jpg/400px-Cyril_of_Alexandria.jpg',
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Cyril_of_Alexandria',
  },
  '06-29': {
    name: 'Saints Peter and Paul', feast: 'Solemnity',
    tags: ['Solemnity', 'Apostles', 'Martyrs', 'Holy Day of Obligation'],
    bio: 'This solemnity celebrates Peter the fisherman, first Pope, and Paul the missionary. Both were martyred in Rome under Nero. Together they represent the twin foundations of the Catholic Church.',
    quote: 'You are the Christ, the Son of the living God.', quoteSource: 'Matthew 16:16',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/El_Greco_-_Saints_Peter_and_Paul_-_Google_Art_Project.jpg/400px-El_Greco_-_Saints_Peter_and_Paul_-_Google_Art_Project.jpg',
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Feast_of_Saints_Peter_and_Paul',
  },
  '07-22': {
    name: 'Saint Mary Magdalene', feast: 'Feast Day',
    tags: ['Apostle to the Apostles', 'Disciple', 'Witness of the Resurrection'],
    bio: 'Mary Magdalene was the first witness of the Resurrection and the first to proclaim it, earning her the title "Apostle to the Apostles." She remained at the Cross when most apostles had fled.',
    quote: 'I have seen the Lord!', quoteSource: 'John 20:18',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Georges_de_La_Tour_-_The_Penitent_Magdalene_-_WGA12340.jpg/400px-Georges_de_La_Tour_-_The_Penitent_Magdalene_-_WGA12340.jpg',
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Mary_Magdalene',
  },
  '08-15': {
    name: 'Assumption of the Blessed Virgin Mary', feast: 'Solemnity',
    tags: ['Solemnity', 'Blessed Virgin Mary', 'Holy Day of Obligation'],
    bio: 'The Assumption celebrates Mary being taken body and soul into heavenly glory, defined as dogma by Pope Pius XII in 1950. One of the most ancient Marian celebrations and a Holy Day of Obligation.',
    quote: 'For he who is mighty has done great things for me, and holy is his name.', quoteSource: 'Luke 1:49',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Titian_-_The_Assumption_of_the_Virgin_-_WGA22833.jpg/400px-Titian_-_The_Assumption_of_the_Virgin_-_WGA22833.jpg',
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Assumption_of_Mary',
  },
  '08-28': {
    name: 'Saint Augustine of Hippo', feast: 'Memorial',
    tags: ['Bishop', 'Doctor of the Church', 'Theologian'],
    bio: 'Augustine (354–430 AD) is one of the greatest theologians in history. His "Confessions" and "City of God" remain masterpieces of world literature. He converted after years of searching and the prayers of his mother, Saint Monica.',
    quote: 'Our heart is restless until it finds its rest in Thee.', quoteSource: 'St. Augustine, Confessions',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Sandro_Botticelli_-_St_Augustine_in_his_cell.jpg/400px-Sandro_Botticelli_-_St_Augustine_in_his_cell.jpg',
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Augustine_of_Hippo',
  },
  '09-29': {
    name: 'Sts. Michael, Gabriel, and Raphael', feast: 'Feast Day',
    tags: ['Archangels', 'Feast Day'],
    bio: 'Michaelmas honors the three archangels named in Scripture: Michael the warrior, Gabriel the messenger who announced the Incarnation, and Raphael the healer. Together they represent God\'s protection, communication, and healing.',
    quote: 'Behold, I send an angel before you to guard you on the way.', quoteSource: 'Exodus 23:20',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Guido_Reni_-_Archangel_Michael_-_WGA19344.jpg/400px-Guido_Reni_-_Archangel_Michael_-_WGA19344.jpg',
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Archangel',
  },
  '10-01': {
    name: 'Saint Thérèse of Lisieux', feast: 'Memorial',
    tags: ['Doctor of the Church', 'Carmelite', 'Patron of Missions'],
    bio: 'Thérèse (1873–1897) entered Carmel at 15 and died at 24. Her "Little Way" — doing small things with great love — is one of the most influential spiritual paths in modern Catholicism.',
    quote: 'Miss no single opportunity of making some small sacrifice, here by a smiling look, there by a kindly word.', quoteSource: 'St. Thérèse of Lisieux',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Ste_Th%C3%A9r%C3%A8se_de_Lisieux.jpg/400px-Ste_Th%C3%A9r%C3%A8se_de_Lisieux.jpg',
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Th%C3%A9r%C3%A8se_of_Lisieux',
  },
  '10-04': {
    name: 'Saint Francis of Assisi', feast: 'Memorial',
    tags: ['Friar', 'Patron of Animals and Ecology'],
    bio: 'Francis of Assisi (1181–1226) renounced wealth to live the Gospel in radical poverty. He founded the Franciscan Order, received the stigmata, and composed the "Canticle of the Sun." Patron of animals and ecology.',
    quote: 'Lord, make me an instrument of your peace. Where there is hatred, let me sow love.', quoteSource: 'Peace Prayer of St. Francis',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Giovanni_Bellini%2C_Saint_Francis_in_the_Desert.jpg/400px-Giovanni_Bellini%2C_Saint_Francis_in_the_Desert.jpg',
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Francis_of_Assisi',
  },
  '10-15': {
    name: 'Saint Teresa of Ávila', feast: 'Memorial',
    tags: ['Doctor of the Church', 'Carmelite', 'Mystic'],
    bio: 'Teresa of Ávila (1515–1582) was a Spanish Carmelite mystic, reformer, and the first woman proclaimed Doctor of the Church. Her works "The Interior Castle" and "The Way of Perfection" are masterpieces of mystical theology.',
    quote: 'The important thing is not to think much but to love much.', quoteSource: 'St. Teresa of Ávila',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/SantaTeresaJesus.jpg/400px-SantaTeresaJesus.jpg',
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Teresa_of_%C3%81vila',
  },
  '11-01': {
    name: "All Saints' Day", feast: 'Solemnity',
    tags: ['Solemnity', 'Holy Day of Obligation', 'All Saints'],
    bio: "All Saints' Day honors every saint — known and unknown — who have attained heavenly glory. This solemnity affirms the Church's belief in the Communion of Saints and our universal call to holiness.",
    quote: 'Blessed are the pure in heart, for they shall see God.', quoteSource: 'Matthew 5:8',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Fra_Angelico_-_The_Virgin_Mary_with_the_Apostles_and_Other_Saints_%28detail%29_-_WGA00698.jpg/400px-Fra_Angelico_-_The_Virgin_Mary_with_the_Apostles_and_Other_Saints_%28detail%29_-_WGA00698.jpg',
    learnMoreUrl: "https://en.wikipedia.org/wiki/All_Saints'_Day",
  },
  '12-08': {
    name: 'Immaculate Conception', feast: 'Solemnity',
    tags: ['Solemnity', 'Blessed Virgin Mary', 'Holy Day of Obligation'],
    bio: 'The Immaculate Conception holds that Mary was preserved from original sin from the moment of her conception. Defined as dogma by Pope Pius IX in 1854. The patronal feast of the United States.',
    quote: 'Hail, full of grace, the Lord is with you.', quoteSource: 'Luke 1:28',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Murillo-Inmaculada_Concepci%C3%B3n-Museo_del_Prado.jpg/400px-Murillo-Inmaculada_Concepci%C3%B3n-Museo_del_Prado.jpg',
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Immaculate_Conception',
  },
  '12-12': {
    name: 'Our Lady of Guadalupe', feast: 'Feast Day',
    tags: ['Feast Day', 'Blessed Virgin Mary', 'Patron of the Americas'],
    bio: 'In 1531, the Virgin Mary appeared to Saint Juan Diego on Tepeyac Hill, leaving her image miraculously imprinted on his cloak. She is the Patron of the Americas, still venerated at the Basilica of Guadalupe in Mexico City.',
    quote: 'Am I not here, I who am your Mother?', quoteSource: 'Our Lady of Guadalupe to Juan Diego',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Virgen_de_guadalupe1.jpg/400px-Virgen_de_guadalupe1.jpg',
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Our_Lady_of_Guadalupe',
  },
  '12-25': {
    name: 'Nativity of Our Lord Jesus Christ', feast: 'Solemnity – Christmas',
    tags: ['Solemnity', 'Holy Day of Obligation', 'Christmas'],
    bio: 'Christmas commemorates the birth of Jesus Christ in Bethlehem. This solemnity marks the Incarnation — the eternal Son of God becoming human through the Virgin Mary — the pivotal event of all human history.',
    quote: 'For unto you is born this day in the city of David a Savior, who is Christ the Lord.', quoteSource: 'Luke 2:11',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Geertgen_tot_Sint_Jans_-_Nativity_at_Night_-_National_Gallery_London.jpg/400px-Geertgen_tot_Sint_Jans_-_Nativity_at_Night_-_National_Gallery_London.jpg',
    learnMoreUrl: 'https://en.wikipedia.org/wiki/Christmas',
  },
};

// ── RSS feed URL ─────────────────────────────────────────────────────────────
const RSS_URL = 'https://www.catholic.org/xml/rss_sofd.php';

class SaintOfDayCard extends HTMLElement {
  connectedCallback() {
    this.render();
    this.loadSaint();
  }

  render() {
    this.innerHTML = `
      <div class="saint-card saint-card--loading">
        <div class="saint-card__header">
          <span class="saint-card__header-icon">✝</span>
          <div class="saint-card__header-text">
            <div class="saint-card__label">Catholic Saint of the Day</div>
            <div class="saint-card__date" id="sc-date"></div>
          </div>
        </div>
        <div class="saint-card__image-wrap">
          <div class="saint-card__image-placeholder" id="sc-placeholder">
            <span>✝</span>
            <p>Loading…</p>
          </div>
          <img class="saint-card__image loading" id="sc-img" alt="" />
        </div>
        <div class="saint-card__body">
          <h2 class="saint-card__name" id="sc-name">&nbsp;</h2>
          <p class="saint-card__feast" id="sc-feast">&nbsp;</p>
          <hr class="saint-card__divider" />
          <div class="saint-card__tags" id="sc-tags"></div>
          <p class="saint-card__bio" id="sc-bio">&nbsp;</p>
          <blockquote class="saint-card__quote" id="sc-quote">
            <p id="sc-quote-text"></p>
            <cite id="sc-quote-source"></cite>
          </blockquote>
        </div>
        <div class="saint-card__footer">
          <span class="saint-card__footer-left">catholic.org</span>
          <a class="saint-card__learn-more" id="sc-link" href="#" target="_blank" rel="noopener">
            Learn More →
          </a>
        </div>
      </div>
    `;
    const now = new Date();
    this.querySelector('#sc-date').textContent = now.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    });
  }

  async loadSaint() {
    let saint = null;

    try {
      const resp = await fetch(RSS_URL, { signal: AbortSignal.timeout(8000) });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const text = await resp.text();
      saint = this.parseRSS(text);
    } catch (err) {
      console.warn('Saint of Day: RSS fetch failed, using fallback.', err);
    }

    if (!saint) {
      // Use embedded fallback keyed by today's MM-DD
      const now = new Date();
      const key = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      saint = SAINTS[key] || {
        name: 'Saints of the Roman Calendar',
        feast: 'Feast Day',
        tags: ['Catholic', 'Holy Men and Women'],
        bio: 'The Catholic Church honors saints every day of the year — holy men and women who bore witness to Christ. Though not all are widely known, every saint trusted in God\'s love and now intercedes for us in heaven.',
        quote: 'To be a saint is not a luxury but a necessity.',
        quoteSource: 'Pope St. John Paul II',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Fra_Angelico_-_The_Virgin_Mary_with_the_Apostles_and_Other_Saints_%28detail%29_-_WGA00698.jpg/400px-Fra_Angelico_-_The_Virgin_Mary_with_the_Apostles_and_Other_Saints_%28detail%29_-_WGA00698.jpg',
        learnMoreUrl: 'https://www.catholic.org/saints/',
      };
    }

    this.populate(saint);
  }

  parseRSS(xmlText) {
    // Parse the RSS XML in the browser's built-in DOMParser
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'application/xml');

    const item = doc.querySelector('item');
    if (!item) return null;

    const getText = tag => item.querySelector(tag)?.textContent?.trim() || '';
    const getAttr = (tag, attr) => item.querySelector(tag)?.getAttribute(attr) || '';

    const title = getText('title');
    const link  = getText('link') || 'https://www.catholic.org/saints/';
    const rawDesc = getText('description');

    // Strip HTML tags from description to get plain text bio
    const tmpEl = document.createElement('div');
    tmpEl.innerHTML = rawDesc;
    const bio = tmpEl.textContent.replace(/\s+/g, ' ').trim();

    // Image may be in <enclosure>, <media:content>, or <image> inside description
    let imageUrl = getAttr('enclosure', 'url')
      || getAttr('media\\:content, media:content', 'url')
      || '';

    // If not found via element, look for first <img> inside the description HTML
    if (!imageUrl) {
      const imgMatch = rawDesc.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch) imageUrl = imgMatch[1];
    }

    if (!title) return null;

    return {
      name: title,
      feast: 'Feast Day',
      tags: ['Catholic', 'Saint of the Day'],
      bio: bio || 'Read the full biography at catholic.org.',
      quote: null,
      quoteSource: null,
      imageUrl: imageUrl || null,
      learnMoreUrl: link,
    };
  }

  populate(saint) {
    const card = this.querySelector('.saint-card');
    card.classList.remove('saint-card--loading');

    this.querySelector('#sc-name').textContent = saint.name;
    this.querySelector('#sc-feast').textContent = saint.feast;

    this.querySelector('#sc-tags').innerHTML = (saint.tags || [])
      .map(t => `<span class="saint-card__tag">${this.esc(t)}</span>`)
      .join('');

    this.querySelector('#sc-bio').textContent = saint.bio;

    if (saint.quote) {
      this.querySelector('#sc-quote-text').textContent = `"${saint.quote}"`;
      this.querySelector('#sc-quote-source').textContent = `— ${saint.quoteSource || ''}`;
      this.querySelector('#sc-quote').classList.add('visible');
    }

    const img = this.querySelector('#sc-img');
    const placeholder = this.querySelector('#sc-placeholder');
    placeholder.querySelector('p').textContent = saint.name;

    if (saint.imageUrl) {
      img.alt = saint.name;
      img.onload = () => { img.classList.remove('loading'); placeholder.style.display = 'none'; };
      img.onerror = () => { img.style.display = 'none'; };
      img.src = saint.imageUrl;
    } else {
      img.style.display = 'none';
    }

    this.querySelector('#sc-link').href = saint.learnMoreUrl;
  }

  esc(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

customElements.define('saint-of-day-card', SaintOfDayCard);
