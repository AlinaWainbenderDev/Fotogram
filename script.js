let imageIndex = 0;

const images = [
  'pictures/img01_adventure-1835025_1280.jpg',
  'pictures/img02_beach-778246_1280.jpg', 
  'pictures/img03_gull-7539615_1280.jpg',
  'pictures/img04_concert-2527495_1280.jpg',
  'pictures/img05_concert-2616946_1280.jpg',
  'pictures/img06_channel-7572879_1280.jpg',
  'pictures/img07_basilisk-9713946_1280.jpg',
  'pictures/img08_skating-2624795_1280.jpg',
  'pictures/img09_chilli-9202873_1280.jpg',
  'pictures/img10_theme-park-6592969_1280.jpg',
  'pictures/img11_whippet-7208156_1280.jpg',
  'pictures/img12_woman-9452734_1280.jpg'
];

function getImageTitlefromPath(imagePath){
const fileName = imagePath.split('/').pop();
const parts = fileName.split('-');
let titlePart = parts[0];
titlePart = titlePart.replace('_',' ');
return titlePart;
}

const titles = images.map(getImageTitlefromPath);

function renderPhotos(){
  const photoRef = document.getElementById("photo-container");

  for (let index = 0; index < images.length; index++) {
     photoRef.innerHTML += `<img 
     class="photo" 
     src="${images[index]}" alt="${titles[index]}"
     role="button"
     aria-haspopup="dialog"
     aria-controls="myDialog" 
     tabindex="0"
     aria-label="Foto anzeigen: ${titles[index]}"
     aria-haspopup="dialog"
     aria-controls="myDialog"
     onclick="openOverlay(${index})"
     onkeydown="handleKeyDown(event, ${index})"
     />`;
  }
}

function handleArrowKeyDown(event, direction) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (direction === "left") {
      arrowLeft();
    } else if (direction === "right") {
      arrowRight();
    }
  }
}

function handleKeyDown(event, index) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openOverlay(index);
  }
}

renderPhotos(images);

function renderDialog(index){
  imageIndex = index;
  const dialogContainer = document.getElementById('myDialog');

    dialogContainer.innerHTML = `

    <div class="upperDialogContainer">
        <h3 id="pictureTitle">${titles[index]}</h3>

        <button 
          class="close-button"
          aria-label="Close alert"
          type="button"
          id="closeDialog"
          tabindex="0"
          onclick="closeDialog(event)"
        >
          <span aria-hidden="true">&times;</span>
        </button>
    </div>
        <img
          class="photoDialog"
          src="${images[index]}"
          alt="${titles[index]}"
        />
        <div class="arrowContainer">
        <div class="arr left" onclick="arrowLeft()" onkeydown="handleArrowKeyDown(event, 'left')" tabindex="0"><div></div></div>
        <div class="containerPictureIndex" id="renderPictureIndex" "></div>
        <div class="arr right" onclick="arrowRight()" onkeydown="handleArrowKeyDown(event, 'right')" tabindex="0"><div></div></div>
        </div>
    `;

    renderPictureIndex();
}

function renderPictureIndex(){
  const containerRefPictureIndex = document.getElementById('renderPictureIndex');
  
  containerRefPictureIndex.innerHTML = `${imageIndex + 1} / ${images.length}`;
}

function arrowRight(){ 
   if (imageIndex < images.length-1) {
    imageIndex +=1; 
   } else {
    imageIndex = 0; 
   }

   renderDialog(imageIndex);
}

function arrowLeft(){
  if(imageIndex > 0){
    imageIndex-=1; 
  } else {
    imageIndex = images.length - 1;
  }

  renderDialog(imageIndex);
}

function openOverlay(index){
  document.body.classList.add("modal-open");
  const overlayRef = document.getElementById('overlay');
  overlayRef.classList.remove("d_none")

  renderDialog(index);
  openDialog();
}

function openDialog(){
  const dialogRef = document.getElementById('myDialog'); 
  dialogRef.show()
}

function closeOverlay(){
  document.body.classList.remove("modal-open");
  const overlayRef = document.getElementById('overlay');
  overlayRef.classList.add("d_none");
}

function closeDialog() {
  const dialogRef = document.getElementById('myDialog');
  dialogRef.close(); 
  closeOverlay();
}

function addOverlayClickCloseListener () {
  const overlayRef = document.getElementById('overlay');

  if (!overlayRef) return; 

  overlayRef.addEventListener("click", function(event) {
    if (event.target !== overlayRef) return;
    closeDialog(event); 
  });
}

document.addEventListener("DOMContentLoaded", addOverlayClickCloseListener);


