const loadPhone = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhone (data.data,dataLimit)
}

const displayPhone =( phones,dataLimit ) => {
   const phonesContainer = document.getElementById('phones-container');
   phonesContainer.textContent = '  ';
//display 12 phones only
  const showAll = document.getElementById('show-all');
  if(dataLimit && phones.length>12){
    phones = phones.slice(0,12);
    showAll.classList.remove('d-none');
  }
  else{
      showAll.classList.add('d-none');
  }

   //display no phone available
   const noPhone = document.getElementById('no-found-message');
   if(phones.length === 0) {
       noPhone.classList.remove('d-none');
   }
   else{
       noPhone.classList.add('d-none');
   }
   phones.forEach(phone=> {
       const phoneDiv = document.createElement('div');
       phoneDiv.classList.add('col')
       phoneDiv.innerHTML = `
       <div class="card  p-4">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <button onclick = "loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                    </div>
                  </div>
       
       `;
       phonesContainer.appendChild(phoneDiv)

       
   });

   //stop loader
   spinnerToggler(false)
}
const processSearch = (dataLimit) => {
    spinnerToggler(true);
    const searchField = document.getElementById('search-field');
    const searchText= searchField.value;

    loadPhone(searchText,dataLimit)
}

document.getElementById('btn-search').addEventListener('click', function() {
    //start loader
    processSearch(12);

})
document.getElementById('search-field').addEventListener('keypress', function(e) {
    if(e.key === 'Enter'){
        processSearch(12);
    }
})

const  spinnerToggler = isloading=>{
    const loadSpinner = document.getElementById('loader');
    if(isloading){
        loadSpinner.classList.remove('d-none');
    }
    else{
        loadSpinner.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click', function(e){
    processSearch();
})

const loadPhoneDetails = async id => {
    const url =`https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetail(data.data)
}

const displayPhoneDetail = phone =>{
    console.log(phone)
    const phoneDetail = document.getElementById('phoneDetailModalLabel');
    phoneDetail.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML =`
    <p>Release Date : ${phone.releaseDate ? phone.releaseDate : 'no phone release'}</p>
    <p>Storage : ${phone.mainFeatures ? phone.mainFeatures.storage : 'no storage'}</p>
    <p>Others : ${phone.others ? phone.others.Bluetooth :'No-bluetooth' }</p>
    `
}
// loadPhone ();
