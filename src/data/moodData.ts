import type { MoodQuadrantInfo, MoodQuadrantName } from '../types';

const MOOD_DATA: Record<MoodQuadrantName, MoodQuadrantInfo> = {
  Euphoric: {
    label: 'Euphoric',
    description:
      "You're radiating pure joy and unstoppable energy! The world is your stage — embrace this incredible high.",
    gradientStart: '#a855f7',
    gradientEnd: '#ec4899',
    playlists: [
      {
        name: 'Pure Euphoria',
        genres: ['Pop', 'Dance', 'Electronic'],
        vibeDescription: 'An explosive mix of chart-topping bangers to match your peak energy',
        spotifySearchUrl: 'https://open.spotify.com/search/pure%20euphoria%20dance%20pop',
      },
      {
        name: 'Happy Hits',
        genres: ['Pop', 'Indie Pop'],
        vibeDescription: 'Sunshine in song form — every track is a dopamine hit',
        spotifySearchUrl: 'https://open.spotify.com/search/happy%20hits%20feel%20good%20pop',
      },
      {
        name: 'Dancefloor Royalty',
        genres: ['Dance', 'House', 'EDM'],
        vibeDescription: 'High-octane club anthems that demand you move your body',
        spotifySearchUrl: 'https://open.spotify.com/search/dancefloor%20royalty%20house%20edm',
      },
      {
        name: 'Pop Perfection',
        genres: ['Pop', 'Synth-pop'],
        vibeDescription: 'Polished, feel-good pop that captures lightning in a bottle',
        spotifySearchUrl: 'https://open.spotify.com/search/pop%20perfection%20synth%20pop',
      },
      {
        name: 'Summer Vibes',
        genres: ['Pop', 'Tropical', 'Dance'],
        vibeDescription: 'Breezy, carefree tracks that feel like a perfect summer day',
        spotifySearchUrl: 'https://open.spotify.com/search/summer%20vibes%20tropical%20pop',
      },
      {
        name: 'Festival Anthems',
        genres: ['EDM', 'Progressive House', 'Big Room'],
        vibeDescription: "Stadium-sized drops that make you feel like you're on top of the world",
        spotifySearchUrl: 'https://open.spotify.com/search/festival%20anthems%20edm%20big%20room',
      },
    ],
    activities: [
      '🎉 Host an impromptu dance party',
      '📸 Do a creative photoshoot',
      '🎨 Make something colorful and expressive',
    ],
    journalPrompt:
      'What is fueling this incredible energy today? How can you channel this feeling into something meaningful?',
  },

  Excited: {
    label: 'Excited',
    description:
      "You've got energy buzzing through you with a spark of anticipation. Something good is on the horizon!",
    gradientStart: '#f97316',
    gradientEnd: '#eab308',
    playlists: [
      {
        name: 'Energy Boost',
        genres: ['Pop', 'Hip-Hop', 'Dance'],
        vibeDescription: 'Upbeat tracks that keep your momentum going strong',
        spotifySearchUrl: 'https://open.spotify.com/search/energy%20boost%20upbeat%20pop',
      },
      {
        name: 'Hype Train',
        genres: ['Hip-Hop', 'Trap', 'R&B'],
        vibeDescription: 'Bass-heavy beats that amplify your excited state',
        spotifySearchUrl: 'https://open.spotify.com/search/hype%20train%20hip%20hop%20trap',
      },
      {
        name: 'Indie Spark',
        genres: ['Indie Rock', 'Alternative', 'Indie Pop'],
        vibeDescription: 'Quirky, energetic indie tracks with a feel-good twist',
        spotifySearchUrl: 'https://open.spotify.com/search/indie%20spark%20alternative%20pop',
      },
      {
        name: 'Power Pop',
        genres: ['Pop Rock', 'Power Pop'],
        vibeDescription: 'Guitar-driven anthems full of excitement and drive',
        spotifySearchUrl: 'https://open.spotify.com/search/power%20pop%20rock%20anthems',
      },
      {
        name: 'Motivation Station',
        genres: ['Hip-Hop', 'Pop', 'Electronic'],
        vibeDescription: "Get-up-and-go tracks for when you're ready to conquer the day",
        spotifySearchUrl: 'https://open.spotify.com/search/motivation%20station%20workout%20hip%20hop',
      },
      {
        name: 'Electric Feel',
        genres: ['Electro-pop', 'Indie Electronic'],
        vibeDescription: 'Synth-driven earworms with an electric, crackling energy',
        spotifySearchUrl: 'https://open.spotify.com/search/electric%20feel%20electro%20pop%20indie',
      },
    ],
    activities: [
      '🏃 Go for an energizing run or workout',
      "📋 Start that project you've been planning",
      "☎️ Catch up with a friend you've been meaning to call",
    ],
    journalPrompt:
      'What are you most excited about right now? What steps can you take today to make it happen?',
  },

  Anxious: {
    label: 'Anxious',
    description:
      "Your mind is racing and energy is high but scattered. Let's channel that nervous energy into something grounding.",
    gradientStart: '#ef4444',
    gradientEnd: '#f97316',
    playlists: [
      {
        name: 'Calm the Storm',
        genres: ['Ambient', 'Lo-fi', 'Chill'],
        vibeDescription: 'Gentle, grounding sounds to slow your racing thoughts',
        spotifySearchUrl: 'https://open.spotify.com/search/calm%20the%20storm%20ambient%20relaxing',
      },
      {
        name: 'Deep Focus',
        genres: ['Ambient', 'Classical', 'Instrumental'],
        vibeDescription: 'Structured, calming instrumentals to help organize your mind',
        spotifySearchUrl: 'https://open.spotify.com/search/deep%20focus%20instrumental%20ambient',
      },
      {
        name: 'Release & Let Go',
        genres: ['Alternative', 'Emo', 'Post-rock'],
        vibeDescription: 'Cathartic tracks that validate your feelings and help you process them',
        spotifySearchUrl: 'https://open.spotify.com/search/release%20let%20go%20cathartic%20alternative',
      },
      {
        name: 'Nature Sounds',
        genres: ['Ambient', 'New Age', 'Meditation'],
        vibeDescription: 'Organic soundscapes that reconnect you with calm, natural rhythms',
        spotifySearchUrl: 'https://open.spotify.com/search/nature%20sounds%20meditation%20ambient',
      },
      {
        name: 'Anxiety Relief',
        genres: ['Lo-fi', 'Jazz', 'Chill'],
        vibeDescription: 'Soft, unhurried melodies that give your nervous system a break',
        spotifySearchUrl: 'https://open.spotify.com/search/anxiety%20relief%20lofi%20jazz%20chill',
      },
    ],
    activities: [
      '🧘 Try a 5-minute breathing exercise',
      '✍️ Write down your worries and then set them aside',
      '🚶 Take a slow, mindful walk outside',
    ],
    journalPrompt:
      'What specific worry is taking up the most space in your mind right now? What is one small action you could take to address it?',
  },

  Content: {
    label: 'Content',
    description:
      "You're in a lovely sweet spot — balanced energy with a warm sense of happiness. Life feels good right now.",
    gradientStart: '#10b981',
    gradientEnd: '#14b8a6',
    playlists: [
      {
        name: 'Feel Good Friday',
        genres: ['Pop', 'Soul', 'R&B'],
        vibeDescription: 'Smooth, uplifting tracks for when everything feels just right',
        spotifySearchUrl: 'https://open.spotify.com/search/feel%20good%20friday%20soul%20pop%20r%26b',
      },
      {
        name: 'Sunny Day',
        genres: ['Indie Pop', 'Folk', 'Acoustic'],
        vibeDescription: 'Warm acoustic melodies that match your contented mood perfectly',
        spotifySearchUrl: 'https://open.spotify.com/search/sunny%20day%20acoustic%20indie%20folk',
      },
      {
        name: 'Coffee Shop Beats',
        genres: ['Jazz', 'Bossa Nova', 'Lo-fi'],
        vibeDescription: 'Relaxed, soulful sounds that enhance your sense of ease',
        spotifySearchUrl: 'https://open.spotify.com/search/coffee%20shop%20jazz%20bossa%20nova%20lofi',
      },
      {
        name: 'Good Vibes Only',
        genres: ['Pop', 'Neo-Soul', 'R&B'],
        vibeDescription: 'Effortlessly feel-good tracks with a groovy, positive energy',
        spotifySearchUrl: 'https://open.spotify.com/search/good%20vibes%20only%20neo%20soul%20r%26b',
      },
      {
        name: 'Grateful',
        genres: ['Acoustic', 'Singer-Songwriter', 'Folk'],
        vibeDescription: 'Heartfelt songs that celebrate the beauty in everyday moments',
        spotifySearchUrl: 'https://open.spotify.com/search/grateful%20acoustic%20singer%20songwriter',
      },
      {
        name: 'Weekend Morning',
        genres: ['Indie Pop', 'Dream Pop', 'Chillwave'],
        vibeDescription: 'Laid-back, hazy tracks perfect for a relaxed, happy afternoon',
        spotifySearchUrl: 'https://open.spotify.com/search/weekend%20morning%20dream%20pop%20chillwave',
      },
    ],
    activities: [
      '🌿 Tend to your plants or start a small garden',
      "📚 Read a chapter of that book you've been putting off",
      '🍳 Cook a nourishing meal from scratch',
    ],
    journalPrompt:
      'What small moments today made you feel content? How can you cultivate more of these in your daily life?',
  },

  Calm: {
    label: 'Calm',
    description:
      "You're in a peaceful, balanced state — neither too high nor too low. This is a wonderful place to be.",
    gradientStart: '#0891b2',
    gradientEnd: '#6366f1',
    playlists: [
      {
        name: 'Serenity Now',
        genres: ['Ambient', 'Classical', 'New Age'],
        vibeDescription: 'Tranquil soundscapes designed to maintain your peaceful state',
        spotifySearchUrl: 'https://open.spotify.com/search/serenity%20ambient%20classical%20new%20age',
      },
      {
        name: 'Mindful Moments',
        genres: ['Meditation', 'Ambient', 'Instrumental'],
        vibeDescription: 'Gentle, flowing instrumentals that support present-moment awareness',
        spotifySearchUrl: 'https://open.spotify.com/search/mindful%20moments%20meditation%20instrumental',
      },
      {
        name: 'Evening Unwind',
        genres: ['Jazz', 'Soul', 'R&B'],
        vibeDescription: 'Smooth, unhurried jazz that soothes without sedating',
        spotifySearchUrl: 'https://open.spotify.com/search/evening%20unwind%20jazz%20soul%20smooth',
      },
      {
        name: 'Piano Reverie',
        genres: ['Classical', 'Neo-Classical', 'Piano'],
        vibeDescription: 'Delicate piano compositions that mirror your inner stillness',
        spotifySearchUrl: 'https://open.spotify.com/search/piano%20reverie%20neo%20classical%20solo',
      },
      {
        name: 'Equilibrium',
        genres: ['Ambient', 'Electronic', 'Chill'],
        vibeDescription: 'Balanced, flowing electronic textures that keep you centered',
        spotifySearchUrl: 'https://open.spotify.com/search/equilibrium%20ambient%20electronic%20balanced',
      },
    ],
    activities: [
      '🧘 Practice a short meditation or yoga flow',
      '🎨 Sketch, doodle, or try watercolor painting',
      '🌙 Do some gentle stretching and journaling',
    ],
    journalPrompt:
      'What does this sense of calm feel like in your body? What helped you arrive at this balanced place today?',
  },

  Frustrated: {
    label: 'Frustrated',
    description:
      "Something's not going right and you're feeling the friction. Your feelings are valid — let's find an outlet.",
    gradientStart: '#dc2626',
    gradientEnd: '#f97316',
    playlists: [
      {
        name: 'Cathartic Release',
        genres: ['Rock', 'Alternative', 'Grunge'],
        vibeDescription: "Guitar-driven tracks that give your frustration somewhere healthy to go",
        spotifySearchUrl: 'https://open.spotify.com/search/cathartic%20release%20rock%20alternative%20grunge',
      },
      {
        name: 'Rage Against',
        genres: ['Metal', 'Hard Rock', 'Punk'],
        vibeDescription: 'High-energy, aggressive tracks that match and release pent-up tension',
        spotifySearchUrl: 'https://open.spotify.com/search/rage%20against%20hard%20rock%20metal%20punk',
      },
      {
        name: 'Vent Session',
        genres: ['Hip-Hop', 'Rap', 'Trap'],
        vibeDescription: 'Raw, honest rap that validates your frustration and channels it',
        spotifySearchUrl: 'https://open.spotify.com/search/vent%20session%20rap%20hip%20hop%20honest',
      },
      {
        name: 'Cool Down',
        genres: ['Lo-fi', 'Chill', 'Ambient'],
        vibeDescription: 'After the release, these mellow tracks help bring you back to baseline',
        spotifySearchUrl: 'https://open.spotify.com/search/cool%20down%20lofi%20chill%20relaxing',
      },
      {
        name: 'Empowerment Anthems',
        genres: ['Pop', 'Rock', 'R&B'],
        vibeDescription: 'Fierce, empowering tracks that remind you of your strength',
        spotifySearchUrl: 'https://open.spotify.com/search/empowerment%20anthems%20pop%20rock%20fierce',
      },
    ],
    activities: [
      '🥊 Do an intense workout or go for a run',
      "✍️ Write an unfiltered rant in your journal (don't hold back)",
      '🎵 Sing or scream along to a cathartic song',
    ],
    journalPrompt:
      'What is at the root of your frustration today? What boundary or need is not being met?',
  },

  Peaceful: {
    label: 'Peaceful',
    description:
      'You have a gentle, positive warmth despite low energy. This is a beautiful, restorative state to be in.',
    gradientStart: '#10b981',
    gradientEnd: '#34d399',
    playlists: [
      {
        name: 'Soft Glow',
        genres: ['Acoustic', 'Folk', 'Ambient'],
        vibeDescription: 'Warm, hushed melodies that feel like a gentle embrace',
        spotifySearchUrl: 'https://open.spotify.com/search/soft%20glow%20acoustic%20folk%20ambient',
      },
      {
        name: 'Sunday Morning',
        genres: ['Soul', 'Jazz', 'Acoustic'],
        vibeDescription: 'Lazy, sun-dappled sounds for your most peaceful moments',
        spotifySearchUrl: 'https://open.spotify.com/search/sunday%20morning%20soul%20jazz%20acoustic',
      },
      {
        name: 'Lullaby Forest',
        genres: ['Ambient', 'New Age', 'Nature'],
        vibeDescription: 'Serene nature-infused soundscapes for deep relaxation',
        spotifySearchUrl: 'https://open.spotify.com/search/lullaby%20forest%20ambient%20nature%20serene',
      },
      {
        name: 'Slow Life',
        genres: ['Indie Folk', 'Singer-Songwriter', 'Acoustic'],
        vibeDescription: 'Unhurried, heartfelt songs that celebrate slowing down',
        spotifySearchUrl: 'https://open.spotify.com/search/slow%20life%20indie%20folk%20singer%20songwriter',
      },
      {
        name: 'Tender Moments',
        genres: ['Classical', 'Piano', 'Instrumental'],
        vibeDescription: 'Delicate, softly joyful instrumentals that nourish the soul',
        spotifySearchUrl: 'https://open.spotify.com/search/tender%20moments%20piano%20classical%20gentle',
      },
      {
        name: 'Breathe Easy',
        genres: ['Ambient', 'Meditation', 'Wellness'],
        vibeDescription: 'Healing, tranquil sounds that restore and replenish',
        spotifySearchUrl: 'https://open.spotify.com/search/breathe%20easy%20meditation%20wellness%20ambient',
      },
    ],
    activities: [
      '🛁 Take a long, luxurious bath or shower',
      '📖 Read poetry or a calming book',
      '🌸 Spend time in nature, even just sitting outside',
    ],
    journalPrompt:
      'What is bringing you this sense of peace right now? What are you grateful for in this quiet moment?',
  },

  Melancholic: {
    label: 'Melancholic',
    description:
      "You're in a thoughtful, bittersweet space — not quite sad, not quite okay. Your depth is a gift.",
    gradientStart: '#6366f1',
    gradientEnd: '#64748b',
    playlists: [
      {
        name: 'Rainy Day Reflections',
        genres: ['Indie', 'Alternative', 'Singer-Songwriter'],
        vibeDescription: 'Pensive, beautiful tracks that honor your contemplative mood',
        spotifySearchUrl: 'https://open.spotify.com/search/rainy%20day%20reflections%20indie%20alternative',
      },
      {
        name: 'Blue Hour',
        genres: ['Ambient', 'Post-rock', 'Shoegaze'],
        vibeDescription: 'Atmospheric, wistful sounds that sit with you in the grey space',
        spotifySearchUrl: 'https://open.spotify.com/search/blue%20hour%20post%20rock%20shoegaze%20atmospheric',
      },
      {
        name: 'Nostalgia Trip',
        genres: ['Indie Pop', 'Dream Pop', '80s'],
        vibeDescription: 'Bittersweet melodies that let you feel the ache of beautiful memories',
        spotifySearchUrl: 'https://open.spotify.com/search/nostalgia%20trip%20dream%20pop%2080s%20indie',
      },
      {
        name: 'Soul Searching',
        genres: ['Folk', 'Acoustic', 'Blues'],
        vibeDescription: 'Raw, honest songs for when you need to sit with difficult feelings',
        spotifySearchUrl: 'https://open.spotify.com/search/soul%20searching%20folk%20acoustic%20blues',
      },
      {
        name: 'Midnight Thoughts',
        genres: ['Lo-fi', 'Jazz', 'Ambient'],
        vibeDescription: 'Late-night companion music for quiet, introspective moments',
        spotifySearchUrl: 'https://open.spotify.com/search/midnight%20thoughts%20lofi%20jazz%20introspective',
      },
    ],
    activities: [
      "🫖 Make yourself a warm drink and just sit with your feelings",
      '🖊️ Write a letter to yourself or someone you miss',
      '🎬 Watch a comforting, familiar film',
    ],
    journalPrompt:
      'What is one small thing that brought you comfort today, even in the midst of this heaviness?',
  },

  Depleted: {
    label: 'Depleted',
    description:
      "You're running on empty with a heavy heart. Be gentle with yourself — rest is not weakness, it's wisdom.",
    gradientStart: '#475569',
    gradientEnd: '#1e293b',
    playlists: [
      {
        name: 'Gentle Healing',
        genres: ['Ambient', 'New Age', 'Meditation'],
        vibeDescription: 'Soft, restorative sounds that ask nothing of you and give everything',
        spotifySearchUrl: 'https://open.spotify.com/search/gentle%20healing%20ambient%20new%20age%20restorative',
      },
      {
        name: 'Dark Comfort',
        genres: ['Post-rock', 'Ambient', 'Drone'],
        vibeDescription: 'Deep, enveloping sounds that hold you in the dark without judgment',
        spotifySearchUrl: 'https://open.spotify.com/search/dark%20comfort%20post%20rock%20ambient%20drone',
      },
      {
        name: 'Warmth',
        genres: ['Lo-fi', 'Acoustic', 'Chill'],
        vibeDescription: 'Soft, unhurried warmth when you need a musical blanket',
        spotifySearchUrl: 'https://open.spotify.com/search/warmth%20lofi%20acoustic%20chill%20comfort',
      },
      {
        name: 'Sleep Sanctuary',
        genres: ['Sleep Music', 'Ambient', 'White Noise'],
        vibeDescription: 'Deep relaxation sounds designed to let your exhausted mind rest',
        spotifySearchUrl: 'https://open.spotify.com/search/sleep%20sanctuary%20ambient%20sleep%20music',
      },
      {
        name: 'Rebuild',
        genres: ['Acoustic', 'Folk', 'Soul'],
        vibeDescription: 'Gentle, encouraging sounds that slowly help you find your footing again',
        spotifySearchUrl: 'https://open.spotify.com/search/rebuild%20acoustic%20folk%20soul%20encouraging',
      },
    ],
    activities: [
      '😴 Take a nap — your body is asking for rest',
      "🤗 Reach out to someone you trust and say how you're feeling",
      '🍵 Do one small, kind thing for yourself right now',
    ],
    journalPrompt:
      'What does your body and soul need most right now? What would it look like to truly be gentle with yourself today?',
  },
};

export default MOOD_DATA;
