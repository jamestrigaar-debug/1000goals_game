# Project 1000: Striker's Legacy

Initial lightweight browser framework for a football career and dynasty simulator.

## Run

Open `index.html` in any modern browser. No server, build step, package manager, or internet connection is required.

## Implemented in this framework

- Mobile-first single-screen layout with bottom navigation: Home, Matches, Player, Club, World
- Retro scouting-report presentation inspired by old football annuals, Panini stickers and early management sims
- Card-based UI for players, clubs and managers with letter grades, muted colours, potential stars, category bars and radar charts
- Newspaper layer with a changing Football Chronicle headline/ticker
- Polished small-screen UI with wrapping cards, safe-area bottom navigation and sticky home actions
- Season Story beats that turn each block into narrative headlines, pressure, rumours and momentum shifts
- Seeded world generation for clubs, nations, leagues, managers, boards and competitions
- Club Identity System: stature, fanbase, morale, harmony, board ambition, philosophy and financial archetype
- Facilities split into training, medical, youth and analytics departments
- Club finance model with revenue, wages, facilities/youth costs, player sales and financial trouble
- Dynamic manager profiles with ratings, traits, play styles and a moving manager market
- Board expectations with goals such as avoiding relegation, qualifying for Europe, winning leagues, developing youth and reducing wage bills
- Contract pressure: wages, years remaining, release clauses, squad status and bonuses drive transfer logic
- Scouting and visibility: league reputation, club stature, agent quality, international caps and performances determine who notices the player
- Fitness, sharpness and fatigue create pressure from heavy match loads and high-press systems, including an optional rest/recovery block decision
- Deeper injuries: minor, moderate, major and rare career-altering injuries with recovery time and possible attribute damage
- Tactical striker roles: Poacher, Target Man, Pressing Forward, False Nine and Complete Forward
- Birth Environment System: country, region, academy, family background, opportunity vs development and hard-road multiplier
- Starting difficulty presets: Prodigy, Normal, Underdog and Impossible
- Seed-layer player identity: name, nationality, region, foot, height, body type, talent and personality
- Formalized player schema with id, birth year, primary/secondary positions, derived overall/potential and category ratings
- Teen striker creation with visible attributes, personality layer and hidden DNA values
- Six-block career simulation loop with one-tap block simulation
- Match-story output showing every fixture in the block, rating, goals, assists and big moments
- Poisson/xG scoreline generation using club attack vs opponent defence
- Markov-chain match flow: possession, build-up, final third, chance, shot and goal
- Weighted player influence from ability, form, confidence, momentum and traits
- Elo ratings for clubs, managers, nations and leagues
- S-curve potential growth with natural peak and decline years
- Bayesian potential estimate affected by injuries, professionalism and performance
- Regression toward expected performance to reduce permanent miracle seasons
- Training focus system
- Probability-based trait discovery from repeated behaviours
- Rival generation
- Reputation, fame, form, confidence, hidden confidence momentum, morale and value
- Dynamic transfer valuation with age, ability, potential, contract, form, reputation and scarcity
- Scarcity mathematics for generated player positions
- Transfer interest and transfer saga log
- League identity model with different tempo, physicality, technical bias, youth development and money profiles
- League economy model with revenue, reputation, talent production and continental success
- Youth pipeline with annual youth intakes, wonderkids and future rivals
- Club histories tracking titles, cups, legends and scoring records
- National-team selection affected by nation strength, visibility and player quality
- Dynamic world shocks including financial collapse, league expansion, rule changes and golden generations
- Records, awards and trophies
- Retirement and Legacy Point conversion with generated legacy stories
- Legacy Shop upgrades that improve starting odds without guaranteeing perfect rolls
- Career Archive replacing the old family-tree framing
- Legacy tendencies can still influence future starts while each career remains a self-contained run
- Local save/load using `localStorage`

## Notes

This is an MVP framework rather than a complete balanced game. The simulation constants are intentionally easy to find in `app.js` so the match engine, transfer market and progression can be tuned quickly.
