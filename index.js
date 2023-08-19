window.onload = getSystemIp;
let clientIP;
let data;
let data2;
let postOffices;
let currentTime;

const startButton = document.getElementById("fetch-btn");

const mapContainer = document.getElementById("mapData");
const posts = document.getElementById("posts-boxes");




function getSystemIp(){
    $.getJSON("https://api.ipify.org?format=json", function(data) {
         
        clientIP = data.ip;
        console.log(clientIP);
    });

}

const fetchData = async()=>{

    document.getElementById("main").remove();

    const elements = Array.from(document.getElementsByClassName("disp"));
    elements.forEach(ele=>{
               ele.classList.toggle("disp");
    });
    

    

    const API =`https://ipinfo.io/${clientIP}/geo`;

    const response = await fetch(API);
    data = await response.json();
    console.log(data);
    
    const timeZone = data.timezone;
    displayinformation(); 
    getTimeFromTimeZone(timeZone);
    showLocation(data.loc);
    getNearbyPostOffices(data.postal);

}
startButton.addEventListener('click',fetchData);


function displayinformation(){
    document.getElementById("ipc").innerText = `IP Adress: ${data.ip}`;
    document.getElementById("city0").innerText = `City: ${data.city}`;
    document.getElementById("reg0").innerText = "Country: India";
    document.getElementById("orgi0").innerText = `Organisation:  ${data.org}`;
    document.getElementById("hosti").innerText = "Host:  N/A";


    document.getElementById("tdz").innerText = `Time Zone: ${data.timezone}`;
}

const getTimeFromTimeZone = (timeZ)=>{

    let result = new Date().toLocaleString("en-US", { timeZone: timeZ });
    let DateTime = result.split(",");
    let time = DateTime[1].trim();

    console.log(time);
    document.getElementById("dt").innerText = `Date Time: ${DateTime[0]} ${DateTime[1]}`;
}

function showLocation(loc){
    const mapData = `
    <iframe src="https://maps.google.com/maps?q=${loc}&z=15&output=embed" class="map-frame" frameborder="0"></iframe>`;

    mapContainer.innerHTML = mapData;

    let arr2 = loc.split(",");

    document.getElementById("lat0").innerText =  `lat: ${arr2[0]}`;
    document.getElementById("log0").innerText = `log: ${arr2[1]}`;
}

// function to get post offices around
async function getNearbyPostOffices(pinCode){

   const API2 = `https://api.postalpincode.in/pincode/${pinCode}`
    const response = await fetch(API2);
    data2 = await response.json();
    postOffices = data2[0].PostOffice;
    console.log(data2);

    document.getElementById("pc").innerText = `Pin-Code: ${pinCode}`;
    document.getElementById("msg").innerText = `Message: ${data2[0].Message}`;
    displayPostOffices();
}


function displayPostOffices(){
    postOffices.forEach(office => {
        const containerC = document.createElement("div");
        containerC.className = "card";
        const value = `
        <div class="item">Name:   ${office.Name}</div>
        <div class="item">Branch Type:   ${office.BranchType}</div>
        <div class="item">Dilivery Status: ${office.DeliveryStatus}</div>
        <div class="item">District:   ${office.District}</div>
        <div class="item">Division:   ${office.Division}</div>
        `;
        containerC.innerHTML = value;
      posts.appendChild(containerC);  
    });
}