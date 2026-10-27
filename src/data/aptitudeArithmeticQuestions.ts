import { factorial, fmt, fraction, gcd, mcq, numeric, rupees, twenty } from "./aptitudeQuestionHelpers";

export const arithmeticQuestions = {
  percentages: twenty((i) => {
    const k = Math.floor(i / 4) + 1;
    if (i % 4 === 0) {
      const total = 200 + 100 * k, rate = 10 + 5 * k, answer = total * rate / 100;
      return numeric("percentages", i, `What is ${rate}% of ${total}?`, answer, [`${rate}% means ${rate}/100.`, `${total} × ${rate}/100 = ${answer}.`]);
    }
    if (i % 4 === 1) {
      const total = 100 + 20 * k, score = total * 0.75;
      return numeric("percentages", i, `A student scores ${score} out of ${total}. What is the score as a percentage?`, 75, [`Percentage = (score / total) × 100.`, `(${score}/${total}) × 100 = 75%.`], "%");
    }
    if (i % 4 === 2) {
      const old = 500 + 100 * k, rate = 10 * k, next = old * (1 + rate / 100);
      return numeric("percentages", i, `A monthly bill rises from ${rupees(old)} to ${rupees(next)}. What is the percentage increase?`, rate, [`Increase = ${rupees(next - old)}.`, `Percentage increase = (${fmt(next - old)}/${old}) × 100 = ${rate}%.`], "%");
    }
    const rate = 5 * (k + 1), answer = rate * rate / 100;
    return numeric("percentages", i, `A price increases by ${rate}% and then decreases by ${rate}%. What is the overall percentage decrease?`, answer, ["Use an original price of ₹100.", `The final price is 100 × ${fmt(1 + rate / 100)} × ${fmt(1 - rate / 100)} = ${fmt(100 - answer)}.`, `The decrease is ${fmt(answer)}%.`], "%");
  }),
  "profit-and-loss": twenty((i) => {
    const k = Math.floor(i / 4) + 1, cp = 400 + 200 * k, rate = 10 + 5 * k;
    if (i % 4 === 0) {
      const sp = cp * (1 + rate / 100);
      return numeric("profit-and-loss", i, `An item costs ${rupees(cp)} and sells for ${rupees(sp)}. What is the profit percentage?`, rate, [`Profit = ${rupees(sp)} − ${rupees(cp)} = ${rupees(sp - cp)}.`, `Profit % = (${fmt(sp - cp)}/${cp}) × 100 = ${rate}%.`], "%");
    }
    if (i % 4 === 1) {
      const sp = cp * (1 - rate / 100);
      return numeric("profit-and-loss", i, `A trader buys a bag for ${rupees(cp)} and sells it at a ${rate}% loss. What is the selling price?`, sp, [`Loss = ${rate}% of ${rupees(cp)} = ${rupees(cp - sp)}.`, `Selling price = ${rupees(cp)} − ${rupees(cp - sp)} = ${rupees(sp)}.`], " rupees");
    }
    if (i % 4 === 2) {
      const markup = 20 + 5 * k, answer = (100 + markup) * 0.9 - 100;
      return numeric("profit-and-loss", i, `Goods are marked ${markup}% above cost and sold at a 10% discount on the marked price. What is the profit percentage?`, answer, [`Assume cost price = ₹100; marked price = ${rupees(100 + markup)}.`, `Selling price = ${rupees(100 + markup)} × 0.9 = ${rupees(100 + answer)}.`, `Profit on ₹100 = ${rupees(answer)}, so profit = ${fmt(answer)}%.`], "%");
    }
    const sp = cp * (1 + rate / 100);
    return numeric("profit-and-loss", i, `An article sells for ${rupees(sp)} at a profit of ${rate}%. What was its cost price?`, cp, [`Selling price = cost price × ${fmt(1 + rate / 100)}.`, `Cost price = ${rupees(sp)} / ${fmt(1 + rate / 100)} = ${rupees(cp)}.`], " rupees");
  }),
  "time-and-distance": twenty((i) => {
    const k = Math.floor(i / 4) + 1;
    if (i % 4 === 0) {
      const speed = 35 + 5 * k, hours = k + 2;
      return numeric("time-and-distance", i, `A bus travels ${speed * hours} km in ${hours} hours at a constant speed. What is its speed?`, speed, ["Speed = distance / time.", `${speed * hours} / ${hours} = ${speed} km/h.`], " km/h");
    }
    if (i % 4 === 1) {
      const length = 150 + 30 * k, speed = 36 + 18 * k, seconds = length / (speed * 5 / 18);
      return numeric("time-and-distance", i, `A ${length} m train travels at ${speed} km/h. How long does it take to pass a pole?`, seconds, [`Speed = ${speed} × 5/18 = ${speed * 5 / 18} m/s.`, `Time = train length / speed = ${length}/${speed * 5 / 18} = ${fmt(seconds)} seconds.`], " seconds");
    }
    if (i % 4 === 2) {
      const speed = 30 + 15 * k, answer = 4 * speed / 3;
      return numeric("time-and-distance", i, `A car covers two equal distances at ${speed} km/h and ${2 * speed} km/h. What is the average speed?`, answer, ["For equal distances, average speed = 2uv/(u + v).", `2 × ${speed} × ${2 * speed} / (${speed} + ${2 * speed}) = ${answer} km/h.`], " km/h");
    }
    const down = 12 + 2 * k, up = 8 + 2 * k;
    return numeric("time-and-distance", i, `A boat travels downstream at ${down} km/h and upstream at ${up} km/h. What is its speed in still water?`, (down + up) / 2, ["Downstream speed = boat speed + stream speed; upstream speed = boat speed − stream speed.", `Boat speed = (${down} + ${up})/2 = ${(down + up) / 2} km/h.`], " km/h");
  }),
  "time-and-work": twenty((i) => {
    const k = Math.floor(i / 4) + 1;
    if (i % 4 === 0) return numeric("time-and-work", i, `A completes a job in ${6 * k} days and B in ${3 * k} days. How long do they take together?`, 2 * k, [`Combined daily rate = 1/${6 * k} + 1/${3 * k} = 1/${2 * k}.`, `They complete the job in ${2 * k} days.`], " days");
    if (i % 4 === 1) return numeric("time-and-work", i, `A worker finishes a task in ${8 * k} days. Another worker is twice as efficient. How many days does the second worker need?`, 4 * k, ["Time is inversely proportional to efficiency.", `Twice the rate means half the time: ${8 * k}/2 = ${4 * k} days.`], " days");
    if (i % 4 === 2) return numeric("time-and-work", i, `A needs ${6 * k} days and B needs ${3 * k} days for a job. They work together for ${k} days, then A leaves. How many more days does B need?`, 1.5 * k, [`Work completed = ${k} × (1/${6 * k} + 1/${3 * k}) = 1/2.`, `B needs half of ${3 * k} days to finish the remaining half: ${1.5 * k} days.`], " days");
    return numeric("time-and-work", i, `A pipe fills an empty tank in ${12 * k} hours and a drain empties a full tank in ${24 * k} hours. If both are open, how long does filling take?`, 24 * k, [`Net rate = 1/${12 * k} − 1/${24 * k} = 1/${24 * k} tank per hour.`, `Filling time = ${24 * k} hours.`], " hours");
  }),
  "number-system": twenty((i) => {
    const k = Math.floor(i / 4) + 1;
    if (i % 4 === 0) {
      const power = 2 * k + 1, answer = 7 ** power % 5;
      return numeric("number-system", i, `What is the remainder when 7^${power} is divided by 5?`, answer, ["7 leaves remainder 2 on division by 5, so use powers of 2 modulo 5.", `7^${power} leaves remainder ${answer}.`], "", [0, 1, 2, 3, 4]);
    }
    if (i % 4 === 1) {
      const power = k + 3, digit = 3 ** power % 10;
      return numeric("number-system", i, `What is the units digit of 3^${power}?`, digit, ["The units digits of powers of 3 repeat: 3, 9, 7, 1.", `Exponent ${power} selects units digit ${digit} from this cycle.`], "", [1, 3, 7, 9]);
    }
    if (i % 4 === 2) {
      const digit = (9 - (6 + k) % 9) % 9;
      return numeric("number-system", i, `The number 4${k}2x is divisible by 9. What digit must x represent?`, digit, [`The known digits sum to 4 + ${k} + 2 = ${6 + k}.`, `For divisibility by 9, ${6 + k} + x must be a multiple of 9. Hence x = ${digit}.`], "", [0, 2, 5, 7, 8, 1, 3, 4]);
    }
    const n = k + 3;
    return numeric("number-system", i, `What is the sum of the first ${n} positive odd numbers?`, n * n, ["The sum of the first n positive odd numbers is n².", `For n = ${n}, the sum is ${n}² = ${n * n}.`]);
  }),
  "ratio-and-proportion": twenty((i) => {
    const k = Math.floor(i / 4) + 1, a = k + 1, b = k + 3;
    if (i % 4 === 0) return numeric("ratio-and-proportion", i, `${rupees((a + b) * 100)} is shared in the ratio ${a}:${b}. What is the larger share?`, b * 100, [`Total parts = ${a} + ${b} = ${a + b}. One part = ₹100.`, `Larger share = ${b} × ₹100 = ${rupees(b * 100)}.`], " rupees");
    if (i % 4 === 1) return numeric("ratio-and-proportion", i, `If a:b = ${a}:${b} and b = ${b * 12}, what is a?`, a * 12, [`Scale factor = ${b * 12}/${b} = 12.`, `a = ${a} × 12 = ${a * 12}.`]);
    if (i % 4 === 2) return numeric("ratio-and-proportion", i, `${a} notebooks cost ${rupees(a * 25)}. At the same rate, what do ${b} notebooks cost?`, b * 25, [`Cost of one notebook = ${rupees(a * 25)}/${a} = ₹25.`, `Cost of ${b} notebooks = ${rupees(b * 25)}.`], " rupees");
    return numeric("ratio-and-proportion", i, `${a * 2} equally efficient workers finish a job in ${b * 6} days. How many days will ${a * 3} workers take?`, b * 4, ["Workers × days stays constant for the same work.", `Days = (${a * 2} × ${b * 6})/${a * 3} = ${b * 4}.`], " days");
  }),
  "simple-and-compound-interest": twenty((i) => {
    const k = Math.floor(i / 4) + 1, principal = 2000 + 1000 * k;
    if (i % 4 === 0) return numeric("simple-and-compound-interest", i, `Find the simple interest on ${rupees(principal)} at 5% per year for ${k + 1} years.`, principal * 5 * (k + 1) / 100, ["Simple interest = principal × rate × time / 100.", `${principal} × 5 × ${k + 1}/100 = ${rupees(principal * 5 * (k + 1) / 100)}.`], " rupees");
    if (i % 4 === 1) return numeric("simple-and-compound-interest", i, `What is the compound amount on ${rupees(principal)} at 10% annually after 2 years, with annual compounding?`, principal * 1.21, ["Amount = P(1 + r/100)².", `${principal} × 1.1 × 1.1 = ${rupees(principal * 1.21)}. This includes the principal.`], " rupees");
    if (i % 4 === 2) return numeric("simple-and-compound-interest", i, `The simple interest on ${rupees(principal)} for 2 years is ${rupees(principal / 5)}. What is the annual rate?`, 10, ["Rate = interest × 100 / (principal × time).", `${principal / 5} × 100 / (${principal} × 2) = 10%.`], "%");
    return numeric("simple-and-compound-interest", i, `On ${rupees(principal)} at 10% per year for 2 years, what is compound interest minus simple interest when compounding annually?`, principal / 100, ["For two years, CI − SI = P(r/100)².", `${principal} × (10/100)² = ${rupees(principal / 100)}.`], " rupees");
  }),
  averages: twenty((i) => {
    const k = Math.floor(i / 4) + 1, avg = 12 + 3 * k;
    if (i % 4 === 0) return numeric("averages", i, `What is the average of ${avg - 4}, ${avg - 2}, ${avg}, ${avg + 2} and ${avg + 4}?`, avg, [`Sum = ${5 * avg}. Number of values = 5.`, `Average = ${5 * avg}/5 = ${avg}.`]);
    if (i % 4 === 1) return numeric("averages", i, `The average of 4 numbers is ${avg}. A fifth number, ${avg + 10}, is added. What is the new average?`, avg + 2, [`Original sum = 4 × ${avg} = ${4 * avg}.`, `New average = (${4 * avg} + ${avg + 10})/5 = ${avg + 2}.`]);
    if (i % 4 === 2) return numeric("averages", i, `The average of 5 numbers is ${avg}. Four of them sum to ${4 * avg - 6}. What is the fifth number?`, avg + 6, [`Total sum = 5 × ${avg} = ${5 * avg}.`, `Missing number = ${5 * avg} − ${4 * avg - 6} = ${avg + 6}.`]);
    return numeric("averages", i, `A class of 10 students averages ${avg} marks, and a class of 20 averages ${avg + 6}. What is the combined average?`, avg + 4, [`Combined total = 10 × ${avg} + 20 × ${avg + 6} = ${30 * (avg + 4)}.`, `Combined average = ${30 * (avg + 4)}/30 = ${avg + 4}.`]);
  }),
  probability: twenty((i) => {
    const k = Math.floor(i / 4) + 1;
    if (i % 4 === 0) {
      const red = k + 2, blue = k + 5, total = red + blue;
      return mcq("probability", i, `A bag has ${red} red and ${blue} blue balls. One ball is drawn at random. What is the probability it is red?`, fraction(red, total), [fraction(blue, total), fraction(1, total), "1/2", "1/3"], [`Favourable outcomes = ${red}; total outcomes = ${total}.`, `Probability = ${red}/${total} = ${fraction(red, total)}.`]);
    }
    if (i % 4 === 1) {
      const n = k + 1, total = 2 ** n;
      return mcq("probability", i, `${n} fair coins are tossed independently. What is the probability that all show heads?`, fraction(1, total), [fraction(total - 1, total), "1/2", fraction(1, total + 2), "0"], [`Each coin has probability 1/2 of heads.`, `Multiply ${n} independent probabilities: (1/2)^${n} = 1/${total}.`]);
    }
    if (i % 4 === 2) {
      const faces = [1, 2, 3, 4, 5, 6], threshold = k, count = faces.filter((n) => n > threshold).length;
      return mcq("probability", i, `A fair die is rolled. What is the probability of getting a number greater than ${threshold}?`, fraction(count, 6), [fraction(threshold, 6), "1/6", "1", "0", "1/3"], [`There are ${count} faces greater than ${threshold}.`, `Probability = ${count}/6 = ${fraction(count, 6)}.`]);
    }
    const total = 10 + 2 * k, winner = k;
    return mcq("probability", i, `A box contains ${total} tickets, of which ${winner} win a prize. What is the probability that one randomly chosen ticket does not win?`, fraction(total - winner, total), [fraction(winner, total), "1/2", fraction(1, total), "1"], [`Non-winning tickets = ${total} − ${winner} = ${total - winner}.`, `Probability = ${total - winner}/${total} = ${fraction(total - winner, total)}.`]);
  }),
  "permutation-and-combination": twenty((i) => {
    const k = Math.floor(i / 4) + 1, n = k + 4;
    if (i % 4 === 0) return numeric("permutation-and-combination", i, `How many different pairs can be selected from ${n} students?`, n * (n - 1) / 2, ["Selecting a pair ignores order, so use nC2.", `${n}C2 = ${n} × ${n - 1}/2 = ${n * (n - 1) / 2}.`]);
    if (i % 4 === 1) return numeric("permutation-and-combination", i, `In how many ways can a president and a secretary be chosen from ${n} students, with different people in the two roles?`, n * (n - 1), [`Choose the president in ${n} ways.`, `Choose the secretary from the remaining ${n - 1}. Total = ${n} × ${n - 1} = ${n * (n - 1)}.`]);
    if (i % 4 === 2) return numeric("permutation-and-combination", i, `In how many ways can ${k + 2} different books be arranged in a row?`, factorial(k + 2), ["All books are distinct and order matters.", `Number of arrangements = ${k + 2}! = ${factorial(k + 2)}.`]);
    return numeric("permutation-and-combination", i, `In how many ways can ${k + 3} people sit around a circular table, treating rotations as the same and reflections as different?`, factorial(k + 2), ["Fix one person's position to remove equivalent rotations.", `Arrange the remaining ${k + 2} people in ${k + 2}! = ${factorial(k + 2)} ways.`]);
  }),
  "mixtures-and-alligation": twenty((i) => {
    const k = Math.floor(i / 4) + 1;
    if (i % 4 === 0) {
      const cheap = 80 + 20 * k, dear = cheap + 80, mean = cheap + 30;
      return mcq("mixtures-and-alligation", i, `Rice costing ${rupees(cheap)}/kg is mixed with rice costing ${rupees(dear)}/kg to obtain a ${rupees(mean)}/kg mixture. What is cheaper : dearer quantity?`, "5:3", ["3:5", "1:2", "2:1"], [`Alligation ratio = (${dear} − ${mean}) : (${mean} − ${cheap}) = 50:30.`, "Simplify to 5:3."]);
    }
    if (i % 4 === 1) return numeric("mixtures-and-alligation", i, `${10 + k} litres of milk is mixed with ${5 + k} litres of water. What percentage of the mixture is milk? Give the answer to 2 decimal places if needed.`, (10 + k) / (15 + 2 * k) * 100, [`Total volume = ${15 + 2 * k} litres.`, `Milk percentage = ${10 + k}/${15 + 2 * k} × 100 = ${fmt((10 + k) / (15 + 2 * k) * 100)}%.`], "%");
    if (i % 4 === 2) return numeric("mixtures-and-alligation", i, `A ${20 + 4 * k}-litre mixture contains 25% water. How many litres of water does it contain?`, (20 + 4 * k) / 4, ["Water volume = total volume × water fraction.", `${20 + 4 * k} × 25/100 = ${(20 + 4 * k) / 4} litres.`], " litres");
    const volume = 20 + 10 * k, removed = volume / 5;
    return numeric("mixtures-and-alligation", i, `A container has ${volume} litres of pure milk. ${removed} litres are removed and replaced with water once. How many litres of milk remain?`, volume - removed, [`The removed ${removed} litres are all milk because this is the first replacement.`, `Milk remaining = ${volume} − ${removed} = ${volume - removed} litres.`], " litres");
  }),
  "lcm-and-hcf": twenty((i) => {
    const k = Math.floor(i / 4) + 1, a = 12 * k, b = 18 * k, hcf = gcd(a, b), lcm = a * b / hcf;
    if (i % 4 === 0) return numeric("lcm-and-hcf", i, `What is the HCF of ${a} and ${b}?`, hcf, [`${a} = ${6 * k} × 2 and ${b} = ${6 * k} × 3.`, `Since 2 and 3 are coprime, the HCF is ${hcf}.`]);
    if (i % 4 === 1) return numeric("lcm-and-hcf", i, `What is the LCM of ${a} and ${b}?`, lcm, [`HCF(${a}, ${b}) = ${hcf}.`, `LCM = (${a} × ${b})/${hcf} = ${lcm}.`]);
    if (i % 4 === 2) return numeric("lcm-and-hcf", i, `Two numbers have HCF ${hcf} and LCM ${lcm}. One number is ${a}. What is the other number?`, b, ["For two positive integers, product = HCF × LCM.", `Other number = (${hcf} × ${lcm})/${a} = ${b}.`]);
    return numeric("lcm-and-hcf", i, `Two bells ring every ${a} and ${b} minutes. They ring together now. After how many minutes will they next ring together?`, lcm, ["The next common ringing time is the LCM of the intervals.", `LCM(${a}, ${b}) = ${lcm} minutes.`], " minutes");
  }),
  "problems-on-ages": twenty((i) => {
    const k = Math.floor(i / 4) + 1, son = 8 + 2 * k;
    if (i % 4 === 0) return numeric("problems-on-ages", i, `A father is 3 times as old as his son. In ${son} years, he will be twice as old as his son. What is the son's current age?`, son, [`Let the son's age be x. Then 3x + ${son} = 2(x + ${son}).`, `Simplifying gives x = ${son} years.`], " years");
    if (i % 4 === 1) return numeric("problems-on-ages", i, `Two siblings' ages sum to ${2 * son + 6} years. The older is 6 years older. How old is the younger?`, son, [`Let younger age be x. Then x + (x + 6) = ${2 * son + 6}.`, `2x = ${2 * son}; x = ${son} years.`], " years");
    if (i % 4 === 2) return numeric("problems-on-ages", i, `A mother's present age is ${3 * son}. Her daughter's present age is ${son}. How many years ago was the mother 5 times as old as the daughter?`, son / 2, [`Let the time ago be t: ${3 * son} − t = 5(${son} − t).`, `4t = ${2 * son}, so t = ${son / 2} years.`], " years");
    return numeric("problems-on-ages", i, `The present ages of A and B are in the ratio 2:3 and add to ${5 * son} years. What will B's age be after 5 years?`, 3 * son + 5, [`One ratio part = ${5 * son}/5 = ${son}.`, `B is currently ${3 * son}; after 5 years B will be ${3 * son + 5}.`], " years");
  }),
};
