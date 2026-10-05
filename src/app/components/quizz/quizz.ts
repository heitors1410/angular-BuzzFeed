import { Component, OnInit } from '@angular/core';
import quizz_quentions from "../../../../public/data/quizz_question.json"
@Component({
  selector: 'app-quizz',
  standalone: false,
  styleUrl: './quizz.css',
  templateUrl: './quizz.html',
})
export class Quizz implements OnInit{


  title:string = ""

  questions:any
  questionSelected:any


  answers:string[] = []
  answersSelected:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  ngOnInit(): void {
    if(quizz_quentions){
      this.finished=false
      this.title = quizz_quentions.title

      this.questions = quizz_quentions.questions
      this.questionSelected = this.questions[this.questionIndex]
      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }

  }
playerChoose(value:string) {
  this.answers.push(value)
  this.nextStep()
}

async nextStep(){
  this.questionIndex+=1

  if(this,this.questionMaxIndex>this.questionIndex){
    this.questionSelected = this.questions[this.questionIndex]
  }else{
    const finalAnswer:string = await this.checkResult(this.answers)
    this.finished = true
    this.answersSelected = quizz_quentions.results[finalAnswer as keyof typeof quizz_quentions.results ]
    console.log(this.answers);
  }

}

async checkResult(answers:string[]){
  const result = answers.reduce((previous, current, i, arr)=>{
    if (
      arr.filter(item => item === previous).length >
      arr.filter(item => item === current).length
    ){
      return previous
    }else{
      return current
    }
  })
  return result
}


}
