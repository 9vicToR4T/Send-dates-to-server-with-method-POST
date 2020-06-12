window.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form');//obtinem forma
    //trebuie sa avem in vedere ca de fiecare data cind trimitem o forma pagina noastra se va reincarca. Trebuie aceasta sa eliminam 
  
    function req(e) {
        e.preventDefault();//aminam comportamentul default al browserului

        let formData = new FormData(form);//creem un exemplar de obiect care va primi forma noastra
        formData.append("id", Math.random());
        //la momentul dat nu putem transf datele din obiect in format json

        let obj = {};//facem un nou obiect in care vom transimte totul ce avem in FormData
        formData.forEach((value, key) =>{//apoi din el vom scoate totul sub formatul JSON
            obj[key] = value;
        });
   

    //dupa ce se creeaza DOM SE cheama aceasta functie
    // const request = new XMLHttpRequest();
    // request.open("POST", "http://localhost:3000/people"); //ADRESA am luato din json-ser) ver

    // request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    // request.send(json); //in cazul POST indica ce vrem sa timitem. variabila mea json
    // request.addEventListener("load", function () {
    //   if (request.status == 200) {
    //     //atunci cind totul e ok
    //     //response este o proprietate a obiectului XMLHttpRequest
    //     let data = JSON.parse(request.response); //in response avem raspunsul de la server
    //     console.log(data); //la acest moment daca totul este bine noi am primit datele de pe server
    //     //createCards(data);

    //   } else {
    //     console.error("Something wrong");
    //     //uneori poate sa ne dea erorare chiar daca obiectul a fost trimis . Trebuie asta sa o verificam
    //   }
    // });

    // getResources("http://localhost:3000/people", obj) //cererea spre server. ne intoarce un Promes
    //                                            //obj e obiectul pe care il vom transforma in JSON
    //   .then((data) => createCards(data)) //aici deja putem prelucra datele
    //   .catch((err) => console.error(err));


    //axios singur transforma datele in JSON. Indicam din prima metoda POST
    axios.post("http://localhost:3000/people", obj);

    //this.remove(); //stergem butonul dupa click
  }

 //obrabotcikul va avea loc pe forma cind va avea loc submit
 form.addEventListener("submit", (e) => req(e), { once: true });
    //punem func req intro func arrow pentru ai transmite event care va putea amina reincarcarea paginii
  // al treile argument options { }. ii spunem sa lucreze doar o data
  
  async function getResources(url, data) {//data e datele pe care le vom trimite pe server
    //pentru a scapa de codul care se repeta
    let res = await fetch(`${url}`, { //folosim async await pentru a astepta datele de pe server
                          method: "POST",
                          headers: {//oglavlenie
                              "Content-type": "application/json"
                          },
                          body: JSON.stringify(data) //ceea ce vom trimite pe server in format JSON
    });

    if (!res.ok) {
      //in fetch avem proprietatea ok, care ne spune rezultatul cererii
      throw new Error(`Could not fetch ${url}, 
            status: ${res.status}`); //e bine sa cerem status deoarece fetch default nu arata care e problema
    }

    return await res.json(); //in loc de  .then( data => data.json())
  }

 

  function createCards(response) {
    response.forEach((item) => {
      let card = document.createElement("div");
      card.classList.add("card");

      let icon;
      if (item.sex === "male") {
        icon = "icons/mars.png";
      } else {
        icon = "icons/female.png";
      }
      card.innerHTML = `
                    <img src="${item.photo}" alt="phoyo"> 
                    <div class="name"> ${item.name} ${item.surname}</div>
                    <div class="sex"> <img src="${icon}" alt="sex"> </div>
                    <div class="age">${item.age}</div>`;
      document.querySelector(".app").appendChild(card);
    });
  }
});
