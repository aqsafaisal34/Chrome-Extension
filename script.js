// const saveLead = () => {
//     console.log("button clicked")
// }
// we can do the same thing with addevent listener instead of onclick attribute
let myLeads = [];
const inputBtn = document.querySelector("#input-btn");
const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector("#ul-el")
const deleteBtn = document.querySelector("#delete-btn")
const tabBtn = document.getElementById("tab-btn")


// Get the leads from the localStorage - PS: JSON.parse()
// Store it in a variable, leadsFromLocalStorage
// Log out the variable
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
console.log(leadsFromLocalStorage)

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    Render(myLeads)
}
// save the current tab
tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        Render(myLeads)
    })
})



deleteBtn.addEventListener("dblclick", function() {
    console.log("double clicked!")
    localStorage.clear()
    myLeads = []
    Render(myLeads)
})


inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    // save myLeads to local storage
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    Render(myLeads)
    // To verify that it works:
    console.log(localStorage.getItem("myLeads") )
})

function Render (leads) {
let listItems = ""
for(let i = 0; i < leads.length; i++) {
    //  ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
                `
    // create element
    // set text content
    // append to ul
    // alternate method
    // const li = document.createElement("li")
    // li.textContent = myLeads[i]
    // ulEl.append(li)
}
ulEl.innerHTML = listItems
}