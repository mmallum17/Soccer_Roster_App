let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if(this.readyState === 4 && this.status === 200) {
      let jsonResponse = JSON.parse(this.responseText);
      //document.getElementById('rosterTest').innerHTML = this.responseText;
      let table = document.getElementById('rosterTable');
      for(let i = 0; i < jsonResponse.length; i++) {
          let row = table.insertRow(i + 1);

          let firstNameCell = row.insertCell(0);
          let lastNameCell = row.insertCell(1);
          let playerPositionCell = row.insertCell(2);
          let jerseyNumberCell = row.insertCell(3);
          let playerHeightCell = row.insertCell(4);
          let playerWeightCell = row.insertCell(5);

          firstNameCell.innerHTML = jsonResponse[i].firstName;
          lastNameCell.innerHTML = jsonResponse[i].lastName;
          playerPositionCell.innerHTML = jsonResponse[i].position;
          jerseyNumberCell.innerHTML = jsonResponse[i].jerseyNumber;
          playerHeightCell.innerHTML = jsonResponse[i].height;
          playerWeightCell.innerHTML = jsonResponse[i].weight;
      }
  }
};
xhttp.open('GET', 'all-players', true);
xhttp.send();