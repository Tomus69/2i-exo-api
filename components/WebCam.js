let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");

camera_button.addEventListener('click', function(e) {
	e.preventDefault()
	navigator.mediaDevices.getUserMedia({ video: true, audio: false })
	.then((stream) => {
	  video.srcObject = stream;
	  video.play();
	})
	.catch((err) => {
	  console.error(`An error occurred: ${err}`);
	});
}, false);

click_button.addEventListener('click', function(e) {
	e.preventDefault();
   	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
   	let image_data_url = canvas.toDataURL('image/jpeg');

   	// data url of the image
   	console.log(image_data_url);
});
