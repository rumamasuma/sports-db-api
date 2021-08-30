const searchTeam = async() => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    // error handle
if(searchText == ''){
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'block';
    errorMessage.innerHTML =`<h3 class="text-center m-5 text-danger">Please give a team name !!!</h3>`

}
else{
   // load data
   const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchText}`;
   // console.log(url);
   const res = await fetch(url);
   const data = await res.json();
   displaySearchTeams(data.teams);
   // fetch(url)
   // .then(res => res.json())
   // .then(data => displaySearchTeams(data.teams));
}
// clear data
searchField.value = ''; 
}

const displaySearchTeams = teams => {
   // console.log(teams);

const searchResult = document.getElementById('search-result');
// clear search content
searchResult.textContent = ' ';
if(teams == null){
    searchResult.innerHTML =`<h3 class="text-center m-5 text-danger"> NO RESULT FOUND !!!</h3>`;
}
 else{
    teams.forEach(team => {
        // console.log(team);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =`
        <div onclick="detailInfo(${team.idTeam})"  class="card h-100">
        <img  src="${team.strTeamBadge}" class="card-img-top w-50 mx-auto" alt="...">
    
        <div class="card-body">
          <h5 class="card-title">League : ${team.strLeague}</h5>
          <h6 class="card-title"> Country Name : ${team.strCountry}</h6>
        </div>
      </div>
        `;
        searchResult.appendChild(div);
    })
 }
};


const detailInfo = (teamId)=>{
// console.log(teamId);
const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`;
fetch(url)
.then(res => res.json())
.then(data =>  displayTeamDetail(data.teams[0]))
};

const displayTeamDetail = team =>{
// console.log(team);
 const teamDetails = document.getElementById('team-details');
 // clear team detail content
 teamDetails.textContent = '';
 const div = document.createElement('div');
 div.classList.add('card');
 div.innerHTML = `
 <img width ="250px"  class="mx-auto"  src="${team.strTeamBadge}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title"> Sport : ${team.strSport}</h5>
      <h6 class="card-title"> Stadium : ${team.strStadium}</h6>
      <h6> Stadium Location : ${team.strStadiumLocation}</h6>
      <p class="card-text">${team.strDescriptionEN.slice(0,200)}</p>
      <a href="${team.strYoutube}" class= "btn btn-primary "> Go somewhere </a>
    </div>`;
    teamDetails.appendChild(div);
}
