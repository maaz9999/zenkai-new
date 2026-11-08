import media from './mediaManifest.json';

const edits = [
  ['4T.mp4', '4T / 4THRIVES', 'PMGC team concept: a cinematic introduction built around team identity.', 'PMGC Concept'],
  ['AK GOLD.mp4', 'AK GOLD', 'PMGC team concept: a bold team introduction for the world stage.', 'PMGC Concept'],
  ['7th evo title.mp4', 'THE SEVENTH EVO TITLE', 'A championship story shaped around the moment of victory.', 'Esports Story'],
  ['8th evo title.mp4', 'THE EIGHTH EVO TITLE', 'A title-winning moment turned into a cinematic esports edit.', 'Esports Story'],
  ['arslan - praise the lord.mp4', 'ARSLAN / PRAISE THE LORD', 'An athlete-led montage with music-driven pacing.', 'Player Spotlight'],
  ['atif 4 raws.mp4', 'ATIF / PLAYER EDIT', 'A player-focused cut with competitive energy.', 'Player Spotlight'],
  ['ewc day 2.mp4', 'EWC / DAY TWO', 'Tournament moments cut into a focused event recap.', 'Event Recap'],
  ['ewc day1.mp4', 'EWC / DAY ONE', 'An opening-day edit bringing the atmosphere of competition to the feed.', 'Event Recap'],
  ['face of pakistani tekken.mp4', 'THE FACE OF PAKISTANI TEKKEN', 'An identity-led esports story with a cinematic finish.', 'Player Story'],
  ['gamer8.mp4', 'GAMERS8 / EVENT EDIT', 'A tournament edit bringing players, competition and atmosphere together.', 'Esports Hype'],
  ['Pak vs Korea.mp4', 'PAKISTAN VS KOREA', 'A rivalry-driven edit built for the fighting game community.', 'Rivalry Edit'],
  ['united in grief.mp4', 'UNITED IN GRIEF', 'An extended cinematic edit with music-led storytelling.', 'Cinematic Edit'],
  ['zubair.mp4', 'ZUBAIR / PLAYER EDIT', 'A dedicated player montage with a distinct visual rhythm.', 'Player Spotlight'],
];

export const leoReels = edits.map(([source, title, subtitle, category]) => ({
  ...media.leo[source],
  source,
  title,
  subtitle,
  category,
  aspect: media.leo[source].orientation === 'landscape' ? 'aspect-[16/9]' : 'aspect-[9/16]',
}));

export const pmgcTeamSamples = leoReels.slice(0, 2);
export const pmgcStyleSamples = [
  { source: '8th evo title.mp4', angle: 'Make the achievement matter', description: 'A reference for qualification stories, championship announcements and the moments your fans remember.' },
  { source: 'ewc day 2.mp4', angle: 'Keep the tournament moving', description: 'A reference for matchday recaps and turning event footage into a consistent social story.' },
  { source: 'arslan - praise the lord.mp4', angle: 'Give your players a spotlight', description: 'A reference for player introductions, personality-led edits and building anticipation around your roster.' },
].map((sample) => ({ ...leoReels.find((reel) => reel.source === sample.source), ...sample }));
