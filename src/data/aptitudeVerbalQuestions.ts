import { mcq } from "./aptitudeQuestionHelpers";

type Row = [question: string, answer: string, distractors: string[], explanation: string];
const rows = (topic: string, items: Row[]) => items.map(([question, answer, wrong, reason], i) => mcq(topic, i, question, answer, wrong, [reason]));

const synonyms: Row[] = [
  ["Choose the synonym of 'Brief'.", "Concise", ["Lengthy", "Careless", "Distant"], "Brief and concise both describe something expressed in few words."],
  ["Choose the synonym of 'Diligent'.", "Hardworking", ["Lazy", "Careless", "Uncertain"], "A diligent person works carefully and persistently."],
  ["Choose the synonym of 'Candid'.", "Frank", ["Secretive", "False", "Timid"], "Candid means honest and straightforward; frank has the same meaning."],
  ["Choose the synonym of 'Rapid'.", "Swift", ["Slow", "Late", "Weak"], "Rapid and swift both mean moving or happening quickly."],
  ["Choose the synonym of 'Reluctant'.", "Unwilling", ["Eager", "Certain", "Delighted"], "Reluctant means hesitant or unwilling to do something."],
  ["Choose the synonym of 'Assist'.", "Help", ["Hinder", "Ignore", "Delay"], "To assist someone is to help them."],
  ["Choose the synonym of 'Ancient'.", "Very old", ["Modern", "Recent", "Temporary"], "Ancient refers to something belonging to the distant past."],
  ["Choose the synonym of 'Accurate'.", "Correct", ["Vague", "Wrong", "Rough"], "Accurate means correct or free from errors."],
  ["Choose the synonym of 'Fragile'.", "Delicate", ["Strong", "Solid", "Durable"], "Fragile and delicate can both describe something easily broken."],
  ["Choose the synonym of 'Generous'.", "Giving", ["Selfish", "Greedy", "Stingy"], "A generous person willingly gives time, help or resources."],
  ["Choose the synonym of 'Obtain'.", "Acquire", ["Lose", "Reject", "Abandon"], "Obtain and acquire both mean to get something."],
  ["Choose the synonym of 'Calm'.", "Tranquil", ["Agitated", "Noisy", "Restless"], "Tranquil means peaceful and calm."],
  ["Choose the synonym of 'Scarce'.", "Rare", ["Plentiful", "Abundant", "Common"], "Scarce and rare both describe something not readily available."],
  ["Choose the synonym of 'Begin'.", "Commence", ["Finish", "Cease", "Conclude"], "Commence is a formal word for begin."],
  ["Choose the synonym of 'Expand'.", "Enlarge", ["Shrink", "Reduce", "Contract"], "Expand and enlarge both mean to make bigger."],
  ["Choose the synonym of 'Hostile'.", "Unfriendly", ["Welcoming", "Kind", "Supportive"], "Hostile describes an unfriendly or antagonistic attitude."],
  ["Choose the synonym of 'Vital'.", "Essential", ["Optional", "Trivial", "Unnecessary"], "Vital means necessary or essential."],
  ["Choose the synonym of 'Purchase'.", "Buy", ["Sell", "Borrow", "Rent"], "To purchase an item is to buy it."],
  ["Choose the synonym of 'Vacant'.", "Empty", ["Occupied", "Crowded", "Full"], "Vacant means empty or unoccupied."],
  ["Choose the synonym of 'Predict'.", "Forecast", ["Recall", "Forget", "Deny"], "Predict and forecast both mean to say what is expected to happen."],
];

const antonyms: Row[] = [
  ["Choose the antonym of 'Optimistic'.", "Pessimistic", ["Hopeful", "Positive", "Confident"], "Optimistic expects favourable outcomes; pessimistic expects unfavourable ones."],
  ["Choose the antonym of 'Expand'.", "Contract", ["Grow", "Enlarge", "Extend"], "Expand means increase in size; contract means become smaller."],
  ["Choose the antonym of 'Temporary'.", "Permanent", ["Brief", "Short-lived", "Passing"], "Temporary lasts for a limited time, whereas permanent is lasting."],
  ["Choose the antonym of 'Scarce'.", "Abundant", ["Rare", "Limited", "Insufficient"], "Scarce means in short supply; abundant means plentiful."],
  ["Choose the antonym of 'Accept'.", "Reject", ["Receive", "Approve", "Welcome"], "To reject is to refuse to accept."],
  ["Choose the antonym of 'Ancient'.", "Modern", ["Old", "Historic", "Antique"], "Ancient belongs to the distant past; modern belongs to recent times."],
  ["Choose the antonym of 'Major'.", "Minor", ["Main", "Principal", "Important"], "Major means greater in importance or size; minor means lesser."],
  ["Choose the antonym of 'Include'.", "Exclude", ["Contain", "Involve", "Comprise"], "Exclude means deliberately leave out, the opposite of include."],
  ["Choose the antonym of 'Victory'.", "Defeat", ["Success", "Triumph", "Win"], "Victory is winning; defeat is losing."],
  ["Choose the antonym of 'Polite'.", "Rude", ["Courteous", "Respectful", "Civil"], "Rude describes behaviour lacking the courtesy of polite behaviour."],
  ["Choose the antonym of 'Increase'.", "Decrease", ["Rise", "Grow", "Expand"], "Decrease means become smaller in amount, opposite to increase."],
  ["Choose the antonym of 'Artificial'.", "Natural", ["Synthetic", "Manufactured", "Man-made"], "Artificial is made by people; natural occurs in nature."],
  ["Choose the antonym of 'Brave'.", "Cowardly", ["Courageous", "Fearless", "Bold"], "Cowardly means lacking the courage associated with bravery."],
  ["Choose the antonym of 'Complex'.", "Simple", ["Complicated", "Intricate", "Elaborate"], "Simple means easy to understand or uncomplicated, opposite to complex."],
  ["Choose the antonym of 'Maximum'.", "Minimum", ["Highest", "Greatest", "Largest"], "Maximum is the greatest possible amount; minimum is the least."],
  ["Choose the antonym of 'Visible'.", "Invisible", ["Clear", "Apparent", "Observable"], "Invisible means unable to be seen, opposite to visible."],
  ["Choose the antonym of 'Arrive'.", "Depart", ["Reach", "Enter", "Appear"], "Arrive means reach a place; depart means leave it."],
  ["Choose the antonym of 'Rigid'.", "Flexible", ["Stiff", "Unbending", "Inflexible"], "Rigid means difficult to bend or change; flexible means able to bend or adapt."],
  ["Choose the antonym of 'Genuine'.", "Fake", ["Real", "Authentic", "Original"], "Genuine means authentic; fake means not authentic."],
  ["Choose the antonym of 'Ancillary'.", "Primary", ["Auxiliary", "Supplementary", "Supporting"], "Ancillary means supporting or secondary; primary means main or principal."],
];

const grammar: Row[] = [
  ["Choose the grammatically correct sentence about the team members.", "Everyone on the team is ready.", ["Everyone on the team are ready.", "Everyone on the team were ready.", "Everyone on the team be ready."], "Everyone is a singular indefinite pronoun and takes 'is'."],
  ["Choose the correct past-tense sentence.", "She went to the library yesterday.", ["She go to the library yesterday.", "She has went to the library yesterday.", "She going to the library yesterday."], "Use the simple past form 'went' for a completed event yesterday."],
  ["Choose the correct sentence using 'neither'.", "Neither answer is correct.", ["Neither answer are correct.", "Neither answers is correct.", "Neither answer were correct."], "Neither followed by a singular count noun takes a singular verb here."],
  ["Choose the correct sentence about a completed assignment.", "I have finished my assignment.", ["I has finished my assignment.", "I have finish my assignment.", "I having finished my assignment."], "The present perfect uses have/has plus the past participle 'finished'."],
  ["Choose the correct comparative sentence.", "This route is shorter than that one.", ["This route is more shorter than that one.", "This route is shortest than that one.", "This route is short than that one."], "Use the comparative 'shorter' with 'than'; do not add 'more'."],
  ["Choose the correct sentence about advice.", "Her advice was helpful.", ["Her advices were helpful.", "Her advice were helpful.", "Her an advice was helpful."], "Advice is an uncountable noun and takes a singular verb."],
  ["Choose the correct sentence about two people.", "Ravi and I are classmates.", ["Ravi and me is classmates.", "Ravi and I is classmates.", "Ravi and me am classmates."], "The compound subject uses the subject pronoun I and the plural verb are."],
  ["Choose the correct sentence using 'did'.", "Did you submit the form?", ["Did you submitted the form?", "Did you submits the form?", "Did you submitting the form?"], "After the auxiliary did, use the base form of the verb: submit."],
  ["Choose the correct sentence about a number of applications.", "The number of applications is rising.", ["The number of applications are rising.", "The number of applications were rising now.", "The number of applications have rising."], "The subject is the singular phrase 'the number', so use is."],
  ["Choose the correct sentence using 'many'.", "There are many books on the shelf.", ["There is many books on the shelf.", "There are much books on the shelf.", "There has many books on the shelf."], "Books is a plural count noun: use 'there are' and 'many'."],
  ["Choose the correct first conditional sentence.", "If it rains, we will stay indoors.", ["If it rain, we will stay indoors.", "If it rains, we will stayed indoors.", "If it raining, we will stay indoors."], "Use present simple in the if-clause and will plus the base verb in the result clause."],
  ["Choose the correct sentence about an ongoing action.", "They are preparing for the test.", ["They is preparing for the test.", "They are prepare for the test.", "They am preparing for the test."], "Present continuous uses the appropriate form of be plus the -ing form."],
  ["Choose the correct sentence with an infinitive.", "She wants to learn Python.", ["She want to learns Python.", "She wants to learning Python.", "She wants learn to Python."], "With wants, the following infinitive is 'to learn'."],
  ["Choose the correct sentence about possession.", "The students have their own notebooks.", ["The students has their own notebooks.", "The students have there own notebooks.", "The students having their own notebooks."], "The plural subject takes have; their is the possessive determiner."],
  ["Choose the correct passive-voice sentence.", "The report was written by Neha.", ["The report was wrote by Neha.", "The report were written by Neha.", "The report was write by Neha."], "The passive uses was plus the past participle 'written'."],
  ["Choose the correct sentence using 'less'.", "We have less time today.", ["We have fewer time today.", "We has less time today.", "We having less time today."], "Time is uncountable in this context, so use less rather than fewer."],
  ["Choose the correct sentence using 'can'.", "He can solve this problem.", ["He can solves this problem.", "He can solved this problem.", "He can solving this problem."], "A modal verb such as can is followed by the base verb solve."],
  ["Choose the correct sentence using 'since'.", "I have lived here since 2020.", ["I has lived here since 2020.", "I have live here since 2020.", "I have living here since 2020."], "Present perfect uses have plus lived to describe a state continuing from a past starting point."],
  ["Choose the correct sentence with a singular subject.", "One of the players is absent.", ["One of the players are absent.", "One of the player is absent.", "One of the players have absent."], "The subject is one, so the verb is singular; 'of the players' uses the plural noun."],
  ["Choose the correct sentence using a superlative.", "She is the tallest student in the class.", ["She is the most tallest student in the class.", "She is the taller student in the class of thirty.", "She is the tall student than all."], "For this comparison across the class, use the superlative 'the tallest' without most."],
];

const blanks: Row[] = [
  ["Choose the word: We have waited here ___ two hours.", "for", ["since", "from", "at"], "Use for with a duration such as two hours."],
  ["Choose the word: She ___ the email yesterday.", "sent", ["send", "sending", "has send"], "Yesterday calls for the simple past form sent."],
  ["Choose the word: He is interested ___ robotics.", "in", ["on", "at", "by"], "The usual adjective-preposition combination is interested in."],
  ["Choose the word: The teacher asked us ___ quietly.", "to sit", ["sit to", "sitting to", "to sat"], "Ask someone to do something takes an infinitive."],
  ["Choose the word: There is ___ water left in the bottle; we should refill it.", "little", ["few", "many", "several"], "Water is uncountable, so little is appropriate."],
  ["Choose the word: The results will be announced ___ Monday.", "on", ["in", "at", "by on"], "Use on with a day of the week."],
  ["Choose the word: Please ___ attention to the instructions.", "pay", ["make", "do", "take to"], "The standard expression is pay attention."],
  ["Choose the word: She is ___ than her brother.", "younger", ["youngest", "more younger", "young"], "A comparison between two people uses the comparative younger."],
  ["Choose the word: Neither of the answers ___ correct.", "is", ["are", "have", "were being are"], "Neither is singular in this formal sentence and takes is."],
  ["Choose the word: I look forward to ___ from you.", "hearing", ["hear", "heard", "be hear"], "The to in look forward to is a preposition and is followed by an -ing form."],
  ["Choose the word: They arrived ___ the station at noon.", "at", ["on", "to", "into to"], "Use arrive at for a particular point such as a station."],
  ["Choose the word: If you practise daily, you ___ improve.", "will", ["would have", "had", "were"], "The first conditional expresses a likely result using will plus a base verb."],
  ["Choose the word: The train had left ___ we reached the station.", "before", ["despite", "unless", "during"], "Before places the train's departure earlier than our arrival."],
  ["Choose the word: He apologised ___ being late.", "for", ["of", "at", "with"], "The standard expression is apologise for something."],
  ["Choose the word: She is good ___ solving puzzles.", "at", ["in to", "on", "for to"], "The standard expression is good at an activity."],
  ["Choose the word: We should avoid ___ the same mistake.", "making", ["make", "to make", "made to"], "Avoid is followed by a gerund: avoid making."],
  ["Choose the word: He has not finished the work ___.", "yet", ["already yesterday", "ever since now", "still yet before"], "Yet is commonly used at the end of negative present perfect sentences."],
  ["Choose the word: This book belongs ___ Mira.", "to", ["with", "at", "on"], "The verb belongs is followed by to when identifying the owner."],
  ["Choose the word: You must ___ your ID card to enter.", "show", ["shows", "showed", "showing"], "The modal must takes the base form show."],
  ["Choose the word: The room was so dark ___ we could not read.", "that", ["than", "because of", "despite"], "The so ... that construction links degree to a result."],
];

const prepositions: Row[] = [
  ["Choose the article: He is ___ honest employee.", "an", ["a", "the only", "No article"], "Honest starts with a vowel sound because h is silent."],
  ["Choose the article: She studies at ___ university in Delhi.", "a", ["an", "at an", "No article"], "University begins with the consonant sound /y/, so use a."],
  ["Choose the article: He completed ___ MBA last year.", "an", ["a", "of", "No article"], "MBA starts with the spoken vowel sound 'em'."],
  ["Choose the article for a general statement: ___ water is essential for life.", "No article", ["A", "An", "These"], "Use no article with uncountable water when speaking generally."],
  ["Choose the article: ___ Sun rises in the east.", "The", ["A", "An", "These"], "Use the for the Sun, the unique object meant here."],
  ["Choose the article: We saw ___ elephant near the forest.", "an", ["a", "at", "No article"], "Elephant starts with a vowel sound and is a singular count noun."],
  ["Choose the article: It was ___ useful suggestion.", "a", ["an", "of", "No article"], "Useful begins with the consonant sound /y/, so use a."],
  ["Choose the article: She bought ___ one-way ticket.", "a", ["an", "of an", "No article"], "One begins with the consonant sound /w/."],
  ["Choose the article: He is ___ European researcher.", "a", ["an", "at", "No article"], "European begins with a /y/ consonant sound, so use a."],
  ["Choose the article: This is ___ best answer of all.", "the", ["a", "an", "No article"], "A superlative such as best normally takes the."],
  ["Choose the preposition: The meeting starts ___ 9 a.m.", "at", ["in", "on", "to"], "Use at with a specific clock time."],
  ["Choose the preposition: She was born ___ July.", "in", ["on", "at", "to"], "Use in with a month."],
  ["Choose the preposition: The keys are ___ the table's surface.", "on", ["in", "at", "through"], "On describes contact with the surface."],
  ["Choose the preposition: Divide the sweets equally ___ the two children.", "between", ["amongst all", "through", "across from"], "Between is appropriate when identifying the two recipients."],
  ["Choose the preposition: She is responsible ___ maintaining the records.", "for", ["of", "to at", "in on"], "The adjective-preposition combination is responsible for."],
  ["Choose the preposition: The result depends ___ your preparation.", "on", ["at", "in", "of"], "The standard expression is depend on."],
  ["Choose the preposition: He is afraid ___ heights.", "of", ["to", "on", "at"], "The standard expression is afraid of."],
  ["Choose the preposition: She has been absent ___ class for two days.", "from", ["to", "on", "by"], "Use absent from a place or activity."],
  ["Choose the preposition: They travelled to Mumbai ___ train.", "by", ["on a by", "in by", "at"], "By train identifies the means of transport without an article."],
  ["Choose the preposition: Please listen ___ the speaker.", "to", ["on", "at", "of"], "The verb listen is followed by to before its object."],
];

const completions: Row[] = [
  ["Complete the sentence: Although she was tired, ___.", "she completed the assignment", ["because tired", "although the assignment", "despite she tired"], "Although introduces a contrast: tiredness contrasts with finishing the assignment."],
  ["Complete the sentence: He missed the bus because ___.", "he left home late", ["because the bus", "although missed", "despite he"], "Because needs a clause giving a reason for missing the bus."],
  ["Complete the sentence: If you revise regularly, ___.", "you will remember the concepts better", ["you remembering better", "because revision", "although you will"], "A present-tense condition can take a will-clause describing the likely result."],
  ["Complete the sentence: The library was closed, so ___.", "we returned the next morning", ["because it closed", "although the morning", "despite returned"], "So introduces the result of the library being closed."],
  ["Complete the sentence: Despite the heavy rain, ___.", "the match continued", ["because the match", "although rain", "despite it continued because"], "Despite takes a noun phrase and is followed here by the main clause."],
  ["Complete the sentence: She saved her work frequently so that ___.", "she would not lose her progress", ["because she saved", "despite her work", "although so"], "So that introduces the purpose of saving frequently."],
  ["Complete the sentence: The instructions were clear; therefore, ___.", "we followed them without confusion", ["because instructions", "although clear", "despite therefore"], "Therefore introduces a consequence of the instructions being clear."],
  ["Complete the sentence: Unless you submit the form, ___.", "you cannot register for the test", ["because the test", "despite submission", "although form"], "Unless means if not, making submission a necessary condition for registration."],
  ["Complete the sentence: While I was reading, ___.", "my phone rang", ["because a book", "despite the phone", "although reading was"], "The while-clause describes an ongoing action during which another event occurred."],
  ["Complete the sentence: As soon as the results were announced, ___.", "the students checked their scores", ["because announcement", "although results", "despite were"], "As soon as introduces an event followed immediately by the main-clause action."],
  ["Complete the sentence: He practised speaking daily in order to ___.", "improve his communication skills", ["improving he", "because communication", "although his skills"], "In order to is followed by a base verb expressing purpose."],
  ["Complete the sentence: She had already left when ___.", "I reached the office", ["because reaching", "although she", "despite when"], "The past perfect left precedes the simple past action reached."],
  ["Complete the sentence: Neither the teacher nor the students ___.", "were late for class", ["was late for class yesterday are", "is being late yesterday", "has arrive late"], "With neither ... nor, the verb here agrees with the nearer plural subject students."],
  ["Complete the sentence: Not only did she finish the task, but she also ___.", "checked it for errors", ["checking it for errors", "because checked", "although the errors"], "The second part needs a finite verb parallel to the completed action."],
  ["Complete the sentence: The faster you type accurately, ___.", "the sooner you can finish the report", ["because finish sooner", "although the report", "despite you type"], "The comparative pattern is the ... the ... to show linked changes."],
  ["Complete the sentence: Since the server was unavailable, ___.", "we postponed the upload", ["because uploading", "although unavailable", "despite the server was"], "Since introduces a reason here, followed by the resulting main clause."],
  ["Complete the sentence: I prefer reading a book to ___.", "watching television", ["watch television to", "watched television", "to watching to"], "Prefer doing one activity to doing another uses parallel gerunds."],
  ["Complete the sentence: We will start the session after ___.", "everyone arrives", ["everyone arriving", "everyone arrive", "everyone have arrived are"], "A future time clause introduced by after uses the present tense arrives."],
  ["Complete the sentence: The explanation was so helpful that ___.", "I understood the method", ["because the method", "although helpful", "despite understood"], "So ... that links the degree of helpfulness to its result."],
  ["Complete the sentence: Even though the route was longer, ___.", "it was safer at night", ["because route", "although longer than", "despite it longer"], "Even though introduces a concession, followed by a complete contrasting clause."],
];

const stories = [
  ["Anita wanted to learn coding.", "She enrolled in a beginner's course.", "After several weeks, she built a calculator.", "The project increased her confidence."],
  ["A village faced a water shortage.", "Its residents built a rainwater tank.", "The tank filled during the monsoon.", "Stored water helped them through the summer."],
  ["Rohan noticed litter in the park.", "He invited his friends to organise a cleanup.", "Together, they collected the scattered waste.", "The park became pleasant to visit again."],
  ["Mira planned to apply for internships.", "She updated her resume with recent projects.", "Then she sent applications to suitable roles.", "Two companies invited her for interviews."],
  ["A school decided to start a garden.", "The students planted seeds in prepared beds.", "They watered the beds every morning.", "Soon, small green shoots appeared."],
  ["Dev missed an important deadline.", "He bought a planner to organise his work.", "He began noting due dates in it.", "The new habit helped him submit tasks on time."],
  ["A library received a box of donated books.", "The librarian sorted them by subject.", "She placed them on the appropriate shelves.", "Readers could then borrow the new additions."],
  ["Isha wanted to improve her speaking skills.", "She joined a weekly discussion group.", "At each meeting, she practised presenting an idea.", "Over time, she became more fluent."],
  ["The town's bridge was damaged in a storm.", "Engineers inspected it the next day.", "Their report recommended urgent repairs.", "The council approved funds for the work."],
  ["A company introduced a new app.", "It invited a small group to test the features.", "The group reported several problems.", "Developers fixed them before the public launch."],
  ["Kavya found an old bicycle in the garage.", "She cleaned it and repaired the brakes.", "The following morning, she rode it to college.", "Cycling soon became part of her routine."],
  ["A shop had difficulty tracking its stock.", "The owner installed inventory software.", "Employees began recording each sale in it.", "The owner could then identify items needing restocking."],
  ["Arun wanted to prepare for a long run.", "He created a gradual training schedule.", "Each week, he increased his running distance.", "After three months, he completed the event."],
  ["A team received a challenging assignment.", "Its members divided the work into smaller tasks.", "Each person completed an assigned part.", "They combined their work into a final report."],
  ["A bus route became overcrowded.", "The transport office surveyed its passengers.", "The survey showed high demand during mornings.", "Extra morning buses were added to the route."],
  ["Neha accidentally deleted a file.", "She checked her cloud backup.", "A recent copy was available there.", "She restored it and resumed her work."],
  ["A college wanted to reduce electricity use.", "It replaced old lamps with efficient lights.", "Staff also switched off unused equipment.", "The next bill showed lower consumption."],
  ["A farmer noticed pests on the crop.", "She consulted an agricultural adviser.", "The adviser suggested a suitable treatment.", "After treatment, the crop began recovering."],
  ["A museum planned an exhibition.", "Curators selected objects from its collection.", "They arranged the objects with explanatory labels.", "Visitors explored the exhibition when it opened."],
  ["Sana decided to learn a new language.", "She began practising a few words each day.", "Later, she used them in short conversations.", "Regular practice gradually improved her vocabulary."],
];

const passages: { text: string; questions: Row[] }[] = [
  { text: "The campus library extended its evening hours during examinations. Students who attended classes during the day could now study there after dinner. The extension was introduced for the examination month only.", questions: [
    ["Why did the campus library extend its evening hours?", "To give daytime students more study access", ["To replace daytime classes", "To stop lending books", "To sell dinner"], "The passage connects evening access with students attending classes during the day."],
    ["How long was the library's extended schedule intended to last?", "The examination month", ["One evening", "Every month permanently", "An entire decade"], "The final sentence explicitly limits the extension to the examination month."],
  ] },
  { text: "A housing society installed rainwater collection tanks. The collected water was used for gardening rather than drinking. During the next dry season, the society needed less water from outside suppliers.", questions: [
    ["What was the collected rainwater used for?", "Gardening", ["Drinking", "Running buses", "Cooking in restaurants"], "The passage explicitly identifies gardening as the use."],
    ["What benefit did the housing society observe in the dry season?", "It needed less externally supplied water", ["It stopped all gardening", "Its tanks produced drinking water", "Rain fell every day"], "The last sentence reports reduced dependence on outside suppliers."],
  ] },
  { text: "Leela revised for twenty minutes each morning instead of studying everything on the last day. She kept a notebook of mistakes and reviewed it weekly. Over time, she repeated fewer errors in practice tests.", questions: [
    ["What did Leela record in her notebook?", "Her mistakes", ["Only examination dates", "Bus timetables", "Other students' names"], "The passage calls it a notebook of mistakes."],
    ["Which idea best describes Leela's study approach?", "Regular revision with attention to errors", ["Avoiding all practice tests", "Studying only on the last day", "Ignoring previous errors"], "Daily revision and weekly error review are the two habits described."],
  ] },
  { text: "The town added two buses to a busy route during morning rush hours. An initial survey had shown long waits between 8 and 10 a.m. After the change, passengers reported shorter queues at the main stop.", questions: [
    ["What information led the town to add morning buses?", "A survey showing long morning waits", ["A fall in ticket prices", "A complete lack of passengers", "A plan to close the route"], "The survey identified long waits between 8 and 10 a.m."],
    ["What did passengers report after the bus change?", "Shorter queues at the main stop", ["No buses on the route", "Longer journeys on every road", "Free tickets for everyone"], "The passage reports shorter queues, without claiming the other outcomes."],
  ] },
  { text: "Students grew two sets of seedlings using the same soil and amount of water. One set received sunlight while the other stayed in a dark cupboard. After two weeks, the sunlit seedlings were greener and stronger.", questions: [
    ["Which condition differed between the two sets of seedlings?", "Exposure to light", ["The soil used", "The amount of water", "The observation period"], "The passage holds soil and water constant while changing light exposure."],
    ["What was observed after two weeks in the seedling experiment?", "Sunlit seedlings were greener and stronger", ["Both sets received no water", "The dark seedlings grew fruit", "No differences were observed"], "The final sentence directly states the observation."],
  ] },
  { text: "A design team began backing up its files automatically every evening. When one computer failed, the team restored the previous evening's copies. Some work from that morning had to be recreated because it had not yet been backed up.", questions: [
    ["How frequently did the design team back up its files?", "Every evening", ["Only once a year", "Every minute", "Only after a computer failed"], "The backup schedule is explicitly described as every evening."],
    ["Why did the design team recreate some work?", "That morning's work was newer than the latest backup", ["All backups had been deleted", "The backups were a year old", "The team never used backups"], "The latest backup was from the previous evening, so morning changes were missing."],
  ] },
  { text: "A hostel fitted motion sensors to corridor lights. The lights switched on when someone entered and switched off after the corridor was empty for several minutes. Electricity use fell without requiring residents to walk through dark corridors.", questions: [
    ["What caused the hostel's corridor lights to switch on?", "Someone entering the corridor", ["A library closing", "The end of the month", "A resident paying a bill"], "The sensors switched lights on when someone entered."],
    ["What was the main result of fitting motion sensors?", "Lower electricity use while keeping occupied corridors lit", ["All lights stayed off permanently", "Residents stopped using the corridors", "Electricity became free"], "The final sentence describes savings while preserving lighting for residents."],
  ] },
  { text: "Before starting a group project, the team listed tasks and assigned an owner to each one. Members shared short progress updates twice a week. When a task fell behind, others could offer help before the deadline.", questions: [
    ["What did the project team do before beginning its work?", "Listed tasks and assigned their owners", ["Submitted the final report", "Cancelled all meetings", "Removed the deadline"], "The first sentence states the initial planning step."],
    ["How did progress updates help the project team?", "They made delays visible early enough for others to help", ["They guaranteed every task was easy", "They eliminated all deadlines", "They replaced the project itself"], "Updates enabled help when tasks fell behind before the deadline."],
  ] },
  { text: "A cafeteria measured the food left on plates for a week. It then offered smaller portions with the option of a free second serving. Plate waste decreased, while students who wanted more food could still request it.", questions: [
    ["What did the cafeteria measure before changing its servings?", "Food left on plates", ["The number of classroom chairs", "Students' exam scores", "The height of serving tables"], "The opening sentence describes measuring plate waste."],
    ["How did the cafeteria address students who wanted more food?", "It offered a free second serving", ["It banned additional food", "It doubled every initial portion", "It closed the dining area"], "The new policy explicitly allowed a free second serving."],
  ] },
  { text: "A training centre recorded its lessons and made the recordings available to enrolled learners. Students with unreliable internet could download lessons when their connection improved. Live question sessions were still held each Friday.", questions: [
    ["Why were downloadable lessons useful to some training-centre learners?", "They could access lessons despite unreliable internet", ["They no longer needed to enrol", "They received a guaranteed job", "They could change the lesson content"], "Learners could download lessons when their connection improved."],
    ["What continued each Friday at the training centre?", "Live question sessions", ["Permanent closure of the centre", "Removal of all recordings", "Compulsory travel to another city"], "The final sentence says live question sessions were still held each Friday."],
  ] },
];

export const verbalQuestions = {
  grammar: rows("grammar", grammar),
  synonyms: rows("synonyms", synonyms),
  antonyms: rows("antonyms", antonyms),
  "fill-in-the-blanks": rows("fill-in-the-blanks", blanks),
  "prepositions-and-articles": rows("prepositions-and-articles", prepositions),
  "sentence-completion": rows("sentence-completion", completions),
  "para-jumbles": stories.map((story, i) => {
    const labels = ["P", "Q", "R", "S"], order = labels.map((_, n) => labels[(n + i) % 4]);
    if (i % 2) [order[1], order[2]] = [order[2], order[1]];
    const answer = order.join("");
    const question = `Arrange these sentences in the most coherent order. ${labels.map((label) => `${label}: ${story[order.indexOf(label)]}`).join(" ")}`;
    return mcq("para-jumbles", i, question, answer, [[...order].reverse().join(""), [order[1], order[0], order[2], order[3]].join(""), [order[0], order[1], order[3], order[2]].join("")], [`Start with ${order[0]}, which introduces the subject and situation.`, `Then follow the cause, action and outcome: ${order.join(" → ")}.`, story.join(" ")]);
  }),
  "reading-comprehension": passages.flatMap((passage, passageIndex) => passage.questions.map(([question, answer, wrong, reason], questionIndex) => mcq("reading-comprehension", passageIndex * 2 + questionIndex, question, answer, wrong, [reason], { passage: passage.text }))),
};
