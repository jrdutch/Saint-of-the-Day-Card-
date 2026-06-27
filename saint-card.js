/**
 * Saint of the Day Card
 *
 * Data pipeline:
 *  1. Calapi Inadiutorium  →  today's saint name + feast rank
 *  2. Wikipedia REST API   →  biography summary + thumbnail image
 *  3. Curated overrides    →  hand-picked quotes; also full fallback for
 *                             major feasts where Wikipedia title differs
 */

// Hand-curated quotes and Wikipedia slug overrides, keyed by MM-DD.
// The live APIs handle bio + image for every date; this just enriches
// major feasts with a quote and ensures the right Wikipedia article.
const CURATED = {
  '01-01': {
    quote: 'My soul magnifies the Lord, and my spirit rejoices in God my Savior.',
    quoteSource: 'Luke 1:46–47',
    wikiSlug: 'Mary,_mother_of_Jesus',
  },
  '01-17': {
    quote: 'Humility is the foundation of all the other virtues.',
    quoteSource: 'St. Anthony the Great',
    wikiSlug: 'Anthony_the_Great',
  },
  '02-14': {
    quote: 'Among peoples there is only one God, one faith, one baptism.',
    quoteSource: 'St. Cyril',
    wikiSlug: 'Saints_Cyril_and_Methodius',
  },
  '03-17': {
    quote: 'Christ with me, Christ before me, Christ behind me, Christ in me.',
    quoteSource: "St. Patrick's Breastplate",
    wikiSlug: 'Saint_Patrick',
  },
  '03-19': {
    quote: 'He who trusts in God lacks nothing.',
    quoteSource: 'St. Joseph (traditional)',
    wikiSlug: 'Saint_Joseph',
  },
  '04-23': {
    quote: 'I am a Christian, and I will not deny my faith.',
    quoteSource: 'St. George (traditional)',
    wikiSlug: 'Saint_George',
  },
  '05-03': {
    quote: 'Lord, we do not know where you are going; how can we know the way?',
    quoteSource: 'John 14:5',
    wikiSlug: 'Philip_the_Apostle',
  },
  '06-13': {
    quote: 'Actions speak louder than words; let your words teach and your actions speak.',
    quoteSource: 'St. Anthony of Padua',
    wikiSlug: 'Anthony_of_Padua',
  },
  '06-24': {
    quote: 'He must increase, but I must decrease.',
    quoteSource: 'John 3:30',
    wikiSlug: 'John_the_Baptist',
  },
  '06-27': {
    quote: 'The heretic who denies the Virgin to be Mother of God is not truly Christian.',
    quoteSource: 'St. Cyril of Alexandria',
    wikiSlug: 'Cyril_of_Alexandria',
  },
  '06-29': {
    quote: 'You are the Christ, the Son of the living God.',
    quoteSource: 'Matthew 16:16',
    wikiSlug: 'Saint_Peter',
  },
  '07-22': {
    quote: 'I have seen the Lord.',
    quoteSource: 'John 20:18',
    wikiSlug: 'Mary_Magdalene',
  },
  '07-25': {
    quote: 'The sons of Zebedee asked: Grant us to sit at your right and left in your glory.',
    quoteSource: 'Mark 10:37',
    wikiSlug: 'James,_son_of_Zebedee',
  },
  '08-10': {
    quote: 'Unless a grain of wheat falls into the earth and dies, it remains alone.',
    quoteSource: 'John 12:24',
    wikiSlug: 'Saint_Lawrence',
  },
  '08-15': {
    quote: 'For he who is mighty has done great things for me, and holy is his name.',
    quoteSource: 'Luke 1:49',
    wikiSlug: 'Assumption_of_Mary',
  },
  '08-28': {
    quote: 'Our heart is restless until it finds its rest in Thee.',
    quoteSource: 'St. Augustine, Confessions',
    wikiSlug: 'Augustine_of_Hippo',
  },
  '09-29': {
    quote: 'Who is like God?',
    quoteSource: 'Meaning of Michael',
    wikiSlug: 'Archangel',
  },
  '10-04': {
    quote: 'Start by doing what is necessary, then what is possible, and suddenly you are doing the impossible.',
    quoteSource: 'St. Francis of Assisi',
    wikiSlug: 'Francis_of_Assisi',
  },
  '10-15': {
    quote: 'The important thing is not to think much but to love much.',
    quoteSource: 'St. Teresa of Ávila',
    wikiSlug: 'Teresa_of_Ávila',
  },
  '11-01': {
    quote: 'Blessed are the pure in heart, for they shall see God.',
    quoteSource: 'Matthew 5:8',
    wikiSlug: "All_Saints'_Day",
  },
  '11-04': {
    quote: 'Nothing is so strong as gentleness, nothing so gentle as real strength.',
    quoteSource: 'St. Francis de Sales',
    wikiSlug: 'Francis_de_Sales',
  },
  '12-03': {
    quote: 'It is not the actual physical exertion that counts towards a man\'s progress, nor the nature of the task, but the spirit of faith with which it is undertaken.',
    quoteSource: 'St. Francis Xavier',
    wikiSlug: 'Francis_Xavier',
  },
  '12-25': {
    quote: 'For unto you is born this day in the city of David a Savior, who is Christ the Lord.',
    quoteSource: 'Luke 2:11',
    wikiSlug: 'Christmas',
  },
};

// Wikipedia article title overrides: maps Calapi saint titles that don't
// match a Wikipedia article directly to the correct Wikipedia slug.
const WIKI_TITLE_MAP = {
  'Saint Cyril of Alexandria': 'Cyril_of_Alexandria',
  'Cyril of Alexandria': 'Cyril_of_Alexandria',
  'Saint Augustine of Hippo': 'Augustine_of_Hippo',
  'Augustine of Hippo': 'Augustine_of_Hippo',
  'Saint Peter': 'Saint_Peter',
  'Saint Paul': 'Paul_the_Apostle',
  'Saint John the Baptist': 'John_the_Baptist',
  'Birth of John the Baptist': 'John_the_Baptist',
  'Nativity of John the Baptist': 'John_the_Baptist',
  'Peter and Paul, Apostles': 'Peter_and_Paul_the_Apostles',
  'Saints Peter and Paul': 'Peter_and_Paul_the_Apostles',
  'Mary Magdalene': 'Mary_Magdalene',
  'James, Apostle': 'James,_son_of_Zebedee',
  'Lawrence': 'Saint_Lawrence',
  'Assumption of the Blessed Virgin Mary': 'Assumption_of_Mary',
  'All Saints': "All_Saints'_Day",
  'Immaculate Conception': 'Immaculate_Conception',
  'Francis of Assisi': 'Francis_of_Assisi',
  'Teresa of Jesus': 'Teresa_of_Ávila',
  'Michael, Gabriel and Raphael, Archangels': 'Archangel',
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

    const now = new Date();
    this.querySelector('#sc-date').textContent = now.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    });
  }

  async loadSaint() {
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const key = `${mm}-${dd}`;
    const curated = CURATED[key] || {};

    let saintName = null;
    let feastLabel = 'Feast Day';
    let rank = null;

    // Step 1 – get today's saint name from Calapi
    try {
      const year = now.getFullYear();
      const resp = await fetch(
        `https://calapi.inadiutorium.cz/api/v0/en/calendars/general-en/${year}/${mm}/${dd}`,
        { signal: AbortSignal.timeout(6000) }
      );
      if (resp.ok) {
        const data = await resp.json();
        const celebrations = data?.celebrations;
        if (Array.isArray(celebrations) && celebrations.length > 0) {
          const primary = celebrations[0];
          saintName = primary.title || null;
          rank = primary.rank || null;
          feastLabel = this.rankLabel(rank);
        }
      }
    } catch (_) { /* will fall back */ }

    // Step 2 – look up Wikipedia for bio + image
    let wikiData = null;
    const wikiSlug = curated.wikiSlug
      || (saintName && (WIKI_TITLE_MAP[saintName] || saintName.replace(/ /g, '_')));

    if (wikiSlug) {
      try {
        const wResp = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiSlug)}`,
          { signal: AbortSignal.timeout(6000) }
        );
        if (wResp.ok) {
          const w = await wResp.json();
          if (w.type !== 'disambiguation' && w.extract) {
            wikiData = {
              bio: w.extract,
              imageUrl: w.thumbnail?.source || w.originalimage?.source || null,
              wikiUrl: w.content_urls?.desktop?.page || null,
            };
          }
        }
      } catch (_) { /* bio will be omitted */ }
    }

    // Step 3 – assemble final saint object
    const saint = {
      name: saintName || 'Saint of the Day',
      feast: feastLabel,
      tags: this.buildTags(rank, saintName),
      bio: wikiData?.bio || 'Biography unavailable. Visit the link below to learn more about this saint.',
      quote: curated.quote || null,
      quoteSource: curated.quoteSource || null,
      imageUrl: wikiData?.imageUrl || null,
      learnMoreUrl: wikiData?.wikiUrl
        || (wikiSlug ? `https://en.wikipedia.org/wiki/${wikiSlug}` : 'https://www.catholic.org/saints/'),
    };

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
      feria: 'Weekday',
    };
    return (rank && map[rank]) || 'Feast Day';
  }

  buildTags(rank, name) {
    const tags = [];
    if (rank) tags.push(this.rankLabel(rank));
    if (name) {
      if (/virgin|mary|our lady/i.test(name)) tags.push('Blessed Virgin Mary');
      if (/martyr/i.test(name)) tags.push('Martyr');
      if (/doctor/i.test(name)) tags.push('Doctor of the Church');
      if (/apostle|peter|paul|james|john|andrew|philip|thomas|matthew|bartholomew|thaddeus|simon/i.test(name)) tags.push('Apostle');
      if (/bishop/i.test(name)) tags.push('Bishop');
      if (/pope/i.test(name)) tags.push('Pope');
      if (/archangel|michael|gabriel|raphael/i.test(name)) tags.push('Archangel');
    }
    if (tags.length === 0) tags.push('Catholic');
    return [...new Set(tags)];
  }

  populate(saint) {
    const card = this.querySelector('.saint-card');
    card.classList.remove('saint-card--loading');

    this.querySelector('#sc-name').textContent = saint.name;
    this.querySelector('#sc-feast').textContent = saint.feast;

    const tagsEl = this.querySelector('#sc-tags');
    tagsEl.innerHTML = (saint.tags || [])
      .map(t => `<span class="saint-card__tag">${this.esc(t)}</span>`)
      .join('');

    this.querySelector('#sc-bio').textContent = saint.bio;

    if (saint.quote) {
      this.querySelector('#sc-quote-text').textContent = `"${saint.quote}"`;
      this.querySelector('#sc-quote-source').textContent = `— ${saint.quoteSource || ''}`;
      this.querySelector('#sc-quote').classList.add('visible');
    }

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

    this.querySelector('#sc-link').href = saint.learnMoreUrl;
  }

  esc(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

customElements.define('saint-of-day-card', SaintOfDayCard);
