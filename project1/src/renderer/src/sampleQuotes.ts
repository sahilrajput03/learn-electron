type QuoteType = {
  author: string
  quote: string
}
const quotesFromSahil = [
  'Ram-Ram',
  'I love myself.',
  'Only Micro Steps',
  'Pavitra Sankalp and talking to parmatma (as it lives in your heart) for 15 mins before you sleep.',
  'Charveti - Chalte jana hai.',
  'Competition and Comparison is destruction. Focus on your own path.',
  "Use Focusmate to enjoy company while working. It's awesome.",
  'Use focus music from the “Downloads” folder to enjoy work sometimes.',
  'Do it in micro steps.',
  'Kaam karna nhi hai DEKHNA hai, usi se kam hona shuru ho jata hai.',
  'When not doing work - There is no work.',
  "I'll just read over what I've got so far. ~ Paul Graham (Article - Great Work).",
  'Coffee at 12pm is a must.'
].map((quote) => {
  return { author: 'Sahil', quote }
})

const quotesFromEminetPeople = [
  { author: 'Steve Jobs', quote: 'The only way to do great work is to love what you do.' },
  {
    author: 'Warren Buffett',
    quote: 'Someone is sitting in the shade today because someone planted a tree a long time ago.'
  },
  {
    author: 'Henry Ford',
    quote: 'Whether you think you can or you think you can’t, you’re right.'
  },
  {
    author: 'Thomas Edison',
    quote: 'Genius is one percent inspiration and ninety-nine percent perspiration.'
  },
  { author: 'Peter Drucker', quote: 'The best way to predict the future is to create it.' },
  {
    author: 'Elon Musk',
    quote: 'When something is important enough, you do it even if the odds are not in your favor.'
  },
  {
    author: 'Mark Cuban',
    quote: 'Work like there is someone working 24 hours a day to take it all away from you.'
  },
  {
    author: 'Richard Branson',
    quote: 'Business opportunities are like buses; there’s always another one coming.'
  },
  { author: 'Sam Walton', quote: 'High expectations are the key to everything.' },
  {
    author: 'Confucius',
    quote: 'It does not matter how slowly you go as long as you do not stop.'
  },
  { author: "Book - The Hitchhiker's Guide to the Galaxy", quote: "Don't Panic" }
]

export const popularQuotes: QuoteType[] = [
  ...quotesFromEminetPeople,
  // Comment above line (s) if you want to see your own thoughts only.
  ...quotesFromSahil
]

export const getRandomQuote = (): QuoteType => {
  const randomIndex = Math.floor(Math.random() * popularQuotes.length)
  return popularQuotes[randomIndex]
}
