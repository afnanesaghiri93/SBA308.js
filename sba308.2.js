function getLearnerData(course, ag, iSubmissions) {
    const submissions = [...iSubmissions];
    const results = [];

    function calculateScorePercentage(submission, assignment) {
        const dueDate = new Date(assignment.due_at);
        const submittedDate = new Date(submission.submission.submitted_at);
        const currentDate = new Date();

        if (dueDate > currentDate) return null;
        if (submittedDate > dueDate) {
            submission.submission.score -= Math.ceil(assignment.points_possible * 0.1); // Late penalty
        }

        if (assignment.points_possible === 0) {
            throw new Error(`Points possible can't be 0`);
        }

        const scorePercentage = (submission.submission.score / assignment.points_possible);
        return scorePercentage;
    }

    // validate assignmentgroup actually belongs to the course
    if (course.id !== ag.course_id) {
        return [{
            "error_code": 1,
            "message": "Group assignment doesn't belong to the course"
        }];
    }

    // validate course ids
    const validSubmissionAssignments = submissions.filter(submission => {
        return validateCourseId(ag, submission);
    });
    
    for (const submission of submissions) {
        if (submission.invalid || submission.alreadyProcessed) continue;
        // for current learner calculate avg
        const learner_id = submission.learner_id;
        let total_score = 0;
        let total_max_score = 0;
        const assignmentScores = {};

        validSubmissionAssignments.forEach(sub => {
            if (sub.learner_id !== learner_id || sub.invalid || sub.alreadyProcessed) return;
    
            const assignment = ag.assignments.find(asst => asst.id === sub.assignment_id);
            if (!assignment) return; // Assignment not found, skip
    
            const scorePercentage = calculateScorePercentage(sub, assignment);
            if (scorePercentage === null) return; // Skip if assignment not yet due
    
            assignmentScores[sub.assignment_id] = scorePercentage;
            total_score += scorePercentage * assignment.points_possible;
            total_max_score += assignment.points_possible;
    
            sub.alreadyProcessed = true;
        });
        try {
            if (total_max_score === 0) {
                continue; 
            }
            const avg = total_score / total_max_score;
            const result = {
                "id": learner_id,
                "avg": avg,
            }
            Object.keys(assignmentScores).forEach(key => {
                result[key] = assignmentScores[key];
            });
            results.push(result);
        } catch (e) {
            console.error(e);
        }
    }
    return results;
}

function validateCourseId(ag, submission) {
    let assignmentFound = false;
    for (const assignment of ag.assignments) {
        if ( submission.assignment_id === assignment.id ) {
            assignmentFound = true;
            break;
        }
    }
    return assignmentFound;
}

module.exports = {
    getLearnerData
}