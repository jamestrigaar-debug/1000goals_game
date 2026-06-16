/* Project 1000: Striker's Legacy - initial browser framework
   No dependencies. Save data lives in localStorage. */

const SAVE_KEY = "project1000.save.v1";
const NATIONS = ["England", "Brazil", "Spain", "France", "Germany", "Italy", "Portugal", "Argentina", "Netherlands", "Nigeria", "Japan", "USA"];
const CLUB_PREFIX = ["United", "City", "Athletic", "Rovers", "Sporting", "Real", "Dynamo", "Olympic", "Racing", "Inter"];
const CLUB_ROOTS = ["Northbridge", "Kingsport", "Valoria", "Eastmere", "Lakeside", "Redwick", "San Aurelio", "Port Azul", "New Albion", "Monteluna", "Ironhaven", "Silverford", "Greenwich", "Bastion"];
const MANAGER_NAMES = ["Marco Silva", "Jonas Richter", "Theo Ward", "Luis Moreno", "Kenji Sato", "Andre Moreau", "Viktor Novak", "Samuel Price", "Dario Costa", "Mateo Reyes"];
const ARCHETYPES = ["Tactical Genius", "Striker Whisperer", "Youth Developer", "Authoritarian", "Pragmatist", "Motivator", "Transfer Master"];
const MANAGER_PLAY_STYLES = ["Possession", "Counter Attack", "High Press", "Defensive", "Striker Focused"];
const FINANCIAL_ARCHETYPES = ["Rich Giant", "Selling Club", "Financial Trouble", "Balanced", "Self-Sustaining"];
const CLUB_PHILOSOPHIES = ["Win Now", "Youth First", "Moneyball", "Local Identity", "Galacticos", "Striker Factory"];
const BOARD_AMBITIONS = ["Survive", "Develop Talent", "Top Half", "Continental Qualification", "Win Titles", "Win Everything"];
const FANBASE_TIERS = ["Local", "Regional", "National", "Global", "Massive"];
const REGIONS = ["Capital Region", "Industrial North", "Coastal Belt", "Mountain Province", "Football Heartland", "Rural Interior", "Port City", "Borderlands"];
const FAMILY_BACKGROUNDS = [
  { id: "football_family", name: "Football Family", text: "+early coaching, +reputation", dna: { professionalism: 4 }, attrs: { composure: 2 }, rep: 3 },
  { id: "working_class", name: "Working Class", text: "+determination, +resilience", dna: { professionalism: 3, injuryResistance: 2 }, attrs: { stamina: 2 } },
  { id: "wealthy", name: "Wealthy Family", text: "+academy access, -hard-road romance", dna: { adaptability: 2 }, attrs: { passing: 2 }, environment: 5, hardRoad: -0.03 },
  { id: "football_mad", name: "Football-Mad Region", text: "+early development, +fan pressure", dna: { consistency: 2, bigMatchTemperament: 2 }, attrs: { finishing: 2 } },
  { id: "late_bloomer", name: "Late Bloomer", text: "lower start, stronger growth patience", dna: { growthRate: 5 }, attrs: { pace: -1, finishing: -1 } }
];
const POSITIVE_SEED_TRAITS = ["Iron Will", "Big Game Player", "Model Professional", "Team Leader", "Ice Cold", "Adaptable"];
const NEGATIVE_SEED_TRAITS = ["Injury Prone", "Mercenary", "Hothead", "Lazy", "Fragile Confidence", "Media Magnet"];
const FIRST_NAMES = ["Luka", "Rafael", "Noah", "Mateo", "Kai", "Ezra", "Rio", "Nico", "Ibrahim", "Julien", "Mika", "Elias"];
const SURNAMES = ["Petrovic", "Santos", "Striker", "Alvarez", "Kone", "Tanaka", "Voss", "Silva", "Hart", "Reyes", "Okafor", "Ward"];
const ATTRIBUTES = ["pace", "acceleration", "stamina", "strength", "jumping", "balance", "finishing", "dribbling", "passing", "vision", "firstTouch", "flair", "heading", "tackling", "marking", "positioning", "composure", "leadership", "determination", "aggression"];
const POSITIONS = [
  { id: "ST", name: "Striker", share: 0.08, scarcityWeight: 1.35 },
  { id: "WG", name: "Winger", share: 0.15, scarcityWeight: 1.05 },
  { id: "AM", name: "Attacking Midfielder", share: 0.10, scarcityWeight: 1.10 },
  { id: "CM", name: "Midfielder", share: 0.20, scarcityWeight: 0.90 },
  { id: "DM", name: "Defensive Midfielder", share: 0.12, scarcityWeight: 0.95 },
  { id: "DF", name: "Defender", share: 0.25, scarcityWeight: 0.80 },
  { id: "GK", name: "Goalkeeper", share: 0.10, scarcityWeight: 1.15 }
];
const TACTICAL_ROLES = {
  poacher: { name: "Poacher", goals: 1.16, assists: .82, pressing: .92, fatigue: .95, fit: p => (p.attributes.finishing + p.attributes.positioning) / 2 },
  target: { name: "Target Man", goals: 1.06, assists: 1.05, pressing: .9, fatigue: 1.05, fit: p => (p.attributes.strength + p.attributes.heading) / 2 },
  pressing: { name: "Pressing Forward", goals: .98, assists: .95, pressing: 1.18, fatigue: 1.18, fit: p => (p.attributes.stamina + p.attributes.pace) / 2 },
  false9: { name: "False Nine", goals: .82, assists: 1.28, pressing: 1, fatigue: 1.02, fit: p => (p.attributes.passing + p.attributes.dribbling + p.attributes.composure) / 3 },
  complete: { name: "Complete Forward", goals: 1.08, assists: 1.1, pressing: 1.05, fatigue: 1.08, fit: p => abilityScore(p) }
};
const SQUAD_STATUSES = ["Youth Prospect", "Rotation", "First Team", "Key Player", "Star Player", "Club Icon"];
const BOARD_GOALS = ["Avoid Relegation", "Qualify for Europe", "Win League", "Develop Youth", "Reduce Wage Bill"];
const LEAGUE_IDENTITIES = [
  { name: "High Pace & Physical", pace: 1.12, physical: 1.12, technical: .96, youth: 1, money: 1.08, tempo: 1.12 },
  { name: "Technical Possession", pace: .96, physical: .92, technical: 1.16, youth: 1.04, money: 1.02, tempo: .94 },
  { name: "Youth & High Press", pace: 1.08, physical: 1.02, technical: 1.02, youth: 1.18, money: .98, tempo: 1.1 },
  { name: "Defensive & Tactical", pace: .94, physical: 1.05, technical: 1.04, youth: .98, money: .94, tempo: .86 },
  { name: "Star-Driven Rich", pace: 1, physical: 1, technical: 1.08, youth: .96, money: 1.22, tempo: 1.02 }
];
const INJURY_TYPES = [
  { severity: "Minor", name: "Knock", min: 1, max: 2, form: 5, damage: 0 },
  { severity: "Moderate", name: "Muscle Tear", min: 6, max: 14, form: 12, damage: 0 },
  { severity: "Major", name: "Ligament Injury", min: 24, max: 48, form: 24, damage: 1.5 },
  { severity: "Career-Altering", name: "Recurring Knee Damage", min: 36, max: 72, form: 34, damage: 4 }
];
const LEGACY_SHOP = [
  { id: "nation", name: "Better Birth Nation", cost: 20, text: "+chance of strong football countries" },
  { id: "academy", name: "Better Academy Chance", cost: 25, text: "+chance of elite academy" },
  { id: "potential", name: "Improved Potential", cost: 40, text: "+potential roll tendency" },
  { id: "family", name: "Wealthy Family Access", cost: 15, text: "+family/academy comfort" },
  { id: "agent", name: "Agent Connections", cost: 30, text: "+starting visibility and agent" },
  { id: "injury", name: "Lower Injury Risk", cost: 35, text: "+injury resistance tendency" }
];
const TRAIT_DEFS = [
  { id: "poacher", name: "Poacher", metric: "boxGoals", divisor: 820, check: s => s.boxGoals >= 24 },
  { id: "ice", name: "Ice Cold Finisher", metric: "goals", divisor: 1500, check: s => s.goals >= 70 && s.conversion >= 17 },
  { id: "header", name: "Clinical Header", metric: "headerGoals", divisor: 560, check: s => s.headerGoals >= 9 },
  { id: "big_game", name: "Big Game Player", metric: "finalGoals", divisor: 220, check: s => s.finalGoals >= 2 },
  { id: "leader", name: "Leader", metric: "matches", divisor: 2400, check: s => s.age >= 24 && s.reputation >= 58 && s.attributes.leadership >= 68 },
  { id: "iron", name: "Iron Body", metric: "matches", divisor: 3200, check: s => s.injuries <= 1 && s.age >= 23 },
  { id: "engine", name: "Endless Engine", metric: "matches", divisor: 2600, check: s => s.attributes.stamina >= 78 && s.matches >= 110 }
];

let state = null;
let activeTab = "home";

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a += 0x6D2B79F5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function rngInt(rng, min, max) { return Math.floor(rng() * (max - min + 1)) + min; }
function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }
function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
function fmt(n) { return Math.round(n).toLocaleString("en-GB"); }
function pct(n) { return `${Math.round(n)}%`; }

function init() {
  const nationSelect = document.getElementById("nationInput");
  nationSelect.innerHTML = NATIONS.map(n => `<option>${n}</option>`).join("");
  document.getElementById("seedInput").value = Math.floor(Math.random() * 90000000) + 10000000;

  bindEvents();
  const loaded = loadGame();
  if (loaded) {
    state = loaded;
    showGame();
  } else {
    showSetup();
  }
}

function bindEvents() {
  document.getElementById("startCareerBtn").addEventListener("click", () => {
    const name = document.getElementById("playerNameInput").value.trim() || "Leo Striker";
    const nation = document.getElementById("nationInput").value;
    const seed = Number(document.getElementById("seedInput").value) || Math.floor(Math.random() * 99999999);
    const origin = document.getElementById("originInput").value;
    const difficulty = document.getElementById("difficultyInput")?.value || "normal";
    state = createNewSave(seed, name, nation, origin, null, difficulty);
    saveGame();
    showGame();
  });

  document.getElementById("saveBtn").addEventListener("click", () => {
    if (state) {
      saveGame();
      flashEvent("Game saved locally.", "good");
    }
  });

  document.getElementById("newSaveBtn").addEventListener("click", () => {
    if (confirm("Start a new save? Current local save will be replaced.")) {
      state = null;
      localStorage.removeItem(SAVE_KEY);
      showSetup();
    }
  });

  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });
}

function createNewSave(seed, playerName, nation, origin, previousDynasty, difficulty = "normal") {
  const rng = mulberry32(seed);
  const world = generateWorld(seed, rng);
  const legacy = previousDynasty || {
    generation: 1,
    fragments: 0,
    totalGoals: 0,
    bestCareerGoals: 0,
    unlockedBonuses: [],
    geneticMemory: null,
    lineage: []
  };
  const birth = generateBirthEnvironment(rng, world, nation, difficulty, legacy);
  const club = selectBirthClub(rng, world, birth, difficulty);
  const bonus = Math.min(10, Math.floor(legacy.fragments / 100)) + (hasLegacyUpgrade(legacy, "potential") ? 4 : 0) + (hasLegacyUpgrade(legacy, "injury") ? 2 : 0);
  const player = generatePlayer(rng, playerName, birth.country.name, club.id, origin, bonus, birth, world, seed);
  if (hasLegacyUpgrade(legacy, "agent")) { player.agent.quality = clamp(player.agent.quality + rngInt(rng, 10, 24), 1, 100); player.visibility = clamp(player.visibility + 8, 1, 100); }
  if (hasLegacyUpgrade(legacy, "injury")) player.dna.injuryResistance = clamp(player.dna.injuryResistance + rngInt(rng, 5, 12), 1, 99);
  if (legacy.geneticMemory) applyDynastyGenetics(player, legacy.geneticMemory, origin, rng);
  return {
    version: 4,
    seed,
    rngCounter: 0,
    world,
    player,
    legacy,
    history: [{ text: `World Seed ${seed} / Birth Seed ${player.seedCode} created. ${player.name} is born in ${player.birthRegion}, ${player.nation}, develops at ${club.name}, and starts with an Environment Score of ${player.environmentScore}.`, type: "major" }],
    storyBeats: [{ text: `${player.name}'s football journey begins at ${club.name}. The local papers call him ${player.bodyType === "Target Forward" ? "a throwback centre-forward" : "one to watch"}.`, type: "major" }],
    careerTimeline: [{ year: 2026, title: "Debut Season Begins", text: `${player.name} signs his first professional deal with ${club.name}.` }],
    pendingDecision: null,
    transferWindowOpen: true,
    leagueStats: createLeagueStats(world.clubs),
    transferLog: [],
    matchStories: [],
    lastBlockMatches: [],
    rivals: [],
    seasonBlock: 0,
    currentYear: 2026
  };
}

function chooseFinancialArchetype(rng, stature, reputation) {
  if (stature > 82 && rng() < .65) return "Rich Giant";
  if (reputation < 55 && rng() < .28) return "Financial Trouble";
  if (rng() < .25) return "Selling Club";
  if (rng() < .18) return "Moneyball";
  return pick(rng, FINANCIAL_ARCHETYPES.filter(x => x !== "Rich Giant" || stature > 75));
}

function generateFinances(rng, stature, archetype) {
  const base = stature + rngInt(rng, -22, 22);
  const mod = archetype === "Rich Giant" ? 20 : archetype === "Financial Trouble" ? -28 : archetype === "Selling Club" ? -8 : 0;
  return clamp(base + mod, 5, 100);
}

function generateFacilities(rng, reputation, archetype) {
  const base = reputation + rngInt(rng, -18, 18);
  const youthBoost = archetype === "Selling Club" ? 16 : 0;
  const richBoost = archetype === "Rich Giant" ? 10 : 0;
  const trouble = archetype === "Financial Trouble" ? -13 : 0;
  return {
    training: clamp(base + richBoost + trouble + rngInt(rng, -6, 8), 10, 100),
    medical: clamp(base + richBoost + trouble + rngInt(rng, -10, 8), 10, 100),
    youth: clamp(base + youthBoost + trouble + rngInt(rng, -8, 12), 10, 100),
    analytics: clamp(base + (archetype === "Moneyball" ? 18 : 0) + trouble + rngInt(rng, -12, 12), 5, 100)
  };
}

function fanbaseTier(stature, rng) {
  const idx = clamp(Math.floor((stature + rngInt(rng, -8, 8)) / 22), 0, FANBASE_TIERS.length - 1);
  return FANBASE_TIERS[idx];
}

function generateBoard(rng, stature) {
  const ambition = clamp(Math.round(stature * .72 + rngInt(rng, 5, 35)), 1, 100);
  const youthFocus = rngInt(rng, 20, 96);
  const financialDiscipline = rngInt(rng, 25, 95);
  const goals = [];
  goals.push(ambition > 82 ? "Win League" : ambition > 62 ? "Qualify for Europe" : ambition < 38 ? "Avoid Relegation" : "Top Half");
  if (youthFocus > 64) goals.push("Develop Youth");
  if (financialDiscipline > 70) goals.push("Reduce Wage Bill");
  return {
    patience: rngInt(rng, 20, 92),
    ambition,
    financialDiscipline,
    youthFocus,
    goals,
    expectationProgress: {},
    ambitionText: BOARD_AMBITIONS[clamp(Math.floor(ambition / 17), 0, BOARD_AMBITIONS.length - 1)]
  };
}

function generateManager(rng, clubRep, stature) {
  const archetype = pick(rng, ARCHETYPES);
  const base = clamp(Math.round(clubRep * .65 + stature * .25 + rngInt(rng, -18, 18)), 25, 99);
  const ratings = {
    tactical: clamp(base + (archetype === "Tactical Genius" ? 16 : 0) + rngInt(rng, -10, 10), 1, 100),
    manManagement: clamp(base + (archetype === "Motivator" ? 15 : archetype === "Authoritarian" ? -8 : 0) + rngInt(rng, -10, 10), 1, 100),
    development: clamp(base + (archetype === "Youth Developer" ? 18 : archetype === "Striker Whisperer" ? 10 : 0) + rngInt(rng, -10, 10), 1, 100),
    discipline: clamp(base + (archetype === "Authoritarian" ? 18 : 0) + rngInt(rng, -10, 10), 1, 100),
    adaptability: clamp(base + rngInt(rng, -15, 15), 1, 100),
    scouting: clamp(base + (archetype === "Transfer Master" ? 18 : 0) + rngInt(rng, -12, 12), 1, 100)
  };
  return {
    name: pick(rng, MANAGER_NAMES),
    archetype,
    trait: archetype,
    playStyle: archetype === "Striker Whisperer" ? "Striker Focused" : archetype === "High Press Evangelist" ? "High Press" : pick(rng, MANAGER_PLAY_STYLES),
    relationship: rngInt(rng, 45, 72),
    ratings,
    elo: Math.round(1200 + Object.values(ratings).reduce((a, b) => a + b, 0) / 6 * 7)
  };
}

function generateWorld(seed, rng) {
  const clubs = [];
  const usedNames = new Set();
  const leagues = NATIONS.map(n => {
    const identity = pick(rng, LEAGUE_IDENTITIES);
    return {
      name: `${n} Premier League`,
      nation: n,
      identity,
      revenue: clamp(rngInt(rng, 35, 98) * identity.money, 20, 100),
      reputation: rngInt(rng, 40, 95),
      talentProduction: clamp(rngInt(rng, 32, 96) * identity.youth, 20, 100),
      continentalSuccess: rngInt(rng, 25, 92),
      elo: rngInt(rng, 1320, 1830)
    };
  });
  const positionScarcity = Object.fromEntries(POSITIONS.map(pos => {
    const expected = Math.round(pos.share * 1200);
    const actual = Math.max(1, Math.round(expected * (0.75 + rng() * 0.55)));
    const elite = Math.max(1, Math.round(actual * (0.012 + rng() * 0.018)));
    return [pos.id, { expected, actual, elite, multiplier: clamp((expected / actual) * pos.scarcityWeight + (4 / elite) * 0.18, 0.65, 2.4) }];
  }));

  for (let i = 0; i < 24; i++) {
    let name;
    do {
      name = `${pick(rng, CLUB_ROOTS)} ${pick(rng, CLUB_PREFIX)}`;
    } while (usedNames.has(name));
    usedNames.add(name);
    const league = pick(rng, leagues);
    const reputation = rngInt(rng, 35, 92);
    const elo = Math.round(1180 + reputation * 7.5 + league.reputation * 1.2 + rngInt(rng, -65, 65));
    const stature = clamp(Math.round(reputation * .62 + league.reputation * .18 + (elo - 1200) / 18 + rngInt(rng, -8, 8)), 1, 100);
    const financialArchetype = chooseFinancialArchetype(rng, stature, reputation);
    const facilityProfile = generateFacilities(rng, reputation, financialArchetype);
    const finances = generateFinances(rng, stature, financialArchetype);
    const fanbase = fanbaseTier(stature, rng);
    clubs.push({
      id: `club_${i}`,
      name,
      nation: league.nation,
      league: league.name,
      reputation,
      stature,
      elo,
      attackElo: elo + rngInt(rng, -80, 95),
      defenceElo: elo + rngInt(rng, -95, 80),
      facilities: facilityProfile.training,
      facilitiesProfile: facilityProfile,
      finances,
      financeBalance: Math.round(finances * 3.2 + stature * 1.7 + rngInt(rng, -45, 60)),
      wageBill: Math.round((reputation * 1.8 + stature * 1.4) * (financialArchetype === "Rich Giant" ? 1.35 : financialArchetype === "Financial Trouble" ? 1.55 : 1)),
      youthAcademy: facilityProfile.youth,
      fanbase,
      fanLoyalty: rngInt(rng, 35, 98),
      stadiumSize: Math.round((stature * 650 + rngInt(rng, 3000, 22000)) / 1000) * 1000,
      clubMorale: rngInt(rng, 38, 88),
      squadHarmony: rngInt(rng, 35, 90),
      board: generateBoard(rng, stature),
      financialArchetype,
      philosophy: pick(rng, CLUB_PHILOSOPHIES),
      recentSuccess: rngInt(rng, 20, 95),
      history: {
        leagueTitles: rngInt(rng, 0, Math.max(1, Math.round(stature / 10))),
        cupWins: rngInt(rng, 0, Math.max(1, Math.round(stature / 8))),
        legends: [],
        managers: [],
        records: { topScorer: { name: pick(rng, SURNAMES), goals: rngInt(rng, 80, 360) } }
      },
      leagueStrength: league.reputation,
      squadQuality: clamp(reputation + rngInt(rng, -12, 12), 25, 99),
      manager: generateManager(rng, reputation, stature)
    });
  }
  clubs.sort((a, b) => b.elo - a.elo);
  clubs.forEach((c, idx) => c.rank = idx + 1);

  const nations = NATIONS.map(n => {
    const league = leagues.find(l => l.nation === n);
    return {
      name: n,
      footballInfrastructure: clamp(Math.round((league?.reputation || 55) * .7 + rngInt(rng, 15, 35)), 20, 99),
      leagueQuality: Math.round(league?.reputation || rngInt(rng, 35, 95)),
      economicStrength: Math.round(league?.revenue || rngInt(rng, 35, 95)),
      youthDevelopment: Math.round(league?.talentProduction || rngInt(rng, 35, 95)),
      internationalPrestige: rngInt(rng, 35, 96),
      strength: rngInt(rng, 40, 95),
      elo: rngInt(rng, 1320, 1880)
    };
  });

  return {
    seed,
    nations,
    leagues,
    positionScarcity,
    youthPool: generateInitialYouthPool(rng, clubs),
    worldEvents: [],
    clubs,
    competitions: ["Continental Cup", "World Club Crown", "Golden Boot League", "National Cup"]
  };
}

function hasLegacyUpgrade(legacy, id) { return (legacy?.unlockedBonuses || []).includes(id); }
function createLeagueStats(clubs) {
  const stats = {};
  clubs.forEach(c => stats[c.id] = { clubId: c.id, played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, pts: 0 });
  return stats;
}

function recordLeagueMatch(homeClub, awayClub, homeGoals, awayGoals) {
  state.leagueStats ||= createLeagueStats(state.world.clubs);
  for (const c of [homeClub, awayClub]) state.leagueStats[c.id] ||= { clubId: c.id, played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, pts: 0 };
  const h = state.leagueStats[homeClub.id], a = state.leagueStats[awayClub.id];
  h.played++; a.played++; h.gf += homeGoals; h.ga += awayGoals; a.gf += awayGoals; a.ga += homeGoals;
  if (homeGoals > awayGoals) { h.wins++; h.pts += 3; a.losses++; }
  else if (homeGoals < awayGoals) { a.wins++; a.pts += 3; h.losses++; }
  else { h.draws++; a.draws++; h.pts++; a.pts++; }
}

function leagueTable() {
  state.leagueStats ||= createLeagueStats(state.world.clubs);
  return state.world.clubs.map(c => ({ club: c, ...(state.leagueStats[c.id] || { played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, pts: 0 }) }))
    .sort((a, b) => b.pts - a.pts || ((b.gf - b.ga) - (a.gf - a.ga)) || b.gf - a.gf || (b.club.elo || 0) - (a.club.elo || 0));
}

function playerLeaguePosition() {
  const id = state.player.clubId;
  const idx = leagueTable().findIndex(row => row.club.id === id);
  return idx >= 0 ? idx + 1 : "-";
}

function ordinal(n) {
  if (typeof n !== "number") return n;
  const s = ["th", "st", "nd", "rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function generateBirthEnvironment(rng, world, preferredNation, difficulty = "normal", legacy = null) {
  const ranked = [...world.nations].sort((a, b) => environmentCountryScore(a) - environmentCountryScore(b));
  let country;
  if (difficulty === "prodigy") country = ranked[rngInt(rng, Math.floor(ranked.length * .72), ranked.length - 1)];
  else if (difficulty === "underdog") country = ranked[rngInt(rng, 0, Math.max(0, Math.floor(ranked.length * .25)))];
  else if (difficulty === "impossible") country = ranked[rngInt(rng, 0, Math.max(0, Math.floor(ranked.length * .10)))];
  else if (hasLegacyUpgrade(legacy, "nation") && rng() < .35) country = ranked[rngInt(rng, Math.floor(ranked.length * .58), ranked.length - 1)];
  else country = world.nations.find(n => n.name === preferredNation) || pick(rng, world.nations);

  const countryScore = environmentCountryScore(country);
  const academyBase = difficulty === "prodigy"
    ? rngInt(rng, 82, 99)
    : difficulty === "impossible"
      ? rngInt(rng, 8, 28)
      : difficulty === "underdog"
        ? clamp(Math.round(country.youthDevelopment * .45 + country.footballInfrastructure * .15 + rngInt(rng, -18, 8)), 12, 58)
        : clamp(Math.round(country.youthDevelopment * .7 + country.footballInfrastructure * .2 + rngInt(rng, -18, 18) + (hasLegacyUpgrade(legacy, "academy") ? rngInt(rng, 4, 18) : 0) + (hasLegacyUpgrade(legacy, "family") ? 5 : 0)), 10, 99);
  const academy = {
    name: `${pick(rng, CLUB_ROOTS)} Academy`,
    training: clamp(academyBase + rngInt(rng, -8, 10), 5, 100),
    medical: clamp(academyBase + rngInt(rng, -12, 8), 5, 100),
    coaching: clamp(academyBase + rngInt(rng, -10, 12), 5, 100),
    reputation: clamp(academyBase + rngInt(rng, -14, 16), 1, 100)
  };
  const region = pick(rng, REGIONS);
  const family = pick(rng, FAMILY_BACKGROUNDS);
  const difficultyHardRoad = difficulty === "impossible" ? .16 : difficulty === "underdog" ? .08 : difficulty === "prodigy" ? -.05 : 0;
  const hardRoadMultiplier = clamp(1 + (65 - countryScore) / 220 + (55 - academyBase) / 260 + (family.hardRoad || 0) + difficultyHardRoad, 0.88, 1.42);
  const environmentScore = clamp(Math.round(countryScore * .42 + academy.training * .18 + academy.coaching * .2 + academy.medical * .08 + academy.reputation * .12 + (family.environment || 0)), 1, 100);
  return { country, region, academy, family, countryScore, environmentScore, hardRoadMultiplier, difficulty };
}

function environmentCountryScore(country) {
  return Math.round((country.footballInfrastructure + country.leagueQuality + country.economicStrength + country.youthDevelopment + country.internationalPrestige) / 5);
}

function selectBirthClub(rng, world, birth, difficulty) {
  const sameNation = world.clubs.filter(c => c.nation === birth.country.name);
  const pool = sameNation.length ? sameNation : world.clubs;
  if (difficulty === "prodigy") return [...pool].sort((a, b) => b.stature - a.stature)[0] || pick(rng, world.clubs);
  if (difficulty === "impossible") return [...(pool.length >= 3 ? pool : world.clubs)].sort((a, b) => ((a.facilitiesProfile?.youth || a.youthAcademy) + a.stature) - ((b.facilitiesProfile?.youth || b.youthAcademy) + b.stature))[0] || pick(rng, world.clubs);
  if (difficulty === "underdog") {
    const underdogPool = (pool.length >= 3 ? pool : world.clubs).sort((a, b) => a.stature - b.stature).slice(0, Math.max(1, Math.ceil((pool.length >= 3 ? pool : world.clubs).length / 3)));
    return pick(rng, underdogPool);
  }
  // 70% system / 30% luck: environment leans selection, but leaves room for unexpected starts.
  return rng() < .7 ? pick(rng, [...pool].sort((a, b) => Math.abs((a.youthAcademy || 50) - birth.academy.reputation) - Math.abs((b.youthAcademy || 50) - birth.academy.reputation)).slice(0, 5)) : pick(rng, world.clubs);
}

function seedCode(seed, rng) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 4; i++) out += alphabet[Math.floor(rng() * alphabet.length)];
  return `${out}-${String(seed).slice(-4).padStart(4, "0")}`;
}

function generateName(rng) { return `${pick(rng, FIRST_NAMES)} ${pick(rng, SURNAMES)}`; }

function generatePersonality(rng, birth) {
  const fam = birth.family || {};
  const base = () => rngInt(rng, 4, 17);
  const personality = {
    ambition: base(),
    professionalism: base(),
    loyalty: base(),
    temperament: base(),
    leadership: base(),
    confidence: base(),
    adaptability: base()
  };
  if (fam.id === "football_family") { personality.professionalism += 2; personality.confidence += 1; }
  if (fam.id === "working_class") { personality.professionalism += 1; personality.temperament -= 1; }
  if (fam.id === "wealthy") { personality.adaptability += 2; personality.confidence += 1; }
  if (fam.id === "football_mad") { personality.ambition += 2; personality.confidence += 1; }
  if (fam.id === "late_bloomer") { personality.professionalism += 2; personality.confidence -= 2; }
  Object.keys(personality).forEach(k => personality[k] = clamp(personality[k], 1, 20));
  const positives = [];
  const negatives = [];
  if (personality.professionalism >= 17) positives.push("Model Professional");
  if (personality.leadership >= 17) positives.push("Team Leader");
  if (personality.confidence >= 16) positives.push("Ice Cold");
  if (personality.adaptability >= 16) positives.push("Adaptable");
  if (personality.professionalism <= 6) negatives.push("Lazy");
  if (personality.loyalty <= 6) negatives.push("Mercenary");
  if (personality.temperament >= 16) negatives.push("Hothead");
  if (personality.confidence <= 6) negatives.push("Fragile Confidence");
  if (!positives.length) positives.push(pick(rng, POSITIVE_SEED_TRAITS));
  if (rng() < .7 && !negatives.length) negatives.push(pick(rng, NEGATIVE_SEED_TRAITS));
  return { ...personality, positives: [...new Set(positives)].slice(0, 3), negatives: [...new Set(negatives)].slice(0, 2) };
}

function createContract(rng, club, playerAbility, status = "Youth Prospect") {
  const statusIndex = Math.max(0, SQUAD_STATUSES.indexOf(status));
  const wage = Math.round(Math.max(1.5, (club.finances / 18 + playerAbility / 18) * (1 + statusIndex * .42)) * 10) / 10;
  const releaseClause = Math.round((dynamicValueSafe(playerAbility, club) * (1.8 + statusIndex * .45 + rng())) * 10) / 10;
  return {
    wage,
    yearsRemaining: rngInt(rng, 2, 5),
    releaseClause,
    squadStatus: status,
    bonuses: {
      goalBonus: Math.round(wage * rngInt(rng, 5, 18)) / 10,
      trophyBonus: Math.round(wage * rngInt(rng, 20, 80)) / 10
    }
  };
}

function dynamicValueSafe(ability, club) {
  return Math.max(1, ability * .35 + (club?.stature || 55) * .15);
}

function squadStatusFor(player, club = currentClub()) {
  const ability = abilityScore(player);
  const stature = club?.stature || club?.reputation || 60;
  if (player.stats?.goals > 350 && player.reputation > 82) return "Club Icon";
  if (ability > stature + 8 || player.reputation > 78) return "Star Player";
  if (ability > stature - 3 || player.reputation > 58) return "Key Player";
  if (ability > stature - 14 || player.age > 20) return "First Team";
  if (ability > stature - 24) return "Rotation";
  return "Youth Prospect";
}

function tacticalRoleName(id) { return TACTICAL_ROLES[id]?.name || "Complete Forward"; }

function roleFit(player, club = currentClub()) {
  const role = TACTICAL_ROLES[player.tacticalRole || "complete"] || TACTICAL_ROLES.complete;
  let fit = role.fit(player);
  if (club?.manager?.playStyle === "Striker Focused" && ["poacher", "target", "complete"].includes(player.tacticalRole)) fit += 8;
  if (club?.manager?.playStyle === "High Press" && player.tacticalRole === "pressing") fit += 10;
  if (club?.manager?.playStyle === "Possession" && player.tacticalRole === "false9") fit += 10;
  return clamp(fit, 1, 100);
}

function generatePlayer(rng, name, nation, clubId, origin, bonus = 0, birth = null, world = null, seed = 1) {
  birth ||= { country: { name: nation, footballInfrastructure: 55, leagueQuality: 55, economicStrength: 55, youthDevelopment: 55, internationalPrestige: 55 }, region: pick(rng, REGIONS), academy: { training: 55, medical: 55, coaching: 55, reputation: 55 }, family: pick(rng, FAMILY_BACKGROUNDS), environmentScore: 55, hardRoadMultiplier: 1, difficulty: "normal" };
  const personality = generatePersonality(rng, birth);
  name = name && name !== "Leo Striker" ? name : generateName(rng);
  const dna = {
    potentialAbility: rngInt(rng, 72 + bonus, 96 + bonus),
    growthRate: rngInt(rng, 45 + bonus, 92 + bonus),
    injuryResistance: rngInt(rng, 42 + bonus, 94 + bonus),
    consistency: rngInt(rng, 40 + bonus, 92 + bonus),
    professionalism: rngInt(rng, 38 + bonus, 92 + bonus) * .55 + personality.professionalism * 4.2,
    ambition: rngInt(rng, 40 + bonus, 96 + bonus) * .55 + personality.ambition * 4.2,
    loyalty: rngInt(rng, 28, 96) * .55 + personality.loyalty * 4.2,
    adaptability: rngInt(rng, 35 + bonus, 90 + bonus) * .55 + personality.adaptability * 4.2,
    bigMatchTemperament: rngInt(rng, 38 + bonus, 94 + bonus) * .55 + (21 - personality.temperament) * 1.4 + personality.confidence * 2.4
  };
  Object.entries(birth.family?.dna || {}).forEach(([k, v]) => { if (dna[k] != null) dna[k] += v; });
  if (personality.negatives.includes("Injury Prone")) dna.injuryResistance -= 10;
  if (personality.negatives.includes("Lazy")) dna.professionalism -= 12;
  if (personality.positives.includes("Model Professional")) dna.professionalism += 8;
  Object.keys(dna).forEach(k => dna[k] = clamp(dna[k], 1, 99));

  const attributes = {
    pace: rngInt(rng, 53, 76), acceleration: rngInt(rng, 52, 78), stamina: rngInt(rng, 48, 73), strength: rngInt(rng, 42, 70), jumping: rngInt(rng, 38, 76), balance: rngInt(rng, 42, 76),
    finishing: rngInt(rng, 55, 78), dribbling: rngInt(rng, 45, 73), passing: rngInt(rng, 38, 68), vision: rngInt(rng, 35, 70), firstTouch: rngInt(rng, 42, 74), flair: rngInt(rng, 30, 78), heading: rngInt(rng, 38, 74),
    tackling: rngInt(rng, 20, 55), marking: rngInt(rng, 20, 55), positioning: rngInt(rng, 47, 74), composure: rngInt(rng, 42, 72), leadership: rngInt(rng, 28, 62), determination: rngInt(rng, 38, 78), aggression: rngInt(rng, 25, 75)
  };
  if (origin === "academy") attributes.dribbling += 4;
  if (origin === "child") attributes.composure += 4;
  if (origin === "regen") attributes.pace += 4;
  Object.entries(birth.family?.attrs || {}).forEach(([k, v]) => { if (attributes[k] != null) attributes[k] += v; });
  const earlyEnvBoost = (birth.environmentScore - 55) / 9;
  ATTRIBUTES.forEach(a => attributes[a] = clamp(attributes[a] + 6 + earlyEnvBoost + Math.floor(bonus / 2), 1, 99));

  const height = rngInt(rng, 168, 196);
  const birthClub = world?.clubs?.find(c => c.id === clubId) || { finances: 45, stature: 55, reputation: 55 };
  const initialAbility = Math.round((attributes.finishing * 1.35 + attributes.positioning + attributes.composure + attributes.pace * .75 + attributes.dribbling * .65 + attributes.heading * .55 + attributes.stamina * .45 + attributes.strength * .35 + attributes.passing * .25) / 7.35);
  const initialStatus = initialAbility > (birthClub.stature || 55) - 12 ? "Rotation" : "Youth Prospect";
  const contract = createContract(rng, birthClub, initialAbility, initialStatus);
  const tacticalRole = height >= 188 ? "target" : attributes.stamina > 72 ? "pressing" : attributes.passing > 67 ? "false9" : attributes.finishing > 72 ? "poacher" : "complete";
  return {
    id: `player_${seed}_${Math.floor(rng() * 1e6)}`,
    name, nation, origin, clubId,
    birthYear: 2010,
    seedCode: seedCode(seed, rng),
    birthRegion: birth.region,
    birthEnvironment: birth,
    academy: birth.academy,
    familyBackground: birth.family,
    environmentScore: birth.environmentScore,
    hardRoadMultiplier: birth.hardRoadMultiplier,
    personality,
    preferredFoot: rng() < .18 ? "Left" : rng() < .25 ? "Both" : "Right",
    heightCm: height,
    bodyType: height >= 188 ? "Target Forward" : height <= 174 ? "Low Centre of Gravity" : pick(rng, ["Explosive", "Balanced", "Lean Athlete"]),
    position: "ST",
    secondaryPositions: height < 180 ? ["WG", "AM"] : ["AM"],
    tacticalRole,
    squadStatus: initialStatus,
    age: 16,
    peakAge: rngInt(rng, 26, 30),
    season: 1,
    contract,
    contractYears: contract.yearsRemaining,
    attributes,
    dna,
    potentialEstimate: clamp(dna.potentialAbility - rngInt(rng, 4, 14), 1, 99),
    developmentBelief: 0.62,
    expectedGoalBaseline: 14,
    traits: [],
    traitProgress: {},
    trainingFocus: "finishing",
    form: clamp(50 + (personality.professionalism - 10) * .8, 1, 99),
    confidence: clamp(42 + personality.confidence * 3, 1, 99),
    confidenceMomentum: clamp(42 + personality.confidence * 3, 1, 99),
    recentMatches: [],
    fitness: 92,
    sharpness: 48,
    fatigue: 8,
    morale: 60,
    reputation: 8 + (birth.family?.rep || 0),
    fame: 5,
    visibility: clamp((birth.country.leagueQuality || 55) * .25 + (birthClub.stature || 55) * .25 + (birth.academy.reputation || 55) * .18, 1, 100),
    agent: { name: `${pick(rng, SURNAMES)} Agency`, quality: rngInt(rng, 25, 92), relationship: rngInt(rng, 45, 80) },
    relationships: { manager: birthClub.manager?.relationship || 55, teammates: rngInt(rng, 40, 75), agent: rngInt(rng, 45, 80), rivals: 20 },
    nationalTeam: { caps: 0, goals: 0, status: "Uncapped" },
    injury: null,
    injuryHistory: [],
    value: 1.2,
    wage: contract.wage,
    retired: false,
    stats: emptyStats(),
    clubGoals: { [clubId]: 0 },
    currentSeason: emptyStats(),
    records: {
      bestSeasonGoals: 0,
      ballonDors: 0,
      hatTricks: 0,
      trophies: 0,
      awards: []
    },
    developmentLog: []
  };
}

function applyDynastyGenetics(player, memory, origin, rng) {
  const inheritance = origin === "child" ? 0.34 : origin === "academy" ? 0.18 : 0.26;
  Object.keys(player.dna).forEach(key => {
    if (typeof memory.dna?.[key] !== "number") return;
    player.dna[key] = clamp(player.dna[key] * (1 - inheritance) + memory.dna[key] * inheritance + rngInt(rng, -3, 3), 1, 99);
  });
  ATTRIBUTES.forEach(attr => {
    if (typeof memory.attributes?.[attr] !== "number") return;
    player.attributes[attr] = clamp(player.attributes[attr] + (memory.attributes[attr] - 65) * inheritance * 0.18, 1, 99);
  });
  if (memory.personality && player.personality) {
    ["ambition", "professionalism", "loyalty", "temperament", "leadership", "confidence", "adaptability"].forEach(key => {
      player.personality[key] = clamp(Math.round(player.personality[key] * (1 - inheritance) + memory.personality[key] * inheritance + rngInt(rng, -2, 2)), 1, 20);
    });
    player.dna.professionalism = clamp(player.dna.professionalism * .75 + player.personality.professionalism * 4.8 * .25, 1, 99);
    player.dna.loyalty = clamp(player.dna.loyalty * .75 + player.personality.loyalty * 4.8 * .25, 1, 99);
  }
  player.potentialEstimate = clamp(player.potentialEstimate + (memory.careerGoals || 0) / 300 + (memory.ballonDors || 0) * 1.2, 45, 99);
}

function emptyStats() {
  return { matches: 0, goals: 0, assists: 0, ratingTotal: 0, injuries: 0, boxGoals: 0, headerGoals: 0, finalGoals: 0, conversion: 0 };
}

function getRng() {
  // Deterministic per save while allowing continuous simulation.
  const rng = mulberry32((state.seed + state.rngCounter * 1013904223) >>> 0);
  state.rngCounter += 1;
  return rng;
}

function showSetup() {
  document.getElementById("setupPanel").classList.remove("hidden");
  document.getElementById("gamePanel").classList.add("hidden");
}
function showGame() {
  document.getElementById("setupPanel").classList.add("hidden");
  document.getElementById("gamePanel").classList.remove("hidden");
  switchTab(activeTab || "home", false);
  render();
}

function switchTab(tab, shouldRender = true) {
  activeTab = tab;
  document.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b.dataset.tab === activeTab));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.toggle("active", p.id === activeTab));
  if (shouldRender) render();
}

function currentClub() { return state.world.clubs.find(c => c.id === state.player.clubId); }
function abilityScore(player = state.player) {
  const a = player.attributes;
  const d = derivedRatings(player);
  return Math.round(d.overall);
}
function avgAttrs(attrs, keys) {
  return keys.reduce((sum, key) => sum + (attrs[key] ?? attrs.positioning ?? 50), 0) / keys.length;
}
function derivedRatings(player = state.player) {
  const a = player.attributes || {};
  const attacking = avgAttrs(a, ["finishing", "dribbling", "positioning", "composure", "firstTouch"]);
  const creativity = avgAttrs(a, ["passing", "vision", "firstTouch", "flair", "dribbling"]);
  const defending = avgAttrs(a, ["tackling", "marking", "positioning", "strength", "aggression"]);
  const physical = avgAttrs(a, ["pace", "acceleration", "strength", "stamina", "jumping", "balance"]);
  const mental = avgAttrs(a, ["leadership", "composure", "determination", "positioning"]) * .82 + (player.dna?.consistency || 55) * .18;
  const overall = attacking * .42 + creativity * .14 + defending * .04 + physical * .22 + mental * .18;
  const potential = player.potentialEstimate || player.dna?.potentialAbility || overall;
  return { attacking, creativity, defending, physical, mental, overall, potential };
}
function grade(value) {
  value = Math.round(value || 0);
  if (value >= 95) return "S";
  if (value >= 90) return "A+";
  if (value >= 85) return "A";
  if (value >= 80) return "A-";
  if (value >= 75) return "B+";
  if (value >= 70) return "B";
  if (value >= 65) return "C";
  if (value >= 55) return "D";
  return "F";
}
function ageGrowthCurve(age, peakAge = 28) {
  // S-curve: teenage acceleration, plateau near peak, then smooth decline.
  const growth = 1 / (1 + Math.exp(-0.55 * (age - 18.7)));
  const maturation = 0.68 + growth * 0.34;
  const decline = age <= peakAge ? 1 : Math.max(0.66, 1 - Math.pow(age - peakAge, 1.35) * 0.025);
  return maturation * decline;
}
function potentialTarget(player = state.player) {
  const pa = player.potentialEstimate || player.dna.potentialAbility;
  return clamp(pa * ageGrowthCurve(player.age, player.peakAge || 28), 35, 99);
}
function traitModifier(player = state.player) {
  let mod = 1;
  if (player.traits.includes("poacher")) mod += 0.06;
  if (player.traits.includes("ice")) mod += 0.07;
  if (player.traits.includes("big_game") || player.personality?.positives?.includes("Big Game Player")) mod += 0.05;
  if (player.traits.includes("engine")) mod += 0.035;
  if (player.personality?.negatives?.includes("Fragile Confidence") && player.form < 45) mod -= 0.05;
  return mod;
}
function influenceScore(player = state.player) {
  return abilityScore(player) * (0.82 + player.form / 250) * (0.86 + player.confidenceMomentum / 310) * traitModifier(player);
}
function effectiveScore() {
  const p = state.player;
  return influenceScore(p) / 1.22;
}
function expectedGoalsFor(club, opponent) {
  const tactical = club.manager?.ratings?.tactical || 60;
  const attackVsDefence = (club.attackElo || club.elo) - (opponent.defenceElo || opponent.elo) + (tactical - 60) * 2.1;
  const league = state?.world?.leagues?.find(l => l.name === club.league);
  const leagueTempo = (1 + ((club.leagueStrength || 60) - 60) / 500) * (league?.identity?.tempo || 1);
  const morale = clamp(((club.clubMorale || 55) + (club.squadHarmony || 55)) / 120, .65, 1.25);
  const style = club.manager?.playStyle;
  const styleXg = style === "Striker Focused" ? 1.08 : style === "High Press" ? 1.1 : style === "Defensive" ? .82 : style === "Possession" ? .96 : 1;
  return clamp(1.22 * Math.exp(attackVsDefence / 620) * leagueTempo * morale * styleXg, 0.18, 3.7);
}
function updateElo(a, b, aGoals, bGoals) {
  const expected = 1 / (1 + Math.pow(10, ((b.elo || 1500) - (a.elo || 1500)) / 400));
  const score = aGoals > bGoals ? 1 : aGoals === bGoals ? 0.5 : 0;
  const change = Math.round(22 * (score - expected));
  a.elo = Math.round((a.elo || 1500) + change);
  b.elo = Math.round((b.elo || 1500) - change);
  a.reputation = clamp(a.reputation + change / 20, 1, 99);
  b.reputation = clamp(b.reputation - change / 20, 1, 99);
  a.clubMorale = clamp((a.clubMorale || 55) + (score === 1 ? 1.4 : score === .5 ? .1 : -1.2), 0, 100);
  b.clubMorale = clamp((b.clubMorale || 55) + (score === 0 ? 1.4 : score === .5 ? .1 : -1.2), 0, 100);
  a.squadHarmony = clamp((a.squadHarmony || 55) + change / 35, 0, 100);
  b.squadHarmony = clamp((b.squadHarmony || 55) - change / 35, 0, 100);
}
function dynamicValue(player = state.player) {
  const scarcity = state.world.positionScarcity?.[player.position || "ST"]?.multiplier || 1.15;
  const ability = abilityScore(player);
  const potential = player.potentialEstimate || player.dna.potentialAbility;
  const years = player.contract?.yearsRemaining ?? player.contractYears ?? 2;
  const agePremium = player.age <= 21 ? 1.25 : player.age <= 25 ? 1.22 : player.age <= 29 ? 1.05 : Math.max(0.38, 1 - (player.age - 29) * 0.095);
  const contract = 0.72 + Math.min(5, years) * 0.1 + (player.contract?.releaseClause ? .04 : 0);
  const form = 0.82 + player.form / 280;
  const visibility = 0.84 + (player.visibility || 35) / 420;
  const elitePremium = ability > 80 ? Math.pow(ability - 78, 1.55) * 0.75 : 0;
  const base = Math.pow(ability, 2.05) / 900 + Math.pow(potential, 2) / 1100 + player.reputation * 0.12 + elitePremium;
  return Math.round(base * agePremium * contract * form * scarcity * visibility * 10) / 10;
}

function updateVisibility(player = state.player, club = currentClub(), seasonGoals = 0) {
  const league = state.world.leagues?.find(l => l.name === club.league);
  const international = (player.nationalTeam?.caps || 0) * 1.3 + (player.nationalTeam?.goals || 0) * 1.8;
  const agent = (player.agent?.quality || 45) * .18;
  const stage = (league?.reputation || 50) * .26 + (club.stature || club.reputation) * .3;
  const output = seasonGoals * .65 + player.currentSeason.goals * .3 + player.reputation * .2;
  player.visibility = clamp((player.visibility || 20) * .72 + (stage + agent + international + output) * .28, 1, 100);
}

function recoverInjuryBlock(player, rng) {
  if (!player.injury) return false;
  const medical = currentClub().facilitiesProfile?.medical || 55;
  const recovery = rngInt(rng, 3, 7) + Math.round(medical / 24);
  player.injury.weeksRemaining -= recovery;
  player.fitness = clamp(player.fitness + medical / 18, 20, 92);
  if (player.injury.weeksRemaining <= 0) {
    addHistory(`${player.name} returns from ${player.injury.name}. Fitness is ${Math.round(player.fitness)}%.`, "good");
    player.injury = null;
  }
  return true;
}

function rollInjury(rng, risk, player) {
  if (rng() >= risk) return null;
  let type = INJURY_TYPES[0];
  const roll = rng();
  if (roll > .985) type = INJURY_TYPES[3];
  else if (roll > .90) type = INJURY_TYPES[2];
  else if (roll > .62) type = INJURY_TYPES[1];
  const injury = { ...type, weeksRemaining: rngInt(rng, type.min, type.max), year: state.currentYear };
  player.injury = injury;
  player.injuryHistory.push(injury);
  player.currentSeason.injuries += 1;
  player.stats.injuries += 1;
  player.form = clamp(player.form - type.form, 1, 99);
  player.morale = clamp(player.morale - Math.round(type.form / 3), 1, 99);
  if (type.damage > 0) {
    ["pace", "stamina", "strength"].forEach(attr => player.attributes[attr] = clamp(player.attributes[attr] - type.damage, 1, 99));
    player.dna.injuryResistance = clamp(player.dna.injuryResistance - type.damage * 2, 1, 99);
  }
  addHistory(`${player.name} suffers a ${type.severity.toLowerCase()} injury: ${type.name} (${injury.weeksRemaining} weeks).`, type.severity === "Minor" ? "bad" : "major");
  return injury;
}

function simulateBlock() {
  if (!state || state.player.retired || state.pendingDecision) return;
  const rng = getRng();
  const p = state.player;
  const club = currentClub();
  const block = state.seasonBlock + 1;
  const matches = rngInt(rng, 5, 8);
  recoverInjuryBlock(p, rng);
  p.squadStatus = squadStatusFor(p, club);
  p.contract.squadStatus = p.squadStatus;
  const statusExpect = Math.max(0, SQUAD_STATUSES.indexOf(p.squadStatus)) * .06;
  const roleFitMod = clamp(roleFit(p, club) / 85, .72, 1.18);
  const fitnessMod = p.injury ? 0 : clamp((p.fitness - p.fatigue * .35) / 92, .35, 1.05);
  const opportunity = clamp(1.08 - (club.stature || club.reputation) / 180 + abilityScore(p) / 160 + statusExpect + (club.philosophy === "Youth First" ? .12 : 0) + (club.manager.archetype === "Youth Developer" && p.age < 21 ? .15 : 0), .15, 1.08);
  const harmonyMod = clamp(((club.squadHarmony || 55) + (club.clubMorale || 55)) / 120, .65, 1.28);
  const played = Math.max(0, Math.round(matches * clamp((club.manager.relationship + p.form + p.morale) / 210, .35, 1) * opportunity * harmonyMod * fitnessMod * roleFitMod));
  const expectedShare = [.18, .35, .55, .7, .82, .88][Math.max(0, SQUAD_STATUSES.indexOf(p.squadStatus))] || .45;
  if (!p.injury && played / matches < expectedShare - .22) {
    p.morale = clamp(p.morale - 3 - Math.max(0, SQUAD_STATUSES.indexOf(p.squadStatus)), 1, 99);
    if (p.personality?.ambition > 14) p.visibility = clamp(p.visibility + 1.5, 1, 100);
  }

  let goals = 0, assists = 0, rating = 0, boxGoals = 0, headerGoals = 0, finalGoals = 0, teamGoals = 0, against = 0, xg = 0;
  const blockMatches = [];
  const opponents = state.world.clubs.filter(c => c.id !== club.id);
  for (let i = 0; i < matches; i++) {
    const opponent = pick(rng, opponents);
    const important = block === 6 || rng() < 0.08;
    const result = i < played
      ? simulateMatch(rng, p, club, opponent, important)
      : simulateTeamOnlyMatch(rng, club, opponent);
    teamGoals += result.teamGoals;
    against += result.against;
    updateElo(club, opponent, result.teamGoals, result.against);
    recordLeagueMatch(club, opponent, result.teamGoals, result.against);
    if (i < played) {
      goals += result.goals;
      assists += result.assists;
      rating += result.rating;
      boxGoals += result.boxGoals;
      headerGoals += result.headerGoals;
      finalGoals += result.finalGoals;
      xg += result.xg;
      p.recentMatches.push({ goals: result.goals, assists: result.assists, rating: result.rating, xg: result.xg });
      blockMatches.push(makeMatchStory(club, opponent, result, important));
    } else {
      blockMatches.push(makeMatchStory(club, opponent, result, important, true));
    }
  }
  state.lastBlockMatches = blockMatches;
  state.matchStories = [...blockMatches, ...(state.matchStories || [])].slice(0, 80);
  simulateBackgroundLeague(rng, 14);
  p.recentMatches = p.recentMatches.slice(-10);

  const medical = club.facilitiesProfile?.medical || club.facilities || 55;
  const injuryTrait = p.personality?.negatives?.includes("Injury Prone") ? .018 : p.personality?.positives?.includes("Iron Will") ? -.006 : 0;
  const fatigueRisk = Math.max(0, p.fatigue - 55) / 900;
  const injuryRisk = p.injury ? 0 : clamp((100 - p.dna.injuryResistance) / 920 + (70 - medical) / 4500 + fatigueRisk + injuryTrait + (p.age > 30 ? (p.age - 30) / 930 : 0), .002, .16);
  const newInjury = rollInjury(rng, injuryRisk, p);
  const injured = !!newInjury || !!p.injury;

  updateStats(p.currentSeason, played, goals, assists, rating, boxGoals, headerGoals, finalGoals);
  updateStats(p.stats, played, goals, assists, rating, boxGoals, headerGoals, finalGoals);
  p.clubGoals ||= {};
  p.clubGoals[club.id] = (p.clubGoals[club.id] || 0) + goals;
  const conversion = xg > 0 ? clamp((goals / xg) * 15, 3, 35) : 0;
  p.currentSeason.conversion = Math.max(p.currentSeason.conversion, conversion);
  p.stats.conversion = Math.max(p.stats.conversion, conversion);
  const roleFatigue = TACTICAL_ROLES[p.tacticalRole || "complete"]?.fatigue || 1;
  p.fatigue = clamp(p.fatigue + played * 2.2 * roleFatigue + (club.manager.playStyle === "High Press" ? played * .6 : 0) - (matches - played) * 2.6 - (p.injury ? 4 : 0), 0, 100);
  p.fitness = clamp(p.fitness - played * 1.15 * roleFatigue + (matches - played) * 1.8 + (medical - 55) / 24, 20, 100);
  p.sharpness = clamp(p.sharpness + played * 2.1 - (matches - played) * .8 - (p.injury ? 8 : 0), 1, 100);
  updateVisibility(p, club, goals);

  updateConfidenceMomentum();
  const expectedBlockGoals = played ? xg : 0;
  // Regression to mean: hot/cold finishing affects form, but confidence gradually drifts toward underlying xG.
  const overPerformance = goals - expectedBlockGoals;
  p.form = clamp(p.form + goals * 1.25 + assists * .45 - (played - goals) * .13 - overPerformance * .22 + rngInt(rng, -3, 3), 1, 99);
  p.confidence = clamp(p.confidence * .72 + p.confidenceMomentum * .28, 1, 99);
  p.reputation = clamp(p.reputation + goals * .22 + assists * .08 + (rating / Math.max(1, played) - 6.8) * .45, 1, 100);
  p.fame = clamp(p.fame + goals * .16 + (p.reputation > 70 ? .45 : 0), 1, 100);
  p.value = Math.max(.1, dynamicValue(p));
  club.squadHarmony = clamp((club.squadHarmony || 55) + ((p.attributes.leadership || 50) - 55) / 260 + (p.personality?.leadership || 10) / 140 + (injured ? -0.6 : 0), 0, 100);
  p.relationships.manager = clamp((p.relationships.manager || club.manager.relationship) * .88 + club.manager.relationship * .12 + (played >= matches * .7 ? .6 : -.4), 1, 100);
  p.relationships.teammates = clamp((p.relationships.teammates || 55) + (club.squadHarmony - 55) / 180 + (p.personality?.leadership || 10) / 220, 1, 100);

  developPlayer(rng, block);
  processTraits(rng);
  generateBlockStoryBeat(rng, blockMatches, goals, assists, played, matches, xg);
  if (p.personality?.negatives?.includes("Hothead") && rng() < .035) {
    club.squadHarmony = clamp((club.squadHarmony || 55) - 7, 0, 100);
    p.morale = clamp(p.morale - 6, 1, 99);
    addHistory(`Media incident: ${p.name}'s temper causes dressing-room tension at ${club.name}.`, "bad");
  }
  processRivals(rng, goals);
  processTransfers(rng, block);

  const avgRating = played ? (rating / played).toFixed(2) : "-";
  const itemClass = goals >= Math.max(2, played * .75) ? "good" : injured ? "bad" : "";
  addHistory(`Season ${p.season}, Block ${block}: ${played}/${matches} matches, ${goals} goals from ${xg.toFixed(1)} xG, ${assists} assists, ${avgRating} avg rating. Club GD ${teamGoals}-${against}${p.injury ? `, injured (${p.injury.weeksRemaining} weeks left)` : ""}.`, itemClass);

  state.seasonBlock += 1;
  if (state.seasonBlock >= 6) endSeason(rng);
  saveGame();
  switchTab(state.pendingDecision ? "home" : "matches", false);
  render();
}

function simulateBackgroundLeague(rng, count = 18) {
  const playerClubId = state.player.clubId;
  const clubs = state.world.clubs.filter(c => c.id !== playerClubId);
  const rounds = 5;
  for (let r = 0; r < rounds; r++) {
    const shuffled = [...clubs].sort(() => rng() - .5);
    for (let i = 0; i < shuffled.length - 1; i += 2) {
      const a = shuffled[i], b = shuffled[i + 1];
      if (!a || !b) continue;
      const result = simulateTeamOnlyMatch(rng, a, b);
      updateElo(a, b, result.teamGoals, result.against);
      recordLeagueMatch(a, b, result.teamGoals, result.against);
    }
  }
}

function generateBlockStoryBeat(rng, blockMatches, goals, assists, played, matches, xg) {
  const p = state.player;
  const club = currentClub();
  const wins = blockMatches.filter(m => m.outcome === "W").length;
  const losses = blockMatches.filter(m => m.outcome === "L").length;
  const big = blockMatches.find(m => m.events?.some(e => e.includes("Man of the Match") || e.includes("Winning")));
  if (goals >= 5) addStoryBeat(`${p.name} owns the back pages after ${goals} goals in one block. ${club.name} fans start singing his name before kick-off.`, "major");
  else if (goals === 0 && played >= Math.max(3, matches - 1)) addStoryBeat(`Goal drought watch: ${p.name} works hard but finishes the block without scoring. The Chronicle asks if fatigue is catching up.`, "bad");
  else if (big) addStoryBeat(`${p.name} delivers the headline moment against ${big.opponent}. Rating ${big.rating}, ${big.events.join(", ")}.`, "good");
  else if (wins >= matches - 1) addStoryBeat(`${club.name} are rolling. ${wins} wins from ${matches} fixtures and the dressing room mood lifts again.`, "good");
  else if (losses >= Math.ceil(matches / 2)) addStoryBeat(`Pressure grows at ${club.name}: ${losses} defeats in the block leave the boardroom restless.`, "bad");
  else if (rng() < .45) {
    const snippets = [
      `${club.manager.name} praises ${p.name}'s work without the ball: "The goals will come."`,
      `Training-ground note: ${p.name} stays late working on ${label(p.trainingFocus)} while younger academy players watch.`,
      `Supporters debate ${p.name}'s role. Some want him as a pure poacher; others say he is becoming a complete forward.`,
      `The agent of ${p.name} is spotted at a league match. Nothing official, but the rumour mill starts turning.`,
      `A local columnist writes that ${p.name}'s season may define ${club.name}'s entire campaign.`
    ];
    addStoryBeat(pick(rng, snippets), "");
  }
  if (p.fatigue > 72 && rng() < .55) addStoryBeat(`${p.name} looks tired. Fitness staff recommend a rest before the next run of fixtures.`, "bad");
  if ((p.visibility || 0) > 82 && rng() < .35) addStoryBeat(`National media attention rises. ${p.name} is no longer a local story — scouts from bigger clubs are watching.`, "major");
}

function poisson(rng, lambda) {
  const L = Math.exp(-lambda);
  let k = 0, p = 1;
  do { k++; p *= rng(); } while (p > L);
  return k - 1;
}

function simulateTeamOnlyMatch(rng, club, opponent) {
  const teamXg = expectedGoalsFor(club, opponent);
  const oppXg = expectedGoalsFor(opponent, club);
  return { teamGoals: poisson(rng, teamXg), against: poisson(rng, oppXg), goals: 0, assists: 0, rating: 0 };
}

function makeMatchStory(club, opponent, result, important = false, rested = false) {
  const outcome = result.teamGoals > result.against ? "W" : result.teamGoals < result.against ? "L" : "D";
  const comp = important ? ["Cup Match", "Big Match", "European Night"][(state.rngCounter + state.seasonBlock) % 3] : "League Match";
  const events = [];
  for (let i = 0; i < (result.goals || 0); i++) events.push(`⚽ ${14 + i * 27}'`);
  for (let i = 0; i < (result.assists || 0); i++) events.push(`🅰 ${22 + i * 31}'`);
  if ((result.rating || 0) >= 8.8) events.push("⭐ Man of the Match");
  if (important && (result.finalGoals || 0) > 0) events.push("🏆 Winning Moment");
  return {
    year: state.currentYear,
    block: state.seasonBlock + 1,
    matchday: (state.leagueStats?.[club.id]?.played || 0) + 1,
    competition: comp,
    opponent: opponent.name,
    score: `${result.teamGoals}-${result.against}`,
    outcome,
    rating: result.rating ? result.rating.toFixed(1) : "—",
    goals: result.goals || 0,
    assists: result.assists || 0,
    events,
    rested
  };
}

function simulateMatch(rng, player, club, opponent, important = false) {
  const teamXg = expectedGoalsFor(club, opponent);
  const oppXg = expectedGoalsFor(opponent, club);
  const influence = influenceScore(player);
  const style = club.manager.playStyle || "Possession";
  const role = TACTICAL_ROLES[player.tacticalRole || "complete"] || TACTICAL_ROLES.complete;
  const fitBonus = (roleFit(player, club) - 70) / 300;
  const styleInvolvement = style === "Striker Focused" ? .10 : style === "Counter Attack" ? .04 : style === "Defensive" ? -.04 : 0;
  const involvement = clamp(0.18 + (influence - 55) / 180 + (player.position === "ST" ? 0.10 : 0) + styleInvolvement + fitBonus, 0.14, 0.68);
  const styleTempo = style === "High Press" ? 8 : style === "Counter Attack" ? 4 : style === "Defensive" ? -7 : style === "Possession" ? -2 : 5;
  const attacks = Math.max(18, poisson(rng, 34 + teamXg * 9 + styleTempo));
  let goals = 0, assists = 0, shots = 0, xg = 0, boxGoals = 0, headerGoals = 0, finalGoals = 0;
  let teamGoals = 0;

  for (let i = 0; i < attacks; i++) {
    // Markov flow: Possession -> Build Up -> Final Third -> Chance -> Shot -> Goal.
    const buildUpP = clamp(0.48 + ((club.elo || 1500) - (opponent.elo || 1500)) / 1500 + player.attributes.passing / 900, 0.28, 0.78);
    if (rng() > buildUpP) continue;
    const finalThirdP = clamp(0.34 + ((club.attackElo || club.elo) - (opponent.defenceElo || opponent.elo)) / 1350 + player.attributes.dribbling / 1000, 0.18, 0.68);
    if (rng() > finalThirdP) continue;
    const playerInvolved = rng() < involvement;
    const chanceP = clamp(0.23 + (playerInvolved ? player.attributes.positioning / 440 : 0) + teamXg / 18, 0.08, 0.58);
    if (rng() > chanceP) continue;
    const shotP = clamp(0.58 + (playerInvolved ? player.attributes.composure / 650 : 0), 0.42, 0.86);
    if (rng() > shotP) continue;

    const chanceXg = clamp(0.055 + rng() * 0.18 + (playerInvolved ? player.attributes.finishing / 950 : 0), 0.03, 0.42);
    const finishBoost = playerInvolved ? (player.attributes.finishing + player.attributes.composure) / 210 : 0.82;
    const bigGameBoost = important && (player.traits.includes("big_game") || player.personality?.positives?.includes("Big Game Player")) ? 1.16 : 1;
    const goalP = clamp(chanceXg * finishBoost * traitModifier(player) * bigGameBoost * role.goals, 0.015, 0.68);
    const scored = rng() < goalP;
    if (scored) teamGoals += 1;

    if (playerInvolved) {
      shots += 1;
      xg += chanceXg;
      if (scored) {
        goals += 1;
        boxGoals += rng() < clamp((player.attributes.positioning + player.attributes.finishing) / 205, 0.35, 0.88) ? 1 : 0;
        headerGoals += rng() < clamp(player.attributes.heading / 360, 0.04, 0.32) ? 1 : 0;
        finalGoals += important && rng() < player.dna.bigMatchTemperament / 125 ? 1 : 0;
      } else if (rng() < clamp((player.attributes.passing / 380) * role.assists, 0.05, 0.32)) {
        assists += 1;
      }
    } else if (scored && rng() < clamp((player.attributes.passing / 520 + involvement / 4) * role.assists, 0.03, 0.3)) {
      assists += 1;
    }
  }

  // Anchor team totals to Poisson xG so scorelines remain football-like even when Markov chances run hot/cold.
  teamGoals = Math.round(teamGoals * 0.55 + poisson(rng, teamXg) * 0.45);
  const against = poisson(rng, oppXg);
  const rating = clamp(6 + goals * .78 + assists * .34 + shots * .035 + (teamGoals > against ? .22 : teamGoals < against ? -.22 : 0) + (rng() - .45) * 1.05, 4.1, 10);
  return { goals, assists, rating, boxGoals, headerGoals, finalGoals, xg, teamGoals, against };
}

function updateConfidenceMomentum() {
  const p = state.player;
  if (!p.recentMatches?.length) return;
  let weight = 0, score = 0;
  p.recentMatches.forEach((m, idx) => {
    const w = idx + 1;
    weight += w;
    score += w * clamp(48 + m.goals * 12 + m.assists * 5 + (m.rating - 6.5) * 8 + (m.goals - m.xg) * 4, 1, 99);
  });
  p.confidenceMomentum = clamp(score / weight, 1, 99);
}
function updateStats(stats, matches, goals, assists, rating, boxGoals, headerGoals, finalGoals) {
  stats.matches += matches;
  stats.goals += goals;
  stats.assists += assists;
  stats.ratingTotal += rating;
  stats.boxGoals += boxGoals;
  stats.headerGoals += headerGoals;
  stats.finalGoals += finalGoals;
}
function addHistory(text, type = "") {
  state.history.unshift({ text, type });
  state.history = state.history.slice(0, 180);
}
function addStoryBeat(text, type = "") {
  state.storyBeats ||= [];
  state.storyBeats.unshift({ text, type, year: state.currentYear, season: state.player?.season, block: state.seasonBlock + 1 });
  state.storyBeats = state.storyBeats.slice(0, 80);
  addHistory(text, type);
}
function addTransfer(text) {
  state.transferLog.unshift(text);
  state.transferLog = state.transferLog.slice(0, 120);
}

function developPlayer(rng, block) {
  const p = state.player;
  const club = currentClub();
  const focus = p.trainingFocus;
  const current = abilityScore();
  const target = potentialTarget(p);
  const facilities = club.facilitiesProfile || { training: club.facilities, medical: club.facilities, youth: club.youthAcademy, analytics: 50 };
  const managerDev = club.manager.ratings?.development || (club.manager.archetype === "Youth Developer" ? 82 : 60);
  const academyBoost = p.age <= 20 ? ((p.academy?.training || 55) + (p.academy?.coaching || 55)) / 220 : 0.5;
  const leagueIdentity = state.world.leagues?.find(l => l.name === club.league)?.identity;
  const roleDev = p.tacticalRole === "pressing" ? (leagueIdentity?.pace || 1) : p.tacticalRole === "false9" ? (leagueIdentity?.technical || 1) : p.tacticalRole === "target" ? (leagueIdentity?.physical || 1) : 1;
  const environment = (((p.environmentScore || 55) / 100) * .22 + ((facilities.training || club.facilities) / 100) * .28 + (managerDev / 100) * .22 + academyBoost * .18 + ((club.clubMorale || 55) / 100) * .10) * roleDev;
  const professionalism = (p.dna.professionalism + p.dna.growthRate) / 200 * environment;
  const managerPush = club.manager.archetype === "Youth Developer" && p.age < 23 ? .18 : club.manager.archetype === "Striker Whisperer" ? .12 : 0;
  const injuryPenalty = p.currentSeason.injuries * (0.08 - (facilities.medical || 50) / 2500);
  const gap = target - current;
  const sCurveVelocity = p.age < 20 ? 2.2 : p.age < 24 ? 1.65 : p.age <= p.peakAge ? 0.82 : -0.82;
  const blockDelta = (gap / 8) * professionalism * sCurveVelocity + managerPush - injuryPenalty + (rng() - .45) * .12;

  ATTRIBUTES.forEach(attr => {
    let delta = blockDelta * attributeGrowthWeight(attr) / 3.0;
    if (attr === focus) delta += Math.max(0.04, professionalism * .13);
    if (p.age > p.peakAge && ["pace", "stamina", "strength"].includes(attr)) delta -= (p.age - p.peakAge) * .035;
    if (current > p.dna.potentialAbility && delta > 0) delta *= .1;
    p.attributes[attr] = clamp(p.attributes[attr] + delta, 1, 99);
  });

  if (block === 6) {
    bayesianPotentialUpdate(rng);
    const changed = focus[0].toUpperCase() + focus.slice(1);
    p.developmentLog.unshift(`${state.currentYear}: S-curve target ${target.toFixed(1)}, CA ${abilityScore()}, estimated PA ${Math.round(p.potentialEstimate)}. ${changed} focus shaped development at ${club.name}.`);
    p.developmentLog = p.developmentLog.slice(0, 30);
  }
}

function attributeGrowthWeight(attr) {
  return ({ finishing: 1.22, positioning: 1.12, composure: 1.05, firstTouch: .92, vision: .78, flair: .72, acceleration: .9, pace: .9, dribbling: .92, heading: .82, jumping: .72, balance: .7, stamina: .78, strength: .68, passing: .65, tackling: .36, marking: .34, leadership: .42, determination: .54, aggression: .38 })[attr] || 1;
}

function bayesianPotentialUpdate(rng) {
  const p = state.player;
  const season = p.currentSeason;
  const availability = season.matches / 42;
  const performanceSignal = clamp((season.goals * 1.2 + season.assists * .35 + (Number(avg(season)) || 6.4) * 6) / 78, 0, 1.35);
  const professionalismSignal = p.dna.professionalism / 100;
  const injurySignal = clamp(1 - season.injuries * 0.18, 0.35, 1);
  const evidence = clamp((availability * .28 + performanceSignal * .34 + professionalismSignal * .23 + injurySignal * .15), 0, 1.2);
  p.developmentBelief = clamp((p.developmentBelief || .62) * .72 + evidence * .28, .25, 1.05);
  const truePA = p.dna.potentialAbility;
  const reachable = truePA * clamp(0.72 + p.developmentBelief * .33, .55, 1.05);
  // Bayesian estimate moves toward observed reachable ceiling, with small noise to preserve uncertainty.
  p.potentialEstimate = clamp((p.potentialEstimate || truePA) * .72 + reachable * .28 + rngInt(rng, -1, 1), 45, 99);
}

function processTraits(rng = Math.random) {
  const p = state.player;
  p.traitProgress ||= {};
  const snapshot = { ...p.stats, age: p.age, reputation: p.reputation, attributes: p.attributes };
  for (const trait of TRAIT_DEFS) {
    if (p.traits.includes(trait.id) || !trait.check(snapshot)) continue;
    const metric = snapshot[trait.metric] || 0;
    const seasonMetric = p.currentSeason[trait.metric] || 0;
    const chance = clamp(((metric * 0.35 + seasonMetric * 1.8) * p.dna.consistency) / (trait.divisor || 1000), 0.01, 0.45);
    p.traitProgress[trait.id] = clamp((p.traitProgress[trait.id] || 0) + chance * 100, 0, 100);
    if (rng() < chance || p.traitProgress[trait.id] >= 100) {
      p.traits.push(trait.id);
      p.traitProgress[trait.id] = 100;
      addHistory(`${p.name} developed trait: ${trait.name} after repeated on-pitch behaviours made it part of his identity.`, "major");
    }
  }
}
function traitName(id) { return TRAIT_DEFS.find(t => t.id === id)?.name || id; }

function processRivals(rng, goalsThisBlock) {
  if (state.rivals.length < 4 && rng() < .13 + goalsThisBlock * .015) {
    const names = ["Rafael Voss", "Mika Tanaka", "Elias Stone", "Nico Alvarez", "Owen Vale", "Ibrahim Kone", "Julien Hart"];
    const rival = {
      name: pick(rng, names),
      type: pick(rng, ["Golden Boot challenger", "Ballon d'Or rival", "former teammate", "national team rival"]),
      heat: rngInt(rng, 35, 72),
      goals: rngInt(rng, Math.max(0, state.player.stats.goals - 20), state.player.stats.goals + 25)
    };
    state.rivals.push(rival);
    addHistory(`Rivalry ignites: ${rival.name}, a ${rival.type}, is now being compared to ${state.player.name}.`, "major");
  }
  state.rivals.forEach(r => {
    r.goals += rngInt(rng, 0, 5);
    r.heat = clamp(r.heat + rngInt(rng, -3, 4), 1, 100);
  });
}

function processTransfers(rng, block) {
  const p = state.player;
  const club = currentClub();
  state.transferWindowOpen = block === 3 || block === 6;
  if (!state.transferWindowOpen || state.pendingDecision || p.age < 18) return;

  const expiring = (p.contract?.yearsRemaining ?? p.contractYears) <= 1;
  const wagePressure = (p.contract?.wage || p.wage || 0) > club.finances / 2.2;
  const needsTalk = expiring || wagePressure || rng() < clamp((p.visibility + p.reputation) / 260, .08, .42);

  const agentPull = p.agent?.quality || 45;
  const maxClubs = agentPull > 82 ? 4 : agentPull > 62 ? 3 : 2;
  const minStature = agentPull > 82 ? -12 : agentPull > 62 ? -4 : 8;
  const candidates = state.world.clubs
    .filter(c => c.id !== club.id && c.finances > 24 && (c.stature || c.reputation) >= (club.stature || club.reputation) + minStature - 12)
    .sort((a, b) => ((b.stature || b.reputation) + b.finances + (b.manager.ratings?.scouting || 50) / 3) - ((a.stature || a.reputation) + a.finances + (a.manager.ratings?.scouting || 50) / 3))
    .slice(0, maxClubs)
    .filter(() => needsTalk || rng() < .35)
    .map(c => makeInterestCard(rng, c));

  const currentOffer = (expiring || p.squadStatus !== "Youth Prospect" || rng() < .45) ? makeContractOffer(rng, club, expiring ? 1.18 : 1) : null;
  const releaseListed = club.financialArchetype === "Financial Trouble" || wagePressure;
  state.pendingDecision = {
    type: "transferWindow",
    title: releaseListed ? "CLUB READY TO SELL" : "TRANSFER WINDOW OPEN",
    text: releaseListed ? `${club.name} are open to offers because of wage/finance pressure. ${p.agent?.name || "Your agent"} is checking the market.` : `${p.agent?.name || "Your agent"} has called. ${candidates.length ? "There is interest." : "The market is quiet."} ${currentOffer ? `${club.name} also want to talk contract.` : ""}`,
    releaseListed,
    currentClubId: club.id,
    currentOffer,
    interested: candidates,
    createdYear: state.currentYear,
    createdBlock: block
  };
  addStoryBeat(`TRANSFER WINDOW OPEN: ${p.agent?.name || "Your agent"} brings ${candidates.length} interested club${candidates.length === 1 ? "" : "s"}${currentOffer ? `, while ${club.name} prepare a contract offer` : ""}.`, "major");
}

function makeContractOffer(rng, club, multiplier = 1) {
  const p = state.player;
  const status = squadStatusFor(p, club);
  const wage = Math.round(Math.max((p.contract?.wage || p.wage || 2) * multiplier, createContract(rng, club, abilityScore(p), status).wage) * 10) / 10;
  return { clubId: club.id, years: rngInt(rng, 2, 5), wage, squadStatus: status, releaseClause: Math.round(dynamicValue(p) * (2.1 + rng()) * 10) / 10 };
}

function makeInterestCard(rng, club) {
  const p = state.player;
  const status = squadStatusFor(p, club);
  const wage = Math.round(((p.contract?.wage || p.wage || 2) * (1.05 + rng() * .8) + club.finances / 16) * 10) / 10;
  const likelyBid = Math.round(dynamicValue(p) * (.78 + rng() * .72) * 10) / 10;
  const strength = (club.stature || club.reputation) > (currentClub().stature || currentClub().reputation) + 8 ? "Strong" : rng() > .45 ? "Medium" : "Tentative";
  return { clubId: club.id, interest: strength, role: status, expectedStarts: status === "Star Player" ? 35 : status === "Key Player" ? 28 : status === "First Team" ? 20 : 12, wage, likelyBid, statusText: (club.rank || 99) <= 6 ? "Continental football" : (club.rank || 99) <= 14 ? "Top-flight project" : "Rebuild project" };
}

function endSeason(rng) {
  const p = state.player;
  const club = currentClub();
  const seasonGoals = p.currentSeason.goals;
  p.records.bestSeasonGoals = Math.max(p.records.bestSeasonGoals, seasonGoals);
  p.records.hatTricks += Math.floor(seasonGoals / 18) + (rng() < seasonGoals / 100 ? 1 : 0);

  const trophyChance = clamp((club.squadQuality + club.manager.relationship + seasonGoals) / 230, .08, .78);
  if (rng() < trophyChance) {
    p.records.trophies += 1;
    club.history ||= { leagueTitles: 0, cupWins: 0, legends: [], managers: [], records: { topScorer: { name: "Unknown", goals: 120 } } };
    const leagueTitle = (club.rank || 99) <= 3 && rng() < .55;
    if (leagueTitle) club.history.leagueTitles += 1; else club.history.cupWins += 1;
    state.careerTimeline ||= [];
    state.careerTimeline.unshift({ year: state.currentYear, title: leagueTitle ? "League Winner" : "Cup Winner", text: `${p.name} helps ${club.name} win silverware with ${seasonGoals} goals.` });
    addHistory(`${club.name} win silverware. ${p.name}'s ${seasonGoals} goals become part of club folklore.`, "major");
  }
  const awardVisibility = clamp(((club.stature || club.reputation) - 55) / 120 + p.fame / 260, 0, .35);
  if (seasonGoals >= 35 && p.reputation > 65 && rng() < .35 + awardVisibility) {
    p.records.ballonDors += 1;
    p.records.awards.push(`${state.currentYear} Ballon d'Or`);
    state.careerTimeline ||= [];
    state.careerTimeline.unshift({ year: state.currentYear, title: "Ballon d'Or", text: `${p.name} is named the best player in the world after a ${seasonGoals}-goal season.` });
    addHistory(`${p.name} wins the Ballon d'Or after a ${seasonGoals}-goal season.`, "major");
  } else if (seasonGoals >= 25) {
    p.records.awards.push(`${state.currentYear} Golden Boot nominee`);
  }

  const expected = Math.max(6, p.currentSeason.matches * (p.expectedGoalBaseline || 14) / 42);
  p.expectedGoalBaseline = clamp((p.expectedGoalBaseline || expected) * .72 + expected * .18 + seasonGoals * .10, 4, 55);
  processInternationalSeason(rng);
  updateClubHistory(rng, seasonGoals);
  processBoardExpectations(rng, seasonGoals);
  generateYouthIntake(rng);
  updateClubEconomies(rng);
  updateLeagueEconomy(rng);
  processManagerMarket(rng);
  processDynamicWorldEvents(rng);
  processLuckyBreakEvents(rng);
  state.previousLeagueTable = leagueTable().slice(0, 8).map((r, idx) => ({ pos: idx + 1, clubName: r.club.name, pts: r.pts, gd: r.gf - r.ga }));
  const champion = state.previousLeagueTable[0];
  if (champion) addStoryBeat(`${champion.clubName} finish the league campaign on top with ${champion.pts} points.`, "major");
  state.leagueStats = createLeagueStats(state.world.clubs);
  rerankClubs();

  agePlayer(rng);
  p.season += 1;
  state.currentYear += 1;
  state.seasonBlock = 0;
  p.contract.yearsRemaining -= 1;
  p.contractYears = p.contract.yearsRemaining;
  if (p.contractYears <= 0) {
    const oldWage = p.contract.wage;
    p.squadStatus = squadStatusFor(p, currentClub());
    p.contract = createContract(rng, currentClub(), abilityScore(p), p.squadStatus);
    p.contractYears = p.contract.yearsRemaining;
    p.wage = p.contract.wage;
    addHistory(`${p.name} signs a new ${p.contractYears}-year contract at ${currentClub().name}: £${p.wage}k/week (${p.squadStatus}).`, p.wage > oldWage ? "good" : "");
  }
  generateSeasonReview(rng, seasonGoals, p.currentSeason.assists, avg(p.currentSeason));
  addHistory(`Season complete: ${seasonGoals} goals, ${p.currentSeason.assists} assists, ${avg(p.currentSeason)} average rating.`, seasonGoals >= 30 ? "good" : "");
  p.currentSeason = emptyStats();

  if (shouldRetire()) {
    retirePlayer();
  }
}

function processInternationalSeason(rng) {
  const p = state.player;
  const nation = state.world.nations?.find(n => n.name === p.nation);
  if (!nation) return;
  const selectionThreshold = clamp(105 - (nation.strength || 55) * .45 - (nation.internationalPrestige || 55) * .25, 28, 78);
  const selected = p.visibility + p.reputation + abilityScore(p) / 2 > selectionThreshold || (nation.strength < 50 && abilityScore(p) > 58);
  if (!selected) return;
  const caps = rngInt(rng, 2, 9);
  const goals = poisson(rng, clamp((abilityScore(p) - 45) / 18 + (100 - (nation.strength || 55)) / 90, .1, 1.9));
  p.nationalTeam.caps += caps;
  p.nationalTeam.goals += goals;
  p.nationalTeam.status = p.nationalTeam.caps > 55 ? "National Icon" : p.nationalTeam.caps > 20 ? "Regular" : "Called Up";
  p.visibility = clamp(p.visibility + caps * .8 + goals * 1.5 + (nation.internationalPrestige || 55) / 35, 1, 100);
  if (rng() < clamp((nation.strength || 55) / 220, .08, .42)) {
    p.records.trophies += 1;
    addHistory(`${p.name} wins international silverware with ${p.nation}, adding ${goals} national-team goals this year.`, "major");
  } else {
    addHistory(`${p.name} represents ${p.nation}: ${caps} caps, ${goals} goals.`, "");
  }
}

function updateClubHistory(rng, seasonGoals) {
  const p = state.player;
  const club = currentClub();
  club.history ||= { leagueTitles: 0, cupWins: 0, legends: [], managers: [], records: { topScorer: { name: "Unknown", goals: 120 } } };
  if (seasonGoals >= 30) club.history.legends = [...new Set([...(club.history.legends || []), p.name])].slice(0, 8);
  const clubGoals = p.clubGoals?.[club.id] || 0;
  if (clubGoals > (club.history.records?.topScorer?.goals || 0)) {
    const old = club.history.records.topScorer;
    club.history.records.topScorer = { name: p.name, goals: clubGoals, year: state.currentYear };
    addHistory(`${p.name} breaks ${club.name}'s scoring record, passing ${old.name}'s mark of ${old.goals}.`, "major");
  }
}

function processBoardExpectations(rng, seasonGoals) {
  const club = currentClub();
  const p = state.player;
  const goals = club.board?.goals || [];
  let pressure = 0;
  if (goals.includes("Win League") && (club.rank || 99) > 3) pressure += 18;
  if (goals.includes("Qualify for Europe") && (club.rank || 99) > 6) pressure += 12;
  if (goals.includes("Avoid Relegation") && (club.rank || 1) > 18) pressure += 22;
  if (goals.includes("Develop Youth") && p.age <= 21 && p.currentSeason.matches >= 18) pressure -= 10;
  if (goals.includes("Reduce Wage Bill") && (club.wageBill || 0) > (club.finances || 50) * 3.2) pressure += 12;
  club.board.expectationProgress = { lastReview: state.currentYear, pressure, playerMinutes: p.currentSeason.matches, goals: goals.join(", ") };
  club.clubMorale = clamp((club.clubMorale || 55) - pressure / 8 + (seasonGoals >= 25 ? 4 : 0), 0, 100);
  if (pressure > 18 && rng() < clamp((100 - (club.board.patience || 50)) / 140, .05, .6)) {
    const old = club.manager.name;
    club.manager = generateManager(rng, club.reputation, club.stature || club.reputation);
    addHistory(`Board pressure at ${club.name}: expectations (${goals.join(", ")}) were missed. ${old} is replaced by ${club.manager.name}.`, "major");
  }
}

function generateYouthIntake(rng) {
  state.world.youthPool ||= [];
  state.world.clubs.forEach(club => {
    const count = rngInt(rng, 1, 4);
    for (let i = 0; i < count; i++) {
      const pa = clamp(Math.round((club.youthAcademy || 55) * .55 + (club.facilitiesProfile?.youth || 55) * .25 + rngInt(rng, 8, 45)), 35, 99);
      const pos = weightedPosition(rng);
      const prospect = {
        id: `yp_${state.currentYear}_${club.id}_${i}`,
        name: generateName(rng),
        age: rngInt(rng, 15, 18),
        nation: club.nation,
        clubId: club.id,
        position: pos.id,
        potential: pa,
        ability: clamp(pa - rngInt(rng, 18, 42), 25, 90),
        visibility: clamp((club.stature || 50) / 3 + rngInt(rng, 0, 30), 1, 100)
      };
      state.world.youthPool.push(prospect);
      if (pos.id === "ST" && pa >= 86 && state.rivals.length < 6) {
        state.rivals.push({ name: prospect.name, type: "wonderkid striker", heat: rngInt(rng, 25, 62), goals: 0, youthId: prospect.id });
        addHistory(`Youth Intake ${state.currentYear}: ${prospect.name}, an elite striker prospect from ${club.name}, is already being called a future rival.`, "major");
      }
    }
  });
  state.world.youthPool = state.world.youthPool.sort((a, b) => b.potential - a.potential).slice(0, 160);
}

function generateInitialYouthPool(rng, clubs) {
  const pool = [];
  clubs.forEach(club => {
    for (let i = 0; i < 3; i++) {
      const pos = weightedPosition(rng);
      const potential = clamp(Math.round((club.youthAcademy || 55) * .55 + (club.stature || 55) * .15 + rngInt(rng, 0, 42)), 35, 99);
      pool.push({
        id: `yp_start_${club.id}_${i}`,
        name: generateName(rng),
        birthYear: 2026 - rngInt(rng, 15, 19),
        birthRegion: pick(rng, REGIONS),
        academy: club.name,
        age: rngInt(rng, 15, 19),
        nation: club.nation,
        clubId: club.id,
        position: pos.id,
        secondaryPositions: pos.id === "ST" ? ["WG"] : [],
        potential,
        ability: clamp(potential - rngInt(rng, 14, 40), 25, 90),
        visibility: clamp((club.stature || 55) / 2 + rngInt(rng, 0, 25), 1, 100),
        traits: potential >= 88 ? ["Wonderkid"] : []
      });
    }
  });
  return pool.sort((a, b) => b.potential - a.potential).slice(0, 80);
}

function weightedPosition(rng) {
  const total = POSITIONS.reduce((sum, p) => sum + p.share, 0);
  let roll = rng() * total;
  for (const pos of POSITIONS) {
    roll -= pos.share;
    if (roll <= 0) return pos;
  }
  return POSITIONS[0];
}

function processDynamicWorldEvents(rng) {
  state.world.worldEvents ||= [];
  if (rng() < .18) {
    const league = pick(rng, state.world.leagues);
    const event = pick(rng, ["Financial Collapse", "League Expansion", "Rule Change", "Golden Generation", "TV Money Boom", "Foreign Talent Wave"]);
    if (event === "Financial Collapse") { league.revenue = clamp(league.revenue - rngInt(rng, 8, 22), 10, 100); league.reputation = clamp(league.reputation - rngInt(rng, 3, 9), 10, 100); }
    if (event === "League Expansion") { league.revenue = clamp(league.revenue + rngInt(rng, 6, 18), 10, 100); }
    if (event === "Rule Change") { league.identity = pick(rng, LEAGUE_IDENTITIES); }
    if (event === "Golden Generation") { league.talentProduction = clamp(league.talentProduction + rngInt(rng, 10, 24), 10, 100); }
    if (event === "TV Money Boom") { league.revenue = clamp(league.revenue + rngInt(rng, 10, 26), 10, 100); league.reputation = clamp(league.reputation + rngInt(rng, 2, 7), 10, 100); }
    if (event === "Foreign Talent Wave") { league.reputation = clamp(league.reputation + rngInt(rng, 3, 9), 10, 100); league.talentProduction = clamp(league.talentProduction - rngInt(rng, 1, 5), 10, 100); }
    const text = `${event}: ${league.name} shifts direction. Identity: ${league.identity?.name || "Unknown"}.`;
    state.world.worldEvents.unshift({ year: state.currentYear, text });
    state.world.worldEvents = state.world.worldEvents.slice(0, 40);
    addHistory(text, "major");
  }
}

function generateSeasonReview(rng, goals, assists, rating) {
  const p = state.player;
  const club = currentClub();
  let title;
  if (goals >= 45) title = `${p.name.toUpperCase()} WRITES A MONSTER SEASON`;
  else if (goals >= 30) title = `${p.name.toUpperCase()} BECOMES THE STORY OF ${state.currentYear}`;
  else if (goals >= 15) title = `${p.name.toUpperCase()} TAKES ANOTHER STEP`;
  else title = `${p.name.toUpperCase()} FACES QUESTIONS AFTER QUIET YEAR`;
  const detail = `${title}: ${goals} goals, ${assists} assists, ${rating} average rating at ${club.name}. ${p.injuryHistory?.some(i => i.year === state.currentYear) ? "Injuries shaped the campaign." : "Availability kept the season moving."}`;
  addStoryBeat(detail, goals >= 30 ? "major" : goals < 12 ? "bad" : "");
  if (club.board?.expectationProgress?.pressure > 15) addStoryBeat(`Boardroom tension remains at ${club.name}. The manager enters next season under pressure.`, "bad");
  if (p.stats.goals > 0 && p.stats.goals % 100 < goals) addStoryBeat(`Milestone watch: ${p.name} passes ${Math.floor(p.stats.goals / 100) * 100} career goals. The road to 1000 feels a little less impossible.`, "major");
}

function updateClubEconomies(rng) {
  state.world.clubs.forEach(club => {
    const league = state.world.leagues?.find(l => l.name === club.league);
    const positionIncome = Math.max(8, (26 - (club.rank || 12)) * 1.8);
    const continental = (club.rank || 99) <= 4 ? rngInt(rng, 18, 65) : 0;
    const fanbaseMult = 1 + FANBASE_TIERS.indexOf(club.fanbase || "Regional") * .22;
    const sponsorship = ((club.stature || club.reputation) * .9 + (club.recentSuccess || 50) * .45) * fanbaseMult;
    const ticketRevenue = (club.stadiumSize || 24000) / 1000 * ((club.fanLoyalty || 55) / 70) * (((club.clubMorale || 55) + 45) / 100);
    const sales = club.financialArchetype === "Selling Club" ? rngInt(rng, 8, 55) : club.financialArchetype === "Financial Trouble" ? rngInt(rng, 12, 70) : rngInt(rng, 0, 18);
    const revenue = positionIncome + continental + sponsorship + ticketRevenue + sales + (league?.revenue || 55) * .35;
    const playerWage = state.player.clubId === club.id ? (state.player.contract?.wage || state.player.wage || 0) * 1.2 : 0;
    const expenses = (club.wageBill || 120) + playerWage + (club.facilitiesProfile?.training || club.facilities || 55) * .55 + (club.youthAcademy || 55) * .45 + rngInt(rng, 8, 35);
    club.financeBalance = Math.round((club.financeBalance || 0) + revenue - expenses);
    if (club.financeBalance < -90) {
      club.financialArchetype = "Financial Trouble";
      club.finances = clamp(club.finances - rngInt(rng, 4, 10), 1, 100);
      club.clubMorale = clamp((club.clubMorale || 55) - rngInt(rng, 4, 10), 0, 100);
    } else if (club.financeBalance > 180) {
      club.finances = clamp(club.finances + rngInt(rng, 1, 4), 1, 100);
      if (rng() < .25) {
        club.facilitiesProfile.training = clamp(club.facilitiesProfile.training + 1, 1, 100);
        club.facilities = club.facilitiesProfile.training;
      }
    }
    club.recentSuccess = clamp((club.recentSuccess || 50) * .75 + (26 - (club.rank || 12)) * 1.3 + ((club.clubMorale || 50) - 50) * .1, 1, 100);
  });
}

function processManagerMarket(rng) {
  const clubs = state.world.clubs;
  clubs.forEach(club => {
    const underPressure = (club.clubMorale || 55) < 28 || ((club.rank || 12) > 16 && club.board?.ambition > 70);
    const sackChance = underPressure ? clamp((100 - (club.board?.patience || 50)) / 180, .05, .55) : .01;
    if (rng() < sackChance) {
      const old = club.manager.name;
      club.manager = generateManager(rng, club.reputation, club.stature || club.reputation);
      club.clubMorale = clamp((club.clubMorale || 45) + 10, 0, 100);
      addHistory(`${club.name}'s board sacks ${old} and appoints ${club.manager.name}, a ${club.manager.archetype} using ${club.manager.playStyle}.`, "major");
    }
  });
  const eliteManagers = clubs.filter(c => (c.manager.elo || 1500) > 1760 && (c.rank || 99) <= 4);
  if (eliteManagers.length && rng() < .18) {
    const source = pick(rng, eliteManagers);
    const destination = clubs.filter(c => c.id !== source.id && (c.stature || 0) > (source.stature || 0) + 8).sort((a, b) => (b.stature || 0) - (a.stature || 0))[0];
    if (destination) {
      const moving = source.manager;
      source.manager = generateManager(rng, source.reputation, source.stature || source.reputation);
      destination.manager = moving;
      source.clubMorale = clamp((source.clubMorale || 55) - 12, 0, 100);
      destination.clubMorale = clamp((destination.clubMorale || 55) + 8, 0, 100);
      addHistory(`Manager market shock: ${moving.name} leaves ${source.name} for the bigger stage at ${destination.name}.`, "major");
    }
  }
}

function processLuckyBreakEvents(rng) {
  const p = state.player;
  const club = currentClub();
  if (p.age <= 19 && p.stats.goals > 15 && rng() < clamp((p.dna.potentialAbility + p.reputation) / 500, .04, .22)) {
    addHistory(`Lucky break: an elite youth scout files a glowing report on ${p.name}. Major clubs begin watching.`, "major");
    p.fame = clamp(p.fame + 8, 1, 100);
  }
  if (rng() < .025) {
    const takeoverPool = state.world.clubs.filter(c => c.stature < 70);
    const target = takeoverPool.length ? pick(rng, takeoverPool) : pick(rng, state.world.clubs);
    target.financialArchetype = "Rich Giant";
    target.finances = clamp(target.finances + 35, 1, 100);
    target.financeBalance = (target.financeBalance || 0) + 220;
    target.stature = clamp(target.stature + 12, 1, 100);
    addHistory(`Billionaire takeover: ${target.name} suddenly becomes a force in the transfer market.`, "major");
  }
  if (club.manager.archetype === "Youth Developer" && p.age < 20 && rng() < .08) {
    club.manager.relationship = clamp(club.manager.relationship + 10, 1, 100);
    addHistory(`${club.manager.name} publicly backs ${p.name}: "He is ready now." Playing-time pressure rises.`, "good");
  }
}

function updateLeagueEconomy(rng) {
  if (!state.world.leagues) return;
  state.world.leagues.forEach(league => {
    const clubs = state.world.clubs.filter(c => c.league === league.name);
    const avgClubElo = clubs.length ? clubs.reduce((sum, c) => sum + (c.elo || 1500), 0) / clubs.length : league.elo;
    const youthOutput = league.talentProduction + (clubs.reduce((sum, c) => sum + c.youthAcademy, 0) / Math.max(1, clubs.length) - 60) * .35;
    const growth = (league.revenue - 55) * .015 + (league.continentalSuccess - 55) * .018 + (youthOutput - 55) * .014 + (avgClubElo - league.elo) / 900 + rngInt(rng, -2, 2) * .15;
    league.reputation = clamp(league.reputation + growth, 20, 99);
    league.revenue = clamp(league.revenue + growth * .45 + rngInt(rng, -1, 1), 15, 99);
    league.talentProduction = clamp(league.talentProduction + growth * .25, 15, 99);
    league.elo = Math.round(clamp(league.elo + growth * 6, 1100, 1950));
    const nation = state.world.nations?.find(n => n.name === league.nation);
    if (nation) {
      nation.leagueQuality = clamp(nation.leagueQuality * .86 + league.reputation * .14, 15, 99);
      nation.economicStrength = clamp(nation.economicStrength * .88 + league.revenue * .12, 15, 99);
      nation.youthDevelopment = clamp(nation.youthDevelopment * .9 + league.talentProduction * .1, 15, 99);
      nation.footballInfrastructure = clamp(nation.footballInfrastructure + growth * .08, 15, 99);
    }
  });
}

function rerankClubs() {
  state.world.clubs.sort((a, b) => (b.elo || b.reputation) - (a.elo || a.reputation));
  state.world.clubs.forEach((c, idx) => c.rank = idx + 1);
}

function agePlayer(rng) {
  const p = state.player;
  p.age += 1;
  // Hidden personality evolution: core professionalism is stable, but leadership/confidence/loyalty/temperament can change.
  if (p.personality) {
    if (p.records.trophies > 0 || p.stats.matches > 120) p.personality.leadership = clamp(p.personality.leadership + (rng() < .45 ? 1 : 0), 1, 20);
    if (p.currentSeason?.goals >= 25) p.personality.confidence = clamp(p.personality.confidence + (rng() < .35 ? 1 : 0), 1, 20);
    if (currentClub().manager.relationship < 35) p.personality.loyalty = clamp(p.personality.loyalty - (rng() < .35 ? 1 : 0), 1, 20);
    if (p.personality.temperament > 14 && rng() < .18) p.morale = clamp(p.morale - 6, 1, 99);
  }
  if (p.age < 25) {
    p.morale = clamp(p.morale + rngInt(rng, -3, 5), 1, 99);
  } else if (p.age > 32) {
    p.form = clamp(p.form - rngInt(rng, 2, 7), 1, 99);
    p.confidence = clamp(p.confidence - rngInt(rng, 0, 4), 1, 99);
  }
}
function shouldRetire() {
  const p = state.player;
  if (p.stats.goals >= 1000) return true;
  if (p.age >= 40) return true;
  if (p.age >= 36 && abilityScore() < 58) return true;
  return false;
}

function generateLegacyStory(p) {
  const club = currentClub();
  const origin = (p.environmentScore || 55) < 40 ? "a brutal football backwater" : (p.environmentScore || 55) > 75 ? "an elite development ecosystem" : "a modest football environment";
  const identity = `${p.preferredFoot || "Right"}-footed ${tacticalRoleName(p.tacticalRole)} from ${p.birthRegion || "an unknown region"}`;
  const failure = p.stats.goals < 120 ? "His career became a reminder that talent alone is never enough." : p.stats.goals < 350 ? "He carved out a respected career without becoming the unstoppable force scouts imagined." : p.stats.goals < 700 ? "He became one of the defining strikers of his era." : "He retired as a generational phenomenon whose name reshaped the dynasty.";
  const hardRoad = (p.hardRoadMultiplier || 1) > 1.15 ? " The hard road made every record worth more to the bloodline." : "";
  return `Born in ${origin}, ${p.name} emerged as a ${identity}. He scored ${p.stats.goals} goals, added ${p.stats.assists} assists, won ${p.records.trophies} trophies and ${p.records.ballonDors} Ballon d'Ors. ${failure}${hardRoad} Final club: ${club.name}.`;
}

function retirePlayer() {
  const p = state.player;
  p.retired = true;
  const fragments = calculateFragments();
  state.legacy.fragments += fragments;
  state.legacy.totalGoals += p.stats.goals;
  state.legacy.bestCareerGoals = Math.max(state.legacy.bestCareerGoals, p.stats.goals);
  const legacyStory = generateLegacyStory(p);
  state.legacy.lineage.push({
    name: p.name,
    nation: p.nation,
    goals: p.stats.goals,
    assists: p.stats.assists,
    trophies: p.records.trophies,
    awards: p.records.awards.length,
    ballonDors: p.records.ballonDors,
    traits: [...p.traits],
    retiredAge: p.age,
    story: legacyStory
  });
  const memoryWeight = clamp(0.22 + p.stats.goals / 2500 + p.records.ballonDors * 0.04, 0.22, 0.62);
  const previous = state.legacy.geneticMemory;
  state.legacy.geneticMemory = {
    dna: blendMemory(previous?.dna, p.dna, memoryWeight),
    attributes: blendMemory(previous?.attributes, p.attributes, memoryWeight),
    personality: blendMemory(previous?.personality, p.personality, memoryWeight),
    careerGoals: Math.max(previous?.careerGoals || 0, p.stats.goals),
    ballonDors: Math.max(previous?.ballonDors || 0, p.records.ballonDors)
  };
  addHistory(`${p.name} retires at ${p.age}. Dynasty gains ${fragments} Legacy Fragments. ${legacyStory}`, "major");
}
function calculateFragments() {
  const p = state.player;
  const base = p.stats.goals * .55 + p.records.trophies * 18 + p.records.ballonDors * 45 + p.records.hatTricks * 3 + p.stats.assists * .12;
  return Math.floor(base * (p.hardRoadMultiplier || 1));
}

function blendMemory(oldValues, newValues, weight) {
  const out = {};
  Object.keys(newValues || {}).forEach(key => {
    if (typeof newValues[key] !== "number") return;
    const oldVal = typeof oldValues?.[key] === "number" ? oldValues[key] : newValues[key];
    out[key] = clamp(oldVal * (1 - weight) + newValues[key] * weight, 1, 99);
  });
  return out;
}

function startSuccessor(origin) {
  startNewCareer(origin);
}
function startNewCareer(origin = "regen") {
  const rng = getRng();
  const seed = (state.seed + state.currentYear + state.legacy.generation * 7919 + Math.floor(rng() * 9999)) % 99999999;
  const previous = JSON.parse(JSON.stringify(state.legacy));
  previous.generation += 1;
  state = createNewSave(seed, "", state.player.nation, origin, previous, "normal");
  addHistory(`Career #${state.legacy.generation} begins. A new football journey is rolled from the legacy profile.`, "major");
  saveGame();
  render();
}
function clearDecision(note = null, type = "") {
  if (note) addStoryBeat(note, type);
  state.pendingDecision = null;
  saveGame();
  render();
}

function acceptContractOffer() {
  const d = state.pendingDecision;
  if (!d?.currentOffer) return;
  const offer = d.currentOffer;
  state.player.contract = { wage: offer.wage, yearsRemaining: offer.years, releaseClause: offer.releaseClause, squadStatus: offer.squadStatus, bonuses: { goalBonus: Math.round(offer.wage * 1.2), trophyBonus: Math.round(offer.wage * 5) } };
  state.player.contractYears = offer.years;
  state.player.wage = offer.wage;
  state.player.squadStatus = offer.squadStatus;
  state.player.morale = clamp(state.player.morale + 8, 1, 99);
  state.careerTimeline ||= [];
  state.careerTimeline.unshift({ year: state.currentYear, title: "New Contract", text: `${state.player.name} signs ${offer.years} years at £${offer.wage}k/week.` });
  clearDecision(`${state.player.name} signs a new ${offer.years}-year deal at ${currentClub().name}.`, "good");
}

function counterContractOffer() {
  const d = state.pendingDecision;
  if (!d?.currentOffer) return;
  const club = currentClub();
  const ask = Math.round(d.currentOffer.wage * 1.25 * 10) / 10;
  const chance = clamp((club.finances + club.board?.ambition - ask) / 130, .15, .75);
  const rng = getRng();
  if (rng() < chance) {
    d.currentOffer.wage = ask;
    d.currentOffer.years = Math.max(3, d.currentOffer.years);
    addStoryBeat(`${club.name} accept the counter-offer: £${ask}k/week is on the table.`, "good");
  } else {
    d.currentOffer = null;
    state.player.morale = clamp(state.player.morale - 5, 1, 99);
    addStoryBeat(`${club.name} walk away from contract talks after the counter-offer.`, "bad");
  }
  saveGame(); render();
}

function rejectContractOffer() {
  const club = currentClub();
  if (state.pendingDecision) state.pendingDecision.currentOffer = null;
  state.player.morale = clamp(state.player.morale - 2, 1, 99);
  addStoryBeat(`${state.player.name} rejects ${club.name}'s contract offer. The situation will be watched closely.`, "bad");
  if (!state.pendingDecision?.interested?.length) state.pendingDecision = null;
  saveGame(); render();
}

function requestClubBid(clubId) {
  const d = state.pendingDecision;
  const interest = d?.interested?.find(x => x.clubId === clubId);
  const buyer = state.world.clubs.find(c => c.id === clubId);
  const seller = currentClub();
  if (!interest || !buyer) return;
  const rng = getRng();
  const bid = Math.round(interest.likelyBid * (0.9 + rng() * .28) * 10) / 10;
  const asking = Math.round(Math.min(state.player.contract?.releaseClause || Infinity, dynamicValue(state.player) * (1.05 + (seller.financialArchetype === "Financial Trouble" ? -.2 : .45))) * 10) / 10;
  const accepted = bid >= asking || seller.financialArchetype === "Financial Trouble" || (state.player.contract?.yearsRemaining || 2) <= 1;
  if (!accepted) {
    interest.lastBid = bid;
    interest.status = `Bid £${bid}m rejected. ${seller.name} want about £${asking}m.`;
    addStoryBeat(`${buyer.name} bid £${bid}m for ${state.player.name}, but ${seller.name} reject it.`, "bad");
    saveGame(); render(); return;
  }
  d.acceptedTransfer = { ...interest, bid, asking, clubId };
  interest.status = `Bid accepted: £${bid}m. Contract ready.`;
  addStoryBeat(`${buyer.name} have a £${bid}m bid accepted. The final decision is now with ${state.player.name}.`, "major");
  saveGame(); render();
}

function acceptTransferOffer(clubId) {
  const d = state.pendingDecision;
  const accepted = d?.acceptedTransfer?.clubId === clubId ? d.acceptedTransfer : null;
  const buyer = state.world.clubs.find(c => c.id === clubId);
  const seller = currentClub();
  if (!accepted || !buyer) return;
  seller.financeBalance = (seller.financeBalance || 0) + accepted.bid;
  buyer.financeBalance = (buyer.financeBalance || 0) - accepted.bid;
  state.player.clubId = buyer.id;
  state.player.clubGoals ||= {}; state.player.clubGoals[buyer.id] ||= 0;
  state.player.squadStatus = accepted.role;
  state.player.contract = { wage: accepted.wage, yearsRemaining: 4, releaseClause: Math.round(accepted.bid * 2.4), squadStatus: accepted.role, bonuses: { goalBonus: Math.round(accepted.wage * 1.4), trophyBonus: Math.round(accepted.wage * 6) } };
  state.player.contractYears = 4; state.player.wage = accepted.wage;
  state.careerTimeline ||= [];
  state.careerTimeline.unshift({ year: state.currentYear, title: "Transfer", text: `${state.player.name} joins ${buyer.name} from ${seller.name} for £${accepted.bid}m.` });
  addTransfer(`${state.currentYear}: ${buyer.name} sign ${state.player.name} for £${accepted.bid}m.`);
  clearDecision(`${state.player.name} chooses ${buyer.name}. New club, new pressure, new story.`, "major");
}

function rejectClubInterest(clubId) {
  const buyer = state.world.clubs.find(c => c.id === clubId);
  if (state.pendingDecision) state.pendingDecision.interested = (state.pendingDecision.interested || []).filter(x => x.clubId !== clubId);
  addStoryBeat(`${state.player.name}'s camp cool interest from ${buyer?.name || "a club"}.`, "");
  if (!state.pendingDecision?.interested?.length && !state.pendingDecision?.currentOffer) state.pendingDecision = null;
  saveGame(); render();
}

function purchaseLegacyUpgrade(id) {
  const item = LEGACY_SHOP.find(x => x.id === id);
  if (!item || !state?.legacy) return;
  state.legacy.unlockedBonuses ||= [];
  if (state.legacy.unlockedBonuses.includes(id)) return;
  if (state.legacy.fragments < item.cost) { flashEvent(`Not enough Legacy Points for ${item.name}.`, "bad"); return; }
  state.legacy.fragments -= item.cost;
  state.legacy.unlockedBonuses.push(id);
  flashEvent(`Legacy unlocked: ${item.name}. Future careers have a better chance, not a guarantee.`, "good");
  saveGame();
}

function setTrainingFocus(focus) {
  state.player.trainingFocus = focus;
  flashEvent(`Training focus changed to ${focus}.`, "good");
  saveGame();
  render();
}

function setTacticalRole(role) {
  state.player.tacticalRole = role;
  flashEvent(`Tactical role changed to ${tacticalRoleName(role)}.`, "good");
  saveGame();
  render();
}

function syncPlayerSchema(player = state.player) {
  const d = derivedRatings(player);
  player.overall = Math.round(d.overall);
  player.potential = Math.round(d.potential);
  player.attacking = Math.round(d.attacking);
  player.creativity = Math.round(d.creativity);
  player.defending = Math.round(d.defending);
  player.physical = Math.round(d.physical);
  player.mental = Math.round(d.mental);
}

function renderPlayerCard(player, opts = {}) {
  syncPlayerSchema(player);
  const traits = (player.traits || []).slice(0, 3).map(traitName);
  return `<div class="football-card">
    <div class="card-top"><div><div class="card-grade">${grade(player.overall)}</div><div class="card-pos">${player.position || "ST"} ${player.secondaryPositions?.length ? `• ${player.secondaryPositions.join("/")}` : ""}</div></div><div class="stars">${potentialStars(player.potential)}</div></div>
    <div class="sticker-portrait">◉</div>
    <div class="card-name">${escapeHtml(player.name)}</div>
    <div class="card-meta">Age ${player.age} • ${player.nation} • ${player.birthRegion || "Unknown Region"}<br>${player.academy?.name ? `Academy: ${escapeHtml(player.academy.name)}` : ""}</div>
    ${radarSvg(player)}
    <div class="grade-grid">
      ${gradeRow("ATTACK", player.attacking)}${gradeRow("CREATION", player.creativity)}${gradeRow("DEFENCE", player.defending)}${gradeRow("PHYSICAL", player.physical)}${gradeRow("MENTAL", player.mental)}${gradeRow("FAME", player.visibility || player.fame || 1)}
    </div>
    <div class="pill-row">${traits.length ? traits.map(t => `<span class="pill">${escapeHtml(t)}</span>`).join("") : `<span class="muted">Traits Unknown</span>`}</div>
    ${opts.note ? `<div class="mini-note">${escapeHtml(opts.note)}</div>` : ""}
  </div>`;
}
function potentialStars(value) {
  const filled = clamp(Math.round((value || 50) / 20), 1, 5);
  return "★".repeat(filled) + "☆".repeat(5 - filled);
}
function gradeTone(value) {
  const g = grade(value);
  if (g === "S") return "elite";
  if (g.startsWith("A")) return "great";
  if (g === "D" || g === "F") return "poor";
  return "";
}
function gradeRow(labelText, value) { return `<div class="grade-row"><span>${labelText}</span><div class="grade-bar ${gradeTone(value)}"><i style="width:${clamp(value || 0, 5, 100)}%"></i></div><strong>${grade(value)}</strong></div>`; }
function radarSvg(player) {
  const vals = [player.attacking, player.creativity, player.defending, player.physical, player.mental].map(v => clamp(v || 40, 20, 100));
  const labels = ["ATT", "CRE", "DEF", "PHY", "MEN"];
  const cx = 90, cy = 82, maxR = 58;
  const pts = vals.map((v, i) => {
    const ang = -Math.PI / 2 + i * Math.PI * 2 / vals.length;
    const r = maxR * (v / 100);
    return `${cx + Math.cos(ang) * r},${cy + Math.sin(ang) * r}`;
  }).join(" ");
  const labelEls = labels.map((l, i) => {
    const ang = -Math.PI / 2 + i * Math.PI * 2 / labels.length;
    return `<text x="${cx + Math.cos(ang) * 74}" y="${cy + Math.sin(ang) * 74 + 4}" text-anchor="middle" fill="#9eb0ae" font-size="10" font-weight="800">${l}</text>`;
  }).join("");
  return `<div class="radar-wrap"><svg width="180" height="160" viewBox="0 0 180 160" aria-label="Player radar chart">
    <polygon points="90,24 145,64 124,130 56,130 35,64" fill="none" stroke="#2d393d" />
    <polygon points="90,47 123,70 110,109 70,109 57,70" fill="none" stroke="#2d393d" />
    <polygon points="${pts}" fill="rgba(66,211,146,.28)" stroke="#42d392" stroke-width="2" />
    <circle cx="${cx}" cy="${cy}" r="2" fill="#ffd166" />${labelEls}
  </svg></div>`;
}
function renderManagerCard(manager) {
  return `<div class="football-card">
    <div class="card-top"><div><div class="card-grade">${grade(manager?.elo ? (manager.elo - 1100) / 8 : 60)}</div><div class="card-pos">MANAGER</div></div><div class="muted">${escapeHtml(manager?.playStyle || "Balanced")}</div></div>
    <div class="card-name">${escapeHtml(manager?.name || "Unknown Manager")}</div>
    <div class="card-meta">${escapeHtml(manager?.archetype || "Coach")}</div>
    <div class="grade-grid">${gradeRow("TACTICS", manager?.ratings?.tactical || 55)}${gradeRow("DEVELOP", manager?.ratings?.development || 55)}${gradeRow("DISCIPLINE", manager?.ratings?.discipline || 55)}${gradeRow("MOTIVATE", manager?.ratings?.manManagement || 55)}</div>
  </div>`;
}

function renderClubCard(club) {
  const fac = club.facilitiesProfile || { training: club.facilities || 55, medical: club.facilities || 55, youth: club.youthAcademy || 55, analytics: 50 };
  const facilities = (fac.training + fac.medical + fac.youth + fac.analytics) / 4;
  return `<div class="football-card club-card">
    <div class="card-top"><div><div class="card-grade">${grade(club.stature || club.reputation)}</div><div class="card-pos">${escapeHtml(club.league || club.nation)}</div></div><div class="stars">${potentialStars(club.youthAcademy || 55)}</div></div>
    <div class="card-name">${escapeHtml(club.name)}</div>
    <div class="card-meta">${club.philosophy || "Balanced"} • ${club.financialArchetype || "Balanced"}<br>Manager: ${club.manager?.archetype || "-"} / ${club.manager?.playStyle || "-"}</div>
    <div class="grade-grid">
      ${gradeRow("REP", club.reputation)}${gradeRow("FIN", club.finances)}${gradeRow("FAC", facilities)}${gradeRow("MOR", club.clubMorale || 55)}${gradeRow("YTH", club.youthAcademy || fac.youth)}${gradeRow("BRD", club.board?.ambition || 55)}
    </div>
    <div class="mini-note">${club.fanbase || "Regional"} fanbase • Board: ${(club.board?.goals || []).join(" / ") || club.board?.ambitionText || "Compete"}</div>
  </div>`;
}

function render() {
  if (!state) return;
  const p = state.player;
  syncPlayerSchema(p);
  if (document.getElementById("playerName")) document.getElementById("playerName").textContent = p.name;
  if (document.getElementById("playerSummary")) document.getElementById("playerSummary").textContent = `${p.age} • ${p.nation} • ${currentClub().name} • Gen ${state.legacy.generation}`;
  if (document.getElementById("careerGoals")) document.getElementById("careerGoals").textContent = fmt(p.stats.goals);
  if (document.getElementById("goalProgress")) document.getElementById("goalProgress").style.width = pct(clamp(p.stats.goals / 10, 0, 100));

  renderHome();
  renderMatches();
  renderCareerMobile();
  renderLeagueMobile();
  renderWorldMobile();
}

function renderHome() {
  const p = state.player;
  const club = currentClub();
  document.getElementById("home").innerHTML = `
    <section class="grid two">
      ${renderPlayerCard(p, { note: `${tacticalRoleName(p.tacticalRole)} • ${p.squadStatus || "Youth Prospect"} • ${p.contract?.yearsRemaining ?? p.contractYears} years left` })}
      <div class="card panel grid">
      <div class="kicker">Current Career</div>
      <div class="stat-grid">
        ${stat("Age", p.age)}
        ${stat("Ability", abilityScore())}
        ${stat("Reputation", Math.round(p.reputation))}
        ${stat("Fame", Math.round(p.fame))}
        ${stat("Form", Math.round(p.form))}
        ${stat("Confidence", Math.round(p.confidence))}
        ${stat("Momentum", Math.round(p.confidenceMomentum || p.confidence))}
        ${stat("Visibility", Math.round(p.visibility || 1))}
        ${stat("Fitness", Math.round(p.fitness || 80))}
        ${stat("Fatigue", Math.round(p.fatigue || 0))}
        ${stat("Value", `£${p.value}m`)}
      </div>
      <div class="actions">
        <button class="primary" onclick="simulateBlock()" ${p.retired ? "disabled" : ""}>Simulate Next Block</button>
        <button onclick="restBlock()" ${p.retired ? "disabled" : ""}>Rest / Recover Block</button>
        <button onclick="simulateSeason()" ${p.retired ? "disabled" : ""}>Simulate Season</button>
        <button onclick="saveGame()">Save Now</button>
      </div>
      ${p.retired ? `<div class="log-item major">Career complete. Choose a successor in the Dynasty tab.</div>` : `<p class="muted">Season ${p.season}, block ${state.seasonBlock + 1}/6. A full season is six quick simulation blocks.</p>`}
      </div>
    </section>
    <section class="grid two">
      <div class="card panel">
        <h2>${club.name}</h2>
        <p class="muted">${club.nation} • ${club.league} • Rank #${club.rank} • ${club.philosophy} • ${club.financialArchetype}</p>
        <p class="muted">Manager: ${club.manager.name}, ${club.manager.archetype}, ${club.manager.playStyle}</p>
        <div class="stat-grid">
          ${stat("Stature", Math.round(club.stature || club.reputation))}${stat("Club Elo", club.elo)}${stat("Morale", Math.round(club.clubMorale || 55))}${stat("Harmony", Math.round(club.squadHarmony || 55))}
          ${stat("Fanbase", club.fanbase || "Regional")}${stat("Board", club.board?.ambitionText || "Compete")}${stat("Goals", (club.board?.goals || []).slice(0,2).join(" / ") || "Compete")}${stat("Finances", financeLabel(club.finances))}${stat("Manager Rel", club.manager.relationship)}
        </div>
      </div>
      <div class="card panel">
        <h2>Traits & Rivalries</h2>
        <div class="pill-row">${p.traits.length ? p.traits.map(t => `<span class="pill">${traitName(t)}</span>`).join("") : `<span class="muted">No traits yet. Perform consistently to evolve naturally.</span>`}</div>
        <hr style="border-color:var(--line);border-style:solid none none;margin:1rem 0">
        <div class="log">${state.rivals.slice(0,3).map(r => `<div class="log-item">${r.name}: ${r.type}, heat ${r.heat}, ${r.goals} goals</div>`).join("") || `<p class="muted">No rivals have emerged yet.</p>`}</div>
      </div>
    </section>
    <section class="card panel">
      <h2>Latest Stories</h2>
      <div class="log">${renderLog(state.history.slice(0, 8))}</div>
    </section>`;
}

function renderCareer() {
  const p = state.player;
  document.getElementById("career").innerHTML = `
    <section class="card panel">
      <h2>Birth Environment</h2>
      <p class="muted">Seed ${p.seedCode || state.seed} • ${p.birthRegion || "Unknown Region"}, ${p.nation} • ${p.preferredFoot || "Right"}-footed • ${p.heightCm || "?"}cm • ${p.bodyType || "Balanced"}</p>
      <div class="stat-grid">${stat("Environment", p.environmentScore || 55)}${stat("Hard Road", `${Math.round((p.hardRoadMultiplier || 1) * 100)}% Legacy`)}${stat("Academy", p.academy?.name || "Local Academy")}${stat("Family", p.familyBackground?.name || "Unknown")}</div>
      <p class="muted">${p.familyBackground?.text || "Background creates subtle personality and development nudges."}</p>
    </section>
    <section class="card panel">
      <h2>Contracts, Status & International</h2>
      <div class="stat-grid">${stat("Squad Status", p.squadStatus || "Youth Prospect")}${stat("Role", tacticalRoleName(p.tacticalRole))}${stat("Contract", `${p.contract?.yearsRemaining ?? p.contractYears} yrs`)}${stat("Release", `£${p.contract?.releaseClause || "-"}m`)}${stat("Wage", `£${p.contract?.wage || p.wage}k/w`)}${stat("Sharpness", Math.round(p.sharpness || 50))}${stat("Manager", Math.round(p.relationships?.manager || 55))}${stat("Teammates", Math.round(p.relationships?.teammates || 55))}${stat("Injury", p.injury ? `${p.injury.name}, ${p.injury.weeksRemaining}w` : "Healthy")}${stat("Nation", `${p.nationalTeam?.caps || 0} caps / ${p.nationalTeam?.goals || 0}g`)}</div>
    </section>
    <section class="card panel">
      <h2>Career Statistics</h2>
      <div class="stat-grid">
        ${stat("Matches", p.stats.matches)}${stat("Goals", p.stats.goals)}${stat("Assists", p.stats.assists)}${stat("Avg Rating", avg(p.stats))}
        ${stat("Best Season", p.records.bestSeasonGoals)}${stat("Hat-tricks", p.records.hatTricks)}${stat("Trophies", p.records.trophies)}${stat("Ballon d'Ors", p.records.ballonDors)}
      </div>
    </section>
    <section class="card panel">
      <h2>Current Season</h2>
      <div class="stat-grid">
        ${stat("Matches", p.currentSeason.matches)}${stat("Goals", p.currentSeason.goals)}${stat("Assists", p.currentSeason.assists)}${stat("Avg Rating", avg(p.currentSeason))}
      </div>
    </section>
    <section class="card panel">
      <h2>Awards</h2>
      <div class="pill-row">${p.records.awards.length ? p.records.awards.map(a => `<span class="pill gold">${a}</span>`).join("") : `<span class="muted">No major awards yet.</span>`}</div>
    </section>`;
}

function renderDevelopment() {
  const p = state.player;
  document.getElementById("development").innerHTML = `
    <section class="card panel">
      <h2>Growth Model</h2>
      <div class="stat-grid">${stat("Current Ability", abilityScore())}${stat("S-Curve Target", potentialTarget(p).toFixed(1))}${stat("Estimated PA", Math.round(p.potentialEstimate || p.dna.potentialAbility))}${stat("Peak Age", p.peakAge || 28)}</div>
      <p class="muted">Development now uses an S-curve plus a Bayesian estimate of reachable potential. Injuries and professionalism change the estimate over time.</p>
    </section>
    <section class="grid two">
      <div class="card panel">
        <h2>Attributes</h2>
        <div class="attr-list">${ATTRIBUTES.map(a => attrRow(label(a), p.attributes[a])).join("")}</div>
      </div>
      <div class="card panel">
        <h2>Personality Layer</h2>
        <p class="muted">Talent sets the ceiling. Personality determines whether the player reaches it.</p>
        <div class="attr-list">${["ambition", "professionalism", "loyalty", "temperament", "leadership", "confidence", "adaptability"].map(k => attrRow(label(k), (p.personality?.[k] || 10) * 5)).join("")}</div>
        <div class="pill-row" style="margin-top:.8rem">${(p.personality?.positives || []).map(x => `<span class="pill good">${x}</span>`).join("")}${(p.personality?.negatives || []).map(x => `<span class="pill bad">${x}</span>`).join("")}</div>
      </div>
    </section>
    <section class="grid two">
      <div class="card panel">
        <h2>Current Club Facilities</h2>
        <div class="attr-list">${Object.entries(currentClub().facilitiesProfile || { training: currentClub().facilities, medical: currentClub().facilities, youth: currentClub().youthAcademy, analytics: 50 }).map(([k, v]) => attrRow(label(k), v)).join("")}</div>
      </div>
      <div class="card panel">
        <h2>Hidden DNA</h2>
        <p class="muted">Visible in this framework for testing. Later builds can hide/scout this information.</p>
        <div class="attr-list">${Object.entries(p.dna).map(([k, v]) => attrRow(label(k), v)).join("")}</div>
      </div>
    </section>
    <section class="card panel">
      <h2>Tactical Role</h2>
      <p class="muted">Roles change goal/assist balance, fatigue and manager-system fit. Current fit: ${Math.round(roleFit(p, currentClub()))}/100.</p>
      <div class="actions">${Object.entries(TACTICAL_ROLES).map(([id, role]) => `<button class="${p.tacticalRole === id ? "primary" : ""}" onclick="setTacticalRole('${id}')">${role.name}</button>`).join("")}</div>
    </section>
    <section class="card panel">
      <h2>Training Focus</h2>
      <p class="muted">Focused attributes receive a small growth push each block. Traits are unlocked by performance, not by skill trees.</p>
      <div class="actions">${ATTRIBUTES.map(a => `<button class="${p.trainingFocus === a ? "primary" : ""}" onclick="setTrainingFocus('${a}')">${label(a)}</button>`).join("")}</div>
    </section>
    <section class="card panel">
      <h2>Development Log</h2>
      <div class="log">${p.developmentLog.map(x => `<div class="log-item">${x}</div>`).join("") || `<p class="muted">Development notes will appear after completed seasons.</p>`}</div>
    </section>`;
}

function renderTransfers() {
  const p = state.player;
  document.getElementById("transfers").innerHTML = `
    <section class="card panel">
      <h2>Transfer Market</h2>
      <p class="muted">Transfers are checked in blocks 3 and 6. Contracts, visibility, wage pressure, release clauses and club finances now drive the market.</p>
      <div class="stat-grid">${stat("Contract", `${p.contract?.yearsRemaining ?? p.contractYears} yrs`)}${stat("Wage", `£${p.contract?.wage || p.wage}k/w`)}${stat("Release Clause", `£${p.contract?.releaseClause || "-"}m`)}${stat("Status", p.squadStatus || "Youth Prospect")}${stat("Visibility", Math.round(p.visibility || 1))}${stat("Agent", `${p.agent?.quality || 50}/100`)}${stat("ST Scarcity", `${(state.world.positionScarcity?.ST?.multiplier || 1).toFixed(2)}x`)}${stat("Market Value", `£${dynamicValue(p)}m`)}</div>
    </section>
    <section class="card panel">
      <h2>World Clubs</h2>
      <div class="table-wrap"><table><thead><tr><th>Rank</th><th>Club</th><th>Stature</th><th>Fanbase</th><th>Finance</th><th>Philosophy</th><th>Manager</th></tr></thead><tbody>
      ${state.world.clubs.map(c => `<tr><td>${c.rank}</td><td>${c.id === p.clubId ? "⭐ " : ""}${c.name}</td><td>${Math.round(c.stature || c.reputation)}</td><td>${c.fanbase || "Regional"}</td><td>${financeLabel(c.finances)}</td><td>${c.philosophy || "Balanced"}</td><td>${c.manager.archetype} / ${c.manager.playStyle || "-"}</td></tr>`).join("")}
      </tbody></table></div>
    </section>
    <section class="card panel"><h2>Transfer Log</h2><div class="log">${renderLog(state.transferLog)}</div></section>`;
}

function npcToCardPlayer(npc) {
  const ability = npc.ability || Math.max(35, (npc.potential || 60) - 20);
  const attrs = {
    finishing: ability + (npc.position === "ST" ? 8 : 0), dribbling: ability, positioning: ability, composure: ability,
    firstTouch: ability, passing: ability - 3, vision: ability - 2, flair: ability - 1,
    tackling: npc.position === "DF" ? ability + 8 : ability - 18, marking: npc.position === "DF" ? ability + 8 : ability - 18,
    strength: ability, aggression: ability - 5, pace: ability, acceleration: ability, stamina: ability,
    jumping: ability - 2, balance: ability - 2, leadership: ability - 10, determination: ability
  };
  return {
    id: npc.id,
    name: npc.name,
    age: npc.age,
    nation: npc.nation,
    birthRegion: npc.birthRegion || "Youth Intake",
    academy: { name: state.world.clubs.find(c => c.id === npc.clubId)?.name || "Unknown Academy" },
    position: npc.position,
    secondaryPositions: [],
    attributes: attrs,
    dna: { consistency: ability, potentialAbility: npc.potential },
    potentialEstimate: npc.potential,
    traits: npc.traits || [],
    personality: { positives: npc.potential >= 86 ? ["Wonderkid"] : [], negatives: [] },
    visibility: npc.visibility || 20
  };
}

function renderPlayers() {
  const p = state.player;
  const rivals = (state.rivals || []).map(r => npcToCardPlayer({ id: r.youthId || r.name, name: r.name, age: r.youthId ? 17 : Math.max(18, p.age), nation: "Unknown", position: "ST", potential: 72 + r.heat / 3, ability: 58 + r.heat / 5, visibility: r.heat }));
  const wonderkids = (state.world.youthPool || []).slice(0, 8).map(npcToCardPlayer);
  const legends = (state.legacy.lineage || []).map(l => ({ ...p, name: l.name, age: l.retiredAge, nation: l.nation, stats: { goals: l.goals }, traits: l.traits || [], potentialEstimate: 90, visibility: 95, reputation: 90, personality: { positives: ["Retired Legend"], negatives: [] } }));
  document.getElementById("players").innerHTML = `
    <section class="card panel">
      <h2>Player Cards</h2>
      <p class="muted">A shared card system for your striker, rivals, wonderkids and retired legends. Grades show derived categories so the UI stays readable as attributes expand.</p>
      <div class="card-grid">${renderPlayerCard(p, { note: `Born ${p.birthYear || "?"} • ${p.familyBackground?.name || "Unknown background"}` })}</div>
    </section>
    <section class="card panel"><h2>Wonderkids</h2><div class="card-grid">${wonderkids.length ? wonderkids.map(w => renderPlayerCard(w, { note: `Potential ${Math.round(w.potentialEstimate)} • ${w.academy?.name || "Academy"}` })).join("") : `<p class="muted">Youth cards appear after the first completed season.</p>`}</div></section>
    <section class="card panel"><h2>Rivals</h2><div class="card-grid">${rivals.length ? rivals.map(r => renderPlayerCard(r, { note: "Dynamic rival / storyline player" })).join("") : `<p class="muted">No rivals discovered yet.</p>`}</div></section>
    <section class="card panel"><h2>Retired Legends</h2><div class="card-grid">${legends.length ? legends.map(l => renderPlayerCard(l, { note: (state.legacy.lineage.find(x => x.name === l.name)?.story || `${l.stats.goals} career goals`) })).join("") : `<p class="muted">Dynasty legends will appear here after retirement.</p>`}</div></section>
    <section class="card panel"><h2>Club Cards</h2><div class="card-grid">${state.world.clubs.slice(0, 8).map(renderClubCard).join("")}</div></section>`;
}

function renderHistory() {
  const leagues = state.world.leagues || [];
  document.getElementById("history").innerHTML = `
    <section class="card panel">
      <h2>Persistent World History</h2>
      <p class="muted">The world seed is <strong>${state.seed}</strong>. The same seed reproduces the same starting universe.</p>
      <div class="log">${renderLog(state.history)}</div>
    </section>
    <section class="card panel">
      <h2>Country Difficulty</h2>
      <div class="table-wrap"><table><thead><tr><th>Country</th><th>Infrastructure</th><th>League</th><th>Economy</th><th>Youth</th><th>Prestige</th></tr></thead><tbody>
      ${(state.world.nations || []).map(n => `<tr><td>${n.name}</td><td>${Math.round(n.footballInfrastructure || 55)}</td><td>${Math.round(n.leagueQuality || 55)}</td><td>${Math.round(n.economicStrength || 55)}</td><td>${Math.round(n.youthDevelopment || 55)}</td><td>${Math.round(n.internationalPrestige || 55)}</td></tr>`).join("")}
      </tbody></table></div>
    </section>
    <section class="card panel">
      <h2>League Economies</h2>
      <p class="muted">Revenue, reputation, youth output and continental success move over decades, allowing alternate football histories.</p>
      <div class="table-wrap"><table><thead><tr><th>League</th><th>Elo</th><th>Revenue</th><th>Rep</th><th>Talent</th><th>Continental</th></tr></thead><tbody>
      ${leagues.map(l => `<tr><td>${l.name}<br><span class="muted">${l.identity?.name || "Balanced"}</span></td><td>${l.elo}</td><td>${Math.round(l.revenue)}</td><td>${Math.round(l.reputation)}</td><td>${Math.round(l.talentProduction)}</td><td>${Math.round(l.continentalSuccess)}</td></tr>`).join("")}
      </tbody></table></div>
    </section>
    <section class="grid two">
      <div class="card panel"><h2>World Events</h2><div class="log">${renderLog((state.world.worldEvents || []).map(e => `${e.year}: ${e.text}`).slice(0, 8))}</div></div>
      <div class="card panel"><h2>Top Youth Pipeline</h2><div class="log">${(state.world.youthPool || []).slice(0, 8).map(y => `<div class="log-item">${y.name} • ${y.position} • PA ${y.potential} • ${state.world.clubs.find(c => c.id === y.clubId)?.name || y.nation}</div>`).join("") || `<p class="muted">Youth intakes appear after completed seasons.</p>`}</div></div>
    </section>
    <section class="card panel"><h2>Club Histories</h2><div class="table-wrap"><table><thead><tr><th>Club</th><th>Titles</th><th>Cups</th><th>Record Scorer</th><th>Legends</th></tr></thead><tbody>
      ${state.world.clubs.slice(0, 12).map(c => `<tr><td>${c.name}</td><td>${c.history?.leagueTitles || 0}</td><td>${c.history?.cupWins || 0}</td><td>${c.history?.records?.topScorer?.name || "-"} (${c.history?.records?.topScorer?.goals || 0})</td><td>${(c.history?.legends || []).join(", ") || "-"}</td></tr>`).join("")}
    </tbody></table></div></section>`;
}

function renderDynasty() {
  const p = state.player;
  document.getElementById("dynasty").innerHTML = `
    <section class="card panel">
      <h2>Dynasty</h2>
      <div class="stat-grid">
        ${stat("Generation", state.legacy.generation)}${stat("Fragments", state.legacy.fragments)}${stat("Bloodline Goals", state.legacy.totalGoals + (p.retired ? 0 : p.stats.goals))}${stat("Genetic Memory", state.legacy.geneticMemory ? "Active" : "None")}
      </div>
      <p class="muted">Legacy Fragments are earned on retirement from goals, trophies, records, awards and assists. They strengthen future DNA and starting conditions.</p>
      ${p.retired ? `<div class="actions"><button class="primary" onclick="startSuccessor('child')">Choose Child</button><button onclick="startSuccessor('academy')">Choose Academy Wonderkid</button><button onclick="startSuccessor('regen')">Choose Regenerated Successor</button></div>` : `<div class="log-item">Retire to convert this career into Legacy Fragments. Projected fragments: ${calculateFragments()}.</div>`}
    </section>
    <section class="card panel">
      <h2>Lineage</h2>
      <div class="table-wrap"><table><thead><tr><th>Player</th><th>Nation</th><th>Goals</th><th>Assists</th><th>Trophies</th><th>Ballon d'Ors</th><th>Traits</th></tr></thead><tbody>
      ${state.legacy.lineage.map(l => `<tr><td>${l.name}${l.story ? `<br><span class="muted">${escapeHtml(l.story)}</span>` : ""}</td><td>${l.nation}</td><td>${l.goals}</td><td>${l.assists}</td><td>${l.trophies}</td><td>${l.ballonDors}</td><td>${l.traits.map(traitName).join(", ") || "-"}</td></tr>`).join("") || `<tr><td colspan="7" class="muted">No retired ancestors yet.</td></tr>`}
      </tbody></table></div>
    </section>`;
}

function formLabel(p) {
  if ((p.form || 50) >= 78) return "HOT 🔥";
  if ((p.form || 50) >= 62) return "GOOD";
  if ((p.form || 50) >= 42) return "OK";
  return "COLD ❄️";
}
function chronicleHeadlines() {
  const p = state.player;
  const h = [];
  if (p.stats.goals >= 1000) h.push(`${p.name} reaches immortality`);
  else if (p.stats.goals >= 300) h.push(`${p.name} hits ${Math.floor(p.stats.goals / 50) * 50}`);
  else h.push(`${p.name} chases 1000`);
  if (state.lastBlockMatches?.[0]) {
    const m = state.lastBlockMatches[0];
    h.push(`${m.outcome} ${m.score} vs ${m.opponent}`);
  }
  h.push(...(state.storyBeats || []).slice(0, 3).map(x => x.text));
  return h.filter(Boolean).slice(0, 4);
}
function renderChronicle() {
  const h = chronicleHeadlines();
  return `<section class="newspaper"><div class="newspaper-title">FOOTBALL CHRONICLE</div><div class="newspaper-main">${escapeHtml(h[0] || "Project 1000 Begins")}</div><div class="ticker">${h.slice(1).map(x => `<span>${escapeHtml(x)}</span>`).join(" • ")}</div></section>`;
}
function renderDecisionPanel() {
  const d = state.pendingDecision;
  if (!d) return "";
  const clubs = state.world.clubs;
  return `<section class="card panel decision-panel">
    <div class="kicker">Player Decision</div>
    <h2>${escapeHtml(d.title || "Decision")}</h2>
    <p>${escapeHtml(d.text || "Your agent is waiting for an answer.")}</p>
    ${d.currentOffer ? `<div class="match-card"><div class="match-head"><span>${escapeHtml(currentClub().name)} Contract</span><span>${d.currentOffer.squadStatus}</span></div><div class="card-meta">${d.currentOffer.years} years • £${d.currentOffer.wage}k/week • clause £${d.currentOffer.releaseClause}m</div><div class="actions"><button class="primary" onclick="acceptContractOffer()">Accept</button><button onclick="counterContractOffer()">Counter</button><button onclick="rejectContractOffer()">Reject</button></div></div>` : ""}
    <div class="match-list">${(d.interested || []).map(i => {
      const c = clubs.find(x => x.id === i.clubId);
      const accepted = d.acceptedTransfer?.clubId === i.clubId;
      return `<div class="match-card"><div class="match-head"><span>${escapeHtml(c?.name || "Unknown Club")}</span><span>${i.interest}</span></div><div class="card-meta">Role: ${i.role} • Starts: ${i.expectedStarts} • Wage: £${i.wage}k • ${i.statusText}</div>${i.status ? `<p>${escapeHtml(i.status)}</p>` : ""}<div class="actions">${accepted ? `<button class="primary" onclick="acceptTransferOffer('${i.clubId}')">Accept Move</button>` : `<button onclick="requestClubBid('${i.clubId}')">Ask Agent To Negotiate</button>`}<button onclick="rejectClubInterest('${i.clubId}')">Reject</button></div></div>`;
    }).join("")}</div>
    <button class="secondary" onclick="clearDecision('The transfer window talks are parked for now.')">Decide Later</button>
  </section>`;
}

function nextFixture() {
  const club = currentClub();
  const opponents = state.world.clubs.filter(c => c.id !== club.id);
  const idx = (state.rngCounter + state.seasonBlock) % opponents.length;
  return opponents[idx]?.name || "Unknown FC";
}

function renderHome() {
  const p = state.player;
  const club = currentClub();
  const d = derivedRatings(p);
  document.getElementById("home").innerHTML = `
    ${renderChronicle()}
    <section class="card hero-goals">
      <div class="label">Career Goals</div>
      <div class="num">${fmt(p.stats.goals)} <span class="muted" style="font-size:1.2rem">/ 1000</span></div>
      <div class="progress"><div style="width:${pct(clamp(p.stats.goals / 10, 0, 100))}"></div></div>
    </section>
    <section class="quick-grid">
      <div class="quick-stat"><strong>${p.age}</strong><span>Age</span></div>
      <div class="quick-stat"><strong>${p.position}</strong><span>Position</span></div>
      <div class="quick-stat"><strong>${grade(d.overall)}</strong><span>Overall</span></div>
      <div class="quick-stat"><strong>${p.currentSeason.goals}</strong><span>Season Goals</span></div>
      <div class="quick-stat"><strong>${ordinal(playerLeaguePosition())}</strong><span>League Pos</span></div>
      <div class="quick-stat"><strong>${formLabel(p)}</strong><span>Form</span></div>
    </section>
    <section class="card panel">
      <div class="kicker">Current Club</div>
      <h2>${club.name}</h2>
      <p class="muted">${club.manager?.playStyle || "Balanced"} • ${tacticalRoleName(p.tacticalRole)} • ${p.squadStatus}</p>
      <div class="fixture"><span>Next Fixture</span><strong>vs ${nextFixture()}</strong></div>
    </section>
    <section class="card panel">
      <div class="kicker">Season Story</div>
      <p>${escapeHtml(state.storyBeats?.[0]?.text || "The season is waiting for its first headline.")}</p>
    </section>
    ${renderDecisionPanel()}
    <section class="home-actions">
      ${p.retired ? `<button class="primary sim-button" onclick="startNewCareer('regen')">▶ START NEW CAREER</button>` : state.pendingDecision ? `<button class="primary sim-button" disabled>DECISION NEEDED</button>` : `<button class="primary sim-button" onclick="simulateBlock()">▶ SIM NEXT BLOCK</button><button class="secondary sim-button" onclick="restBlock()">REST / RECOVER</button>`}
    </section>
  `;
}

function renderMatches() {
  const matches = state.lastBlockMatches?.length ? state.lastBlockMatches : state.matchStories || [];
  document.getElementById("matches").innerHTML = `
    <section class="card panel">
      <h2>Matches</h2>
      <p class="muted">Season ${state.player.season}, block ${state.seasonBlock + 1}/6. Sim a block to see every fixture.</p>
      ${state.pendingDecision ? `<button class="primary sim-button" disabled>DECISION NEEDED</button>` : `<button class="primary sim-button" onclick="simulateBlock()">▶ SIM BLOCK</button>`}
    </section>
    ${renderDecisionPanel()}
    <section class="card panel"><h2>Season Story</h2><div class="log">${(state.storyBeats || []).slice(0, 4).map(s => `<div class="log-item ${s.type || ""}">${escapeHtml(s.text)}</div>`).join("") || `<p class="muted">No story beats yet.</p>`}</div></section>
    <section class="match-list">
      ${matches.slice(0, 8).map(m => `<div class="match-card">
        <div class="match-head"><span>MD ${m.matchday || "-"}: ${m.outcome} ${m.score} vs ${escapeHtml(m.opponent)}</span><span>${m.competition}</span></div>
        <div class="card-meta">Rating ${m.rating}${m.rested ? " • Rested" : ""}</div>
        <div class="events">${m.events?.length ? m.events.join(" &nbsp; ") : "No goal contribution"}</div>
      </div>`).join("") || `<div class="match-card muted">No matches yet. Tap SIM BLOCK.</div>`}
    </section>
  `;
}

function renderCareerMobile() {
  const p = state.player;
  document.getElementById("career").innerHTML = `
    ${renderPlayerCard(p, { note: `${p.preferredFoot}-footed • ${p.heightCm}cm • ${p.bodyType}` })}
    <section class="card panel">
      <h2>Career Summary</h2>
      <div class="quick-grid">
        <div class="quick-stat"><strong>${p.stats.goals}</strong><span>Goals</span></div>
        <div class="quick-stat"><strong>${p.stats.assists}</strong><span>Assists</span></div>
        <div class="quick-stat"><strong>${p.records.trophies}</strong><span>Trophies</span></div>
        <div class="quick-stat"><strong>${p.records.ballonDors}</strong><span>Ballon d'Ors</span></div>
        <div class="quick-stat"><strong>${p.nationalTeam?.caps || 0}</strong><span>Caps</span></div>
        <div class="quick-stat"><strong>${p.records.bestSeasonGoals}</strong><span>Best Season</span></div>
      </div>
    </section>
    <section class="card panel">
      <h2>Career Timeline</h2>
      <div class="log">${(state.careerTimeline || []).slice(0, 12).map(t => `<div class="log-item"><strong>${t.year}</strong> — ${escapeHtml(t.title)}<br><span class="muted">${escapeHtml(t.text)}</span></div>`).join("") || `<p class="muted">The career story starts here.</p>`}</div>
    </section>
    <section class="card panel">
      <h2>Personality</h2>
      <div class="grade-grid">
        ${gradeRow("PRO", (p.personality?.professionalism || 10) * 5)}${gradeRow("AMB", (p.personality?.ambition || 10) * 5)}${gradeRow("LOY", (p.personality?.loyalty || 10) * 5)}${gradeRow("TMP", (21 - (p.personality?.temperament || 10)) * 5)}
      </div>
      <div class="pill-row">${(p.personality?.positives || []).concat(p.personality?.negatives || []).map(x => `<span class="pill">${escapeHtml(x)}</span>`).join("")}</div>
    </section>
    <section class="card panel">
      <h2>Career State</h2>
      <div class="quick-grid">
        <div class="quick-stat"><strong>${Math.round(p.fitness || 80)}</strong><span>Fitness</span></div>
        <div class="quick-stat"><strong>${Math.round(p.fatigue || 0)}</strong><span>Fatigue</span></div>
        <div class="quick-stat"><strong>${Math.round(p.visibility || 1)}</strong><span>Fame</span></div>
      </div>
      <p class="muted">${p.injury ? `Injured: ${p.injury.name}, ${p.injury.weeksRemaining} weeks left` : "Healthy"} • Contract ${p.contract?.yearsRemaining ?? p.contractYears} yrs • £${p.contract?.wage || p.wage}k/w</p>
    </section>
  `;
}

function renderLeagueMobile() {
  const table = leagueTable();
  const playerClubId = state.player.clubId;
  document.getElementById("league").innerHTML = `
    ${renderClubCard(currentClub())}
    <section class="card panel">
      <h2>League Table</h2>
      <p class="muted">Season ${state.player.season}. Position: ${ordinal(playerLeaguePosition())}. Now every block has league context.</p>
      <div class="table-wrap"><table><thead><tr><th>Pos</th><th>Team</th><th>P</th><th>GD</th><th>PTS</th></tr></thead><tbody>
        ${table.slice(0, 16).map((r, idx) => `<tr class="${r.club.id === playerClubId ? "good" : ""}"><td>${idx + 1}</td><td>${r.club.id === playerClubId ? "★ " : ""}${escapeHtml(r.club.name)}</td><td>${r.played}</td><td>${r.gf - r.ga}</td><td><strong>${r.pts}</strong></td></tr>`).join("")}
      </tbody></table></div>
    </section>
    <section class="card panel">
      <h2>Club Mood</h2>
      <div class="quick-grid"><div class="quick-stat"><strong>${grade(currentClub().clubMorale)}</strong><span>Morale</span></div><div class="quick-stat"><strong>${grade(currentClub().finances)}</strong><span>Money</span></div><div class="quick-stat"><strong>${grade(currentClub().youthAcademy)}</strong><span>Youth</span></div></div>
      <p class="muted">Board wants: ${(currentClub().board?.goals || []).join(" / ") || currentClub().board?.ambitionText}</p>
    </section>
  `;
}

function renderWorldMobile() {
  const headlines = [
    ...(state.storyBeats || []).slice(0, 6).map(h => h.text),
    ...(state.history || []).slice(0, 6).map(h => typeof h === "string" ? h : h.text),
    ...(state.world.worldEvents || []).slice(0, 4).map(e => e.text)
  ].filter(Boolean).slice(0, 12);
  document.getElementById("world").innerHTML = `
    <section class="card panel"><h2>Headlines</h2><div class="log">${headlines.map(h => `<div class="headline">${escapeHtml(h)}</div>`).join("") || `<p class="muted">No headlines yet.</p>`}</div></section>
    <section class="card panel"><h2>Wonderkids</h2><div class="card-grid">${(state.world.youthPool || []).slice(0, 4).map(y => renderPlayerCard(npcToCardPlayer(y), { note: `${state.world.clubs.find(c => c.id === y.clubId)?.name || y.nation}` })).join("")}</div></section>
    <section class="card panel"><h2>Rivals</h2><div class="match-list">${(state.rivals || []).slice(0, 5).map(r => `<div class="match-card"><div class="match-head"><span>${escapeHtml(r.name)}</span><span>${r.type}</span></div><div class="card-meta">Heat ${grade(r.heat)} • ${r.goals} goals</div></div>`).join("") || `<p class="muted">No rivals yet.</p>`}</div></section>
    <section class="card panel"><h2>Legacy Shop</h2><p class="muted">Legacy Points: ${state.legacy.fragments}. Upgrades improve odds, never guarantee starts.</p><div class="match-list">${LEGACY_SHOP.map(item => `<div class="match-card"><div class="match-head"><span>${item.name}</span><span>${state.legacy.unlockedBonuses?.includes(item.id) ? "OWNED" : item.cost + " LP"}</span></div><div class="card-meta">${item.text}</div>${state.legacy.unlockedBonuses?.includes(item.id) ? "" : `<button onclick="purchaseLegacyUpgrade('${item.id}')">Buy</button>`}</div>`).join("")}</div></section>
    <section class="card panel"><h2>Career Archive</h2><div class="match-list">${(state.legacy.lineage || []).map((l, i) => `<div class="match-card"><div class="match-head"><span>Career #${i + 1}: ${escapeHtml(l.name)}</span><span>${l.goals} goals</span></div><div class="card-meta">${escapeHtml(l.story || `${l.trophies} trophies • ${l.ballonDors} Ballon d'Ors`)}</div></div>`).join("") || `<p class="muted">Completed careers will be stored here.</p>`}</div></section>
  `;
}

function financeLabel(value) {
  if (value >= 85) return "Elite";
  if (value >= 68) return "Strong";
  if (value >= 45) return "Average";
  if (value >= 25) return "Tight";
  return "Trouble";
}
function stat(labelText, value) { return `<div class="stat"><strong>${value}</strong><span>${labelText}</span></div>`; }
function attrRow(name, value) { return `<div class="attr-row"><span>${name}</span><div class="bar"><div style="width:${clamp(value, 0, 99)}%"></div></div><strong>${Math.round(value)}</strong></div>`; }
function label(s) { return s.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase()); }
function avg(stats) { return stats.matches ? (stats.ratingTotal / stats.matches).toFixed(2) : "-"; }
function renderLog(items) {
  return items.length ? items.map(item => {
    const text = typeof item === "string" ? item : item.text;
    const cls = typeof item === "string" ? "" : item.type;
    return `<div class="log-item ${cls || ""}">${escapeHtml(text)}</div>`;
  }).join("") : `<p class="muted">No entries yet.</p>`;
}
function escapeHtml(str) {
  return String(str).replace(/[&<>'"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[ch]));
}

function restBlock() {
  if (!state || state.player.retired || state.pendingDecision) return;
  const rng = getRng();
  const p = state.player;
  const club = currentClub();
  const matches = rngInt(rng, 5, 8);
  let teamGoals = 0, against = 0;
  const opponents = state.world.clubs.filter(c => c.id !== club.id);
  recoverInjuryBlock(p, rng);
  const blockMatches = [];
  for (let i = 0; i < matches; i++) {
    const opponent = pick(rng, opponents);
    const result = simulateTeamOnlyMatch(rng, club, opponent);
    teamGoals += result.teamGoals;
    against += result.against;
    updateElo(club, opponent, result.teamGoals, result.against);
    recordLeagueMatch(club, opponent, result.teamGoals, result.against);
    blockMatches.push(makeMatchStory(club, opponent, result, false, true));
  }
  state.lastBlockMatches = blockMatches;
  state.matchStories = [...blockMatches, ...(state.matchStories || [])].slice(0, 80);
  simulateBackgroundLeague(rng, 14);
  p.fitness = clamp(p.fitness + 16 + (club.facilitiesProfile?.medical || 55) / 12, 20, 100);
  p.fatigue = clamp(p.fatigue - 28, 0, 100);
  p.sharpness = clamp(p.sharpness - 8, 1, 100);
  p.form = clamp(p.form - 2, 1, 99);
  addHistory(`${p.name} is rested for a block. Fitness rises to ${Math.round(p.fitness)}, fatigue drops to ${Math.round(p.fatigue)}. Club GD without him: ${teamGoals}-${against}.`, "");
  state.seasonBlock += 1;
  if (state.seasonBlock >= 6) endSeason(rng);
  saveGame();
  switchTab("matches", false);
  render();
}

function simulateSeason() {
  if (!state || state.player.retired) return;
  const remaining = 6 - state.seasonBlock;
  for (let i = 0; i < remaining && !state.player.retired; i++) simulateBlock();
}
function flashEvent(text, type = "") {
  if (!state) return;
  addHistory(text, type);
  render();
}
function saveGame() {
  if (!state) return;
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}
function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? migrateSave(JSON.parse(raw)) : null;
  }
  catch { return null; }
}

function migrateV1ToV2(save) {
  save.version = 2;
  save.history ||= [];
  save.transferLog ||= [];
  save.rivals ||= [];
  return save;
}

function migrateV2ToV3(save) {
  save.version = 3;
  return save;
}
function migrateV3ToV4(save) {
  save.version = 4;
  save.storyBeats ||= [];
  save.matchStories ||= [];
  save.lastBlockMatches ||= [];
  save.legacy ||= {};
  save.legacy.unlockedBonuses ||= [];
  return save;
}

function migrateSave(save) {
  if (!save?.player || !save?.world) return null;
  if (!save.version || save.version === 1) save = migrateV1ToV2(save);
  if (save.version === 2) save = migrateV2ToV3(save);
  if (save.version === 3) save = migrateV3ToV4(save);
  const rng = mulberry32(save.seed || 1);
  if (!save.world.leagues || !save.world.positionScarcity) {
    const freshWorld = generateWorld(save.seed || 1, rng);
    save.world.leagues = freshWorld.leagues;
    save.world.positionScarcity = freshWorld.positionScarcity;
    save.world.nations = save.world.nations || freshWorld.nations;
  }
  save.world.youthPool ||= [];
  if (!save.world.youthPool.length && save.world.clubs?.length) save.world.youthPool = generateInitialYouthPool(rng, save.world.clubs);
  save.world.worldEvents ||= [];
  save.world.leagues?.forEach(l => { l.identity ||= LEAGUE_IDENTITIES[0]; });
  save.world.nations ||= NATIONS.map(n => ({ name: n }));
  save.world.nations.forEach(n => {
    const league = save.world.leagues?.find(l => l.nation === n.name);
    n.footballInfrastructure ||= clamp(Math.round((league?.reputation || n.strength || 55) * .8), 20, 99);
    n.leagueQuality ||= Math.round(league?.reputation || n.strength || 55);
    n.economicStrength ||= Math.round(league?.revenue || 55);
    n.youthDevelopment ||= Math.round(league?.talentProduction || 55);
    n.internationalPrestige ||= Math.round(n.strength || 55);
    n.elo ||= rngInt(rng, 1320, 1880);
  });
  save.world.clubs?.forEach((club, idx) => {
    club.elo ||= Math.round(1180 + (club.reputation || 60) * 8);
    club.attackElo ||= club.elo + 20;
    club.defenceElo ||= club.elo - 10;
    club.league ||= save.world.leagues[idx % save.world.leagues.length]?.name;
    club.stature ||= clamp(Math.round((club.reputation || 60) * .72 + (club.elo - 1200) / 24), 1, 100);
    club.financialArchetype ||= chooseFinancialArchetype(rng, club.stature, club.reputation || 60);
    club.facilitiesProfile ||= { training: club.facilities || 55, medical: club.facilities || 55, youth: club.youthAcademy || 55, analytics: 50 };
    club.facilities ||= club.facilitiesProfile.training;
    club.youthAcademy ||= club.facilitiesProfile.youth;
    club.fanbase ||= fanbaseTier(club.stature, rng);
    club.fanLoyalty ||= rngInt(rng, 45, 90);
    club.stadiumSize ||= Math.round((club.stature * 650 + 10000) / 1000) * 1000;
    club.clubMorale ||= 55;
    club.squadHarmony ||= 55;
    club.board ||= generateBoard(rng, club.stature);
    club.board.goals ||= generateBoard(rng, club.stature).goals;
    club.board.expectationProgress ||= {};
    club.philosophy ||= pick(rng, CLUB_PHILOSOPHIES);
    club.financeBalance ||= 0;
    club.wageBill ||= Math.round((club.reputation || 60) * 2.4);
    club.recentSuccess ||= 50;
    club.history ||= { leagueTitles: 0, cupWins: 0, legends: [], managers: [], records: { topScorer: { name: "Unknown", goals: 120 } } };
    club.manager ||= generateManager(rng, club.reputation || 60, club.stature || 60);
    club.manager.ratings ||= generateManager(rng, club.reputation || 60, club.stature || 60).ratings;
    club.manager.playStyle ||= club.manager.archetype === "Striker Whisperer" ? "Striker Focused" : pick(rng, MANAGER_PLAY_STYLES);
    club.manager.elo ||= 1500;
  });
  rerankClubsFor(save.world.clubs);
  const p = save.player;
  p.id ||= `player_${save.seed || 1}`;
  p.birthYear ||= (save.currentYear || 2026) - (p.age || 16);
  p.seedCode ||= seedCode(save.seed || 1, rng);
  p.position ||= "ST";
  p.secondaryPositions ||= ["AM"];
  p.birthRegion ||= pick(rng, REGIONS);
  p.familyBackground ||= pick(rng, FAMILY_BACKGROUNDS);
  p.academy ||= { training: 55, medical: 55, coaching: 55, reputation: 55 };
  p.environmentScore ||= 55;
  p.hardRoadMultiplier ||= 1;
  p.personality ||= generatePersonality(rng, { family: p.familyBackground });
  p.attributes ||= {};
  ATTRIBUTES.forEach(attr => { p.attributes[attr] ??= attr === "tackling" || attr === "marking" ? 35 : attr === "vision" || attr === "firstTouch" || attr === "flair" ? (p.attributes.passing || 55) : attr === "acceleration" ? (p.attributes.pace || 55) : attr === "jumping" ? (p.attributes.heading || 55) : attr === "balance" ? (p.attributes.dribbling || 55) : attr === "determination" ? (p.dna?.professionalism || 55) : attr === "aggression" ? 50 : 55; });
  p.preferredFoot ||= "Right";
  p.heightCm ||= rngInt(rng, 172, 193);
  p.bodyType ||= "Balanced";
  p.tacticalRole ||= "complete";
  p.squadStatus ||= squadStatusFor(p, save.world.clubs.find(c => c.id === p.clubId) || save.world.clubs[0]);
  p.contract ||= { wage: p.wage || 2, yearsRemaining: p.contractYears || 2, releaseClause: Math.round((p.value || 5) * 2.5), squadStatus: p.squadStatus, bonuses: { goalBonus: 1, trophyBonus: 5 } };
  p.contractYears = p.contract.yearsRemaining;
  p.wage = p.contract.wage;
  p.fitness ||= 90;
  p.sharpness ||= 50;
  p.fatigue ||= 5;
  p.visibility ||= 25;
  p.agent ||= { name: "Local Agent", quality: 45, relationship: 55 };
  p.relationships ||= { manager: 55, teammates: 55, agent: 55, rivals: 20 };
  p.nationalTeam ||= { caps: 0, goals: 0, status: "Uncapped" };
  p.injury ||= null;
  p.injuryHistory ||= [];
  p.clubGoals ||= { [p.clubId]: p.stats?.goals || 0 };
  p.peakAge ||= 28;
  p.potentialEstimate ||= p.dna?.potentialAbility || 82;
  p.developmentBelief ||= 0.62;
  p.expectedGoalBaseline ||= 14;
  p.traitProgress ||= {};
  p.confidenceMomentum ||= p.confidence || 55;
  p.recentMatches ||= [];
  save.legacy ||= { generation: 1, fragments: 0, totalGoals: 0, bestCareerGoals: 0, unlockedBonuses: [], geneticMemory: null, lineage: [] };
  save.legacy.geneticMemory ||= null;
  save.rivals ||= [];
  save.storyBeats ||= [];
  save.careerTimeline ||= [{ year: save.currentYear || 2026, title: "Career Continues", text: `${save.player.name}'s story is picked up from an older save.` }];
  save.pendingDecision ||= null;
  save.leagueStats ||= createLeagueStats(save.world.clubs || []);
  save.transferWindowOpen ||= false;
  save.transferLog ||= [];
  save.matchStories ||= [];
  save.lastBlockMatches ||= [];
  save.history ||= [];
  save.rngCounter ||= 0;
  return save;
}

function rerankClubsFor(clubs) {
  clubs.sort((a, b) => (b.elo || b.reputation) - (a.elo || a.reputation));
  clubs.forEach((c, idx) => c.rank = idx + 1);
}

window.simulateBlock = simulateBlock;
window.restBlock = restBlock;
window.simulateSeason = simulateSeason;
window.setTrainingFocus = setTrainingFocus;
window.setTacticalRole = setTacticalRole;
window.startSuccessor = startSuccessor;
window.startNewCareer = startNewCareer;
window.purchaseLegacyUpgrade = purchaseLegacyUpgrade;
window.acceptContractOffer = acceptContractOffer;
window.counterContractOffer = counterContractOffer;
window.rejectContractOffer = rejectContractOffer;
window.requestClubBid = requestClubBid;
window.acceptTransferOffer = acceptTransferOffer;
window.rejectClubInterest = rejectClubInterest;
window.clearDecision = clearDecision;
window.saveGame = saveGame;

document.addEventListener("DOMContentLoaded", init);
