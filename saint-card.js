/**
 * Saint of the Day Card
 *
 * Data sources (tried in order):
 *  1. calapi-inadiutorium.cz – free liturgical calendar API
 *  2. Curated local fallback keyed by MM-DD
 */

const FALLBACK_SAINTS = {
  '01-01': {
    name: 'Mary, Mother of God',
    feast: 'Solemnity of Mary',
    tags: ['Solemnity', 'Blessed Virgin Mary'],
    bio: 'January 1st honors Mary as the Mother of God (Theotokos), proclaimed at the Council of Ephesus in 431 AD. This is the oldest Marian feast in the Western Church, celebrating her unique role in salvation history as the mother of Jesus Christ.',
    quote: 'My soul magnifies the Lord, and my spirit rejoices in God my Savior.',
    quoteSource: 'Luke 1:46–47',
    wikiSlug: 'Mary,_mother_of_Jesus',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Sassoferrato_-_Jungfrau_im_Gebet.jpg/400px-Sassoferrato_-_Jungfrau_im_Gebet.jpg',
  },
  '01-17': {
    name: 'Saint Anthony the Great',
    feast: 'Feast Day',
    tags: ['Desert Father', 'Monk', 'Egypt'],
    bio: 'Anthony (251–356 AD) was an Egyptian Christian monk who withdrew into the desert, becoming one of the first Christian ascetics. Known as the "Father of Monasticism," he is said to have lived to 105 years old, spending decades in solitary prayer and battle against spiritual temptations.',
    quote: 'I saw the snares that the enemy spreads out over the world, and I said groaning, "What can get through from such snares?" Then I heard a voice saying to me, "Humility."',
    quoteSource: 'St. Anthony the Great',
    wikiSlug: 'Anthony_the_Great',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Velázquez_-_San_Antonio_Abad_y_San_Pablo_Ermitaño_%281635%2C_Prado%29.jpg/400px-Velázquez_-_San_Antonio_Abad_y_San_Pablo_Ermitaño_%281635%2C_Prado%29.jpg',
  },
  '02-14': {
    name: 'Saints Cyril and Methodius',
    feast: 'Feast Day',
    tags: ['Apostles to the Slavs', 'Missionaries', 'Doctors'],
    bio: 'Cyril (826–869) and Methodius (815–885) were Greek brothers and missionaries who evangelized the Slavic peoples. Cyril created the Glagolitic alphabet to translate scripture into the Slavic vernacular. They are co-patrons of Europe and Doctors of the Church.',
    quote: 'Among peoples there is only one God, one faith, one baptism.',
    quoteSource: 'St. Cyril',
    wikiSlug: 'Saints_Cyril_and_Methodius',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Cyril_and_Methodius2.jpg/400px-Cyril_and_Methodius2.jpg',
  },
  '03-17': {
    name: 'Saint Patrick',
    feast: 'Feast Day',
    tags: ['Bishop', 'Patron of Ireland', 'Missionary'],
    bio: 'Patrick (385–461 AD) was a Romano-British Christian missionary and bishop who is regarded as the primary patron saint of Ireland. Kidnapped into slavery at 16, his faith deepened during captivity. After escaping, he returned to Ireland as a missionary, converting thousands and establishing churches across the island.',
    quote: 'Christ with me, Christ before me, Christ behind me, Christ in me, Christ beneath me, Christ above me.',
    quoteSource: 'St. Patrick\'s Breastplate',
    wikiSlug: 'Saint_Patrick',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Muiredach%27s_High_Cross_%28south_face%29_-_geograph.org.uk_-_1434766.jpg/400px-Muiredach%27s_High_Cross_%28south_face%29_-_geograph.org.uk_-_1434766.jpg',
  },
  '04-23': {
    name: 'Saint George',
    feast: 'Feast Day',
    tags: ['Martyr', 'Patron of England', 'Soldier'],
    bio: 'George (died c. 303 AD) was a Roman soldier and officer who became one of the most venerated martyrs in Christianity. According to tradition, he refused to renounce his Christian faith under Emperor Diocletian\'s persecutions and was executed for it. He is patron of England, Georgia, and many other nations.',
    quote: 'I am a Christian, and I will not deny my faith.',
    quoteSource: 'St. George (traditional)',
    wikiSlug: 'Saint_George',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Raphael_-_Saint_George_and_the_Dragon_-_Google_Art_Project.jpg/400px-Raphael_-_Saint_George_and_the_Dragon_-_Google_Art_Project.jpg',
  },
  '06-13': {
    name: 'Saint Anthony of Padua',
    feast: 'Feast Day',
    tags: ['Doctor of the Church', 'Friar', 'Preacher'],
    bio: 'Anthony (1195–1231) was a Portuguese Catholic priest and friar of the Franciscan Order. Renowned for his passionate preaching and expertise in scripture, he is traditionally invoked as the patron saint of lost things and the poor. He was proclaimed a Doctor of the Church by Pope Pius XII.',
    quote: 'Actions speak louder than words; let your words teach and your actions speak.',
    quoteSource: 'St. Anthony of Padua',
    wikiSlug: 'Anthony_of_Padua',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Sant%27Antonio_di_Padova_con_il_Bambino%2C_by_Bartolom%C3%A9_Esteban_Murillo.jpg/400px-Sant%27Antonio_di_Padova_con_il_Bambino%2C_by_Bartolom%C3%A9_Esteban_Murillo.jpg',
  },
  '08-15': {
    name: 'Assumption of the Blessed Virgin Mary',
    feast: 'Solemnity',
    tags: ['Solemnity', 'Blessed Virgin Mary', 'Holy Day of Obligation'],
    bio: 'The Assumption celebrates the dogma that the Virgin Mary, at the end of her earthly life, was taken body and soul into heavenly glory. Defined as dogma by Pope Pius XII in 1950, this is one of the most ancient Marian celebrations, observed since at least the 4th century.',
    quote: 'For he who is mighty has done great things for me, and holy is his name.',
    quoteSource: 'Luke 1:49',
    wikiSlug: 'Assumption_of_Mary',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Titian_-_The_Assumption_of_the_Virgin_-_WGA22833.jpg/400px-Titian_-_The_Assumption_of_the_Virgin_-_WGA22833.jpg',
  },
  '11-01': {
    name: 'All Saints\' Day',
    feast: 'Solemnity',
    tags: ['Solemnity', 'Holy Day of Obligation', 'All Saints'],
    bio: 'All Saints\' Day honors all saints of the Church, both known and unknown. Established to celebrate the innumerable martyrs and saints whose individual feast days cannot all be commemorated separately, this solemnity affirms the Church\'s belief in the Communion of Saints and the hope of resurrection.',
    quote: 'Blessed are the pure in heart, for they shall see God.',
    quoteSource: 'Matthew 5:8',
    wikiSlug: 'All_Saints%27_Day',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Fra_Angelico_-_The_Virgin_Mary_with_the_Apostles_and_Other_Saints_%28detail%29_-_WGA00698.jpg/400px-Fra_Angelico_-_The_Virgin_Mary_with_the_Apostles_and_Other_Saints_%28detail%29_-_WGA00698.jpg',
  },
  '12-25': {
    name: 'Nativity of Our Lord Jesus Christ',
    feast: 'Solemnity – Christmas',
    tags: ['Solemnity', 'Holy Day of Obligation', 'Christmas'],
    bio: 'Christmas commemorates the birth of Jesus Christ in Bethlehem, celebrated since the 4th century on December 25th. This solemnity marks the Incarnation — God becoming human — and is one of the most important celebrations in the liturgical calendar, observed with Midnight Mass and joyful worship.',
    quote: 'For unto you is born this day in the city of David a Savior, who is Christ the Lord.',
    quoteSource: 'Luke 2:11',
    wikiSlug: 'Christmas',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Caravaggio_%281571-1610%29_-_The_Nativity_with_St._Francis_and_St._Lawrence_%281609%29.jpg/400px-Caravaggio_%281571-1610%29_-_The_Nativity_with_St._Francis_and_St._Lawrence_%281609%29.jpg',
  },
};

// Generic fallback for any date not in our curated list
const DEFAULT_SAINT = {
  name: 'Saint of the Day',
  feast: 'Feast Day',
  tags: ['Catholic', 'Martyr'],
  bio: 'The Catholic Church celebrates the feast of a saint each day of the year, honoring the faithful who have lived lives of heroic virtue. Saints serve as intercessors and models of Christian living.',
  quote: 'To be a saint is not a luxury but a necessity.',
  quoteSource: 'Pope St. John Paul II',
  wikiSlug: 'Calendar_of_saints_(Catholic_Church)',
  imageUrl: null,
};

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
          <div class="saint-card__error" id="sc-error">
            <span>🕊</span>
            Unable to load today's saint. Please try again later.
          </div>
        </div>
        <div class="saint-card__footer">
          <span class="saint-card__footer-left">Roman Catholic Calendar</span>
          <a class="saint-card__learn-more" id="sc-link" href="#" target="_blank" rel="noopener">
            Learn More →
          </a>
        </div>
      </div>
    `;

    // Set date
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    });
    this.querySelector('#sc-date').textContent = dateStr;
  }

  async loadSaint() {
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const key = `${mm}-${dd}`;

    let saint = FALLBACK_SAINTS[key] || DEFAULT_SAINT;

    // Try to enrich name/feast from the Calapi API (no CORS issues on modern browsers)
    try {
      const year = now.getFullYear();
      const resp = await fetch(
        `https://calapi.inadiutorium.cz/api/v0/en/calendars/general-en/${year}/${mm}/${dd}`,
        { signal: AbortSignal.timeout(5000) }
      );
      if (resp.ok) {
        const data = await resp.json();
        const celebrations = data?.celebrations;
        if (Array.isArray(celebrations) && celebrations.length > 0) {
          const primary = celebrations[0];
          // Only override if we don't have a hand-curated entry
          if (!FALLBACK_SAINTS[key]) {
            saint = {
              ...DEFAULT_SAINT,
              name: primary.title || DEFAULT_SAINT.name,
              feast: this.rankLabel(primary.rank),
              tags: [this.rankLabel(primary.rank), 'Catholic'].filter(Boolean),
              wikiSlug: encodeURIComponent((primary.title || '').replace(/ /g, '_')),
            };
          }
        }
      }
    } catch (_) {
      // Silently fall back to curated data
    }

    this.populate(saint);
  }

  rankLabel(rank) {
    const map = {
      solemnity: 'Solemnity',
      feast: 'Feast Day',
      memorial: 'Memorial',
      optional_memorial: 'Optional Memorial',
      commemoration: 'Commemoration',
      sunday: 'Sunday',
      feria: 'Feria',
    };
    return map[rank] || 'Feast Day';
  }

  populate(saint) {
    const card = this.querySelector('.saint-card');
    card.classList.remove('saint-card--loading');

    this.querySelector('#sc-name').textContent = saint.name;
    this.querySelector('#sc-feast').textContent = saint.feast;

    // Tags
    const tagsEl = this.querySelector('#sc-tags');
    tagsEl.innerHTML = (saint.tags || [])
      .map(t => `<span class="saint-card__tag">${this.esc(t)}</span>`)
      .join('');

    this.querySelector('#sc-bio').textContent = saint.bio || '';

    // Quote
    if (saint.quote) {
      this.querySelector('#sc-quote-text').textContent = `"${saint.quote}"`;
      this.querySelector('#sc-quote-source').textContent = `— ${saint.quoteSource || ''}`;
      this.querySelector('#sc-quote').classList.add('visible');
    }

    // Image
    if (saint.imageUrl) {
      const img = this.querySelector('#sc-img');
      const placeholder = this.querySelector('#sc-placeholder');
      img.alt = saint.name;
      img.onload = () => {
        img.classList.remove('loading');
        placeholder.style.display = 'none';
      };
      img.onerror = () => {
        img.style.display = 'none';
        placeholder.querySelector('p').textContent = saint.name;
      };
      img.src = saint.imageUrl;
    } else {
      const placeholder = this.querySelector('#sc-placeholder');
      placeholder.querySelector('p').textContent = saint.name;
    }

    // Learn More link
    const link = this.querySelector('#sc-link');
    if (saint.wikiSlug) {
      link.href = `https://en.wikipedia.org/wiki/${saint.wikiSlug}`;
    } else {
      link.href = 'https://www.catholic.org/saints/';
    }
  }

  esc(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

customElements.define('saint-of-day-card', SaintOfDayCard);
