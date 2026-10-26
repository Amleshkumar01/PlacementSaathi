// Mock Interview data: HR frameworks, technical viva and practice method.

export interface HrQuestion {
  id: string;
  question: string;
  framework: string;
  steps: string[];
  avoid: string;
}

export const hrQuestions: HrQuestion[] = [
  {
    id: "tell-me-about-yourself",
    question: "Tell me about yourself",
    framework: "Present - Past - Future (60-90 seconds)",
    steps: [
      "Present: what you do now: branch, college, final year, your strongest skill.",
      "Past: 1-2 things that brought you here: a project or internship, with a result.",
      "Future: what you want to do next and how this role fits that.",
    ],
    avoid: "Reading your resume line by line, starting with family details, or talking for 3 minutes.",
  },
  {
    id: "why-hire-you",
    question: "Why should we hire you?",
    framework: "2 skills from the JD + 2 proof points of yours",
    steps: [
      "Pick 2 skills from the job description that you genuinely have.",
      "Give one proof for each: a project, internship, contest or certification.",
      "Close in one line: you learn fast and how you will help the team.",
    ],
    avoid: "An answer without proof, like 'Because I am hardworking'.",
  },
  {
    id: "strengths-weaknesses",
    question: "What are your strengths and weaknesses?",
    framework: "Strength + example; Weakness + improvement step",
    steps: [
      "Strength: name one and give a short example right away.",
      "Weakness: name a real one that isn't critical for the job.",
      "Explain what you are doing right now to improve it.",
    ],
    avoid: "'My weakness is that I am a perfectionist.' It sounds rehearsed.",
  },
  {
    id: "five-years",
    question: "Where do you see yourself in 5 years?",
    framework: "Growth + company alignment",
    steps: [
      "Skill growth: becoming a strong engineer in one domain.",
      "Responsibility: guiding new team members and owning larger modules.",
      "Link it to the company: you want to do this on their projects.",
    ],
    avoid: "Answers like 'I'll do an MBA' or 'I'll start my own company' that suggest you will leave soon.",
  },
  {
    id: "relocation",
    question: "Are you willing to relocate or work in shifts?",
    framework: "Honest answer + flexibility",
    steps: [
      "Relocation is common at service companies. If you are ready, say a clear 'Yes'.",
      "If you have a real constraint, say so politely. Don't lie.",
      "Show willingness to learn and adapt.",
    ],
    avoid: "Saying 'Yes' in the interview and refusing at joining. That breaks trust.",
  },
  {
    id: "challenge",
    question: "Tell me about a challenge you faced",
    framework: "STAR: Situation, Task, Action, Result",
    steps: [
      "Situation: when and where, e.g. a final-year project or hackathon.",
      "Task: what your responsibility was.",
      "Action: what you did yourself (say 'I', not 'we').",
      "Result: what happened and what you learned.",
    ],
    avoid: "A story where the problem was someone else's fault and you did nothing.",
  },
  {
    id: "questions-for-us",
    question: "Do you have any questions for us?",
    framework: "1-2 prepared questions",
    steps: [
      "Ask about training or the first project.",
      "Ask what the team expects from a fresher.",
    ],
    avoid: "Saying 'No questions', or asking about salary and leave first.",
  },
];

export interface VivaQuestion {
  q: string;
  hint: string;
}

export interface VivaSubject {
  id: string;
  subject: string;
  topics: string[];
  questions: VivaQuestion[];
}

export const vivaSubjects: VivaSubject[] = [
  {
    id: "oops",
    subject: "OOPs",
    topics: ["4 Pillars", "Class vs Object", "Abstract class vs Interface", "Overloading vs Overriding", "Constructors", "Access modifiers"],
    questions: [
      { q: "What are the 4 pillars of OOPs?", hint: "Encapsulation, Abstraction, Inheritance, Polymorphism. Keep one real-life example ready for each." },
      { q: "What is the difference between an abstract class and an interface?", hint: "An abstract class can hold state and concrete methods; an interface is a contract. In Java a class can extend one abstract class but implement many interfaces." },
      { q: "Method overloading vs overriding?", hint: "Overloading: same name, different parameters, resolved at compile time. Overriding: a child class redefines a parent method, resolved at runtime." },
      { q: "What is a constructor? Can a constructor be private?", hint: "A special method that runs when an object is created. Yes, it can be private, as in the Singleton pattern." },
      { q: "Why doesn't Java support multiple inheritance through classes?", hint: "The diamond problem: if two parents have the same method, it is ambiguous. Interfaces handle this." },
    ],
  },
  {
    id: "dbms",
    subject: "DBMS and SQL",
    topics: ["Normalisation (1NF, 2NF, 3NF, BCNF)", "Joins", "ACID properties", "Keys", "Indexing", "Common SQL queries"],
    questions: [
      { q: "What is normalisation and why is it needed?", hint: "Splitting tables to reduce redundancy and anomalies. 1NF: atomic values, 2NF: no partial dependency, 3NF: no transitive dependency." },
      { q: "Explain the ACID properties.", hint: "Atomicity (all or nothing), Consistency, Isolation (transactions don't interfere), Durability (data is safe after commit)." },
      { q: "INNER JOIN vs LEFT JOIN?", hint: "INNER: only matching rows. LEFT: all rows from the left table, with NULL where the right side has no match." },
      { q: "Difference between DELETE, TRUNCATE and DROP?", hint: "DELETE removes rows, supports WHERE and can be rolled back. TRUNCATE removes all rows quickly. DROP removes the whole table and its structure." },
      { q: "Write a query for the second highest salary.", hint: "SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);" },
      { q: "Primary key vs foreign key?", hint: "A primary key uniquely identifies a row (no NULLs). A foreign key refers to the primary key of another table." },
    ],
  },
  {
    id: "os",
    subject: "Operating System",
    topics: ["Process vs Thread", "Deadlock", "CPU Scheduling", "Paging", "Virtual Memory", "Mutex vs Semaphore"],
    questions: [
      { q: "What is the difference between a process and a thread?", hint: "A process has its own memory space; threads share the memory of one process, so they are lighter and switch faster." },
      { q: "What is a deadlock? What are its 4 conditions?", hint: "Processes wait forever for each other's resources. Conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait." },
      { q: "Mutex vs semaphore?", hint: "Mutex: one owner at a time, and the owner unlocks it. Semaphore: counter-based, can manage multiple resources." },
      { q: "What is paging?", hint: "Dividing memory into fixed-size pages/frames to avoid external fragmentation." },
      { q: "What is virtual memory?", hint: "Using part of the disk as if it were RAM so a program can be larger than physical memory. A page fault loads the page." },
    ],
  },
  {
    id: "cn",
    subject: "Computer Networks",
    topics: ["OSI Model", "TCP vs UDP", "IP vs MAC address", "DNS", "HTTP vs HTTPS", "What happens when you type a URL"],
    questions: [
      { q: "What are the 7 layers of the OSI model?", hint: "Physical, Data Link, Network, Transport, Session, Presentation, Application. Mnemonic: 'Please Do Not Throw Sausage Pizza Away'." },
      { q: "TCP vs UDP?", hint: "TCP: connection-oriented, reliable, ordered (web, email). UDP: connectionless, fast, no guarantees (video calls, gaming, DNS)." },
      { q: "Difference between an IP address and a MAC address?", hint: "IP is a logical address that can change between networks (Network layer). MAC is a hardware address (Data Link layer)." },
      { q: "What does DNS do?", hint: "It translates a domain name (placementsaathi.in) into an IP address." },
      { q: "What happens when you type a URL in the browser?", hint: "DNS lookup -> TCP connection (plus a TLS handshake for HTTPS) -> HTTP request -> server response -> the browser renders the page." },
    ],
  },
];

export const practiceMethod: { title: string; detail: string }[] = [
  { title: "Record yourself", detail: "Turn on your phone camera and answer one HR or technical question as you would in the interview." },
  { title: "Time it", detail: "HR answers in 60-90 seconds, technical concepts in 1-2 minutes. Use a timer to see where you over-talk." },
  { title: "Watch and note", detail: "Review the recording: filler words, eye contact, clarity. Write down one thing to improve next time." },
  { title: "Improve one answer a day", detail: "Polish just one answer per day. In 30 days you will have 30 polished answers." },
];

export const projectDeepDive = {
  structure: ["Problem: what you solved", "Solution: what you built and with which tech", "Result: what changed (real numbers)", "Learning: what you learned and would do differently"],
  note: "For every word on your resume, be ready for at least 3 follow-up questions. Know the 'why' behind every technical decision.",
  goldenRule: "If you don't know an answer, don't guess. Saying 'I don't know the exact answer, but the related concept is this' sounds far more professional.",
};
