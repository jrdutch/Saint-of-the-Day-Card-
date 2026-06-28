# Catholic Saint of the Day — Home Assistant Dashboard Card

A self-contained dashboard card for [Home Assistant](https://www.home-assistant.io/) that displays the Catholic saint of the day with a biography, feast type, tags, and a quote.

**Data source:** Pulls live data from the [catholic.org](https://www.catholic.org/saints/) Saint of the Day RSS feed. If the feed is unreachable, it falls back to a built-in dataset of 35+ major feasts and saints.

**Image:** Each saint is displayed with a unique hand-drawn SVG illustration based on their category (martyr, bishop, mystic, archangel, etc.) — no external images are used, so the card works regardless of your network or browser security settings.

> ⚠️ **Please note:** I am new to Home Assistant, and this card was built through trial and error. There may be bugs or rough edges. If something doesn't look right, please open an issue and I'll do my best to fix it!

---

## Preview

The card shows:
- Date header with a burgundy banner
- Category illustration (unique per saint type)
- Saint's name and feast rank (Memorial, Feast Day, Solemnity, etc.)
- Tags (e.g. Bishop, Doctor of the Church, Martyr)
- Biography paragraph
- Highlighted quote
- "Learn More" link to Wikipedia or catholic.org

---

## Installation

There are two ways to install this card: via **HACS** (recommended, easier) or **manually**.

---

## Option A — Install via HACS (recommended)

[HACS](https://hacs.xyz/) is the Home Assistant Community Store. Once installed, it makes adding and updating community cards much easier.

### Step 1 — Install HACS (if you haven't already)

Follow the official guide at [hacs.xyz/docs/use/](https://hacs.xyz/docs/use/) to install HACS on your Home Assistant instance.

### Step 2 — Add this repository as a custom repository

1. In Home Assistant, open **HACS** from the sidebar
2. Click **Frontend**
3. Click the **three-dot menu** (⋮) in the top-right corner
4. Click **Custom repositories**
5. In the **Repository** field, enter:
   ```
   https://github.com/jrdutch/saint-of-the-day-card-
   ```
6. Set **Category** to **Dashboard**
7. Click **Add**

### Step 3 — Install the card

1. Search for **Saint of the Day** in the HACS Frontend section
2. Click it, then click **Download**
3. Restart Home Assistant when prompted

### Step 4 — Add the card to your dashboard

1. Go to your Home Assistant **Overview** dashboard
2. Click the **three-dot menu** (⋮) → **Edit dashboard**
3. Click **+ Add Card**
4. Search for **Saint of the Day** — it should appear in the card picker
5. Click it and then **Save**

---

## Option B — Manual Installation

### What you need
- A running Home Assistant instance
- The **File Editor** add-on installed (or access via Samba/SSH)

---

### Step 1 (Manual) — Install the File Editor add-on (if you don't have it)

1. In Home Assistant, go to **Settings → Add-ons**
2. Click **Add-on Store** (bottom right)
3. Search for **File Editor**
4. Click it and then click **Install**
5. Once installed, click **Start**, then enable **Show in sidebar**

---

### Step 2 — Create a folder for the card

1. Open **File Editor** from the sidebar
2. Click the folder icon to browse files
3. Navigate to the **`config`** folder — you should see folders like `automations`, `blueprints`, etc.
4. Look for a folder called **`www`**
   - If it doesn't exist, click the **create folder** icon and name it `www`
5. Inside `www`, create a new folder called **`saint-card`**

Your path should now be: `config/www/saint-card/`

---

### Step 3 — Add the card file

1. Download the **`index.html`** file from this repository
   - Click on `index.html` above → click the **Raw** button → right-click → **Save As**
2. In File Editor, navigate to `config/www/saint-card/`
3. Click the **upload** icon and upload `index.html`

---

### Step 4 — Test the file loaded correctly

Open this URL in your browser (replace `homeassistant.local` with your HA's IP address if needed):

```
http://homeassistant.local:8123/local/saint-card/index.html
```

You should see the styled saint card. If you do, continue to Step 5.

---

### Step 5 — Add the card to your dashboard

1. Go to your Home Assistant **Overview** dashboard
2. Click the **three-dot menu** (⋮) in the top-right corner
3. Click **Edit dashboard**
4. Click **+ Add Card** (bottom right)
5. Scroll down and select **Webpage**
6. Fill in the settings:
   - **URL:** `/local/saint-card/index.html?v=1`
   - **Height:** `700` (pixels) — adjust to taste
   - **Title:** leave blank (the card has its own header)
7. Click **Save**, then click **Done**

---

### Troubleshooting

**Card looks unstyled (plain text, no colors):**
The browser is loading a cached old version. Change the URL to add or increment the version number:
```
/local/saint-card/index.html?v=2
```

**Card shows "Saints of the Roman Calendar" instead of today's saint:**
The catholic.org RSS feed couldn't be reached. This is normal if your Home Assistant has no internet access, or if the site is temporarily down. The card will still show information for major feast days from the built-in dataset.

**Card shows nothing / blank white box:**
Make sure the file is in exactly the right place: `config/www/saint-card/index.html`
Then test the direct URL (Step 4) to confirm it loads before adding it to the dashboard.

**Card doesn't update to a new saint the next day:**
The card refreshes each time the page reloads. Navigating away and back to your dashboard will trigger a refresh. If you want it to auto-refresh, open `index.html` in File Editor and add this line inside the `<head>` tag:
```html
<meta http-equiv="refresh" content="86400">
```

---

## Updating the Card

When a new version of `index.html` is released:

1. Download the new `index.html` and upload it to `config/www/saint-card/`
2. In your dashboard, edit the Webpage card and increment the version number in the URL:
   ```
   /local/saint-card/index.html?v=2
   ```
   This clears the browser cache and loads the fresh file.

---

## License

MIT — free to use, modify, and share.
