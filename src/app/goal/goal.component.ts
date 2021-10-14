import { Component, OnInit } from '@angular/core';
import { Goal } from '../goal';
import { GoalService } from '../goal-service/goal.service';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../quote-class/quote';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
  
 /*  goals: Goal[] = [
    {id:1, name:'Watch finding Nemo',description:'Find an online version and watch merlin find his son'},
    {id:2,name:'Buy Cookies',description:'I have to buy cookies for the parrot'},
    {id:3,name:'Get new Phone Case',description:'Diana has her birthday coming up soon'},
    {id:4,name:'Get Dog Food',description:'Pupper likes expensive sancks'},
    {id:5,name:'Solve math homework',description:'Damn Math'},
    {id:6,name:'Plot my world domination plan',description:'Cause I am an evil overlord'},
  ]; */
  /**goals: Goal[] = [
    new Goal(1, 'Watch finding Nemo', 'Find an online version and watch merlin find his son'),
    new Goal(2,'Buy Cookies','I have to buy cookies for the parrot'),
    new Goal(3,'Get new Phone Case','Diana has her birthday coming up soon'),
    new Goal(4,'Get Dog Food','Pupper likes expensive snacks'),
    new Goal(5,'Solve math homework','Damn Math'),
    new Goal(6,'Plot my world domination plan','Cause I am an evil overlord'),
  ]; */
  goals:Goal[];
  quote!: Quote;
  

  /**addNewGoal(goal: any){
    let goalLength = this.goals.length;
    goal.id = goalLength+1;
    goal.completeDate = new Date(goal.completeDate)
    this.goals.push(goal)
  } */

  toggleDetails(index: any){
    this.goals[index].showDescription = !this.goals[index].showDescription;
  }

  constructor(goalService:GoalService, private http:HttpClient) {
    this.goals = goalService.getGoals()
   }

  ngOnInit(){
    interface ApiResponse{
      author:string;
      quote:string;
    }

    
    this.http.get<ApiResponse>("http://quotes.stormconsultancy.co.uk/random.json").subscribe(data=>{
      // Succesful API request
      this.quote = new Quote(data.author, data.quote)
    },err=>{
        this.quote = new Quote("Winston Churchill","Never never give up!")
        console.log("An error occurred")  //error handling
    })
  }

}
