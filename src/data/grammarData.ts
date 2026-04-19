export type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  content: {
    title: string;
    explanation: string;
    examples: { sentence: string; highlight: string }[];
  }[];
  questions: Question[];
  color: string;
  icon: string;
};

export const grammarData: Lesson[] = [
  {
    id: "nouns",
    title: "Nouns",
    description: "Learn about people, places, and things!",
    color: "bg-blue-400",
    icon: "PersonStanding",
    content: [
      {
        title: "What is a Noun?",
        explanation: "A noun is a naming word. It names a person, a place, or a thing.",
        examples: [
          { sentence: "The boy is playing.", highlight: "boy" },
          { sentence: "We live in a big house.", highlight: "house" },
          { sentence: "The cat is sleeping.", highlight: "cat" },
        ],
      },
    ],
    questions: [
      {
        id: 1,
        question: "Which word is a person noun?",
        options: ["Dog", "Teacher", "Run", "Blue"],
        correctAnswer: "Teacher",
        explanation: "A teacher is a person, so it is a person noun!",
      },
      {
        id: 2,
        question: "Identify the place noun in this sentence: 'The school is big.'",
        options: ["The", "School", "Is", "Big"],
        correctAnswer: "School",
        explanation: "School is a place, so it is a place noun!",
      },
      {
        id: 3,
        question: "Which of these is a thing?",
        options: ["Pencil", "Happy", "Jump", "Where"],
        correctAnswer: "Pencil",
        explanation: "A pencil is an object (a thing)!",
      },
    ],
  },
  {
    id: "verbs",
    title: "Verbs",
    description: "Action words! What are you doing?",
    color: "bg-green-400",
    icon: "Zap",
    content: [
      {
        title: "What is a Verb?",
        explanation: "A verb is an action word. It tells us what someone or something is doing.",
        examples: [
          { sentence: "The birds fly.", highlight: "fly" },
          { sentence: "She reads a book.", highlight: "reads" },
          { sentence: "I swim in the pool.", highlight: "swim" },
        ],
      },
    ],
    questions: [
      {
        id: 1,
        question: "Which word is an action word?",
        options: ["Apple", "Sleep", "Green", "Under"],
        correctAnswer: "Sleep",
        explanation: "Sleep is something you do, so it's a verb!",
      },
      {
        id: 2,
        question: "What is the verb in: 'The frog jumps high.'?",
        options: ["Frog", "The", "High", "Jumps"],
        correctAnswer: "Jumps",
        explanation: "Jumping is an action! The frog is jumping.",
      },
      {
        id: 3,
        question: "Which word describes an action?",
        options: ["Dance", "Table", "Yellow", "Quiet"],
        correctAnswer: "Dance",
        explanation: "Dancing is a fun action verb!",
      },
    ],
  },
  {
    id: "adjectives",
    title: "Adjectives",
    description: "Describing words for your world!",
    color: "bg-purple-400",
    icon: "Palette",
    content: [
      {
        title: "What is an Adjective?",
        explanation: "An adjective describes a noun. It tells us more about a person, place, or thing.",
        examples: [
          { sentence: "A red balloon.", highlight: "red" },
          { sentence: "The tall building.", highlight: "tall" },
          { sentence: "A fuzzy puppy.", highlight: "fuzzy" },
        ],
      },
    ],
    questions: [
      {
        id: 1,
        question: "Which word describes the noun? 'A sweet apple.'",
        options: ["A", "Sweet", "Apple", "Eat"],
        correctAnswer: "Sweet",
        explanation: "Sweet tells us how the apple tastes! It's an adjective.",
      },
      {
        id: 2,
        question: "Find the adjective: 'The tiny ant carries crumbs.'",
        options: ["Ant", "Tiny", "Carries", "Crumbs"],
        correctAnswer: "Tiny",
        explanation: "Tiny describes the size of the ant.",
      },
      {
        id: 3,
        question: "Which word is an adjective?",
        options: ["Run", "Quickly", "Beautiful", "Park"],
        correctAnswer: "Beautiful",
        explanation: "Beautiful is a word we use to describe something!",
      },
    ],
  },
  {
    id: "punctuation",
    title: "Punctuation",
    description: "Periods, Question Marks, and more!",
    color: "bg-orange-400",
    icon: "Type",
    content: [
      {
        title: "Essential Punctuation",
        explanation: "Punctuation helps our sentences make sense! We use periods for statements and question marks for questions.",
        examples: [
          { sentence: "I like candy.", highlight: "." },
          { sentence: "Where is my hat?", highlight: "?" },
          { sentence: "Wow! Look at that!", highlight: "!" },
        ],
      },
    ],
    questions: [
      {
        id: 1,
        question: "What mark do we use at the end of a question?",
        options: [".", "?", "!", ","],
        correctAnswer: "?",
        explanation: "We always use a question mark when asking something!",
      },
      {
        id: 2,
        question: "Which mark ends a normal sentence? 'The sun is hot_'",
        options: [".", "?", "!", ","],
        correctAnswer: ".",
        explanation: "A period is used for a statement.",
      },
      {
        id: 3,
        question: "Which mark shows excitement? 'I won the race_'",
        options: [".", "?", "!", ","],
        correctAnswer: "!",
        explanation: "An exclamation mark shows strong feeling or excitement!",
      },
    ],
  },
];