var buttonQ = document.querySelector("#submitQ");
var buttonF = document.querySelector("#submitF");
// var resultsText = document.querySelector("#results");

//Adds listeners for buttons in web scraper page, if button is clicked then the corresponding functions execute
buttonQ.addEventListener("click", searchQuestion);
buttonF.addEventListener("click", searchFile);

// function for single question search
async function searchQuestion() {
  // console.log("value = ", document.querySelector("#searchQ").value);

  let res = await fetch(
    `http://website-spring.herokuapp.com/text?ordered=False`,
    {
      method: "POST",
      body: document.querySelector("#searchQ").value + "?",
    }
  ).then((res) => res.json());

  let obj = await res;
  document.querySelector("#titleResults").innerHTML ='Results from Web Scraper';
  document.querySelector("#results").innerHTML = obj;
  
}

async function uploadFile(object) {
  try {
    res = await fetch(`http://website-spring.herokuapp.com/word?search=False`, {
      method: "POST",
      body: object
    });
  } catch (err) {
    console.log(err);
  } finally {
    return await res.json();
  }
}

// function for file search
async function searchFile() {
  let input = document.querySelector('input[type="file"]');

  let data = new FormData();
  data.append("document", input.files[0]);

  let res = await uploadFile(data);

  // console.log("res", res.queries);
  let printableQueries = res.queries;
  console.log(printableQueries[0]);
  for(var i = 0; i < printableQueries.length; i++){
    var text = printableQueries[i].queryText
    console.log(text);
    document.querySelector("#titleResults").innerHTML ='Results from Web Scraper';
    document.querySelector("#results").innerHTML += text + "\n";
  }
}