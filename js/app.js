
const menuScreen = document.getElementById("menu-screen");
const detailScreen = document.getElementById("detail-screen");
const backButton = document.getElementById("back-button");

// Các layer của màn hình chi tiết
const backgroundLayer = document.getElementById("detail-background");
const drinkImage = document.getElementById("drink-image");
const latteModel = document.getElementById("latte-model");
const titleWatermarkLayer = document.getElementById("drink-title-watermark");
const notesLayer = document.getElementById("drink-notes-image");
const coffeeBeansLayer = document.getElementById("coffee-beans-image");

const drinkOrder = [
    "latte",
    "matcha",
    "kombucha",
    "choco",
    "coldbrew"
];

let currentDrinkIndex = 0;

// Đường dẫn 5 layer Cold Brew
const coldBrewLayers = {
    background: "assets/images/coldbrew-background.png",
    drink: "assets/images/coldbrew-drink.png",
    titleWatermark: "assets/images/coldbrew-title-watermark.png",
    notes: "assets/images/coldbrew-notes.png",
    coffeeBeans: "assets/images/coldbrew-coffee-beans.png"
};
// Các layer PNG của Latte
const latteLayers = {
    background: "assets/images/latte-background.png",
    titleWatermark: "assets/images/latte-title-watermark.png",
    notes: "assets/images/latte-notes.png",
    coffeeBeans: "assets/images/latte-coffee-beans.png"
};

// Hiển thị Latte bằng model 3D và các layer PNG
function showLatte() {
    backgroundLayer.src = latteLayers.background;

    drinkImage.hidden = true;
    latteModel.hidden = false;

    // Đặt lại góc và zoom mặc định mỗi lần mở Latte
    resetLatteCamera();

    titleWatermarkLayer.src = latteLayers.titleWatermark;
    notesLayer.src = latteLayers.notes;
    coffeeBeansLayer.src = latteLayers.coffeeBeans;

    currentDrinkIndex = drinkOrder.indexOf("latte");
}
function resetLatteCamera() {
    latteModel.cameraOrbit = "25deg 65deg 75%";
    //latteModel.fieldOfView = "30deg";
}
// Hiển thị Cold Brew bằng 5 layer PNG
function showColdBrew() {
    backgroundLayer.src = coldBrewLayers.background;

    // Ẩn model 3D, hiện ảnh ly Cold Brew
    latteModel.hidden = true;
    drinkImage.hidden = false;
    drinkImage.src = coldBrewLayers.drink;
    drinkImage.alt = "Cold Brew";

    titleWatermarkLayer.src = coldBrewLayers.titleWatermark;
    notesLayer.src = coldBrewLayers.notes;
    coffeeBeansLayer.src = coldBrewLayers.coffeeBeans;

    currentDrinkIndex = drinkOrder.indexOf("coldbrew");
}

// Mở màn hình chi tiết
document.querySelectorAll(".menu-hotspot").forEach(function (button) {
    button.addEventListener("click", function () {
        const drinkKey = button.dataset.drink || "latte";

        // Hiện 5 layer cho Cold Brew
        if (drinkKey === "latte") {
    showLatte();
} else if (drinkKey === "coldbrew") {
    showColdBrew();
} else {
    latteModel.hidden = true;
    drinkImage.hidden = false;
            // Các món khác sẽ được bổ sung layer sau.
            // Tạm thời dùng background hiện có của từng món.
            const backgrounds = {
                latte: "assets/images/latte-background.png",
                matcha: "assets/images/matcha-background.png",
                kombucha: "assets/images/kombucha-background.png",
                choco: "assets/images/choco-background.png"
            };

            backgroundLayer.src = backgrounds[drinkKey];
            drinkImage.removeAttribute("src");
            titleWatermarkLayer.removeAttribute("src");
            notesLayer.removeAttribute("src");
            coffeeBeansLayer.removeAttribute("src");

            currentDrinkIndex = drinkOrder.indexOf(drinkKey);
        }

        menuScreen.hidden = true;
        detailScreen.hidden = false;
    });
});

// Quay về menu chính
backButton.addEventListener("click", function () {
    detailScreen.hidden = true;
    menuScreen.hidden = false;
});

// Vuốt xuống để chuyển sang món tiếp theo
let touchStartX = 0;
let touchStartY = 0;

detailScreen.addEventListener("touchstart", function (event) {
    const touch = event.changedTouches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
}, { passive: true });

detailScreen.addEventListener("touchend", function (event) {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    if (
        deltaY > 70 &&
        Math.abs(deltaY) > Math.abs(deltaX) * 1.2
    ) {
        const nextIndex = (currentDrinkIndex + 1) % drinkOrder.length;
        const nextDrink = drinkOrder[nextIndex];

        if (nextDrink === "latte") {
    showLatte();
} else if (nextDrink === "coldbrew") {
    showColdBrew();
} else {
    latteModel.hidden = true;
    drinkImage.hidden = false;
            const backgrounds = {
                latte: "assets/images/latte-background.png",
                matcha: "assets/images/matcha-background.png",
                kombucha: "assets/images/kombucha-background.png",
                choco: "assets/images/choco-background.png"
            };

            backgroundLayer.src = backgrounds[nextDrink];
            drinkImage.removeAttribute("src");
            titleWatermarkLayer.removeAttribute("src");
            notesLayer.removeAttribute("src");
            coffeeBeansLayer.removeAttribute("src");

            currentDrinkIndex = nextIndex;
        }
    }
}, { passive: true });

/* =========================================
   TÌM LY DÀNH CHO BẠN - BẢN THỬ NGHIỆM
   ========================================= */

(function initFindYourDrink() {
    const menuScreen = document.getElementById("menu-screen");
    const detailScreen = document.getElementById("detail-screen");
    const findScreen = document.getElementById("find-drink-screen");
    const resultScreen = document.getElementById("find-result-screen");

    const openButton = document.getElementById("find-your-drink-button");
    const backMenuButton = document.getElementById("quiz-back-menu");
    const nextButton = document.getElementById("quiz-next");
    const restartButton = document.getElementById("quiz-restart");
    const resultBackButton = document.getElementById("result-back-menu");
    const resultDetailButton = document.getElementById("result-detail-button");

    const questionLabel = document.getElementById("quiz-eyebrow");
    const questionTitle = document.getElementById("quiz-question");
    const optionsContainer = document.getElementById("quiz-options");
    const stepItems = document.querySelectorAll(".quiz-step");

    const imageRestartButton = document.getElementById("result-restart-image");
const imageBackMenuButton = document.getElementById("result-back-menu-image");

    if (!openButton || !findScreen || !resultScreen) return;

    const questions = [
        {
            title: "Bạn thích vị nào hơn?",
            answers: [
                ["chua", "Chua thanh", "Sáng, nhẹ, có chút trái cây"],
                ["dang", "Đắng đậm", "Mạnh, rõ vị cà phê"],
                ["ngot", "Ngọt dịu", "Êm, ít đắng, dễ uống"],
                ["beo", "Béo mượt", "Nhiều sữa, mượt ở vị giác"]
            ]
        },
        {
            title: "Bạn cần gì lúc này?",
            answers: [
                ["tinh-tao", "Tỉnh táo", "Muốn một thức uống giúp tỉnh táo"],
                ["thu-gian", "Thư giãn", "Nhẹ nhàng, nhâm nhi"],
                ["nang-luong", "Nạp năng lượng", "Một ly để bắt đầu ngày mới"],
                ["thu-vi", "Thử điều mới", "Muốn khám phá hương vị khác"]
            ]
        },
        {
            title: "Bạn thích uống thế nào?",
            answers: [
                ["nong", "Nóng", "Ấm áp, thơm dịu"],
                ["lanh", "Lạnh", "Mát lạnh, sảng khoái"],
                ["da-xay", "Đá xay", "Mát lạnh, kết cấu sánh mịn"],
                ["bat-ky", "Sao cũng được", "Để quán gợi ý cho bạn"]
            ]
        }
    ];

    let currentQuestion = 0;
    const answers = [null, null, null];

    function showMenu() {
        findScreen.hidden = true;
        resultScreen.hidden = true;

        if (detailScreen) detailScreen.hidden = true;
        if (menuScreen) menuScreen.hidden = false;
    }

    function renderQuestion() {
        const question = questions[currentQuestion];

        questionLabel.textContent =
            `TÌM LY DÀNH CHO TÔI · CÂU ${currentQuestion + 1} / ${questions.length}`;

        questionTitle.textContent = question.title;
        optionsContainer.innerHTML = "";

        question.answers.forEach(([value, title, description]) => {
            const option = document.createElement("button");
            option.type = "button";
            option.className = "quiz-option";
            option.dataset.answer = value;

            const titleElement = document.createElement("strong");
            titleElement.textContent = title;

            const descriptionElement = document.createElement("span");
            descriptionElement.textContent = description;

            option.append(titleElement, descriptionElement);

            if (answers[currentQuestion] === value) {
                option.classList.add("selected");
            }

            option.addEventListener("click", () => {
                answers[currentQuestion] = value;

                optionsContainer.querySelectorAll(".quiz-option")
                    .forEach(button => button.classList.remove("selected"));

                option.classList.add("selected");
                nextButton.disabled = false;
            });

            optionsContainer.appendChild(option);
        });

        stepItems.forEach((step, index) => {
            step.classList.toggle("active", index === currentQuestion);
            step.classList.toggle("completed", index < currentQuestion);
        });

        nextButton.textContent =
            currentQuestion === questions.length - 1 ? "Hoàn thành" : "Tiếp tục";

        nextButton.disabled = !answers[currentQuestion];
    }

    function openQuiz() {
        if (menuScreen) menuScreen.hidden = true;
        if (detailScreen) detailScreen.hidden = true;

        resultScreen.hidden = true;
        findScreen.hidden = false;

        currentQuestion = 0;
        answers.fill(null);
        renderQuestion();
    }

    openButton.addEventListener("click", openQuiz);

    nextButton.addEventListener("click", () => {
        if (!answers[currentQuestion]) return;

        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion();
        } else {
            findScreen.hidden = true;
            resultScreen.hidden = false;
        }
    });

    backMenuButton.addEventListener("click", showMenu);
    resultBackButton.addEventListener("click", showMenu);

    restartButton.addEventListener("click", () => {
        currentQuestion = 0;
        answers.fill(null);
        resultScreen.hidden = true;
        findScreen.hidden = false;
        renderQuestion();
    });

    
resultDetailButton.addEventListener("click", () => {
    resultScreen.hidden = true;

    showColdBrew();

    detailScreen.hidden = false;
});

imageRestartButton.addEventListener("click", () => {
    currentQuestion = 0;
    answers.fill(null);

    resultScreen.hidden = true;
    findScreen.hidden = false;

    renderQuestion();
});

imageBackMenuButton.addEventListener("click", showMenu);

})();