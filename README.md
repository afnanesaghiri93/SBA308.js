# SBA308.js
<<<<<<< HEAD

SBA 308: JavaScript Fundamentals
 =>Calculates the average scores of learners, considering submission dates and due date .
 Our goal is to analyze and transform this data such that the output of your program is an array of objects, each containing the following information in the following format: { // the ID of the learner for which this data has been collected "id": number, // the learner’s total, weighted average, in which assignments // with more points_possible should be counted for more // e.g. a learner with 50/100 on one assignment and 190/200 on another // would have a weighted average score of 240/300 = 80%. "avg": number, // each assignment should have a key with its ID, // and the value associated with it should be the percentage that // the learner scored on the assignment (submission.score / points_possible) <assignment_id>: number, // if an assignment is not yet due, it should not be included in either // the average or the keyed dictionary of scores }



 Output: [ { '1': 0.94, '2': 1, id: 125, avg: 0.985 }, { '1': 0.78, '2': 0.8333333333333334, id: 132, avg: 0.82 } ]
=======
SBA 308: JavaScript Fundamentals
=>Calculates the average scores of learners, considering submission dates and due date
Our goal is to analyze and transform this data such that the output of your program is an array of objects, each containing the following information in the following format:
{
    // the ID of the learner for which this data has been collected
    "id": number,
    // the learner’s total, weighted average, in which assignments
    // with more points_possible should be counted for more
    // e.g. a learner with 50/100 on one assignment and 190/200 on another
    // would have a weighted average score of 240/300 = 80%.
    "avg": number,
    // each assignment should have a key with its ID,
    // and the value associated with it should be the percentage that
    // the learner scored on the assignment (submission.score / points_possible)
    <assignment_id>: number,
    // if an assignment is not yet due, it should not be included in either
    // the average or the keyed dictionary of scores
}
Output:
[
  { '1': 0.94, '2': 1, id: 125, avg: 0.985 },
  { '1': 0.78, '2': 0.8333333333333334, id: 132, avg: 0.82 }
]
>>>>>>> c11ae2f560bd5d9888e80538c346ba74e20458a1
