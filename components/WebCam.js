let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");
const image_input = document.querySelector("#inputPicture");

camera_button.addEventListener('click', function(e) {
	e.preventDefault()
	navigator.mediaDevices.getUserMedia({ video: true, audio: false })
	.then((stream) => {
	    video.srcObject = stream;
	    video.play();
	})
	.catch((err) => {
        alert(`An error occurred: ${err}`)
	    console.error(`An error occurred: ${err}`);
	});
}, false);

click_button.addEventListener('click', function(e) {
	e.preventDefault();
   	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
   	let image_data_url = canvas.toDataURL('image/jpeg');

	image_input.setAttribute('value', image_data_url);
	document.querySelector("#display-image").style.backgroundImage = `url(${image_data_url})`;

   	// data url of the image
   	console.log(image_data_url);
});

image_input.addEventListener("change", function() {
	const reader = new FileReader();
	reader.addEventListener("load", () => {
	  const uploaded_image = reader.result;
	  document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
	});
	reader.readAsDataURL(this.files[0]);
  });
