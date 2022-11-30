//inputs
const budgetInput = document.getElementById("budget-input")
const expenseNameInput = document.getElementById("expense-input")
const expenseAmountInput = document.getElementById("amount-input")
//buttons
const calculateBtn = document.getElementById("budget-submit")
const expenseBtn = document.getElementById("expense-submit")
//parent of form
const expenseList = document.getElementById("expense-list")
//forms
const budgetForm = document.getElementById("budget-form")
const expenseForm = document.getElementById("expense-form")
//alerts
const budgetFeedback = document.querySelector(".budget-feedback")
const expenseFeedback = document.querySelector(".expense-feedback")
//right side of the page
const budget = document.getElementById("budget-amount")
const expense = document.getElementById("expense-amount")
const balance = document.getElementById("balance-amount")
//tables content of expense
const expenseTitle = document.querySelectorAll(".expense-title")
//id
const id = new Date().getTime().toString()
//calculator-expenses and balance
let sumExpenseValue = 0;
//Budget form
budgetForm.addEventListener("submit", function(e){
  e.preventDefault()
  if(budgetInput.value !== ""){   //work without alert
    budget.innerHTML = budgetInput.value  //we show just budget here. expenses is shown in Expense form
    balance.innerHTML = Number(budget.innerHTML) - Number(expense.innerHTML)
    //clear input
    budgetInput.value = ""
  }
  else{  //alert
    budgetFeedback.classList.add("showItem")
    budgetFeedback.innerHTML = "Value Cannot Be Empty or Negative"
    setTimeout(() => {
      budgetFeedback.classList.remove("showItem")
    }, 3000);
  }
})
//Expense form
expenseForm.addEventListener("submit", function(e){
  e.preventDefault()
  if(expenseNameInput.value !== "" && expenseAmountInput.value !==""){ //work without alert
    const element = document.createElement("div")
    element.classList.add("expense")
    element.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">
    <h6 class="expense-title mb-0 text-uppercase list-item">-${expenseNameInput.value}</h6>
    <h5 class="expense-amount mb-0 list-item">${expenseAmountInput.value}</h5>
    <div class="expense-icons list-item">
    <a href="#" class="edit-icon mx-2" style = "cursor: pointer" data-id="${expense.id}">
      <i class="fas fa-edit"></i>
    </a>
    <a href="#" class="delete-icon" style = "cursor: pointer" data-id="${expense.id}">
      <i class="fas fa-trash"></i>
    </a>
    </div>
    </div>
    </div>`

    expenseList.appendChild(element)
    //clear input
    expenseNameInput.value = ""
    expenseAmountInput.value = ""
    //calculate expenses-sum
    const expenseValue = element.querySelector(".expense-amount")
    sumExpenseValue += Number(expenseValue.innerHTML)    //Number() converts a value to a number
    console.log(sumExpenseValue)
    expense.innerHTML = sumExpenseValue   //write the sum of the expenses values in expenses
    //calculate balance--substract
    balance.innerHTML = Number(budget.innerHTML) - Number(expense.innerHTML)
    //delete each button
    const deleteBtn = element.querySelector(".delete-icon")
    console.log(deleteBtn)
    deleteBtn.addEventListener("click", function(){
      expenseList.removeChild(element)
      //update expenses--subtract from expenses
      sumExpenseValue -= Number(expenseValue.innerHTML)
      expense.innerHTML = sumExpenseValue 
      //update balance--budget-expenses = balance
      balance.innerHTML = Number(budget.innerHTML) - Number(expense.innerHTML)
    })
    //edit each button
    const editBtn = element.querySelector(".edit-icon")
    editBtn.addEventListener("click", function(){
      console.log(editBtn)
      let findExpenseTitleFromEditBtn = editBtn.parentElement.parentElement.childNodes[1].textContent
      expenseNameInput.value = findExpenseTitleFromEditBtn
      let findExpenseValueFromEditBtn = editBtn.parentElement.parentElement.childNodes[3].textContent
      expenseAmountInput.value = findExpenseValueFromEditBtn
      //remove the edited line from the table
      expenseList.removeChild(element)
      //clear the expenses ($0) after clicking the edit button*****************
      expense.innerHTML = "0"
      //update balance after edit
      balance.innerHTML = Number(budget.innerHTML) - Number(expense.innerHTML)
    })
  }   
  
  else{  //alert
    expenseFeedback.classList.add("showItem")
    expenseFeedback.innerHTML = " Value Cannot Be Empty or Negative"
    setTimeout(() => {
      expenseFeedback.classList.remove("showItem")
    }, 3000);
  }

})  


