document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById("imageInput");
    const previewImage = document.getElementById("previewImage");
    const predictButton = document.getElementById("predictButton");
    const resultDiv = document.getElementById("result");

    // Disable the predict button initially
    predictButton.disabled = true;

    // Listen for file input changes
    imageInput.addEventListener("change", function () {
        const file = imageInput.files[0];
        if (file) {
            // Show image preview
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
                previewImage.style.display = "block";
            };
            reader.readAsDataURL(file);

            // Enable the predict button
            predictButton.disabled = false;
        } else {
            // Reset preview and disable button if no file is selected
            previewImage.src = "";
            previewImage.style.display = "none";
            predictButton.disabled = true;
        }
    });

    // Handle form submission
    document.getElementById("uploadForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const file = imageInput.files[0];
        if (!file) {
            alert("Please select an image.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://127.0.0.1:8000/predict-image/", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                resultDiv.innerHTML = `Predicted Emotion: <span>${data.emotion}</span>`;
                resultDiv.style.color = "green";
            } else {
                resultDiv.innerHTML = `<span>Error: ${data.error}</span>`;
                resultDiv.style.color = "red";
            }
        } catch (error) {
            console.error("Error:", error);
            resultDiv.innerHTML = `<span class="text-danger">Failed to connect to the backend.</span>`;
        }
    });
});
