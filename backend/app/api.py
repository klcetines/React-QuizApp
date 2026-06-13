from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:5173",
]

class Question(BaseModel):
    id: int
    question: str
    answers: list[str]

class Answer(BaseModel):
    question_id: int
    answer: str

class Submission(BaseModel):
    answers: list[Answer]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

questions = {
    1: {"question": "What is the capital of France?", "answers": ["Lisbon", "Paris", "Seoul"], "correct": "Paris"},
    2: {"question": "What is 2 + 2?", "answers": ["4.5", "4", "5"], "correct": "4"},
    3: {"question": "What is the bird that shares name with a fruit?", "answers": ["Zebra", "Orange", "Kiwi"], "correct": "Kiwi"},
    4: {"question": "When was the first 'Dungeons and Dragons' boxed set published?", "answers": ["1974", "1991", "1982"], "correct": "1974"},
    5: {"question": "Which three countries make up Scandinavia?", "answers": ["Sweden, Norway and Finland", "Latvia, Estonia and Finland", "Norway, Sweden and Denmark"], "correct": "Norway, Sweden and Denmark"},   
}

@app.get("/")
def read_root():
    return {"Welcome to": "Kiz APP"}

@app.get("/question/{qid}")
async def get_question(qid: int):
    if qid not in questions:
        raise HTTPException(status_code=404, detail="Question not found")

    return Question(id=qid, question=questions[qid]["question"], answers=questions[qid]["answers"])

@app.get("/questions")
async def get_questions():
    res = []
    for qid in questions:
        res.append(Question(id=qid, question=questions[qid]["question"], answers=questions[qid]["answers"]))
    
    return res

@app.post("/submissions")
async def submit_answer_list(submission: Submission):
    score = 0
    for answer in submission.answers:
        if(answer.question_id not in questions):
            raise HTTPException(status_code=404, detail="Question not found with ID  " + str(answer.question_id))
        else:
            if(answer.answer == questions[answer.question_id]["correct"]):
                score += 1
    return {"score" : score, "total": len(submission.answers)}