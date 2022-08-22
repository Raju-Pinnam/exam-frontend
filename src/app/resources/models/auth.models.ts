export interface QuestionPaper{
    "total_marks": number,
    "cut_off_marks": number,
    "subject__subject_name": string,
    "is_checker_approved": boolean,
    "is_examinar_approved": boolean,
    "checker_review": string|null,
    "examiner_review": string|null,
    "question": [],
    "answers": []
}