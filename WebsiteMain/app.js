/* Global Variables */

const KEY_APi = "099bd7e06746fc091b07cc18e739e9a2";

// const URL_APi = `https://api.openweathermap.org/data/2.5/weather?`;

/// EX: ==> ////https://api.openweathermap.org/data/2.5/weather?zip=10122&appid=099bd7e06746fc091b07cc18e739e9a2&units=imperial

// Create a new date instance dynamically with JS

let d = new Date();

let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const unit = `imperial`; /// you can change that unit

document.getElementById("generate").addEventListener("click", Get_API_Action);

function Get_API_Action(e) {
   debugger

  const feeling = document.getElementById("feelings").value; /// local variable///  get data from text box's .

  let Zip_Code_1 = document.getElementById("zip").value; /// local variable///  get data from text box's .

  if (Zip_Code_1.length != 0 || feeling.length != 0) {
    get_data(Zip_Code_1)
      .then(function (data) {
        
        if (data) {
          const { main: { temp }, } = data;

          const Data_Renew = { date: newDate,  temperature: temp, user_response: feeling, };
          
          return Data_Renew;
        }
       
      }).then(function(Data_Renew){

          postData(`/addpostnew`, Data_Renew); ///  ++++++++  ////   //// http://localhost:3000/addpostnew or http://127.0.0.1:3000/addpostnew

      })
      .then( () => Up_Data_UI() );
  } else {
    alert("  inter zip code and your feeling ::  ");
  }
}

////// Dynamically Update UI

const Up_Data_UI = async () => {
  // debugger

  const res = await fetch(`/upall`); //// ===>  //// http://localhost:3000/upall or http://127.0.0.1:3000/upall
  try {
 const allData = await res.json();

    if (res.ok) {
   


    console.log(allData);

    document.getElementById(
      "date"
    ).innerHTML = ` date to daye : ${allData.date}`; ///  insert in to date ID for div in index.html
    document.getElementById(
      "temp"
    ).innerHTML = ` temperature : ${allData.temperature}`; ///  insert in to temp ID for div in index.html
    document.getElementById(
      "content"
    ).innerHTML = ` user response : ${allData.user_response}`; ///  insert in to content ID for div in index.html
  
  }if (!res.ok) {

    return alert(" Error: Up_Data_UI method "); //// alert Up_Data_UI method error

  }
  
  } catch (error) {
    console.log(" error Up_Data_UI ", error);
  }
};

const get_data = async (Zip_Code_1) => {
  ////   GET request

  // debugger

  const New_URL_APi = `https://api.openweathermap.org/data/2.5/weather?zip=${Zip_Code_1}&appid=${KEY_APi}&units=${unit}`;

  try {
    const res = await fetch(New_URL_APi);

    const new_data = await res.json();

    // console.log( ` fetch get_data method  : ${new_data}`);

    return new_data;
  } catch (error) {
    alert("enter Zip Code  please pefor cklice buton ' generat ' ");

    console.log("Error Null : enter empte value in Zip Code  ", error);
  }
};

const postData = async (URL = "", data_list = {}) => {
  // debugger

  const res = await fetch(URL, {
    method: "POST", /// POST
  //  credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data_list),
  });

  try {
    if (!res.ok) {
      /////==> no successful response
      return alert(" Error: postData method "); //// alert error
    } else if (res.ok) {
      /////==>   successful response
      const new_Data_json = await res.json();
      // console.log(new_Data);
      return new_Data_json;
    }
  } catch (error) {
    console.log("Error:  in catch postData ", error); //// Error
  }
};
