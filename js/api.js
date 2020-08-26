var base_url = "https://api.football-data.org/v2/";
var myHeaders = new Headers({
    'Content-Type': 'text/plain',
    'X-Auth-Token': 'b43954d3378a469eb9b7bc744917ea18'
});

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getStandings() {
    if ('caches' in window) {
        caches.match(base_url + "competitions/2021/standings?standingType=TOTAL", {
            headers: myHeaders
        }).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    var standingBodyHTML = "";
                    data.standings.forEach(function (standing) {
                        standing.table.forEach(function (table) {
                            standingBodyHTML += `
                            <tr><td style="text-align: center;">${table.position}</td>`;
                            standingBodyHTML += `<td><img src="${table.team.crestUrl.replace("http:", "https:")}" style="width:24px;height:24px" alt="" class="responsive-img"></td>`;
                            standingBodyHTML += `<td><a href="./tim.html?id=${table.team.id}">${table.team.name}</a></td>`
                            standingBodyHTML += `<td>${table.playedGames}</td>`;
                            standingBodyHTML += `<td>${table.won}</td>`;
                            standingBodyHTML += `<td>${table.draw}</td>`;
                            standingBodyHTML += `<td>${table.lost}</td>`;
                            standingBodyHTML += `<td>${table.goalsFor}</td>`;
                            standingBodyHTML += `<td>${table.goalsAgainst}</td>`;
                            standingBodyHTML += `<td>${table.goalDifference}</td>`;
                            standingBodyHTML += `<td>${table.points}</td></tr>`;
                        });
                    });
                    document.getElementById("standing_body").innerHTML = standingBodyHTML;
                });
            }
        });
    }

    fetch(base_url + "competitions/2021/standings?standingType=TOTAL", {
        headers: myHeaders
    }).then(status)
        .then(json).then(function (data) {
            var standingBodyHTML = "";
            data.standings.forEach(function (standing) {
                standing.table.forEach(function (table) {
                    standingBodyHTML += `
                           <tr><td style="text-align: center;">${table.position}</td>`;
                    standingBodyHTML += `<td><img src="${table.team.crestUrl.replace("http:", "https:")}" style="width:24px;height:24px" alt="" class="responsive-img"></td>`;
                    standingBodyHTML += `<td>  <a href="./tim.html?id=${table.team.id}"> ${table.team.name}</a></td>`
                    standingBodyHTML += `<td>${table.playedGames}</td>`;
                    standingBodyHTML += `<td>${table.won}</td>`;
                    standingBodyHTML += `<td>${table.draw}</td>`;
                    standingBodyHTML += `<td>${table.lost}</td>`;
                    standingBodyHTML += `<td>${table.goalsFor}</td>`;
                    standingBodyHTML += `<td>${table.goalsAgainst}</td>`;
                    standingBodyHTML += `<td>${table.goalDifference}</td>`;
                    standingBodyHTML += `<td>${table.points}</td></tr>`;
                });
                document.getElementById("standing_body").innerHTML = standingBodyHTML;
            });
            document.getElementById("standing_body").innerHTML = standingBodyHTML;
           
        })
        .catch(error);
}

function getTeamById() {
    return new Promise(function (resolve, reject) {
        // Ambil nilai query parameter (?id=)
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");
        if ("caches" in window) {
            caches.match(base_url + "teams/" + idParam, { headers: myHeaders }).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        var teamDetailsHTML = `<center><img src="${data.crestUrl.replace("http:", "https:")}" class="responsive-img" style="width:200px;height:200px" /></center>
                        <h5 class="center-align">${data.name}</h4>
                        <p class="center-align">${data.shortName}</p>
                        `;


                        var contentInfoHTML = `<span><table  class="striped highlight">
                                        <tbody>
                                        <tr><td>Area</td> <td>${data.area.name}</td></tr>
                                        <tr><td>Club Name</td> <td>${data.name}</td></tr>
                                        <tr><td>Short Name</td> <td>${data.shortName}</td></tr>
                                        <tr><td>TLA</td> <td>${data.tla}</td></tr>
                                        <tr><td>Address</td> <td style="word-break: break-all">${data.address}</td></tr>
                                        <tr><td>Phone</td> <td>${data.phone}</td></tr>
                                        <tr><td>Website</td> <td>${data.website}</td></tr>
                                        <tr><td>Email</td> <td style="word-break: break-all">${data.email}</td></tr>
                                        <tr><td>Founded</td> <td>${data.founded}</td></tr>
                                        <tr><td>Clubb Colors</td> <td>${data.clubColors}</td></tr>
                                        <tr><td>Venue</td> <td>${data.venue}</td></tr>
                                        </tbody>
                                    </table></span>`;

                        var contentPlayerHTML = `<span><table  class="striped highlight responsive-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Position</th>
                                            <th>Date Of Birth</th>
                                            <th>Country Of Birth</th>
                                            <th>Nationality</th>
                                        </tr>
                                    </thead>
                                <tbody>`;
                        data.squad.forEach(function (squad) {
                            contentPlayerHTML += `<tr>
                                                <td>${squad.name}</td>
                                                <td>${squad.position}</td>
                                                <td>${squad.dateOfBirth}</td>
                                                <td>${squad.countryOfBirth}</td>
                                                <td>${squad.nationality}</td>
                                                </tr>`;
                        });
                        contentPlayerHTML += `</tbody></table></span>`;

                        // Sisipkan komponen card ke dalam elemen dengan id #content
                        document.getElementById("card_header").innerHTML = teamDetailsHTML;
                        document.getElementById("info-body").innerHTML = contentInfoHTML;
                        document.getElementById("pemain-body").innerHTML = contentPlayerHTML;

                        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
                        resolve(data);
                    });
                }
            });
        }

        fetch(base_url + "teams/" + idParam, { headers: myHeaders }).then(status)
            .then(json).then(function (data) {
                var teamDetailsHTML = `<center><img src="${data.crestUrl.replace("http:", "https:")}" class="responsive-img" style="width:200px;height:200px" /></center>
            <h5 class="center-align">${data.name}</h4>
            <p class="center-align">${data.shortName}</p>
            `;

                var contentInfoHTML = `<span><table  class="striped highlight">
                                <tbody>
                                <tr><td>Area</td> <td>${data.area.name}</td></tr>
                                <tr><td>Club Name</td> <td>${data.name}</td></tr>
                                <tr><td>Short Name</td> <td>${data.shortName}</td></tr>
                                <tr><td>TLA</td> <td>${data.tla}</td></tr>
                                <tr><td>Address</td> <td style="word-break: break-all">${data.address}</td></tr>
                                <tr><td>Phone</td> <td>${data.phone}</td></tr>
                                <tr><td>Website</td> <td>${data.website}</td></tr>
                                <tr><td>Email</td> <td style="word-break: break-all">${data.email}</td></tr>
                                <tr><td>Founded</td> <td>${data.founded}</td></tr>
                                <tr><td>Clubb Colors</td> <td>${data.clubColors}</td></tr>
                                <tr><td>Venue</td> <td>${data.venue}</td></tr>
                                </tbody>
                            </table></span>`;

                var contentPlayerHTML = `<span><table  class="striped highlight responsive-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Date Of Birth</th>
                                    <th>Country Of Birth</th>
                                    <th>Nationality</th>
                                </tr>
                            </thead>
                        <tbody>`;
                data.squad.forEach(function (squad) {
                    contentPlayerHTML += `<tr>
                                        <td>${squad.name}</td>
                                        <td>${squad.position}</td>
                                        <td>${squad.dateOfBirth}</td>
                                        <td>${squad.countryOfBirth}</td>
                                        <td>${squad.nationality}</td>
                                        </tr>`;
                });
                contentPlayerHTML += `</tbody></table></span>`;

                document.getElementById("card_header").innerHTML = teamDetailsHTML;
                document.getElementById("info-body").innerHTML = contentInfoHTML;
                document.getElementById("pemain-body").innerHTML = contentPlayerHTML;
                // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
                resolve(data);
            });
    });
}

function getSavedTeams() {
    getAll().then(function (teams) {
        console.log(teams);
        var teamsHTML = "";
        teams.forEach(function (team) {
            teamsHTML += `
            <a href="./tim.html?id=${team.id}&saved=true">
                <div class="col s12 m6 l4">
                        <div class="card hoverable">
                            <div class="card-image blue-grey darken-1">
                                <center>
                                    <img src="${team.crestUrl.replace("http:", "https:")}" class="responsive-img" style="width:100px;height:100px;">
                                </center>
                            </div>
                            <div class="card-content">
                                <p class="truncate">${team.name}</p>
                            </div>
                        </div>
                </div>
            </a>
                
                  `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #body-content
        document.getElementById("teams").innerHTML = teamsHTML;
    });
}

function getSavedTeamById() {
    var urlParams = new URLSearchParams(window.location.search);
    var param   = urlParams.get("id");
    getById(param).then(function(team) {
        teamDetailsHTML = '';
        var teamDetailsHTML = `<center><img src="${team.crestUrl.replace("http:", "https:")}" class="responsive-img" style="width:200px;height:200px" /></center>
            <h5 class="center-align">${team.name}</h4>
            <p class="center-align">${team.shortName}</p>
            `;

        var contentInfoHTML = `<span><table  class="striped highlight">
                                <tbody>
                                <tr><td>Area</td> <td>${team.area.name}</td></tr>
                                <tr><td>Club Name</td> <td>${team.name}</td></tr>
                                <tr><td>Short Name</td> <td>${team.shortName}</td></tr>
                                <tr><td>TLA</td> <td>${team.tla}</td></tr>
                                <tr><td>Address</td> <td style="word-break: break-all">${team.address}</td></tr>
                                <tr><td>Phone</td> <td>${team.phone}</td></tr>
                                <tr><td>Website</td> <td>${team.website}</td></tr>
                                <tr><td>Email</td> <td style="word-break: break-all">${team.email}</td></tr>
                                <tr><td>Founded</td> <td>${team.founded}</td></tr>
                                <tr><td>Clubb Colors</td> <td>${team.clubColors}</td></tr>
                                <tr><td>Venue</td> <td>${team.venue}</td></tr>
                                </tbody>
                            </table></span>`;

        var contentPlayerHTML = `<span><table  class="striped highlight responsive-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Date Of Birth</th>
                                    <th>Country Of Birth</th>
                                    <th>Nationality</th>
                                </tr>
                            </thead>
                        <tbody>`;
        team.squad.forEach(function (squad) {
            contentPlayerHTML += `<tr>
                                        <td>${squad.name}</td>
                                        <td>${squad.position}</td>
                                        <td>${squad.dateOfBirth}</td>
                                        <td>${squad.countryOfBirth}</td>
                                        <td>${squad.nationality}</td>
                                        </tr>`;
        });
        contentPlayerHTML += `</tbody></table></span>`;
        document.getElementById("card_header").innerHTML = teamDetailsHTML;
        document.getElementById("info-body").innerHTML = contentInfoHTML;
        document.getElementById("pemain-body").innerHTML = contentPlayerHTML;
    });
}