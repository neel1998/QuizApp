package main

import (
   "fmt"
   "github.com/gin-contrib/cors"                        
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite" 
)

var db *gorm.DB                                         
var err error



type Question struct {
   ID uint `json:"id"`
   Que string `json:"Que"`
   Op1 string `json:"Op1"`
   Op2 string `json:"Op2"`
   Op3 string `json:"Op3"`
   Ans1 int `json:"Ans1"`
   Ans2 int `json:"Ans2"`
   Ans3 int `json:"Ans3"`
   Category string `json:"Category"`
   QuizName string `json:"QuizName"`
}

type User struct {
   ID uint `json:"id"`
   Name string `json:"Name"`
   Username string `json:"Username"`
   Password string `json:"Password"`
   Score int `json:"Score"`
   Rank int `json:"Rank"`
   Admin string `json:"Admin"`
   MovieScore int `json:"MovieScore"`
   GeneralScore int `json:"GeneralScore"`
   PoliticsScore int `json:"PoliticsScore"`
   SportsScore int `json:"SportsScore"`
}

type QuizData struct{
	ID uint `json:"id"`
	Username string `json:"Username"`
   Category string `json:"Category"`
   QuizName string `json:"QuizName"`
	Score int `json:"Score"`
}

func main() {
   db, err = gorm.Open("sqlite3", "./gorm.db")
   if err != nil {
      fmt.Println(err)
   }
   defer db.Close()

   db.AutoMigrate(&Question{})
   db.AutoMigrate(&User{})
   db.AutoMigrate(&QuizData{})

   r := gin.Default()
   r.GET("/question/:QuizName", GetQuiz)                            
   r.POST("/question", CreateQuestion)
   r.GET("/question/", GetQuestions)         
   r.DELETE("/question/:id", DeleteQuestion)
   r.PUT("/question/:id", EditQuestion)
   r.GET("/singleQ/:id", GetSingleQuestion)

   r.DELETE("/deletequiz/:QuizName/:Category", DeleteQuiz)

   r.GET("/user/",GetUsers)
   r.GET("/user/:Username",GetSingleUser)
   r.GET("/board/:score",GetUsersByCat) 
   r.POST("/user",AddUser)
   r.PUT("/score/:Username",UpdateUser)
   r.DELETE("/user/:id", DeleteUser)
   
   r.GET("/quizdata/",GetQuizData)
   r.PUT("/quizdata/:Username/:QuizName/:Category",PutQuizData)

   r.Use((cors.Default()))
   r.Run(":8080")                                           
}
func EditQuestion(c *gin.Context) {
    var q Question
  
   id := c.Params.ByName("id")
   if err := db.Where("id = ?", id).First(&q).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }
   c.BindJSON(&q)
   db.Save(&q)
   c.Header("access-control-allow-origin", "*") 
   c.JSON(200, q)
}
func GetSingleQuestion(c *gin.Context){
   id := c.Params.ByName("id")
   var q Question
   if err := db.Where("id = ?",id).First(&q).Error; err != nil {
      // c.AbortWithStatus(404)
      c.Header("access-control-allow-origin", "*")
      c.JSON(203,"-1")
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, q)
   }
}

func DeleteQuiz(c *gin.Context){
   var qn=c.Params.ByName("QuizName")
   var cat=c.Params.ByName("Category")
    var q []Question
   d := db.Where("quiz_name = ? AND Category= ?",qn,cat).Delete(&q)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, "deleted")

}
func GetQuizData(c *gin.Context){
	var quizData []QuizData
	if err := db.Order("id desc").Find(&quizData).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, quizData)
   }
}

func PutQuizData(c *gin.Context){
   var quizData QuizData
   un := c.Params.ByName("Username")
   qn := c.Params.ByName("QuizName")
   cat := c.Params.ByName("Category")
   if err := db.Where("Username = ? AND quiz_name = ? AND Category = ?", un,qn,cat).First(&quizData).Error; err != nil {
      // c.AbortWithStatus(404)
      // fmt.Println(err)
      c.BindJSON(&quizData)
      db.Create(&quizData)
      c.Header("access-control-allow-origin", "*") 
   } else {
       c.BindJSON(&quizData)
       db.Save(&quizData)
       c.Header("access-control-allow-origin", "*")
   } 
}

func GetUsersByCat(c *gin.Context){
	cat := c.Params.ByName("score")
	condition:=cat+" desc"
	fmt.Println(condition)
	var users []User
   if err := db.Order(condition).Find(&users).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, users)
   }
}

func UpdateUser(c *gin.Context){
   var user User
  
   username := c.Params.ByName("Username")
   if err := db.Where("Username = ?", username).First(&user).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }
   c.BindJSON(&user)
   db.Save(&user)
   c.Header("access-control-allow-origin", "*") 
   c.JSON(200, user)
}


func CreateQuestion(c *gin.Context) {
   var q Question
   c.BindJSON(&q)
   db.Create(&q)
   c.Header("access-control-allow-origin", "*") 
   c.JSON(200, q)
}

func GetQuiz(c *gin.Context) {
   qn := c.Params.ByName("QuizName")
   var ques []Question
   if err := db.Where("quiz_name = ?", qn).Find(&ques).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, ques)
   }
}
func GetSingleUser(c *gin.Context) {
   uname := c.Params.ByName("Username")
   var user User
   if err := db.Where("Username = ?",uname).First(&user).Error; err != nil {
      // c.AbortWithStatus(404)
      c.Header("access-control-allow-origin", "*")
      c.JSON(203,"-1")
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, user)
   }
}

func GetQuestions(c *gin.Context) {
   var ques []Question
   if err := db.Find(&ques).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, ques)
   }
}

func DeleteQuestion(c *gin.Context) {
   id := c.Params.ByName("id")
   var q Question
   d := db.Where("id = ?", id).Delete(&q)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func DeleteUser(c *gin.Context) {
   id := c.Params.ByName("id")
   var u User
   d := db.Where("id = ?", id).Delete(&u)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func AddUser(c *gin.Context) {
   var user User
   c.BindJSON(&user)
   fmt.Println(user.Username)
   db.Create(&user)
   c.Header("access-control-allow-origin", "*") 
   c.JSON(200, user)
}


func GetUsers(c *gin.Context) {
   var users []User
   if err := db.Order("Score desc").Find(&users).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, users)
   }
}

