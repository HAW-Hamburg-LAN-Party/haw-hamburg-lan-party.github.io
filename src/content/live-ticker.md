---
title: Live-Ticker
seoTitle: Live-Ticker - HAW LAN-Party
seoDescription: Erfahre alle aktuellen News und Änderungen auf der HAW LAN-Party.
published: false
---

<script>
  let lastReload = new Date();
  let timeString = $state('0s');

  function updateReloadTime() {
    const now = new Date();
    const diff = Math.floor((now - lastReload) / 1000);
    const seconds = diff % 60;
    timeString = `${seconds}s`;
  }

  setInterval(updateReloadTime, 1000);
</script>

# Live-Ticker

<div class="row">
<p>
Hier erfährst du aktuelle News und Änderungen wie beispielsweise Turnierverschiebungen.
</p>
<p class="bg-yellow-100 text-yellow-800 p-4 rounded-md w-fit">
    Letzte Aktualisierung: vor {timeString}
</p>
<button class="button ml-auto rounded" on:click={() => location.reload()}>
    Seite neu laden
</button>
</div>

---

<!--
## 19:01: Es ist eine Minute nach 19 Uhr
-->
