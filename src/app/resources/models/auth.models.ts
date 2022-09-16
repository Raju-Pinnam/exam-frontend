export interface QuestionPaper{
    "id": number,
    "total_marks": number,
    "cut_off_marks": number,
    "subject__subject_name": string,
    "is_checker_approved": boolean,
    "is_examinar_approved": boolean,
    "checker_review": string|null,
    "examiner_review": string|null,
    "question": [],
    "question_ids": [],
    "answers": [],
    "is_examiner_pending": boolean,
    "is_checker_pending": boolean,
    "is_sent_for_cheeck": boolean,
    "setter__username": string|any,
    "checker__username": string|any,
    "examiner__username": string|any
}

export interface SubjectModel{
    "id": number,
    "subject_name": string,
}

export interface TestPaper{
    "questions": [],
    "cut_off_marks": number,
}

export interface TokenObj{
    token: string
}


export interface UserObj{
    "id": number,
    "user_id": number,
    "username": string,
    "first_name": string,
    "last_name": string,
    "email": string,
    "contact": string,
    "subject": string,
    "subject_id": number,
    "profile_choice": string,
}

export interface QuestionModel {
    
        "id": number,
        "question": string,
        "question_marks": number,
        "is_delete": boolean,
        "is_active": boolean,
}