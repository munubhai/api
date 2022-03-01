import axios, { AxiosResponse } from "axios";
import { randomitems, items } from "./datatypes";



/* Note: Tried CORS for other API
const express = require("express")
const web = express()
const cors = require("cors")
web.use(cors({
  origin: "*"

}
))*/


const limitInput: Element | null = document.getElementById("input1");
const fetchBtn = document.getElementById("btn1");
const myTable = document.getElementById("mars");

/*const arr = document.getElementById("lol");
arr?.addEventListener("click", () => {
  removeOldData();
});*/




// Define a click listener on the button

fetchBtn?.addEventListener("click", () => {
  removeOldData();
  fetchNewData();
});

function removeOldData() {
  // Use the class name fromAPI to select all the rows
  // in the table which are generated axios data
  const rows: NodeListOf<HTMLTableRowElement> =
    document.querySelectorAll(".fromAPI");

  for (let k = 0; k < rows.length; k++) {
    // Remove the row from the parent (myTable)
    myTable?.removeChild(rows[k]);
  }
}

function fetchNewData() {
  // Use the user input to control the number of random users to fetch
  const fetchLimit = (limitInput as HTMLInputElement)?.value ?? 10;
  axios
    .request({
      method: "GET",
      url: "https://anime-facts-rest-api.herokuapp.com/api/v1",
      params: { data: limitInput },
    })
    .then((rr: AxiosResponse) => rr.data)
    .then((ru: randomitems) =>{
      //console.log(ru.results)
      for (let k = 0; k < ru.data.length; k++) {
        const u: items = ru.data[k];
        const aRow = document.createElement("tr");
        // Use a unique class name so it is easy to remove rows later
        aRow.setAttribute("string", "fromAPI");
        myTable?.appendChild(aRow);

        // Create a anime id
        const animeID = document.createElement("td");
        const animeName = document.createElement("td");
        const anime_Img = document.createElement("td");

        aRow.appendChild(animeID);
        aRow.appendChild(animeName);
        aRow.appendChild(anime_Img);

        animeID.innerText = u.anime_id.toString();
        animeName.innerText = u.anime_name;


        // anime picture
        const image = document.createElement("img")
        image.setAttribute("src", u.anime_img)
        anime_Img.appendChild(image)

        //anime_Img.innerText = u.anime_img;


        //u.sort((a, b)=>( a.anime_name - b.anime_name));
      
        
      }
    });
}

fetchNewData();
